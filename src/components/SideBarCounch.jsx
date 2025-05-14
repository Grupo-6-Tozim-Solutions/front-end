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
    navigate('/login');
  };
  const menuItems = [
    { icon: <WeekendIcon />, title: "Sofás", onClick: () => navigate('/counch') },
    { icon: <BuildIcon />, title: "Peças", onClick: () => navigate('/parts-storage') },
    { icon: <BarChartIcon />, title: "Dashboard", onClick: () => navigate('/dashboard') },
    { icon: <AutoAwesomeIcon />, title: "Chat IA", onClick: () => navigate('/gemini-reports') },
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
       <Box sx={{ display: 'flex', height: '90%', flexDirection: 'column',width: '100%', justifyContent: 'flex-end', alignItems: 'center', marginBottom:'20%' }}>
           <li className="menu-item" onClick={() => setLogoutModalOpen(true) }>
            <Box sx={{ fontSize: '2rem' }}><LogoutIcon fontSize="inherit" /></Box>
            {isExpanded && <span>Sair</span>}
          </li>
       </Box>
      </div>
             <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        modalName="Sair"
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