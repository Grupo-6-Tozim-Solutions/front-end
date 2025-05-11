import './PieChartCardStyle.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#FFBB28', '#00C49F', '#FF8042', '#8884d8'];

const PieChartCard = ({ title, data }) => {
  return (
    <div className="pie-chart-card">
      <h2 className="pie-chart-title">{title}</h2>
      <div className="pie-chart-container">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart >
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              innerRadius={40}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="pie-chart-legend">
          <h3>Legenda</h3>
          {data.map((entry, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="legend-text">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
