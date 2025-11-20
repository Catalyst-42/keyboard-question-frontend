'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { MetricWithRelations } from '@/api';

interface LayoutMetricsChartsProps {
  metric: MetricWithRelations;
}

export function LayoutMetricsCharts({ metric }: LayoutMetricsChartsProps) {
  // Конфигурация графиков
  const fingerUsageConfig = {
    left_hand: {
      label: "Левая рука",
      color: "var(--chart-1)",
    },
    right_hand: {
      label: "Правая рука", 
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const rowUsageConfig = {
    usage: {
      label: "Использование",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  const fingerDistanceConfig = {
    distance: {
      label: "Дистанция",
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig;

  // Данные для графиков
  const fingerUsageData = [
    { finger: 'Мизинец Л', left_hand: metric.finger_usage_1 * 100, right_hand: 0 },
    { finger: 'Безымянный Л', left_hand: metric.finger_usage_2 * 100, right_hand: 0 },
    { finger: 'Средний Л', left_hand: metric.finger_usage_3 * 100, right_hand: 0 },
    { finger: 'Указательный Л', left_hand: metric.finger_usage_4 * 100, right_hand: 0 },
    { finger: 'Большой Л', left_hand: metric.finger_usage_5 * 100, right_hand: 0 },
    { finger: 'Большой П', left_hand: 0, right_hand: metric.finger_usage_6 * 100 },
    { finger: 'Указательный П', left_hand: 0, right_hand: metric.finger_usage_7 * 100 },
    { finger: 'Средний П', left_hand: 0, right_hand: metric.finger_usage_8 * 100 },
    { finger: 'Безымянный П', left_hand: 0, right_hand: metric.finger_usage_9 * 100 },
    { finger: 'Мизинец П', left_hand: 0, right_hand: metric.finger_usage_10 * 100 },
  ];

  // Данные для графика использования рядов (транспонированные)
  const rowUsageData = [
    { row: 'K', usage: metric.row_usage_k * 100 },
    { row: 'E', usage: metric.row_usage_e * 100 },
    { row: 'D', usage: metric.row_usage_d * 100 },
    { row: 'C', usage: metric.row_usage_c * 100 },
    { row: 'B', usage: metric.row_usage_b * 100 },
    { row: 'A', usage: metric.row_usage_a * 100 },
  ];

  const fingerDistanceData = [
    { finger: 'Мизинец Л', distance: metric.travel_distance_finger_1 },
    { finger: 'Безымянный Л', distance: metric.travel_distance_finger_2 },
    { finger: 'Средний Л', distance: metric.travel_distance_finger_3 },
    { finger: 'Указательный Л', distance: metric.travel_distance_finger_4 },
    { finger: 'Большой Л', distance: metric.travel_distance_finger_5 },
    { finger: 'Большой П', distance: metric.travel_distance_finger_6 },
    { finger: 'Указательный П', distance: metric.travel_distance_finger_7 },
    { finger: 'Средний П', distance: metric.travel_distance_finger_8 },
    { finger: 'Безымянный П', distance: metric.travel_distance_finger_9 },
    { finger: 'Мизинец П', distance: metric.travel_distance_finger_10 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* График использования пальцев */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Использование пальцев</CardTitle>
          <CardDescription>Распределение нагрузки по пальцам (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={fingerUsageConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={fingerUsageData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="finger"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                angle={-45}
                textAnchor="end"
                height={60}
                tickFormatter={(value) => value.split(' ')[0]}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="left_hand" fill="var(--color-left_hand)" radius={4} />
              <Bar dataKey="right_hand" fill="var(--color-right_hand)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* График использования рядов - транспонированный */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Использование рядов</CardTitle>
          <CardDescription>Распределение по рядам клавиатуры (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={rowUsageConfig} className="min-h-[200px] w-full">
            <BarChart 
              accessibilityLayer 
              data={rowUsageData}
              layout="vertical"
              margin={{ left: 30, right: 10 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                type="category"
                dataKey="row"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={30}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="usage" fill="var(--color-usage)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* График дистанции по пальцам */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Дистанция по пальцам</CardTitle>
          <CardDescription>Пройденная дистанция для каждого пальца</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={fingerDistanceConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={fingerDistanceData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="finger"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                angle={-45}
                textAnchor="end"
                height={60}
                tickFormatter={(value) => value.split(' ')[0]}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="distance" fill="var(--color-distance)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}