import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './UserSelect.css';

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
    <div className="app-container">
      <Header title="PESU AYUSHMAAN" />
      <div className="page-wrapper">
        <div className="form-container">
          <h2>Assessment Setup</h2>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>
            Enter user details and start the assessment.
          </p>

          <div className="form-card">
            <h3>User Details</h3>
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
              <div className="form-actions">
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

