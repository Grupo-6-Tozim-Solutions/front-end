 
import './BarChartCardStyle.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartCard = ({ data }) => {
  return (
    <div className="bar-chart-card">
      <h2 className="bar-chart-title">Sofás produzidos ao longo dos meses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sofas" fill="#426EFF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
