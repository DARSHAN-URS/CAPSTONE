import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { findUserById, getDomainReports, calculateDomainScore, generateSuggestions } from '../utils/localStorage';
// We no longer import the CSS file
// import './Reports.css';

const styles = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  reportsContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: 'clamp(20px, 4vw, 40px)',
    flex: '1',
    width: '100%',
  },
  reportSection: {
    background: 'white',
    borderRadius: '15px',
    padding: 'clamp(25px, 4vw, 35px)',
    marginBottom: '25px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 33, 71, 0.08)',
    width: '100%',
  },
  reportSectionH2: {
    marginTop: 0,
    color: '#002147',
    fontSize: '1.5rem',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f0f4f8',
  },
  domainScores: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  domainScoreCard: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #e9ecef',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    // :hover effects are not directly supported in inline styles.
    // For a similar effect, you could use state listeners (onMouseEnter/onMouseLeave).
  },
  physical: { borderLeft: '4px solid #667eea' },
  mental: { borderLeft: '4px solid #f093fb' },
  cognitive: { borderLeft: '4px solid #4facfe' },
  biomarkers: { borderLeft: '4px solid #43e97b' },
  domainScoreCardH3: {
    margin: '0 0 10px',
    fontSize: '0.9rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  domainScoreValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#002147',
    margin: '10px 0',
  },
  overallScore: {
    textAlign: 'center',
    padding: '30px',
    background: 'linear-gradient(135deg, rgba(0, 33, 71, 0.95) 0%, rgba(0, 64, 128, 0.9) 100%)',
    borderRadius: '15px',
    color: 'white',
    marginBottom: '30px',
  },
  overallScoreH2: {
    marginTop: 0,
    fontSize: '1.2rem',
    opacity: 0.9,
    border: 'none',
    padding: 0,
    marginBottom: '15px',
  },
  overallScoreValue: {
    fontSize: '4rem',
    fontWeight: '700',
    margin: '15px 0',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  suggestionsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  suggestionItem: {
    padding: '15px',
    marginBottom: '10px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    borderRadius: '10px',
    borderLeft: '4px solid #43e97b',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  suggestionIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  userInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginTop: '15px',
  },
  infoItem: {
    padding: '12px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
  },
  infoItemLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '5px',
  },
  infoItemValue: {
    fontSize: '1rem',
    color: '#002147',
    fontWeight: '600',
  },
};


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
    <div style={styles.appContainer}>
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
      <div style={styles.reportsContainer}>
        <div style={styles.reportSection}>
          <h2 style={styles.reportSectionH2}>User Information</h2>
          <div style={styles.userInfoGrid}>
            <div style={styles.infoItem}>
              <div style={styles.infoItemLabel}>Name</div>
              <div style={styles.infoItemValue}>{userName}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoItemLabel}>User ID</div>
              <div style={styles.infoItemValue}>{userId}</div>
            </div>
          </div>
        </div>

        <div style={styles.reportSection}>
          <div style={styles.overallScore}>
            <h2 style={styles.overallScoreH2}>Overall Health Score</h2>
            <div style={styles.overallScoreValue}>{overallScore}</div>
            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>out of 100</div>
          </div>
        </div>

        <div style={styles.reportSection}>
          <h2 style={styles.reportSectionH2}>Domain Scores</h2>
          <div style={styles.domainScores}>
            <div style={{ ...styles.domainScoreCard, ...styles.physical }}>
              <h3 style={styles.domainScoreCardH3}>Physical</h3>
              <div style={styles.domainScoreValue}>{scores.physical > 0 ? scores.physical : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {scores.physical > 0 ? '/100' : 'Not assessed'}
              </div>
            </div>
            <div style={{ ...styles.domainScoreCard, ...styles.mental }}>
              <h3 style={styles.domainScoreCardH3}>Mental</h3>
              <div style={styles.domainScoreValue}>{scores.mental > 0 ? scores.mental : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {scores.mental > 0 ? '/100' : 'Not assessed'}
              </div>
            </div>
            <div style={{ ...styles.domainScoreCard, ...styles.cognitive }}>
              <h3 style={styles.domainScoreCardH3}>Cognitive</h3>
              <div style={styles.domainScoreValue}>{scores.cognitive > 0 ? scores.cognitive : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {scores.cognitive > 0 ? '/100' : 'Not assessed'}
              </div>
            </div>
            <div style={{ ...styles.domainScoreCard, ...styles.biomarkers }}>
              <h3 style={styles.domainScoreCardH3}>Biomarkers</h3>
              <div style={styles.domainScoreValue}>{scores.biomarkers > 0 ? scores.biomarkers : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {scores.biomarkers > 0 ? '/100' : 'Not assessed'}
              </div>
            </div>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div style={styles.reportSection}>
            <h2 style={styles.reportSectionH2}>Personalized Recommendations for Healthy Aging</h2>
            <ul style={styles.suggestionsList}>
              {suggestions.map((suggestion, index) => (
                <li key={index} style={styles.suggestionItem}>
                  <span style={styles.suggestionIcon}>💡</span>
                  <span>{suggestion}</span>
                </li>
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