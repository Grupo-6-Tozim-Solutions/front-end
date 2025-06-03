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
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmationModal from "../components/ConfirmationModals";
import { Box } from '@mui/material';
const SideBarCounch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    localStorage.removeItem("token");
    navigate('/login');
  };
  const menuItems = [
    { icon: <WeekendIcon />, title: "Sofás", onClick: () => navigate('/counch') },
    { icon: <BuildIcon />, title: "Peças", onClick: () => navigate('/parts-storage') },
    { icon: <BarChartIcon />, title: "Dashboard", onClick: () => navigate('/dashboard') },
     { icon: <HistoryIcon />, title: "Histórico", onClick: () => navigate('/logs') },
    { icon: <AutoAwesomeIcon />, title: "Chat IA", onClick: () => navigate('/gemini-reports') },
   

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
        <div className="logout-container">
          <li className="menu-item" onClick={() => setLogoutModalOpen(true)}>
            <Box sx={{ display: 'flex', alignItems: 'center'}}><LogoutIcon /></Box>
            {isExpanded && <span>Sair</span>}
          </li>
        </div>
      </div>
            <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
         tituloModal="Sair"
        title="Tem certeza que deseja sair?"
        message="Você precisará fazer login novamente."
        textButtonDelete="Sair"
        imagem="public/assets/logoutImage.png"
        onConfirm={handleLogoutConfirm}
      />  
    </>
    
  );
};

export default SideBarCounch;