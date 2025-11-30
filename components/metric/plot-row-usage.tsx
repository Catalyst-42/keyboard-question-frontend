'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { formatPercentage } from '@/lib/utils';
import { Rows3 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

interface RowUsageProps {
  rowUsageData: Array<{ row: string; usage: number }>;
}

const rowUsageConfig = {
  usage: {
    label: "Использование",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const RowTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const rowNames: { [key: string]: string } = {
      'K': 'Функциональный ряд',
      'E': 'Ряд цифр',
      'D': 'Верхний ряд',
      'C': 'Домашний ряд',
      'B': 'Нижний ряд',
      'A': 'Контрольный ряд'
    };

    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold">{rowNames[label] || label}</p>
        <p className="text-sm">

          Использование: {formatPercentage(Number(payload[0].value))}
        </p>
      </div>
    );
  }
  return null;
};

export function PlotRowUsage({ rowUsageData }: RowUsageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Rows3 className="h-4 w-4" />
          Использование рядов
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={rowUsageConfig} className="h-50 w-full">
          <BarChart
            data={rowUsageData}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              hide={true}
            />
            <YAxis
              type="category"
              dataKey="row"
              axisLine={false}
              tickLine={false}
              width={16}
              tick={{ fontSize: 12 }}
            />
            <Tooltip isAnimationActive={false} content={<RowTooltip />} />
            <Bar
              dataKey="usage"
              fill="var(--color-usage)"
              radius={[0, 2, 2, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
