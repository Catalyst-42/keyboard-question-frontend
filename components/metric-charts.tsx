'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricWithRelations } from '@/api';

interface MetricsChartsProps {
  metric: MetricWithRelations;
}

export function MetricsCharts({ metric }: MetricsChartsProps) {
  // Данные для графика использования пальцев
  const fingerUsageData = [
    { name: 'Мизинец Л', value: metric.finger_usage_1, color: '#3b82f6' },
    { name: 'Безымянный Л', value: metric.finger_usage_2, color: '#60a5fa' },
    { name: 'Средний Л', value: metric.finger_usage_3, color: '#93c5fd' },
    { name: 'Указательный Л', value: metric.finger_usage_4, color: '#bfdbfe' },
    { name: 'Большой Л', value: metric.finger_usage_5, color: '#dbeafe' },
    { name: 'Большой П', value: metric.finger_usage_6, color: '#fef3c7' },
    { name: 'Указательный П', value: metric.finger_usage_7, color: '#fde68a' },
    { name: 'Средний П', value: metric.finger_usage_8, color: '#fcd34d' },
    { name: 'Безымянный П', value: metric.finger_usage_9, color: '#fbbf24' },
    { name: 'Мизинец П', value: metric.finger_usage_10, color: '#f59e0b' },
  ];

  // Данные для графика использования рядов
  const rowUsageData = [
    { name: 'K (верхний)', value: metric.row_usage_k, color: '#ef4444' },
    { name: 'E (верхний)', value: metric.row_usage_e, color: '#f97316' },
    { name: 'D (домашний)', value: metric.row_usage_d, color: '#22c55e' },
    { name: 'C (домашний)', value: metric.row_usage_c, color: '#14b8a6' },
    { name: 'B (нижний)', value: metric.row_usage_b, color: '#3b82f6' },
    { name: 'A (нижний)', value: metric.row_usage_a, color: '#8b5cf6' },
  ];

  // Данные для графика дистанции по пальцам
  const fingerDistanceData = [
    { name: 'Мизинец Л', distance: metric.travel_distance_finger_1 },
    { name: 'Безымянный Л', distance: metric.travel_distance_finger_2 },
    { name: 'Средний Л', distance: metric.travel_distance_finger_3 },
    { name: 'Указательный Л', distance: metric.travel_distance_finger_4 },
    { name: 'Большой Л', distance: metric.travel_distance_finger_5 },
    { name: 'Большой П', distance: metric.travel_distance_finger_6 },
    { name: 'Указательный П', distance: metric.travel_distance_finger_7 },
    { name: 'Средний П', distance: metric.travel_distance_finger_8 },
    { name: 'Безымянный П', distance: metric.travel_distance_finger_9 },
    { name: 'Мизинец П', distance: metric.travel_distance_finger_10 },
  ];

  // Форматирование процентов для тултипов
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Использование пальцев */}
      <Card>
        <CardHeader>
          <CardTitle>Использование пальцев</CardTitle>
          <CardDescription>Распределение нагрузки по пальцам</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fingerUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={formatPercent} />
              <Tooltip formatter={(value: number) => [formatPercent(value), 'Использование']} />
              <Bar dataKey="value" name="Использование">
                {fingerUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Использование рядов */}
      <Card>
        <CardHeader>
          <CardTitle>Использование рядов</CardTitle>
          <CardDescription>Распределение по рядам клавиатуры</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={rowUsageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {rowUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatPercent(value), 'Использование']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Дистанция по пальцам */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Дистанция перемещения по пальцам</CardTitle>
          <CardDescription>Общая дистанция: {metric.travel_distance.toFixed(1)}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fingerDistanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value: number) => [value.toFixed(1), 'Дистанция']} />
              <Bar dataKey="distance" name="Дистанция" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}