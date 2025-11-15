import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import './Questionnaire.css'; // This is no longer needed

const styles = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  pageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '28px',
    padding: 'clamp(20px, 4vw, 40px)',
    flex: '1',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'flex-start',
  },
  leftBadge: {
    position: 'sticky',
    top: '20px',
    width: '280px',
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5eaf0',
  },
  leftBadgeH2: {
    fontSize: '1.1rem',
    color: '#002147',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f0f4f8',
  },
  userBadgeContent: {},
  userBadgeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userBadgeIcon: {
    fontSize: '2rem',
    color: '#004080',
  },
  userBadgeInfo: {},
  userBadgeInfoH4: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 600,
    color: '#333',
  },
  userBadgeInfoP: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#64748b',
  },
  mainContent: {
    flex: 1,
    minWidth: 0,
  },
  assessmentContainer: {
    background: '#fff',
    borderRadius: '12px',
    padding: 'clamp(24px, 5vw, 32px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5eaf0',
  },
  assessmentHeader: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)',
    marginBottom: '30px',
    position: 'relative',
  },
  assessmentHeaderContent: {},
  assessmentHeaderBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #002147 0%, #004080 100%)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  assessmentHeaderH2: {
    margin: 0,
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    color: '#002147',
  },
  assessmentHeaderP: {
    margin: '5px 0 0',
    color: '#64748b',
    fontSize: '0.95rem',
  },
  selectionSection: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  buttonSelection: {
    display: 'inline-flex',
    background: '#f0f4f8',
    borderRadius: '10px',
    padding: '5px',
  },
  selectionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  selectionBtnActive: {
    background: '#fff',
    color: '#002147',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  selectionIcon: {
    fontSize: '1.2rem',
  },
  categoriesSection: {
    marginBottom: '30px',
  },
  categoriesSectionH3: {
    fontSize: '1.3rem',
    color: '#002147',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f0f4f8',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  categoryCard: {
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    border: '1px solid #e5eaf0',
    background: '#fdfdff',
  },
  physical: { borderTop: '4px solid #667eea' },
  mental: { borderTop: '4px solid #f093fb' },
  cognitive: { borderTop: '4px solid #4facfe' },
  biomarkers: { borderTop: '4px solid #43e97b' },
  categoryCardIcon: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '10px',
  },
  categoryCardH4: {
    margin: '0 0 5px',
    fontSize: '1.1rem',
    color: '#002147',
  },
  categoryCardP: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#64748b',
  },
  submitAssessmentSection: {
    marginTop: '40px',
    paddingTop: '30px',
    borderTop: '2px solid #f0f4f8',
    textAlign: 'center',
  },
  submitAssessmentBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
  },
};

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
    <div style={styles.appContainer}>
      <Header
        title="PESU AYUSHMAAN - Assessment"
        buttons={[
          {
            label: '⬅ Back to Dashboard',
            path: `/dashboard?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}`
          }
        ]}
      />
      <div style={styles.pageWrapper}>
        <aside style={styles.leftBadge}>
          <h2 style={styles.leftBadgeH2}>Active User</h2>
          <div style={styles.userBadgeContent}>
            <div style={styles.userBadgeItem}>
              <div style={styles.userBadgeIcon}>👤</div>
              <div style={styles.userBadgeInfo}>
                <h4 style={styles.userBadgeInfoH4}>{userName}</h4>
                <p style={styles.userBadgeInfoP}>ID: {userId}</p>
              </div>
            </div>
          </div>
        </aside>

        <main style={styles.mainContent}>
          <div style={styles.assessmentContainer}>
            <div style={styles.assessmentHeader}>
              <div style={styles.assessmentHeaderContent}>
                <div style={styles.assessmentHeaderBadge}>Assessment Hub</div>
                <h2 style={styles.assessmentHeaderH2}>Comprehensive Assessment</h2>
                <p style={styles.assessmentHeaderP}>Select a role to begin. You will then choose from the available domains.</p>
              </div>
            </div>

            <div style={styles.selectionSection}>
              <div style={styles.buttonSelection}>
                <button
                  style={selectedRole === 'user' ? {...styles.selectionBtn, ...styles.selectionBtnActive} : styles.selectionBtn}
                  onClick={() => setSelectedRole('user')}
                >
                  <span style={styles.selectionIcon}>👤</span>
                  <span>User</span>
                </button>
                <button
                  style={selectedRole === 'assistant' ? {...styles.selectionBtn, ...styles.selectionBtnActive} : styles.selectionBtn}
                  onClick={() => setSelectedRole('assistant')}
                >
                  <span style={styles.selectionIcon}>👨‍⚕️</span>
                  <span>Lab Assistant</span>
                </button>
              </div>
            </div>

            <div style={styles.categoriesSection}>
              <h3 style={styles.categoriesSectionH3}>Assessment Domains</h3>
              {!selectedRole ? (
                <p style={{ color: '#64748b' }}>Please choose a role above to view available domains.</p>
              ) : (
                <div style={styles.categoriesGrid}>
                  {(selectedRole === 'user') && (
                    <>
                      <div
                        style={{...styles.categoryCard, ...styles.physical}}
                        onClick={() => handleDomainClick('physical')}
                      >
                        <span style={styles.categoryCardIcon}>💪</span>
                        <h4 style={styles.categoryCardH4}>Physical</h4>
                        <p style={styles.categoryCardP}>Physical health and wellness</p>
                      </div>
                      <div
                        style={{...styles.categoryCard, ...styles.mental}}
                        onClick={() => handleDomainClick('mental')}
                      >
                        <span style={styles.categoryCardIcon}>🧠</span>
                        <h4 style={styles.categoryCardH4}>Mental</h4>
                        <p style={styles.categoryCardP}>Mental health and wellness</p>
                      </div>
                    </>
                  )}
                  {(selectedRole === 'assistant') && (
                    <>
                      <div
                        style={{...styles.categoryCard, ...styles.cognitive}}
                        onClick={() => handleDomainClick('cognitive')}
                      >
                        <span style={styles.categoryCardIcon}>🧩</span>
                        <h4 style={styles.categoryCardH4}>Cognitive</h4>
                        <p style={styles.categoryCardP}>Cognitive function and abilities</p>
                      </div>
                      <div
                        style={{...styles.categoryCard, ...styles.biomarkers}}
                        onClick={() => handleDomainClick('biomarkers')}
                      >
                        <span style={styles.categoryCardIcon}>🔬</span>
                        <h4 style={styles.categoryCardH4}>Biomarkers</h4>
                        <p style={styles.categoryCardP}>Biological markers and metrics</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div style={styles.submitAssessmentSection}>
              <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#002147', fontSize: '1.3rem' }}>
                Ready to View Your Results?
              </h3>
              <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '0.95rem' }}>
                Complete your domain assessments and submit to view your comprehensive health report with scores and personalized recommendations.
              </p>
              <button style={styles.submitAssessmentBtn} onClick={handleSubmitAssessment}>
                <span style={{marginRight: '8px'}}>📊</span>
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