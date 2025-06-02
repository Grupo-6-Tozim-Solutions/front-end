import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SideBarCounch from '../components/SideBarCounch';
import HeaderSimple from '../components/HeaderSimple';
import BarChartCard from '../components/BarChartCard';
import PieChartCard from '../components/PieChartCard';
import './DashboardStyle.css';
import { api } from '../Provider/apiProvider';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Dashboard = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [sofasMaisSaida, setSofasMaisSaida] = useState([]);
  const [pecasMaisSaida, setPecasMaisSaida] = useState([]);

  useEffect(() => {
    api.get('/dashboard').then(res => {
      // Converte {1: 10, 2: 15, ...} para [{month: "Jan", sofas: 10}, ...]
      const data = Object.entries(res.data).map(([month, sofas]) => ({
        month: monthNames[parseInt(month, 10) - 1],
        sofas
      }));
      setBarChartData(data);
    });
    api.get('/dashboard/sofas-mais-saida-mes').then(res => setSofasMaisSaida(res.data));
    api.get('/dashboard/pecas-mais-saida-mes').then(res => setPecasMaisSaida(res.data));
  }, []);

  return (
    <Box display="flex" className="dashboard-container">
      <SideBarCounch />
      <Box sx={{ width: "100%" }}>
        <HeaderSimple
          title="Dashboard"
          subtitle="Tozine Solutions"
        />
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ width: "95%", height: "100%", display: "flex", gap: "40px", flexDirection: "row", justifyContent: "space-evenly", padding: "20px" }}>
            <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <BarChartCard data={barChartData} />
            </Box>
            <Box sx={{ width: "25%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "3%" }}>
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