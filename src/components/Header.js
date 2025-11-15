import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Header.css'; // This import is no longer needed

const styles = {
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #002147 0%, #004080 100%)',
    color: 'white',
    padding: '15px clamp(20px, 4vw, 40px)',
    boxShadow: '0 4px 20px rgba(0, 33, 71, 0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    maxWidth: '100vw',
  },
  logo: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain',
    flexShrink: 0,
  },
  h1: {
    margin: 0,
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontWeight: 600,
    flex: 1,
    textAlign: 'center',
    padding: '0 15px',
  },
  topLinks: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexShrink: 0,
  }
};

const Header = ({ title, buttons = [] }) => {
  const navigate = useNavigate();

  return (
    <header style={styles.pageHeader}>
      <img src="./logo.png" alt="PES Logo" style={styles.logo} />
      <h1 style={styles.h1}>{title || 'PESU AYUSHMAAN'}</h1>
      <nav style={styles.topLinks}>
        {buttons.map((button, index) => (
          <button
            key={index}
            // The button's className is kept to use global styles from index.css
            className={button.className || 'dashboard-btn'}
            onClick={() => {
              if (button.onClick) {
                button.onClick();
              } else if (button.path) {
                navigate(button.path);
              }
            }}
          >
            {button.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;