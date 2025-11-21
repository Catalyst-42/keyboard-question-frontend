import { Card, CardContent } from '@/components/ui/card';
import { MetricWithRelations } from '@/api';
import { BarChart3, Move, Scissors, GitBranch } from 'lucide-react';
import Image from 'next/image';

interface MetricCardProps {
  metric: MetricWithRelations;
}

export function MetricCard({ metric }: MetricCardProps) {
  // Helper formatting functions
  const formatDistance = (value: number): string => {
    return value.toFixed(1);
  };

  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Sum finger usage for left and right hands
  const leftHandUsage = metric.finger_usage_1 + metric.finger_usage_2 + metric.finger_usage_3 + metric.finger_usage_4 + metric.finger_usage_5;
  const rightHandUsage = metric.finger_usage_6 + metric.finger_usage_7 + metric.finger_usage_8 + metric.finger_usage_9 + metric.finger_usage_10;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Heatmap изображение */}
        {metric.frequency_heatmap && (
          <div className="md:w-1/2 flex items-center justify-center p-2">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={metric.frequency_heatmap}
                alt={`Heatmap для ${metric.layout_name || 'раскладки'}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* Разделитель для десктопов */}
        {metric.frequency_heatmap && (
          <div className="hidden md:block">
            <div className="w-px h-full bg-border" />
          </div>
        )}

        {/* Краткая информация о метриках */}
        <div className={`${metric.frequency_heatmap ? 'md:w-1/2' : 'w-full'} p-4`}>
          <div className="space-y-3">
            {/* Заголовок */}
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <h3 className="text-xl font-semibold">
                {metric.layout_name || `Layout ${metric.layout}`}
              </h3>
            </div>

            {/* Контекст: корпус и клавиатура */}
            <div className="text-sm text-muted-foreground">
              <div>Корпус: {metric.corpus_name || `#${metric.corpus}`}</div>
              <div>Клавиатура: {metric.keyboard_name || `#${metric.keyboard}`}</div>
            </div>

            {/* Основные метрики */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Travel Distance */}
              <div className="flex items-center gap-2">
                <Move className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Дистанция</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistance(metric.travel_distance)}
                  </div>
                </div>
              </div>

              {/* Баланс рук */}
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Баланс рук</div>
                  <div className="text-sm text-muted-foreground">
                    {formatPercentage(leftHandUsage)} / {formatPercentage(rightHandUsage)}
                  </div>
                </div>
              </div>

              {/* SFB */}
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">SFB</div>
                  <div className="text-sm text-muted-foreground">
                    {formatPercentage(metric.same_finger_bigram_frequency)}
                  </div>
                </div>
              </div>

              {/* SFS */}
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">SFS</div>
                  <div className="text-sm text-muted-foreground">
                    {formatPercentage(metric.same_finger_skipgram_frequency)}
                  </div>
                </div>
              </div>

              {/* Ножницы */}
              <div className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Ножницы</div>
                  <div className="text-sm text-muted-foreground">
                    {formatPercentage(metric.half_scissor_bigram_frequency + metric.full_scissor_bigram_frequency)}
                  </div>
                </div>
              </div>

              {/* Rolls */}
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Rolls</div>
                  <div className="text-sm text-muted-foreground">
                    {formatPercentage(metric.roll_frequency)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}