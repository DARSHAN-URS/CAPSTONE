import React from 'react';
// import './Footer.css'; // This import is no longer needed

const styles = {
  footer: {
    textAlign: 'center',
    padding: '16px clamp(20px, 4vw, 40px)',
    fontSize: '0.75rem',
    color: '#64748b',
    marginTop: 'auto',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)', // Note: 'backdrop-filter' becomes 'backdropFilter'
  }
};

const Footer = () => {
  return (
    <div style={styles.footer}>
      © 2025 PESU AYUSHMAAN | All Rights Reserved
    </div>
  );
};

export default Footer;