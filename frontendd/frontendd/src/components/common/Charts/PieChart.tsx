
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CHART_COLORS } from '@/utils/constants';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title?: string;
  nameKey?: string;
  dataKey?: string;
  height?: number;
  showLegend?: boolean;
}

const PieChart = ({
  data,
  title,
  nameKey = "name",
  dataKey = "value",
  height = 400,
  showLegend = true
}: PieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const renderCustomizedLabel = ({ name, value, percent }: { name: string; value: number; percent: number }) => {
    return `${name}: ${Math.round(percent * 100)}%`;
  };

  return (
    <div className="rounded-lg border bg-white p-4">
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => {
                const percent = (Number(value) / total * 100).toFixed(1); 
                return [`${value} (${percent}%)`, name];
              }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb' 
              }}
            />
            {showLegend && (
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ fontSize: '12px' }}
              />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
