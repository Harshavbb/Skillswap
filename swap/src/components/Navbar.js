import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">SkillSwap</div>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      <ul className={`navbar-nav ${isOpen ? 'open' : ''}`}>
        <li>
          <a href="/">Explore</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
