"use client";

import { PlotFingerDistance } from '@/components/metric/plot-finger-distance';
import { Card, CardContent } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import TwoColumnResponsive from '@/components/ui/two-column-responsive';
import { H1 } from '@/components/ui/typography';
import Image from 'next/image';

const ABOUT = `
## Перемещение рук
Числовые метрики дистанции определены в условных единицах - юнитах (u). Один юнит определён как ширина обычной клавиши клавиатуры. Русская клавиша \`о\` на клавиатуре ANSI, ISO и Matrix имеет стандартный размер. В таком случае если вы набираете пару символов \`ор\` на раскладке [ЙЦУКЕН](/layouts/1) то ваш правый указательный палец пройдёт дистанцию равную 1u при наборе.

Для метрик дистанция вычисляется как средняя, необходимая для набора одного символа. Если вы видите среднюю дистанцию рук для раскладки равную 1u - это означает следующее: в среднем чтобы напечатать один символ на этой раскладке, надо передвинуть какой-то палец на расстояние одной обычной клавиши. Зачастую так бывает, что средняя дистанция меньше единицы - почему так происходит? Дело в том, что движок анализатора набирает текст всеми десятью пальцами, используя метод слепой печати, и часто выходит так, что двигать руками почти не надо.

## Пример
Посмотрим, как движок напишет русское слово \`привет\` используя раскладку [ЙЦУКЕН](/layouts/1).
`;

const EXAMPLE = `
Первым делом анализатор положит руки на домашний ряд. Каждый палец займёт свою букву. Левая рука будет лежать на символах \`фыва\`, правая рука на символах \`олдж\`. Чтобы напечатать символ \`п\`, надо передвинуть левый указательный палец вправо на 1u. Дальше наберём символ \`р\`, для этого передвинем правый указательный палец на 1u влево. Теперь символ \`и\`, для его набора указательный палец левой руки сдвигается вниз ещё примерно на 1.1u. Дальше идёт буква \`в\`. Но наш левый средний палец находится уже на ней, поэтому его перемещение составляет 0u. Затем надо набрать букву \`е\`. Для этого мы переместим левый указательный палец с клавиши \`и\` к клавише \`е\` на расстояние 2.15u. Осталось набрать букву \`т\`, для этого передвинем левый указательный ещё на 1.1u.

Итого суммарное перемещение при наборе слова \`привет\` составило 7.51u. Всё слово состоит из 6 символов. Поделим общую дистанцию на 6 чтобы получить среднее перемещение пальца, необходимое для набора одного символа, получим значение в 1.3u. Такое нормализованное относительно корпуса и клавиатуры значение позволяет нам проводить межкорпусный и межклавиатурный анализ дистанций печати. 

В примере заметно, что текст набирается практически только указательными пальцами обоих рук, при этом остальные пальцы бездействуют при печати. Это не всегда хорошо, ведь указательные пальцы от такой нагрузки со временем сильно устанут. 
`

const EACH_FINGER = `
## Как бывает
Система учитывает перемещение каждого пальца в отдельности, а потом находит общую дистанцию, суммируя полученные значения. В классических раскладках динамика перемещения рук выглядит пирамидкой, в которой обычно указательные пальцы совершают больше всего движений, а мизинцы меньше. Существует несколько подход к огранизации перемещения, но лучшим считается тот, при котором все пальцы перемещаются на сравнительно одинаковую дистанцию. Такой подход балансирует перемещение между всеми пальцами и снижает общую нагрузку. 

В примере ниже представлены графики дистанции пальцев для раскладки [ЙЦУКЕН](/layouts/1) и для раскладки [Vestnik](layouts/8). Пока на [ЙЦУКЕН](/layouts/1) в работе учавствуют два указатлеьных пальца, [Vestnik](/layouts/8) печатает всеми сразу. 
`

const LANGUAGE_MATTERS = `
## Язык важен
Если вы решите сравнить раскладки между разными корпусами то сможете обнаружить интересную особеннсоть. В среднем дистанция пальцев среди русских и английских корпусов различается. Связано это с тем, что русский язык в отличие от английского содержит больше символов. Большее число букв в алфавите уменьшает частоту повторов (когда палец уже лежит на клавише, которую надо нажать), поэтому в среднем печатать на русском языке более турдозатратно по дистанции, чем на английском. 
`;

// Computed for ANSI 60 and Russian corpus
const JCUKEN_DISTANCE = {
  travel_distance: 1.1285922507524684,
  travel_distance_finger_1: 0.03815708210617643,
  travel_distance_finger_2: 0.025749821145093926,
  travel_distance_finger_3: 0.11539521586547262,
  travel_distance_finger_4: 0.37931954703588694,
  travel_distance_finger_5: 0.0,
  travel_distance_finger_6: 0.0,
  travel_distance_finger_7: 0.4642787375880808,
  travel_distance_finger_8: 0.04939350966835328,
  travel_distance_finger_9: 0.01678226853597721,
  travel_distance_finger_10: 0.03951606880742705,
};

const VESTNIK_DISTANCE = {
  travel_distance: 0.8513859559208218,
  travel_distance_finger_1: 0.034117715941839544,
  travel_distance_finger_2: 0.10984924671655942,
  travel_distance_finger_3: 0.14384055326710532,
  travel_distance_finger_4: 0.13417050896421878,
  travel_distance_finger_5: 0.0,
  travel_distance_finger_6: 0.0,
  travel_distance_finger_7: 0.10477666979094157,
  travel_distance_finger_8: 0.1307476616468874,
  travel_distance_finger_9: 0.08422949526583018,
  travel_distance_finger_10: 0.10965410432743962,
};

const makeFingerDistanceData = (m: any) => m ? [
  { finger: '1', distance: m.travel_distance_finger_1, hand: 'left' },
  { finger: '2', distance: m.travel_distance_finger_2, hand: 'left' },
  { finger: '3', distance: m.travel_distance_finger_3, hand: 'left' },
  { finger: '4', distance: m.travel_distance_finger_4, hand: 'left' },
  { finger: '5', distance: m.travel_distance_finger_5, hand: 'left' },
  { finger: '6', distance: m.travel_distance_finger_6, hand: 'right' },
  { finger: '7', distance: m.travel_distance_finger_7, hand: 'right' },
  { finger: '8', distance: m.travel_distance_finger_8, hand: 'right' },
  { finger: '9', distance: m.travel_distance_finger_9, hand: 'right' },
  { finger: '10', distance: m.travel_distance_finger_10, hand: 'right' },
] : [];

export default function Page() {
  return (
    <div className="container py-8">
      <article className="space-y-6">
        <H1>Дистанция рук</H1>

        <div className="space-y-6">
          <section className="space-y-4">
            <MarkdownRenderer>
              {ABOUT}
            </MarkdownRenderer>
          </section>

          {/* Example */}
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/type_hello.gif"
                    alt="Набор слова привет на клавиатуре ANSI и раскладке ЙЦУКЕН"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 2048px) 100vw, 66vw"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="space-y-4">
            <MarkdownRenderer>
              {EXAMPLE}
            </MarkdownRenderer>
          </section>


          {/* Each finger is used */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {EACH_FINGER}
            </MarkdownRenderer>
          </section>

          {/* Distance for JCUKEN and Vestnik */}
          <section className="space-y-4">
            <TwoColumnResponsive
              left={
                <PlotFingerDistance
                  fingerDistanceData={makeFingerDistanceData(JCUKEN_DISTANCE)}
                  totalTravelDistance={JCUKEN_DISTANCE.travel_distance}
                  title="ЙЦУКЕН: дистанция пальцев"
                />
              }
              right={
                <PlotFingerDistance
                  fingerDistanceData={makeFingerDistanceData(VESTNIK_DISTANCE)}
                  totalTravelDistance={VESTNIK_DISTANCE.travel_distance}
                  title="Vestnik: дистанция пальцев"
                />
              }
            />
          </section>

          {/* Language matters */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {LANGUAGE_MATTERS}
            </MarkdownRenderer>
          </section>

        </div>
      </article>
    </div>
  );
}
