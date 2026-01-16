import { MetricCard } from '@/components/metric/metric-card';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { H1 } from '@/components/ui/typography';
import { formatPercentage, formatUnits } from '@/lib/utils';
import { AlertCircle, FlaskConical, Move } from 'lucide-react';

const ABOUT_METRICS = `
## Что это вообще такое
Для определения удобства печати на выбранной раскладки мы используем различные метрики. Метрика - это численный показатель, определённый для раскладки в рамках выбранного корпуса языка и определённого форм-фактора клавиатуры.

## Как читать метрики
Карточка метрики показывает текущее значение для раскладки, а так же фоном лимит значения и его место среди всех метрик. Ниже отображается пример случайной метрики. Фоновая заливка определяет, насколько текущее значение минимально или максимально. Предельные значения имеют обводку. Левая карточка ниже говорит, что значение метрики чуть ниже среднего (потому что заливка фона сильно ниже среднего значения). Правая карточка говорит, что значение метрики максимально - потому что заливка полная и есть обводка. 
`;

const COMPARE_METRICS = `
При сравнении метрик двух раскладок включается режим разности. В этом режиме две метрики будут высчитывать разницу значений между друг другом. В примере ниже видно, что левый показатель больше правого на 42%. Это существенная разница. Однако будьте внимательны: некоторые параметры тем лучше чем ниже, например показатели однопальцевых биграмм. 
`;

const WHY_CORPORA_AND_KEYBOARD = `
## Зачем нужны корпуса и клавиатуры
Зачастую анализатор, который вычисляет метрику, устанавливает лишь один корпус и одну клавиатуру для проведения аналитики, например, как это делает [Layouts Wiki](https://layouts.wiki): использует только корпус текстов Reddit и форм фактор матричной либо классической клавиатуры. Подобный подход может быть эффективным, но иногда его бывает недостаточно. Например вы хотите узнать, насколько хороша выбранная раскладка для набора программного кода. Корпус Reddit для решения этой задачи не подойдёт, потому что он не содержит примеров самого кода. Поэтому в системе KeyboardQuestion все параметры уточнены корпусами. То же свойство касается и клавиатур, ведь они тоже могут влиять на показатели, особенно показатели дистанции рук и растяжение пальцев. 
`;

export default function Page() {
  return (
    <div className="container py-8">
      <article className="space-y-6">
        <H1>О метриках</H1>

        <div className="space-y-6">
          {/* About metrics */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {ABOUT_METRICS}
            </MarkdownRenderer>
          </section>

          {/* Common metrics cards */}
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title='Важная метрика'
              description='Используется в качестве примера'
              value={formatPercentage(0.0842)}
              icon={FlaskConical}
              min={0}
              max={0.42}
              current={0.0842}
            />
            <MetricCard
              title='Предельная метрика'
              description='Очень высокий показатель'
              value={formatUnits(0.8 * 0.42)}
              icon={AlertCircle}
              min={0}
              max={0.8 * 0.42}
              current={0.8 * 0.42}
            />
          </div>

          {/* Diff mode */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {COMPARE_METRICS}
            </MarkdownRenderer>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title='Неудобная раскладка'
              description='Дистанция больше единицы - крайне плохо'
              value={formatUnits(1.28)}
              icon={Move}
              min={0.4}
              max={1.55}
              current={1.28}
              diffMode
              referenceValue={0.858}
            />
            <MetricCard
              title='Удобная раскладка'
              description='Руки не так много двигаются'
              value={formatUnits(0.858)}
              icon={Move}
              min={0.4}
              max={1.55}
              current={0.858}
              diffMode
              referenceValue={1.28}
            />
          </div>

          {/* Why corpora and keyboard */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {WHY_CORPORA_AND_KEYBOARD}
            </MarkdownRenderer>
          </section>
        </div>
      </article>
    </div>
  );
}
