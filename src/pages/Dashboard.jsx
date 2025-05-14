import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import SideBarCounch from '../components/SideBarCounch';
import HeaderStorage from '../components/HeaderStorage';
import BarChartCard from '../components/BarChartCard';
import PieChartCard from '../components/PieChartCard';
import { barChartData, sofasMaisSaida, pecasMaisSaida } from '../data/DataMockDash';
import './DashboardStyle.css';

const Dashboard = () => {
  return (
    <Box display="flex" className="dashboard-container">
      <SideBarCounch />
      <Box sx={{ width: "100%" }}>
        <HeaderStorage
          title="Dashboard"
          subtitle="Tozine Solutions"
          filterText="Adicionar Sofá"
          addText="Produzir"
          historyText="Ver histórico"
          logoutText="Sair"
        />
      <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent:"center", alignItems: "center" }}>
        <Box sx={{ width: "95%", height: "100%", display: "flex", gap: "40px", flexDirection: "row", justifyContent:"space evenly", padding: "20px" }}>

            <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "column",  alignItems: "center" }}>
              <BarChartCard  data={barChartData} />
            </Box>
            <Box sx={{ width: "25%", height: "100%", display: "flex", flexDirection: "column",  alignItems: "center", gap:"3%" }}>
              <PieChartCard title="Sofás que mais saíram no mês" data={sofasMaisSaida} />
              <PieChartCard title="Peças que mais saíram no mês" data={pecasMaisSaida} />
            </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;