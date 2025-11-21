import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, BookOpen, BarChart3, Database } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Info className="h-8 w-8" />
            <h1 className="text-4xl font-bold">О системе</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Система для анализа и сравнения клавиатурных раскладок на основе объективных метрик
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Database className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>База данных</CardTitle>
              <CardDescription>Корпуса, раскладки, клавиатуры и метрики</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Обширная база данных с информацией о различных корпусах текстов, 
                клавиатурных раскладках и их метриках эффективности.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Анализ метрик</CardTitle>
              <CardDescription>Объективные показатели эффективности</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Система вычисляет множество метрик: SFB, SFS, Rolls, Scissors и другие 
                для комплексной оценки раскладок.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>База знаний</CardTitle>
              <CardDescription>Статьи и документация</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Подробные статьи о методологии вычисления метрик и принципах 
                работы клавиатурных раскладок.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Основные возможности</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Сравнение раскладок</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Табличное сравнение метрик</li>
                  <li>• Фильтрация по корпусам и клавиатурам</li>
                  <li>• Сортировка по различным параметрам</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Визуализация данных</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Графики использования пальцев и рядов</li>
                  <li>• Heatmap частотности символов</li>
                  <li>• Диаграммы распределения нагрузки</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}