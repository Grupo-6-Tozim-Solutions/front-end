import BarChartCard from '../components/BarChartCard';
import PieChartCard from '../components/PieChartCard';
import React from 'react';
import SideBar from '../components/SideBar';
import HeaderDash from '../components/HeaderDash';
import { barChartData, sofasMaisSaida, pecasMaisSaida } from '../data/DataMockDash';
import './DashboardStyle.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <SideBar />
            <div className="dashboard-content">
                <HeaderDash title="Dashboard" subtitle="Tozine Solutions"/>
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
