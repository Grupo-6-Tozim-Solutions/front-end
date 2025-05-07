import BarChartCard from '../components/BarChartCard';
import PieChartCard from '../components/PieChartCard';
import React from 'react';
import SideBar from '../components/SideBarCounch';
import Header from '../components/HeaderStorage';
import { barChartData, sofasMaisSaida, pecasMaisSaida } from '../data/DataMockDash';
import './DashboardStyle.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <SideBar />
            <div className="dashboard-content">
                <Header
                    title="Dashboard"
                    subtitle="Tozine Solutions"
                    historyText="Ver Histórico"
                    historyIcon="../../public/assets/historyPartsStorage.png"
                    historyWidth="16vw"
                    historyBackgroundColor="rgba(201, 231, 255, 1)"
                    historyTextColor="rgba(7, 64, 218, 1)"
                    logoutText="Sair"
                    logoutIcon="../../public/assets/logoutPartsStorage.png"
                    logoutWidth="7.5vw"
                    logoutBackgroundColor="rgba(255, 201, 201, 1)"
                    logoutTextColor="rgba(255, 13, 13, 1)"
                    buttonMarginLeft="0%"
                    headerMarginBottom="2%" // Set bottom margin
                    onHistory={() => alert("Histórico")}
                    onLogout={() => setLogoutModalOpen(true)} // Abre o modal de confirmação
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
