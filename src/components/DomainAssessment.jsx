import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { saveDomainReport, saveUser } from '../utils/localStorage';
import './DomainAssessment.css';

const DomainAssessment = ({ domainName, domainTitle, questions = [], subdomains = [], skipTypeSelection = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState('N/A');
  const [assessmentType, setAssessmentType] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const name = searchParams.get('name') || localStorage.getItem('selectedUserName') || 'User';
    const id = searchParams.get('id') || localStorage.getItem('selectedUserId') || 'N/A';
    const type = searchParams.get('type');
    
    setUserName(name);
    setUserId(id);
    setAssessmentType(type || (skipTypeSelection ? 'user' : null));
    
    localStorage.setItem('selectedUserId', id);
    localStorage.setItem('selectedUserName', name);
  }, [searchParams]);

  const handleTypeSelection = (type) => {
    navigate(`/${domainName}?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}&type=${type}`);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    saveDomainReport(userId, domainName, answers);
    saveUser(userId, userName);
    
    const role = (domainName === 'physical' || domainName === 'mental') ? 'user' : 'assistant';
    const queryString = `?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}&role=${role}`;
    navigate(`/questionnaire${queryString}`);
  };

  const handleBack = () => {
    const role = (domainName === 'physical' || domainName === 'mental') ? 'user' : 'assistant';
    const queryString = `?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}&role=${role}`;
    navigate(`/questionnaire${queryString}`);
  };

  const roleForHeader = (domainName === 'physical' || domainName === 'mental') ? 'user' : 'assistant';
  const queryString = `?name=${encodeURIComponent(userName)}&id=${encodeURIComponent(userId)}&role=${roleForHeader}`;

  if (!assessmentType && !skipTypeSelection) {
    return (
      <div className="app-container">
        <Header
          title={`PESU AYUSHMAAN - ${domainTitle}`}
          buttons={[
            {
              label: '⬅ Back to Hub',
              path: `/questionnaire${queryString}`
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
                  <div className="assessment-header-badge">{domainTitle} Assessment</div>
                  <h2>{domainTitle} Domain</h2>
                  <p>Choose assessment mode</p>
                </div>
              </div>

              <div className="selection-section">
                <div className="button-selection">
                  <button
                    className="selection-btn user-btn"
                    onClick={() => handleTypeSelection('user')}
                  >
                    <span className="selection-icon">👤</span>
                    <span>User Self-Assessment</span>
                  </button>
                  <button
                    className="selection-btn assistant-btn"
                    onClick={() => handleTypeSelection('assistant')}
                  >
                    <span className="selection-icon">👨‍⚕️</span>
                    <span>Assistant-Assisted</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header
        title={`PESU AYUSHMAAN - ${domainTitle}`}
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
                <div className="assessment-header-badge">{domainTitle} Assessment - {assessmentType === 'user' ? 'Self-Assessment' : 'Assistant-Assisted'}</div>
                <h2>{domainTitle} Domain</h2>
                <p>Complete the assessment below</p>
              </div>
            </div>

            <form className="assessment-form" id="domain-form" onSubmit={handleSubmit}>
              <div className="questions-section">
                {subdomains.length > 0 ? (
                  subdomains.map((section, sIdx) => (
                    <div key={`section_${sIdx}`} className="subsection">
                      <h3 className="subsection-title">{section.title}</h3>
                      {(!section.items || section.items.length === 0) ? (
                        (() => {
                          const code = section.code;
                          const text = section.text || section.questionText || section.title;
                          const options = section.options || [];
                          const inputType = section.inputType || (options.length > 0 ? 'radio' : 'text');
                          const keyId = code || `section_${sIdx}`;
                          const answerKey = code ? code : `section_${sIdx}`;
                          return (
                            <div className="question-item">
                              <label htmlFor={`sec_${keyId}`}>
                                {code ? `${code} — ` : ''}{text}
                              </label>
                              {inputType === 'radio' && options.length > 0 ? (
                                <div className="radio-group">
                                  {options.map((opt, idx) => {
                                    const optLabel = typeof opt === 'string' ? opt : (opt.label || String(opt.value))
                                    const optValue = typeof opt === 'string' ? opt : (opt.value ?? opt.label)
                                    return (
                                      <label key={`${keyId}_opt_${idx}`} className="radio-label">
                                        <input
                                          type="radio"
                                          name={answerKey}
                                          value={optValue}
                                          checked={answers[answerKey] === String(optValue)}
                                          onChange={() => handleAnswerChange(answerKey, String(optValue))}
                                        />
                                        <span>{optLabel}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              ) : (
                                <textarea
                                  id={`sec_${keyId}`}
                                  name={answerKey}
                                  rows="3"
                                  placeholder="Enter your response..."
                                  value={answers[answerKey] || ''}
                                  onChange={(e) => handleAnswerChange(answerKey, e.target.value)}
                                />
                              )}
                            </div>
                          );
                        })()
                      ) : (
                      (section.items || []).map((item, qIdx) => {
                        const isObject = typeof item === 'object' && item !== null;
                        const code = isObject ? item.code : undefined;
                        const text = isObject ? item.text : item;
                        const options = isObject ? (item.options || []) : [];
                        const inputType = isObject ? (item.inputType || (options.length > 0 ? 'radio' : 'text')) : 'text';
                        const keyId = code || `${sIdx}_${qIdx}`;
                        const answerKey = code ? code : `question_${sIdx}_${qIdx}`;
                        return (
                          <div key={`q_${keyId}`} className="question-item">
                            <label htmlFor={`q_${keyId}`}>
                              {code ? `${code} — ` : ''}{text}
                            </label>
                            {inputType === 'radio' && options.length > 0 ? (
                              <div className="radio-group">
                                {options.map((opt, idx) => {
                                  const optLabel = typeof opt === 'string' ? opt : (opt.label || String(opt.value))
                                  const optValue = typeof opt === 'string' ? opt : (opt.value ?? opt.label)
                                  return (
                                    <label key={`${keyId}_opt_${idx}`} className="radio-label">
                                      <input
                                        type="radio"
                                        name={answerKey}
                                        value={optValue}
                                        checked={answers[answerKey] === String(optValue)}
                                        onChange={(e) => handleAnswerChange(answerKey, String(optValue))}
                                      />
                                      <span>{optLabel}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            ) : (
                              <textarea
                                id={`q_${keyId}`}
                                name={answerKey}
                                rows="3"
                                placeholder="Enter your response..."
                                value={answers[answerKey] || ''}
                                onChange={(e) => handleAnswerChange(answerKey, e.target.value)}
                              />
                            )}
                          </div>
                        );
                      }))}
                    </div>
                  ))
                ) : (
                  <>
                    {questions.length > 0 ? (
                      questions.map((question, index) => (
                        <div key={index} className="question-item">
                          <label htmlFor={`q${index}`}>
                            {index + 1}. {question}
                          </label>
                          <textarea
                            id={`q${index}`}
                            name={`question_${index}`}
                            rows="3"
                            placeholder="Enter your response..."
                            value={answers[`question_${index}`] || ''}
                            onChange={(e) => handleAnswerChange(`question_${index}`, e.target.value)}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="question-item">
                        <label>Assessment questions will be displayed here</label>
                        <textarea rows="3" placeholder="Enter your assessment notes..." />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleBack}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Assessment
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DomainAssessment;

