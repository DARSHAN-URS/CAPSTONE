import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// We no longer need to import the separate CSS file.
// import './UserSelect.css';

// CSS styles are converted to a JavaScript object.
// CSS properties like 'min-height' become 'minHeight' (camelCase).
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
    gap: '28px',
    padding: 'clamp(20px, 4vw, 40px)',
    flex: '1',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  formContainer: {
    flex: '1',
    maxWidth: '640px',
    width: '100%',
    margin: '0 auto',
    padding: '20px 0',
  },
  formContainerH2: {
    textAlign: 'center',
    color: '#002147',
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    marginBottom: '10px',
    fontWeight: '700',
  },
  formContainerP: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '20px',
  },
  formCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: 'clamp(24px, 5vw, 32px)',
    border: '1px solid #e5eaf0',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
  },
  formCardH3: {
    marginTop: 0,
    marginBottom: '20px',
    fontSize: '1.25rem',
    color: '#002147',
    fontWeight: '600',
    paddingBottom: '12px',
    borderBottom: '2px solid #f0f4f8',
  },
  formActions: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
  },
};


const UserSelect = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    id: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.id) {
      navigate(`/dashboard?name=${encodeURIComponent(formData.name)}&id=${encodeURIComponent(formData.id)}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={styles.appContainer}>
      <Header title="PESU AYUSHMAAN" />
      <div style={styles.pageWrapper}>
        <div style={styles.formContainer}>
          <h2 style={styles.formContainerH2}>Assessment Setup</h2>
          <p style={styles.formContainerP}>
            Enter user details and start the assessment.
          </p>

          <div style={styles.formCard}>
            <h3 style={styles.formCardH3}>User Details</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="user-name">User Name</label>
              <input
                id="user-name"
                name="name"
                type="text"
                placeholder="Enter full name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="user-id">User ID</label>
              <input
                id="user-id"
                name="id"
                type="text"
                placeholder="Enter ID / MRN"
                required
                value={formData.id}
                onChange={handleChange}
              />
              <div style={styles.formActions}>
                <button type="submit" className="dashboard-btn">
                  Start Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSelect;