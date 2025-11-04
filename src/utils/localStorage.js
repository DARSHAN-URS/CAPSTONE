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

export const calculateDomainScore = (domain, reports) => {
  const domainReport = reports
    .filter(r => r.domain === domain)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
  if (!domainReport) return null;
  
  let score = Math.floor(Math.random() * 20) + 70;
  
  if (domainReport.answers) {
    const answerCount = Object.keys(domainReport.answers).length;
    if (answerCount > 0) {
      score = Math.min(95, 70 + Math.floor(answerCount * 2));
    }
  }
  
  return score;
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

