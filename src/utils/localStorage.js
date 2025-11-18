import { subdomains as cognitiveQuestions } from '../data/cognitiveQuestions';
import { subdomains as mentalQuestions } from '../data/mentalQuestions';
import { subdomains as physicalQuestions } from '../data/physicalQuestions';
// Assuming biomarkersQuestions.js will be created. If not, it will be handled.
// import { subdomains as biomarkersQuestions } from '../data/biomarkersQuestions';

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
    // case 'biomarkers':
    //   questionData = biomarkersQuestions;
    //   break;
    default:
      return [];
  }
  // Flatten the subdomains into a single list of questions
  return questionData.flatMap(subdomain => subdomain.items || []);
};

export const calculateDomainScore = (domain, reports) => {
  const domainReport = reports
    .filter(r => r.domain === domain)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  if (!domainReport || !domainReport.answers) {
    return null; // No report or no answers, so no score
  }

  const userAnswers = domainReport.answers;

  // --- START: New Cognitive Scoring Logic ---
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
    return Math.round(totalWeightedScore * 100);
  }
  // --- END: New Cognitive Scoring Logic ---
  const questions = getQuestionsForDomain(domain);
  let totalScore = 0;

  // --- START: Special exception for Mental Health scoring ---
  const mentalWellbeingCodes = ['mh201', 'mh202', 'mh204', 'mh205', 'mh208', 'mh209', 'mh210', 'mh206', 'mh207'];
  const mh201Answer = userAnswers['mh201'];
  const isMentalHealthSkip = domain === 'mental' && mh201Answer?.toLowerCase() === 'no';

  if (isMentalHealthSkip) {
    // Find all questions related to mental well-being
    const mentalWellbeingQuestions = questions.filter(q => mentalWellbeingCodes.includes(q.code));
    // Add the sum of their weights directly to the score
    const bonusScore = mentalWellbeingQuestions.reduce((sum, q) => sum + (q.weight || 0), 0);
    totalScore += bonusScore;
  }
  // --- END: Special exception ---

  // Loop through every question for the domain
  for (const question of questions) {
    // If the mental health exception was applied, skip those questions in the loop
    if (isMentalHealthSkip && mentalWellbeingCodes.includes(question.code)) {
      continue;
    }

    // Ensure the question has a code, benchmark, and weight to be scored
    if (!question.code || question.benchmark === undefined || question.weight === undefined) {
      continue;
    }

    const userAnswer = userAnswers[question.code];
    let questionScore = 0; // Default score is 0 (incorrect)

    // Check if user provided a valid answer
    if (userAnswer !== undefined && userAnswer !== null && userAnswer !== '') {
      // For numeric benchmarks (e.g., benchmark: 8)
      if (typeof question.benchmark === 'number') {
        const numericAnswer = parseFloat(userAnswer);
        if (!isNaN(numericAnswer) && numericAnswer >= question.benchmark) {
          questionScore = 1; // Score is 1 if answer is >= benchmark
        }
      }
      // For string benchmarks (e.g., benchmark: 'No')
      else if (typeof question.benchmark === 'string') {
        if (String(userAnswer).trim().toLowerCase() === question.benchmark.trim().toLowerCase()) {
          questionScore = 1; // Score is 1 if answer matches benchmark
        }
      }
    }

    // Add the weighted score for this question to the total
    totalScore += questionScore * question.weight;
  }

  return Math.round(totalScore);
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