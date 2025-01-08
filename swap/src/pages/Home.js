import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-overlay"></div>
      <div className="home-content">
        <h1 className="home-title">Welcome to SkillSwap</h1>
        <p className="home-subtitle">
          Connect and exchange skills with others in your community. Empower
          yourself and help others grow.
        </p>
        <button className="home-cta">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
