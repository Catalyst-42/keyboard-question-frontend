'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricWithRelations } from '@/api';
import { Move, GitBranch, Scissors, Hand, ArrowLeftRight, Activity } from 'lucide-react';

interface LayoutNumericMetricsProps {
  metric: MetricWithRelations;
}

export function LayoutNumericMetrics({ metric }: LayoutNumericMetricsProps) {
  // Formatting functions
  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatDistance = (value: number): string => {
    return value.toFixed(1);
  };

  // Main numeric metrics
  const numericMetrics = [
    {
      icon: Move,
      label: 'Общая дистанция',
      value: formatDistance(metric.travel_distance),
      description: 'Суммарная пройденная дистанция'
    },
    {
      icon: GitBranch,
      label: 'SFB',
      value: formatPercentage(metric.same_finger_bigram_frequency),
      description: 'Same Finger Bigram'
    },
    {
      icon: GitBranch,
      label: 'SFS',
      value: formatPercentage(metric.same_finger_skipgram_frequency),
      description: 'Same Finger Skipgram'
    },
    {
      icon: Scissors,
      label: 'Ножницы',
      value: formatPercentage(metric.half_scissor_bigram_frequency + metric.full_scissor_bigram_frequency),
      description: 'Half + Full Scissors'
    },
    {
      icon: Activity,
      label: 'Rolls',
      value: formatPercentage(metric.roll_frequency),
      description: 'Роллы'
    },
    {
      icon: ArrowLeftRight,
      label: 'Alternate',
      value: formatPercentage(metric.alternate_frequency),
      description: 'Альтернация'
    },
    {
      icon: Hand,
      label: 'One Hand',
      value: formatPercentage(metric.onehand_frequency),
      description: 'Одной рукой'
    },
    {
      icon: Activity,
      label: 'Redirect',
      value: formatPercentage(metric.redirect_frequency),
      description: 'Редиректы'
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Основные метрики</CardTitle>
          <CardDescription>Числовые показатели эффективности раскладки</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {numericMetrics.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 border rounded-lg bg-muted/50"
                >
                  <Icon className="h-6 w-6 mb-2 text-muted-foreground" />
                  <div className="text-lg font-semibold">{item.value}</div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scissors metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Метрики ножниц</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Half Scissors</span>
              <span className="font-mono text-sm">{formatPercentage(metric.half_scissor_bigram_frequency)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Full Scissors</span>
              <span className="font-mono text-sm">{formatPercentage(metric.full_scissor_bigram_frequency)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Half S-Scissors</span>
              <span className="font-mono text-sm">{formatPercentage(metric.half_scissor_skipgram_frequency)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Full S-Scissors</span>
              <span className="font-mono text-sm">{formatPercentage(metric.full_scissor_skipgram_frequency)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Lateral Stretch */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lateral Stretch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Bigram</span>
              <span className="font-mono text-sm">{formatPercentage(metric.lateral_stretch_bigram_frequency)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Skipgram</span>
              <span className="font-mono text-sm">{formatPercentage(metric.lateral_stretch_skipgram_frequency)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}