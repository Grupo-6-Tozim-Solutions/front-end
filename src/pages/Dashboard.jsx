import BarChartCard from '../components/BarChartCard';
import PieChartCard from '../components/PieChartCard';
import React from 'react';
import SideBar from '../components/SideBarCounch';
import Header from '../components/HeaderStorage';
import { barChartData, sofasMaisSaida, pecasMaisSaida } from '../data/DataMockDash';
import './DashboardStyle.css';
import SideBarCounch from '../components/SideBarCounch';
import HeaderDash from '../components/HeaderDash';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <SideBarCounch />
            <div className="dashboard-content">
                <HeaderDash/>
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
