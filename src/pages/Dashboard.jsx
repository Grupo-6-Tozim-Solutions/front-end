import BarChartCard from '../components/BarChartCard';
import PieChartCard from '../components/PieChartCard';
import React from 'react';
import SideBar from '../components/SideBar';
import HeaderDash from '../components/HeaderDash';
import { barChartData, sofasMaisSaida, pecasMaisSaida } from '../data/DataMockDash';
import './DashboardStyle.css';
import SideBarCounch from '../components/SideBarCounch';
import HeaderStorage from '../components/HeaderStorage';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <SideBarCounch />
            <div className="dashboard-content">
         <HeaderStorage
          title="Gerenciamento de Sofás"
          subtitle="Tozine Solutions"
          filterText="Adicionar Sofá"
          filterIcon="../../public/assets/addPartsStorage.png"
          filterWidth="10vw"
          filterBackgroundColor="#C9E7FF"
          filterTextColor="rgba(7, 64, 218, 1)"
          addText="Produzir"
          addWidth="15vw"
          addBackgroundColor="rgba(201, 231, 255, 1)"
          addTextColor="rgba(7, 64, 218, 1)"
          onAdd={() => alert("Produzir Sofá")}
          historyText="Ver historico"
          historyIcon="../../public/assets/historyPartsStorage.png"
          historyWidth="16vw"
          historyBackgroundColor="rgba(201, 231, 255, 1)"
          historyTextColor="rgba(7, 64, 218, 1)"
          logoutText="Sair"
          logoutIcon="../../public/assets/logoutPartsStorage.png"
          logoutWidth="7vw"
          logoutBackgroundColor="rgba(255, 201, 201, 1)"
          logoutTextColor="rgba(255, 13, 13, 1)"
          buttonMarginLeft="20px"
          onHistory={() => alert("Histórico de Sofás")}
        />
                <div className="dashboard">
                    <div className="dashboard-row">
                        <BarChartCard data={barChartData} />
                    </div>
                    <div className="dashboard-row pie-charts">
                        <PieChartCard title="Sofás que mais saíram no mês" data={sofasMaisSaida} />
                        <PieChartCard title="Peças que mais saíram no mês" data={pecasMaisSaida} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
