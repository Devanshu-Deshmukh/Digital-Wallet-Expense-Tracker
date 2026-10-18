import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTransactions } from '../context/TransactionContext';

const COLORS = ['#B8860B', '#C4956A', '#D4A574', '#A0750A', '#8B6914', '#7A6244', '#DCC9AD', '#5C4A33'];

export default function ExpenseChart() {
  const { expensesByCategory } = useTransactions();

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }));

  if (data.length === 0) {
    return (
      <div className="bg-cream-50 rounded-lg p-6 border border-brown-100 shadow-sm h-full animate-fade-in-up">
        <h2 className="text-lg font-bold text-brown-700 mb-4">Expenses by Category</h2>
        <div className="flex flex-col items-center justify-center py-10 text-brown-300">
          <svg className="w-14 h-14 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
          </svg>
          <p className="text-sm">No expense data yet</p>
        </div>
      </div>
    );
  }

  const renderLabel = ({ name, percent }) =>
    `${name} (${(percent * 100).toFixed(0)}%)`;

  return (
    <div className="bg-cream-50 rounded-lg p-6 border border-brown-100 shadow-sm h-full animate-fade-in-up">
      <h2 className="text-lg font-bold text-brown-700 mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            label={renderLabel}
            labelLine={{ stroke: '#C4A882' }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value)
            }
            contentStyle={{
              background: '#FFFEF7',
              border: '1px solid #DCC9AD',
              borderRadius: '0.375rem',
              color: '#4A3728',
              fontSize: '0.875rem',
              padding: '8px 12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-4 mt-3 justify-center">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs text-brown-500">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
}
