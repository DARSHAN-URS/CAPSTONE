import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { findUserById, getDomainReports, calculateDomainScore, generateSuggestions } from '../utils/localStorage';
import './Reports.css';

const Reports = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState('N/A');
  const [scores, setScores] = useState({
    physical: 0,
    mental: 0,
    cognitive: 0,
    biomarkers: 0
  });
  const [overallScore, setOverallScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const id = searchParams.get('id') || localStorage.getItem('selectedUserId');
    const name = searchParams.get('name') || localStorage.getItem('selectedUserName') || 'User';

    if (!id) {
      return;
    }

    setUserId(id);
    setUserName(name);
    localStorage.setItem('selectedUserId', id);
    localStorage.setItem('selectedUserName', name);

    const user = findUserById(id);
    if (!user) {
      setUserName(name);
    } else {
      setUserName(user.name || name);
    }

    const domainReports = getDomainReports(id);
    const calculatedScores = {
      physical: calculateDomainScore('physical', domainReports) || 0,
      mental: calculateDomainScore('mental', domainReports) || 0,
      cognitive: calculateDomainScore('cognitive', domainReports) || 0,
      biomarkers: calculateDomainScore('biomarkers', domainReports) || 0
    };

    setScores(calculatedScores);

    const domainCount = Object.values(calculatedScores).filter(s => s > 0).length;
    const overall = domainCount > 0
      ? Math.round(Object.values(calculatedScores).reduce((a, b) => a + b, 0) / domainCount)
      : 0;
    setOverallScore(overall);

    const generatedSuggestions = generateSuggestions(calculatedScores);
    setSuggestions(generatedSuggestions);
  }, [searchParams]);

  const queryString = `?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}`;

  return (
    <div className="app-container">
      <Header
        title="Assessment Reports"
        buttons={[
          {
            label: '📊 Dashboard',
            path: `/dashboard${queryString}`
          },
          {
            label: '⬅ Back to Hub',
            path: `/questionnaire${queryString}`
          }
        ]}
      />
      <div className="reports-container">
        <div className="report-section">
          <h2>User Information</h2>
          <div className="user-info-grid">
            <div className="info-item">
              <div className="label">Name</div>
              <div className="value">{userName}</div>
            </div>
            <div className="info-item">
              <div className="label">User ID</div>
              <div className="value">{userId}</div>
            </div>
          </div>
        </div>

        <div className="report-section">
          <div className="overall-score">
            <h2>Overall Health Score</h2>
            <div className="overall-score-value">{overallScore}</div>
            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>out of 100</div>
          </div>
        </div>

        <div className="report-section">
          <h2>Domain Scores</h2>
          <div className="domain-scores">
            <div className="domain-score-card physical">
              <h3>Physical</h3>
              <div className="domain-score-value">{scores.physical > 0 ? scores.physical : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {scores.physical > 0 ? '/100' : 'Not assessed'}
              </div>
            </div>
            <div className="domain-score-card mental">
              <h3>Mental</h3>
              <div className="domain-score-value">{scores.mental > 0 ? scores.mental : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {scores.mental > 0 ? '/100' : 'Not assessed'}
              </div>
            </div>
            <div className="domain-score-card cognitive">
              <h3>Cognitive</h3>
              <div className="domain-score-value">{scores.cognitive > 0 ? scores.cognitive : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {scores.cognitive > 0 ? '/100' : 'Not assessed'}
              </div>
            </div>
            <div className="domain-score-card biomarkers">
              <h3>Biomarkers</h3>
              <div className="domain-score-value">{scores.biomarkers > 0 ? scores.biomarkers : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {scores.biomarkers > 0 ? '/100' : 'Not assessed'}
              </div>
            </div>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="report-section">
            <h2>Personalized Recommendations for Healthy Aging</h2>
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reports;

