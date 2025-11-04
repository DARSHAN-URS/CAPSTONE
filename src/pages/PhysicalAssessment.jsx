import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { saveDomainReport, saveUser } from '../utils/localStorage';
import '../components/DomainAssessment.css';

const PhysicalAssessment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState('N/A');
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const name = searchParams.get('name') || localStorage.getItem('selectedUserName') || 'User';
    const id = searchParams.get('id') || localStorage.getItem('selectedUserId') || 'N/A';
    
    setUserName(name);
    setUserId(id);
    
    localStorage.setItem('selectedUserId', id);
    localStorage.setItem('selectedUserName', name);
  }, [searchParams]);

  const LocomotorQuestions = [
    { code: "HT300", text: "Do you have any health condition that affects your ability to work?" },
    { code: "HT303", text: "Do you have difficulty walking 100 yards?" },
    { code: "HT304", text: "Do you have difficulty sitting for more than 2 hours?" },
    { code: "HT305", text: "Do you have difficulty getting up after sitting for a long time?" },
    { code: "HT306", text: "Do you have difficulty climbing a flight of stairs in one go?" },
    { code: "HT307", text: "Do you have difficulty stooping, kneeling, or crouching?" },
    { code: "HT308", text: "Do you have difficulty extending your arms above shoulder level?" },
  ];

  const AverageDailyLifeQuestions = [
    { code: "HT309", text: "Do you have difficulty in dressing?" },
    { code: "HT310", text: "Do you have difficulty in bathing?" },
    { code: "HT311", text: "Do you have difficulty in eating?" },
    { code: "HT312", text: "Do you have difficulty in getting out of bed??" },
    { code: "HT313", text: "Do you have difficulty in using the toilet?"},
    { code: "HT314", text: "Do you have difficulty in preparing a hot meal?" },
    { code: "HT315", text: "Do you have difficulty in taking medications?" },
  ];

  const handleChange = (code, value) => {
    setResponses({ ...responses, [code]: value });
  };

  const handleSubmit = () => {
    saveDomainReport(userId, 'physical', responses);
    saveUser(userId, userName);
    
    const queryString = `?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}&role=user`;
    navigate(`/questionnaire${queryString}`);
  };

  const handleBack = () => {
    const queryString = `?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}&role=user`;
    navigate(`/questionnaire${queryString}`);
  };

  const queryString = `?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}&role=user`;

  return (
    <div className="app-container">
      <Header
        title="PESU AYUSHMAAN - Physical Assessment"
        buttons={[
          {
            label: '⬅ Back to Hub',
            onClick: handleBack
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
                <div className="assessment-header-badge">Physical Assessment - Self-Assessment</div>
                <h2>Physical Domain</h2>
                <p>Complete the assessment below</p>
              </div>
            </div>
            <form className="assessment-form" id="physical-form" onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
              <div className="questions-section">
                <div className="question-item">
                  <label>Locomotor Capacity Assessment</label>
                </div>
                {LocomotorQuestions.map((q) => (
                  <div key={q.code} className="question-item">
                    <label>{q.text}</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={q.code}
                          value="Yes"
                          onChange={() => handleChange(q.code, 'Yes')}
                          checked={responses[q.code] === 'Yes'}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={q.code}
                          value="No"
                          onChange={() => handleChange(q.code, 'No')}
                          checked={responses[q.code] === 'No'}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                ))}

                <div className="question-item" style={{ marginTop: '10px' }}>
                  <label>Mobility & Functional Assessment</label>
                </div>
                {AverageDailyLifeQuestions.map((q) => (
                  <div key={q.code} className="question-item">
                    <label>{q.text}</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={q.code}
                          value="Yes"
                          onChange={() => handleChange(q.code, 'Yes')}
                          checked={responses[q.code] === 'Yes'}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={q.code}
                          value="No"
                          onChange={() => handleChange(q.code, 'No')}
                          checked={responses[q.code] === 'No'}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleBack}>Cancel</button>
                <button type="submit" className="btn-primary">Save Assessment</button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PhysicalAssessment;
