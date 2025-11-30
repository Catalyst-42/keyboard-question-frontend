'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { formatDistance } from '@/lib/utils';
import { Move } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

interface FingerDistanceProps {
  fingerDistanceData: Array<{ finger: string; distance: number; hand: string }>;
  totalTravelDistance: number;
}

const fingerDistanceConfig = {
  distance: {
    label: "Дистанция",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const FingerTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold">Палец {label}</p>
        <p className="text-sm">
          Дистанция: {Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export function PlotFingerDistance({ 
  fingerDistanceData,
  totalTravelDistance 
}: FingerDistanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Move className="h-4 w-4" />
          Дистанция пальцев
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ChartContainer config={fingerDistanceConfig} className="h-40 w-full">
          <BarChart data={fingerDistanceData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="finger"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip isAnimationActive={false} content={<FingerTooltip />} />
            <Bar
              dataKey="distance"
              fill="var(--color-distance)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>

        {/* Total distance in center */}
        <div className="border rounded-lg bg-muted/30 py-2 text-center">
          <div className="text-sm font-medium">
            {formatDistance(totalTravelDistance)}u
          </div>
          <div className="text-xs text-muted-foreground">Среднее перемещение</div>
        </div>
      </CardContent>
    </Card>
  );
}