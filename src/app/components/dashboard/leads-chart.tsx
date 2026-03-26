'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface LeadsChartProps {
  data: {
    date: string;
    count: number;
  }[];
}

export function LeadsChart({ data }: LeadsChartProps) {
  return (
    <div className="h-100 w-full rounded-xl border border-white/5 bg-zinc-900/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Leads por Dia</h3>
        <p className="text-xs text-zinc-500">
          Volume de solicitações nos últimos dias
        </p>
      </div>

      <ResponsiveContainer width={500} height={200}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#27272a"
          />
          <XAxis
            dataKey="date"
            stroke="#71717a"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#71717a"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{
              backgroundColor: '#09090b',
              border: '1px solid #27272a',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            fill="#ffffff"
            name="Leads"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.count > 0 ? '#8b5cf6' : '#27272a'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
