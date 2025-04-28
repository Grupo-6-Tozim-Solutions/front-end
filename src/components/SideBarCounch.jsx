import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/sideBarStyle.css';

const SideBarCounch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: "../../public/assets/sofaIcone.png", title: "Sofás", onClick: () => navigate('/counch') }, // Navega para CounchPage
    { icon: "../../public/assets/prego-ico.png", title: "Peças", onClick: () => navigate('/parts-storage') }, // Navega para PartsStorage
    { icon: "../../public/assets/dash-ico.png", title: "Dashboard" },
    { icon: "../../public/assets/ai-ico.png", title: "Chat" },
  ];

  return (
    <>
      <div className={`SideBar-Counch ${isExpanded ? 'expanded' : ''}`}>
        <img src="../../public/assets/box.png" onClick={handleExpand} alt="Expand Sidebar" className="expand-icon" />
        <ul className="navigation-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item" onClick={item.onClick}>
              <img src={item.icon} alt={`${item.title} Icon`} className='icone'/>
              {isExpanded && <span>{item.title}</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        {/* Main content will be placed here */}
      </div>
    </>
  );
};

export default SideBarCounch;