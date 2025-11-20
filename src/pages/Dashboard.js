import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDomainReports, calculateDomainScore } from '../utils/localStorage';
// import { db } from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

const styles = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  landingContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: 'clamp(25px, 4vw, 40px)',
    flex: '1',
    width: '100%',
  },
  heroSection: {
    background: 'linear-gradient(135deg, rgba(0, 33, 71, 0.95) 0%, rgba(0, 64, 128, 0.9) 100%)',
    borderRadius: '15px',
    padding: 'clamp(30px, 5vw, 40px)',
    marginBottom: '25px',
    boxShadow: '0 8px 30px rgba(0, 33, 71, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    color: 'white',
    width: '100%',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
  },
  welcomeBadge: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '6px 16px',
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: 500,
    marginBottom: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  heroTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  heroSubtitle: {
    fontSize: '0.95rem',
    opacity: 0.95,
    fontWeight: 300,
    marginBottom: '20px',
  },
  actionSection: {
    background: 'white',
    borderRadius: '15px',
    padding: 'clamp(30px, 5vw, 40px)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    border: '1px solid rgba(0, 33, 71, 0.08)',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  actionSectionTopBorder: {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #f093fb 50%, #4facfe 100%)',
  },
  actionSectionH3: {
    color: '#002147',
    marginBottom: '12px',
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  subtitle: {
    color: '#64748b',
    marginBottom: '25px',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  startAssessmentBtn: {
    background: 'linear-gradient(135deg, #002147 0%, #004080 100%)',
    color: 'white',
    padding: '14px 40px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 33, 71, 0.35)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '0.5px',
    position: 'relative',
    overflow: 'hidden',
  },
  btnIcon: {
    fontSize: '1.2rem',
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState('N/A');

  useEffect(() => {
    const name = searchParams.get('name') || 'User';
    const id = searchParams.get('id') || 'N/A';
    setUserName(name);
    setUserId(id);
    
    localStorage.setItem('selectedUserId', id);
    localStorage.setItem('selectedUserName', name);

    // Logic to calculate and save scores automatically
    if (id && id !== 'N/A') {
      // 1. Get all reports from local storage for the current user
      const reports = getDomainReports(id);

      // 2. Calculate scores for each domain
      const cognitiveScore = calculateDomainScore('cognitive', reports);
      const mentalScore = calculateDomainScore('mental', reports);
      const physicalScore = calculateDomainScore('physical', reports);
      const biomarkerScore = calculateDomainScore('biomarkers', reports);
      
      const scores = { cognitiveScore, mentalScore, physicalScore, biomarkerScore };
      const validScores = Object.values(scores).filter(s => s !== null);

      // 3. Only proceed if there are scores to save
      if (validScores.length > 0) {
        const total = validScores.reduce((sum, score) => sum + score, 0);
        const caiScore = Math.round(total / validScores.length);

        // 4. Prepare the data object for Firebase
        const reportData = {
          userId: id,
          userName: name,
          cognitiveScore,
          mentalScore,
          physicalScore,
          biomarkerScore,
          caiScore,
          assessmentDate: new Date(),
        };

        // 5. Save the new report to the 'reports' collection in Firebase
        const saveReport = async () => {
          try {
            const docRef = await addDoc(collection(db, "reports"), reportData);
            console.log("New assessment report saved to Firebase with ID: ", docRef.id);
          } catch (error) {
            console.error("Error auto-saving report to Firebase: ", error);
          }
        };

        saveReport();
      }
    }
  }, [searchParams]);

  const handleStartAssessment = () => {
    navigate(`/questionnaire?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}`);
  };

  return (
    <div style={styles.appContainer}>
      <Header
        title="PESU AYUSHMAAN - User Dashboard"
        buttons={[
          {
            label: '⬅ Select New User',
            path: '/'
          }
        ]}
      />
      <div style={styles.landingContainer}>
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.welcomeBadge}>User Dashboard</div>
            <h1 style={styles.heroTitle}>Welcome Back</h1>
            <p style={styles.heroSubtitle}>
              Comprehensive health assessment and monitoring system
            </p>
          </div>
        </div>

        <div style={styles.actionSection}>
          <div style={styles.actionSectionTopBorder}></div>
          <h3 style={styles.actionSectionH3}>Ready to Begin Assessment?</h3>
          <p style={styles.subtitle}>
            Access the comprehensive assessment domains to evaluate physical, mental, cognitive health, and biomarkers. Each domain provides detailed insights for a complete health profile.
          </p>
          <button style={styles.startAssessmentBtn} onClick={handleStartAssessment}>
            <span style={styles.btnIcon}>➜</span>
            <span>Start Assessment</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;