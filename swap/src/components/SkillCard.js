import React from 'react';
import './SkillCard.css'
const SkillCard = ({ skill }) => {
  return (
    <div className="skill-card">
      <h3>{skill.title}</h3>
      <p>{skill.description}</p>
      <p><strong>Offered By:</strong> {skill.user}</p>
    </div>
  );
};

export default SkillCard;
