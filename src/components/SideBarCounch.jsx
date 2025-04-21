import React, { useState } from 'react';
import '../styles/counchPageStyle.css';

const SideBarCounch = () => {
const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`SideBar-Counch ${isExpanded ? 'expanded' : ''}`}>
      <img src="../../public/assets/box.png" onClick={handleExpand} alt="Expand Sidebar" />
{isExpanded && (
        <ul className="navigation-list">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Services</li>
        </ul>
      )}
    </div>
  );
};

export default SideBarCounch;