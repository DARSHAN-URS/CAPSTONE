import { subdomains as cognitiveQuestions } from '../data/cognitiveQuestions';
import { subdomains as mentalQuestions } from '../data/mentalQuestions';
import { subdomains as physicalQuestions } from '../data/physicalQuestions';
// Assuming biomarkersQuestions is available or you pass the weights directly
import { subdomains as biomarkersQuestions } from '../data/biomarkersQuestions';

export const findUserById = (id) => {
  try {
    const list = JSON.parse(localStorage.getItem('usersSeen') || '[]');
    return (Array.isArray(list) ? list : []).find(p => p.id === id) || null;
  } catch (_) {
    return null;
  }
};

export const saveUserReport = (userId, report) => {
  const safeId = (userId && String(userId).trim()) ? String(userId).trim() : 'anonymous';
  const key = 'reports:' + safeId;
  let reports = [];
  try {
    reports = JSON.parse(localStorage.getItem(key) || '[]') || [];
  } catch (_) {
    reports = [];
  }
  reports.unshift(report);
  localStorage.setItem(key, JSON.stringify(reports.slice(0, 50)));
};

export const saveDomainReport = (userId, domain, answers) => {
  const safeId = (userId && String(userId).trim()) ? String(userId).trim() : 'anonymous';
  const key = 'domain-reports:' + safeId;
  let reports = [];
  try {
    reports = JSON.parse(localStorage.getItem(key) || '[]') || [];
  } catch (_) {
    reports = [];
  }
  const report = {
    domain,
    date: new Date().toISOString().slice(0, 10),
    answers
  };
  reports.unshift(report);
  localStorage.setItem(key, JSON.stringify(reports.slice(0, 50)));
};

export const getDomainReports = (userId) => {
  const safeId = (userId && String(userId).trim()) ? String(userId).trim() : 'anonymous';
  const key = 'domain-reports:' + safeId;
  try {
    return JSON.parse(localStorage.getItem(key) || '[]') || [];
  } catch (_) {
    return [];
  }
};

// Helper to get all questions for a domain
const getQuestionsForDomain = (domain) => {
  let questionData;
  switch (domain) {
    case 'cognitive':
      questionData = cognitiveQuestions;
      break;
    case 'mental':
      questionData = mentalQuestions;
      break;
    case 'physical':
      questionData = physicalQuestions;
      break;
    case 'biomarkers':
       questionData = biomarkersQuestions;
       break;
    default:
      return [];
  }
  // Flatten the subdomains into a single list of questions
  return questionData.flatMap(subdomain => subdomain.items || []);
};

// --- NEW: Helper to convert raw biomarker inputs to wellness scores ---
const convertBiomarkerInputs = (answers) => {
  const scores = {};
  const getVal = (key) => parseFloat(answers[key]);
  const gender = answers['gender'] === 'Female' ? 2 : 1; // Default to Male (1) if not specified
  // Note: Ideally 'age' should also be captured for lung function, defaulting to <60 logic here if missing.
  
  // 1. Blood Pressure (0-2)
  const sys = getVal('bm017');
  const dias = getVal('bm018');
  if (!isNaN(sys) && !isNaN(dias)) {
    if (sys < 120 && dias < 80) scores['bp_score'] = 2;
    else if ((sys >= 120 && sys <= 139) || (dias >= 80 && dias <= 89)) scores['bp_score'] = 1;
    else scores['bp_score'] = 0;
  } else {
      scores['bp_score'] = 0; // Default or handle missing
  }

  // 2. Pulse (0-1)
  const pulse = getVal('bm019');
  if (!isNaN(pulse)) {
      scores['pulse_score'] = (pulse >= 60 && pulse <= 100) ? 1 : 0;
  }

  // 3. Grip Strength (0-1)
  // Assuming inputs are max values or we take the provided single value
  const grip = getVal('bm028'); // Simplification: using one input key for max grip
  if (!isNaN(grip)) {
      if (gender === 1) scores['grip_strength_score'] = grip >= 27 ? 1 : 0;
      else scores['grip_strength_score'] = grip >= 18 ? 1 : 0;
  }

  // 4. Timed Walk (0-1)
  const walkTime = getVal('bm056'); // Simplification: using one input key
  if (!isNaN(walkTime)) {
      scores['timed_walk_score'] = walkTime <= 6 ? 1 : 0;
  }

  // 5. Balance (0-1)
  // Assuming input is "1" for Pass, "0" for Fail
  const balance = getVal('bm049_iwer');
  if (!isNaN(balance)) scores['passed_full_tandem'] = balance === 1 ? 1 : 0;

  // 6. Anemia (0-1)
  const hb = getVal('hb');
  if (!isNaN(hb)) {
      if (gender === 1) scores['anemia_score'] = (hb >= 13 && hb <= 16.5) ? 1 : 0;
      else scores['anemia_score'] = (hb >= 12 && hb <= 16) ? 1 : 0;
  }

  // 7. HbA1c (0-1)
  const hba1c = getVal('hba1c');
  if (!isNaN(hba1c)) scores['hba1c_score'] = hba1c < 6.5 ? 1 : 0; // Strict cutoff

  // 8. CRP (0-1)
  const crp = getVal('crp');
  if (!isNaN(crp)) scores['crp_score'] = crp < 3.0 ? 1 : 0; // Strict cutoff

   // 9. Vision (0-2)
   // Requires sophisticated logic for logMAR conversion. 
   // For this frontend simplified version, we might assume pre-calculated or simplified input.
   // Placeholder: if 'vision_impaired' is No (1) -> 2, else 0.
   // You should expand this based on exact input fields available in your form.
   scores['vision_score'] = 2; // Defaulting to normal for now, adapt to inputs

  // 10. WHR (0-1)
  const waist = getVal('bm076');
  const hip = getVal('bm079');
  if (!isNaN(waist) && !isNaN(hip) && hip !== 0) {
      const whr = waist / hip;
      if (gender === 1) scores['whr_score'] = whr < 0.90 ? 1 : 0;
      else scores['whr_score'] = whr < 0.85 ? 1 : 0;
  }

  return scores;
};


export const calculateDomainScore = (domain, reports) => {
  const domainReport = reports
    .filter(r => r.domain === domain)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  if (!domainReport || !domainReport.answers) {
    return null; // No report or no answers, so no score
  }

  const userAnswers = domainReport.answers;

  // --- START: Biomarker Scoring Logic ---
  if (domain === 'biomarkers') {
      const convertedScores = convertBiomarkerInputs(userAnswers);
      let totalWeightedScore = 0;
      
      // We iterate through the questions (which contain the weights)
      // and match them to our converted 'wellness' scores.
      const questions = getQuestionsForDomain('biomarkers');
      
      for (const question of questions) {
          // --- START: FIX ---
          // Use the 'scoreKey' from the question definition (e.g., 'bp_score')
          // instead of the raw input 'code' (e.g., 'bm017').
          const scoreKey = question.scoreKey; 
          // --- END: FIX ---

          if (scoreKey && convertedScores[scoreKey] !== undefined) {
              // Only apply the weight if the question has one, to avoid double-counting.
              if (question.weight > 0) {
                totalWeightedScore += convertedScores[scoreKey] * question.weight;
              }
          }
      }
      
      // The weights are designed to sum to 1, so multiplying by 100 gives the final score.
      return Math.round(totalWeightedScore); 
  }
  // --- END: Biomarker Scoring Logic ---

  // --- START: Cognitive Scoring Logic (Existing) ---
  if (domain === 'cognitive') {
    let totalWeightedScore = 0;
    for (const subdomain of cognitiveQuestions) {
      if (!subdomain.items || subdomain.items.length === 0) continue;

      let subdomainScores = [];
      for (const question of subdomain.items) {
        if (!question.code) continue;

        const userAnswer = userAnswers[question.code];
        let questionScore = 0; // Default to 0 (incorrect)

        if (question.benchmark === null) {
          // Manual scoring for null benchmark
          const manualScore = userAnswers[`${question.code}_score`];
          if (manualScore === '1') {
            questionScore = 1;
          }
        } else if (userAnswer !== undefined && userAnswer !== null && userAnswer !== '') {
          // Automatic scoring based on benchmark
          if (typeof question.benchmark === 'number') {
            const numericAnswer = parseFloat(userAnswer);
            if (!isNaN(numericAnswer) && numericAnswer >= question.benchmark) {
              questionScore = 1;
            }
          } else if (typeof question.benchmark === 'string') {
            if (String(userAnswer).trim().toLowerCase() === question.benchmark.trim().toLowerCase()) {
              questionScore = 1;
            }
          }
        }
        subdomainScores.push(questionScore);
      }

      if (subdomainScores.length > 0) {
        const averageSubdomainScore = subdomainScores.reduce((a, b) => a + b, 0) / subdomainScores.length;
        totalWeightedScore += averageSubdomainScore * (subdomain.weight || 0);
      }
    }
    return Math.round(totalWeightedScore);
  }
  // --- END: Cognitive Scoring Logic ---

  // --- Standard Logic for Mental & Physical (unchanged) ---
  const questions = getQuestionsForDomain(domain);
  let totalScore = 0;

  const mentalWellbeingCodes = ['mh201', 'mh202', 'mh204', 'mh205', 'mh208', 'mh209', 'mh210', 'mh206', 'mh207'];
  const mh201Answer = userAnswers['mh201'];
  const isMentalHealthSkip = domain === 'mental' && mh201Answer?.toLowerCase() === 'no';

  if (isMentalHealthSkip) {
    const mentalWellbeingQuestions = questions.filter(q => mentalWellbeingCodes.includes(q.code));
    const bonusScore = mentalWellbeingQuestions.reduce((sum, q) => sum + (q.weight || 0), 0);
    totalScore += bonusScore;
  }

  for (const question of questions) {
    if (isMentalHealthSkip && mentalWellbeingCodes.includes(question.code)) {
      continue;
    }

    if (!question.code || question.benchmark === undefined || question.weight === undefined) {
      continue;
    }

    const userAnswer = userAnswers[question.code];
    let questionScore = 0; 

    if (userAnswer !== undefined && userAnswer !== null && userAnswer !== '') {
      if (typeof question.benchmark === 'number') {
        const numericAnswer = parseFloat(userAnswer);
        if (!isNaN(numericAnswer) && numericAnswer >= question.benchmark) {
          questionScore = 1; 
        }
      }
      else if (typeof question.benchmark === 'string') {
        if (String(userAnswer).trim().toLowerCase() === question.benchmark.trim().toLowerCase()) {
          questionScore = 1; 
        }
      }
    }

    totalScore += questionScore * question.weight;
  }

  return Math.round(totalScore);
};

// --- NEW: Function to calculate the final weighted CAI score ---
export const calculateCaiScore = (reports) => {
  const domainWeights = {
    physical: 0.317106,
    cognitive: 0.262138,
    biomarkers: 0.24342,
    mental: 0.177324,
  };

  let finalCaiScore = 0;

  // Calculate score for each domain and apply its weight
  for (const domain in domainWeights) {
    const score = calculateDomainScore(domain, reports);
    const weight = domainWeights[domain];

    // If a score exists (is not null), add its weighted value to the final score.
    // If a domain hasn't been assessed, its score will be null, and it won't contribute to the CAI.
    if (score !== null) {
      finalCaiScore += score * weight;
    }
  }

  return Math.round(finalCaiScore);
};

export const generateSuggestions = (scores) => {
  const suggestions = [];
  
  if (scores.physical < 75) {
    suggestions.push("Physical Health: Engage in regular physical activity for at least 30 minutes daily. Focus on strength training and cardiovascular exercises to improve muscle mass and heart health.");
  }
  if (scores.mental < 75) {
    suggestions.push("Mental Health: Practice mindfulness and stress-reduction techniques. Consider meditation, yoga, or counseling if experiencing persistent stress or anxiety.");
  }
  if (scores.cognitive < 75) {
    suggestions.push("Cognitive Health: Challenge your brain with puzzles, reading, or learning new skills. Stay socially active and maintain regular sleep patterns for optimal brain function.");
  }
  if (scores.biomarkers < 75) {
    suggestions.push("Biomarkers: Maintain a balanced diet rich in fruits, vegetables, and whole grains. Monitor blood pressure and cholesterol levels regularly. Stay hydrated and limit processed foods.");
  }
  
  suggestions.push("Nutrition: Follow a Mediterranean-style diet with omega-3 fatty acids, antioxidants, and adequate protein to support healthy aging.");
  suggestions.push("Sleep: Prioritize 7-9 hours of quality sleep per night. Maintain consistent sleep and wake times to support circadian rhythm.");
  suggestions.push("Social Connection: Maintain strong social relationships and stay engaged in community activities to support emotional well-being.");
  suggestions.push("Preventive Care: Schedule regular health check-ups and screenings. Stay up-to-date with vaccinations and health monitoring.");
  
  return suggestions;
};

export const saveUser = (userId, userName) => {
  try {
    const key = 'usersSeen';
    const list = JSON.parse(localStorage.getItem(key) || '[]') || [];
    const idx = list.findIndex(p => p && p.id === userId);
    const entry = { id: userId, name: userName };
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...entry };
    } else {
      list.push(entry);
    }
    localStorage.setItem(key, JSON.stringify(list));
  } catch (_) {}
};
