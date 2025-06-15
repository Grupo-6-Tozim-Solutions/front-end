import './PieChartCardStyle.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react';
import { Box, Typography } from '@mui/material';

const COLORS = ['#FFBB28', '#00C49F', '#FF8042', '#8884d8'];

const PieChartCard = ({ title, data }) => {
  // Ordena os dados por valor decrescente e pega apenas os 5 primeiros
  const topData = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="pie-chart-card">
      <h2 className="pie-chart-title">{title}</h2>
      <div className="pie-chart-container">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart >
            <Pie
              data={topData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              innerRadius={40}
            >
              {topData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <Box className="pie-chart-legend" >
          <h3>Legenda</h3>
          {/* A legenda mostra apenas os 5 itens principais (topData) */}
          {topData.map((entry, index) => (
            <Box key={index} className="legend-item" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                title={entry.name}
              ></Typography>
              <Typography className="legend-text" title={entry.name}>{entry.name}</Typography>
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default PieChartCard;
