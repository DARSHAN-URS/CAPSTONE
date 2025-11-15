import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { saveDomainReport, saveUser } from '../utils/localStorage';


export const styles = {
  radioInput: { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#002147', margin: 0 },
  subsection: { marginBottom: '24px' },
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
    gap: 'clamp(20px, 3vw, 30px)',
    alignItems: 'flex-start',
    padding: 'clamp(20px, 4vw, 30px)',
    maxWidth: '1400px',
    margin: '0 auto',
    flex: '1',
    width: '100%',
  },
  leftBadge: {
    width: '280px',
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 33, 71, 0.08)',
    position: 'sticky',
    top: '100px',
    height: 'fit-content',
  },
  leftBadgeH2: {
    marginBottom: '15px',
    fontSize: '1rem',
    color: '#002147',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    paddingBottom: '12px',
    borderBottom: '2px solid #f0f4f8',
  },
  userBadgeContent: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    padding: '18px',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
  },
  userBadgeItem: { display: 'flex', alignItems: 'center', gap: '12px' },
  userBadgeIcon: {
    width: '45px',
    height: '45px',
    background: 'linear-gradient(135deg, #002147 0%, #004080 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    flexShrink: 0,
    color: 'white',
  },
  userBadgeInfoH4: { margin: 0, fontSize: '1rem', color: '#002147', fontWeight: 600 },
  userBadgeInfoP: { margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' },
  mainContent: { flex: 1, display: 'flex', justifyContent: 'center' },
  assessmentContainer: { maxWidth: '1000px', width: '100%' },
  assessmentHeader: {
    background: 'linear-gradient(135deg, rgba(0, 33, 71, 0.95) 0%, rgba(0, 64, 128, 0.9) 100%)',
    borderRadius: '15px',
    padding: 'clamp(30px, 5vw, 40px)',
    marginBottom: '30px',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 8px 30px rgba(0, 33, 71, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  assessmentHeaderContent: { position: 'relative', zIndex: 1 },
  assessmentHeaderBadge: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '6px 16px',
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: 500,
    marginBottom: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  assessmentHeaderH2: { fontSize: '2.2rem', fontWeight: 700, margin: '0 0 12px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' },
  assessmentHeaderP: { fontSize: '1rem', opacity: 0.95, margin: 0, fontWeight: 300 },
  selectionSection: {
    padding: 'clamp(25px, 4vw, 35px)',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 33, 71, 0.08)',
    width: '100%',
  },
  buttonSelection: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', maxWidth: '600px', margin: '0 auto' },
  selectionBtn: {
    padding: '30px 20px',
    borderRadius: '15px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none',
    color: 'white',
  },
  userBtn: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  assistantBtn: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  selectionIcon: { fontSize: '3rem' },
  assessmentForm: {
    background: 'white',
    borderRadius: '15px',
    padding: 'clamp(25px, 4vw, 35px)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 33, 71, 0.08)',
    width: '100%',
  },
  questionsSection: { marginBottom: '30px' },
  questionItem: {
    marginBottom: '18px',
    padding: '16px',
    background: '#ffffff',
    border: '1px solid #e8edf3',
    borderRadius: '10px',
    transition: 'opacity 0.3s ease',
  },
  questionItemLabel: { display: 'block', marginBottom: '10px', fontWeight: 600, color: '#002147', fontSize: '1rem' },
  questionItemTextarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '80px',
  },
  radioGroup: { display: 'flex', gap: '24px', marginTop: '8px', flexWrap: 'wrap' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', color: '#334155' },
  radioInput: { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#002147', margin: 0 },
  subsection: { marginBottom: '24px' },
  subsectionTitle: { margin: '0 0 12px', fontWeight: 700, color: '#0f2a47', fontSize: '1.05rem', paddingBottom: '8px', borderBottom: '2px solid #f0f4f8' },
  formActions: { display: 'flex', gap: '15px', justifyContent: 'flex-end', paddingTop: '25px', borderTop: '2px solid #f0f4f8' },
  btnPrimary: {
    background: 'linear-gradient(135deg, #002147 0%, #004080 100%)',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  btnSecondary: {
    background: '#f8f9fa',
    color: '#002147',
    padding: '12px 30px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
};


const DomainAssessment = ({ domainName, domainTitle, questions = [], subdomains = [], skipTypeSelection = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState('N/A');
  const [assessmentType, setAssessmentType] = useState(null);
  const [answers, setAnswers] = useState({});

  const mentalWellbeingFollowUpCodes = [
    'mh202', 'mh204', 'mh205', 'mh208', 'mh209', 'mh210', 'mh206', 'mh207'
  ];
  
  useEffect(() => {
    const name = searchParams.get('name') || localStorage.getItem('selectedUserName') || 'User';
    const id = searchParams.get('id') || localStorage.getItem('selectedUserId') || 'N/A';
    const type = searchParams.get('type');
    
    setUserName(name);
    setUserId(id);
    setAssessmentType(type || (skipTypeSelection ? 'user' : null));
    
    localStorage.setItem('selectedUserId', id);
    localStorage.setItem('selectedUserName', name);
  }, [searchParams, skipTypeSelection]);

  useEffect(() => {
    if (domainName === 'mental' && answers['mh201']?.toLowerCase() === 'no') {
      const newAnswers = { ...answers };
      let updated = false;
      mentalWellbeingFollowUpCodes.forEach(code => {
        if (newAnswers[code] !== undefined) {
          delete newAnswers[code];
          updated = true;
        }
      });
      if (updated) {
        setAnswers(newAnswers);
      }
    }
  }, [answers, domainName, mentalWellbeingFollowUpCodes]);

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
      <div style={styles.appContainer}>
        <Header
          title={`PESU AYUSHMAAN - ${domainTitle}`}
          buttons={[
            {
              label: '⬅ Back to Hub',
              path: `/questionnaire${queryString}`
            }
          ]}
        />
        <div style={styles.pageWrapper}>
          <aside style={styles.leftBadge}>
            <h2 style={styles.leftBadgeH2}>Active User</h2>
            <div style={styles.userBadgeContent}>
              <div style={styles.userBadgeItem}>
                <div style={styles.userBadgeIcon}>👤</div>
                <div>
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
                  <div style={styles.assessmentHeaderBadge}>{domainTitle} Assessment</div>
                  <h2 style={styles.assessmentHeaderH2}>{domainTitle} Domain</h2>
                  <p style={styles.assessmentHeaderP}>Choose assessment mode</p>
                </div>
              </div>

              <div style={styles.selectionSection}>
                <div style={styles.buttonSelection}>
                  <button
                    style={{...styles.selectionBtn, ...styles.userBtn}}
                    onClick={() => handleTypeSelection('user')}
                  >
                    <span style={styles.selectionIcon}>👤</span>
                    <span>User Self-Assessment</span>
                  </button>
                  <button
                    style={{...styles.selectionBtn, ...styles.assistantBtn}}
                    onClick={() => handleTypeSelection('assistant')}
                  >
                    <span style={styles.selectionIcon}>👨‍⚕️</span>
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
    <div style={styles.appContainer}>
      <Header
        title={`PESU AYUSHMAAN - ${domainTitle}`}
        buttons={[
          {
            label: '⬅ Back to Hub',
            onClick: handleBack
          }
        ]}
      />
      <div style={styles.pageWrapper}>
        <aside style={styles.leftBadge}>
          <h2 style={styles.leftBadgeH2}>Active User</h2>
          <div style={styles.userBadgeContent}>
            <div style={styles.userBadgeItem}>
              <div style={styles.userBadgeIcon}>👤</div>
              <div>
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
                <div style={styles.assessmentHeaderBadge}>{domainTitle} Assessment - {assessmentType === 'user' ? 'Self-Assessment' : 'Assistant-Assisted'}</div>
                <h2 style={styles.assessmentHeaderH2}>{domainTitle} Domain</h2>
                <p style={styles.assessmentHeaderP}>Complete the assessment below</p>
              </div>
            </div>

            <form style={styles.assessmentForm} id="domain-form" onSubmit={handleSubmit}>
              <div style={styles.questionsSection}>
                {subdomains.length > 0 ? (
                  subdomains.map((section, sIdx) => (
                    <div key={`section_${sIdx}`} style={styles.subsection}>
                      <h3 style={styles.subsectionTitle}>{section.title}</h3>
                      {(!section.items || section.items.length === 0) ? (
                        (() => {
                          const code = section.code;
                          const text = section.text || section.questionText || section.title;
                          const options = section.options || [];
                          const inputType = section.inputType || (options.length > 0 ? 'radio' : 'text');
                          const keyId = code || `section_${sIdx}`;
                          const answerKey = code ? code : `section_${sIdx}`;
                          return (
                            <div style={styles.questionItem}>
                              <label htmlFor={`sec_${keyId}`} style={styles.questionItemLabel}>
                                {code ? `${code} — ` : ''}{text}
                              </label>
                              {inputType === 'radio' && options.length > 0 ? (
                                <div style={styles.radioGroup}>
                                  {options.map((opt, idx) => {
                                    const optLabel = typeof opt === 'string' ? opt : (opt.label || String(opt.value))
                                    const optValue = typeof opt === 'string' ? opt : (opt.value ?? opt.label)
                                    return (
                                      <label key={`${keyId}_opt_${idx}`} style={styles.radioLabel}>
                                        <input
                                          type="radio"
                                          name={answerKey}
                                          value={optValue}
                                          checked={answers[answerKey] === String(optValue)}
                                          onChange={() => handleAnswerChange(answerKey, String(optValue))}
                                          style={styles.radioInput}
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
                                  style={styles.questionItemTextarea}
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
                        
                        const isDisabled =
                          domainName === 'mental' &&
                          answers['mh201']?.toLowerCase() === 'no' &&
                          mentalWellbeingFollowUpCodes.includes(code);

                        return (
                          <div key={`q_${keyId}`} style={{...styles.questionItem, opacity: isDisabled ? 0.5 : 1}}>
                            <label htmlFor={`q_${keyId}`} style={styles.questionItemLabel}>
                              {code ? `${code} — ` : ''}{text}
                            </label>
                            {inputType === 'radio' && options.length > 0 ? (
                              <div style={styles.radioGroup}>
                                {options.map((opt, idx) => {
                                  const optLabel = typeof opt === 'string' ? opt : (opt.label || String(opt.value))
                                  const optValue = typeof opt === 'string' ? opt : (opt.value ?? opt.label)
                                  return (
                                    <label key={`${keyId}_opt_${idx}`} style={{...styles.radioLabel, cursor: isDisabled ? 'not-allowed' : 'pointer'}}>
                                      <input
                                        type="radio"
                                        name={answerKey}
                                        value={optValue}
                                        checked={answers[answerKey] === String(optValue)}
                                        onChange={(e) => handleAnswerChange(answerKey, String(optValue))}
                                        style={styles.radioInput}
                                        disabled={isDisabled}
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
                                style={styles.questionItemTextarea}
                                disabled={isDisabled}
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
                        <div key={index} style={styles.questionItem}>
                          <label htmlFor={`q${index}`} style={styles.questionItemLabel}>
                            {index + 1}. {question}
                          </label>
                          <textarea
                            id={`q${index}`}
                            name={`question_${index}`}
                            rows="3"
                            placeholder="Enter your response..."
                            value={answers[`question_${index}`] || ''}
                            onChange={(e) => handleAnswerChange(`question_${index}`, e.target.value)}
                            style={styles.questionItemTextarea}
                          />
                        </div>
                      ))
                    ) : (
                      <div style={styles.questionItem}>
                        <label style={styles.questionItemLabel}>Assessment questions will be displayed here</label>
                        <textarea rows="3" placeholder="Enter your assessment notes..." style={styles.questionItemTextarea} />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div style={styles.formActions}>
                <button type="button" style={styles.btnSecondary} onClick={handleBack}>
                  Cancel
                </button>
                <button type="submit" style={styles.btnPrimary}>
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