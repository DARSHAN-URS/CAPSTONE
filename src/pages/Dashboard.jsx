import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Dashboard.css';

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
  }, [searchParams]);

  const handleStartAssessment = () => {
    navigate(`/questionnaire?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}`);
  };

  return (
    <div className="app-container">
      <Header
        title="PESU AYUSHMAAN - User Dashboard"
        buttons={[
          {
            label: '⬅ Select New User',
            path: '/'
          }
        ]}
      />
      <div className="landing-container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="welcome-badge">User Dashboard</div>
            <h1 className="hero-title">Welcome Back</h1>
            <p className="hero-subtitle">
              Comprehensive health assessment and monitoring system
            </p>
          </div>
        </div>

        <div className="action-section">
          <h3>Ready to Begin Assessment?</h3>
          <p className="subtitle">
            Access the comprehensive assessment domains to evaluate physical, mental, cognitive health, and biomarkers. Each domain provides detailed insights for a complete health profile.
          </p>
          <button className="start-assessment-btn" onClick={handleStartAssessment}>
            <span className="btn-icon">➜</span>
            <span>Start Assessment</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

