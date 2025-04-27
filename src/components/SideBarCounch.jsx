import React, { useState } from 'react';
import '../styles/counchPageStyle.css';

const SideBarCounch = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: "../../public/assets/sofaIcone.png", title: "Sofás" },
    { icon: "../../public/assets/prego-ico.png", title: "Estoque de Peças" },
    { icon: "../../public/assets/dash-ico.png", title: "Dashboard" },
    { icon: "../../public/assets/ai-ico.png", title: "Chat" },
  ];

  return (
    <div className={`SideBar-Counch ${isExpanded ? 'expanded' : ''}`}>
      <img src="../../public/assets/box.png" onClick={handleExpand} alt="Expand Sidebar" className="expand-icon" />
      <ul className="navigation-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <img src={item.icon} alt={`${item.title} Icon`} />
            {isExpanded && <span>{item.title}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarCounch;