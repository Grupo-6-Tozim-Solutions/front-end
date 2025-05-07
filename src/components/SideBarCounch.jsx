import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/sideBarStyle.css';

const SideBarCounch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: "../../public/assets/sofaIcone.png", title: "Sofás", onClick: () => navigate('/counch') },
    { icon: "../../public/assets/prego-ico.png", title: "Peças", onClick: () => navigate('/parts-storage') },
    { icon: "../../public/assets/dash-ico.png", title: "Dashboard" },
    { icon: "../../public/assets/ai-ico.png", title: "Chat" },
  ];

  return (
    <Drawer
      variant="permanent"
      className={`SideBar-Counch ${isExpanded ? 'expanded' : ''}`}
      sx={{
        width: isExpanded ? '5vw' : '5vw',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isExpanded ? '13vw' : '5vw',
          boxSizing: 'border-box',
          backgroundColor: 'var(--primary-color)',
        },
      }}
    >
      <IconButton onClick={handleExpand} className="expand-icon" sx={{ margin: '12% auto', display: '' }}>
      <img src="../../public/assets/box.png" alt="Menu Icon" className="icone" />
      </IconButton>
      <List className="navigation-list">
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={item.onClick} className="menu-item"> 
            <ListItemIcon>
              <img src={item.icon} alt={`${item.title} Icon`} className="icone" />
            </ListItemIcon>
            {isExpanded && <ListItemText primary={item.title} sx={{ color: 'white' }} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBarCounch;