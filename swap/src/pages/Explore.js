
import React, { useState, useEffect } from 'react';
import './Explore.css'
import SkillCard from '../components/SkillCard';

const Explore = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch skills from the backend
    fetch('/api/skills')
      .then((response) => response.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <div className="explore">
      <h1>Explore Skills</h1>
      <div className="skills-list">
        {skills.map((skill) => (
          <SkillCard key={skill._id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
