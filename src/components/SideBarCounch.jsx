import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import WeekendIcon from '@mui/icons-material/Weekend'; // Sofa icon
import BuildIcon from '@mui/icons-material/Build'; // Parts icon
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard icon
import '../styles/sideBarStyle.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
const SideBarCounch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: <WeekendIcon />, title: "Sofás", onClick: () => navigate('/counch') },
    { icon: <BuildIcon />, title: "Peças", onClick: () => navigate('/parts-storage') },
    { icon: <BarChartIcon />, title: "Dashboard", onClick: () => navigate('/dashboard') },
    { icon: <AutoAwesomeIcon />, title: "Inteligência Artificial", onClick: () => navigate('/gemini-reports') },
    { icon: <HistoryIcon />, title: "Histórico", onClick: () => navigate('/history') },
    
  ];

  return (
    <>
      <div className={`SideBar-Counch ${isExpanded ? 'expanded' : ''}`}>
        <MenuIcon onClick={handleExpand} className="expand-icon" /> {/* Replace box image with MenuIcon */}
        <ul className="navigation-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item" onClick={item.onClick}>
              <div className="menu-icon">{item.icon}</div>
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