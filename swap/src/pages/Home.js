import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Unlock Your Potential with SkillSwap</h1>
      <p>A platform where knowledge meets opportunity.</p>
      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button> {/* New Signup Button */}
      </div>
    </div>
  );
};

export default Home;
