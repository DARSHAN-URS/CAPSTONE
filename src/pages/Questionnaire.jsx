import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Questionnaire.css';

const Questionnaire = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState('N/A');
  const [selectedRole, setSelectedRole] = useState(null); // 'user' | 'assistant'

  useEffect(() => {
    const name = searchParams.get('name') || localStorage.getItem('selectedUserName') || 'User';
    const id = searchParams.get('id') || localStorage.getItem('selectedUserId') || 'N/A';
    const role = searchParams.get('role');
    setUserName(name);
    setUserId(id);
    if (role === 'user' || role === 'assistant') {
      setSelectedRole(role);
    }
    
    localStorage.setItem('selectedUserId', id);
    localStorage.setItem('selectedUserName', name);
  }, [searchParams]);

  const handleDomainClick = (domain) => {
    navigate(`/${domain}?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}`);
  };

  const handleSubmitAssessment = () => {
    navigate(`/reports?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}`);
  };

  return (
    <div className="app-container">
      <Header
        title="PESU AYUSHMAAN - Assessment"
        buttons={[
          {
            label: '⬅ Back to Dashboard',
            path: `/dashboard?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}`
          }
        ]}
      />
      <div className="page-wrapper">
        <aside className="left-badge">
          <h2>Active User</h2>
          <div className="user-badge-content">
            <div className="user-badge-item">
              <div className="user-badge-icon">👤</div>
              <div className="user-badge-info">
                <h4>{userName}</h4>
                <p>ID: {userId}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="assessment-container">
            <div className="assessment-header">
              <div className="assessment-header-content">
                <div className="assessment-header-badge">Assessment Hub</div>
                <h2>Comprehensive Assessment</h2>
                <p>Select a role to begin. You will then choose from the available domains.</p>
              </div>
            </div>

            <div className="selection-section" style={{ marginBottom: '20px' }}>
              <div className="button-selection">
                <button
                  className={`selection-btn user-btn${selectedRole === 'user' ? ' active' : ''}`}
                  onClick={() => setSelectedRole('user')}
                >
                  <span className="selection-icon">👤</span>
                  <span>User</span>
                </button>
                <button
                  className={`selection-btn assistant-btn${selectedRole === 'assistant' ? ' active' : ''}`}
                  onClick={() => setSelectedRole('assistant')}
                >
                  <span className="selection-icon">👨‍⚕️</span>
                  <span>Lab Assistant</span>
                </button>
              </div>
            </div>

            <div className="categories-section">
              <h3>Assessment Domains</h3>
              {!selectedRole ? (
                <p style={{ color: '#64748b' }}>Please choose a role above to view available domains.</p>
              ) : (
                <div className="categories-grid">
                  {(selectedRole === 'user') && (
                    <>
                      <div
                        className="category-card physical"
                        onClick={() => handleDomainClick('physical')}
                      >
                        <span className="category-card-icon">💪</span>
                        <h4>Physical</h4>
                        <p>Physical health and wellness</p>
                      </div>
                      <div
                        className="category-card mental"
                        onClick={() => handleDomainClick('mental')}
                      >
                        <span className="category-card-icon">🧠</span>
                        <h4>Mental</h4>
                        <p>Mental health and wellness</p>
                      </div>
                    </>
                  )}
                  {(selectedRole === 'assistant') && (
                    <>
                      <div
                        className="category-card cognitive"
                        onClick={() => handleDomainClick('cognitive')}
                      >
                        <span className="category-card-icon">🧩</span>
                        <h4>Cognitive</h4>
                        <p>Cognitive function and abilities</p>
                      </div>
                      <div
                        className="category-card biomarkers"
                        onClick={() => handleDomainClick('biomarkers')}
                      >
                        <span className="category-card-icon">🔬</span>
                        <h4>Biomarkers</h4>
                        <p>Biological markers and metrics</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="submit-assessment-section">
              <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#002147', fontSize: '1.3rem' }}>
                Ready to View Your Results?
              </h3>
              <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '0.95rem' }}>
                Complete your domain assessments and submit to view your comprehensive health report with scores and personalized recommendations.
              </p>
              <button className="submit-assessment-btn" onClick={handleSubmitAssessment}>
                <span>📊</span>
                <span>Submit Assessment</span>
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Questionnaire;

