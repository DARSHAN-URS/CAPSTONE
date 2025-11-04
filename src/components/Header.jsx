import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ title, buttons = [] }) => {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      <img src="/logo.png" alt="PES Logo" className="logo" />
      <h1>{title || 'PESU AYUSHMAAN'}</h1>
      <nav className="top-links">
        {buttons.map((button, index) => (
          <button
            key={index}
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

