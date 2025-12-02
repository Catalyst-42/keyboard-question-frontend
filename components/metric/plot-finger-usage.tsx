'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { formatPercentage } from '@/lib/utils';
import { Pointer } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

interface FingerUsageProps {
  fingerUsageData: Array<{ finger: string; usage: number; hand: string }>;
  leftHandUsagePercent?: number;  // TODO: Deprecate and calculate inside plot
  rightHandUsagePercent?: number;
  title?: string,
  handUsageInfo?: boolean | undefined;
}

const fingerUsageConfig = {
  usage: {
    label: "Использование",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const FingerTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold">Палец {label}</p>
        <p className="text-sm">
          Использование: {formatPercentage(Number(payload[0].value))}
        </p>
      </div>
    );
  }
  return null;
};

export function PlotFingerUsage({
  fingerUsageData,
  leftHandUsagePercent = 0,
  rightHandUsagePercent = 0,
  handUsageInfo = false,
  title = "Использование пальцев",
}: FingerUsageProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Pointer className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ChartContainer config={fingerUsageConfig} className="h-40 w-full">
          <BarChart data={fingerUsageData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="finger"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip isAnimationActive={false} content={<FingerTooltip />} />
            <Bar
              dataKey="usage"
              fill="var(--color-usage)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>

        {handUsageInfo && (
          <div className="flex border rounded-lg overflow-hidden bg-muted/30">
            <div
              className="flex-1 py-2 text-center relative"
              style={{ flex: leftHandUsagePercent }}
            >
              <div className="text-sm font-medium">
                {formatPercentage(leftHandUsagePercent)}
              </div>
              <div className="text-xs text-muted-foreground">Левая</div>
            </div>
            <div
              className="flex-1 py-2 text-center relative"
              style={{ flex: rightHandUsagePercent }}
            >
              <div className="text-sm font-medium">
                {formatPercentage(rightHandUsagePercent)}
              </div>
              <div className="text-xs text-muted-foreground">Правая</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card >
  );
}
