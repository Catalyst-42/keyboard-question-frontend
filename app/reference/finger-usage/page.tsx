import { PlotFingerUsage } from '@/components/metric/plot-finger-usage';
import { Card, CardContent } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { H1 } from '@/components/ui/typography';
import Image from 'next/image';

const ABOUT = `
## Что измеряется
Когда мы говорим об использовании пальцев, то подразумеваем частоту нажатий пальцем клавиш. Чтобы напечатать корпус надо набрать определённые символы. В раскладке каждой клавише присвоены свои символы, которые она может генерировать, а так же палец, которым набирается эта клавиша. Использование клавиши - это частота, с которой повторяется нажатие этой клавиши среди всех. Один палец может набирать несколько разных клавиш, в свою очередь каждая клавиша может генерировать разные символы в зависимости от слоя (например заглавные и обычные буквы, или цифры и знаки пунктуации). Использование пальца - это суммарная корпусная частота всех символов, которые набираются этим пальцем. 

## Частотный анализ
На самом деле, когда мы говорим о частоте использования пальцев, то в первую очередь считаем частоту самих символов в корпусе, а потом просто группируем эти символы по пальцам. Ниже представлена тепловая карта раскладки ЙЦУКЕН. Процентами отмечена частота, с которой набираются буквы, которые представляет текущая клавиша раскладки. 
`;

const FASTTYPE_HEATMAP = `
Заметно, что символы \`ОАЕТНИ\` имеют очень высокую частотность. Поскольку снизить частотность использования самого символа мы не можем - она определяется корпусом языка - наша задача состоит в том, чтобы расставить символы на раскладке так, чтобы сбалансировать суммарную нагрузку, оказываемую на пальцы при печати. Достигается это разными способами, но основной замысел везде схож: хорошей раскладкой является та, у которой самые часто используемые буквы находятся близко к домашнему ряду. В качестве примера такой хорошей раскладки может подойти [Скоропись](/layouts/11). Ниже представлена тепловая карта раскладки. Заметно, что наиболее горячие места равномерно распределены между руками и сливаются к центре. 
`

const FASTTYPE_HEATMAP_APPENDIX = `
Определённого компромисса не существует. Кому-то удобнее печатать наиболее сильными пальцами, кто-то предпочитает распределить нагрузку на все. 
`

const FREQUENCY_ANALYSIS = `
## Бонус: частотный анализ

Использование клавиш глобально не является равномерным. Хорошая раскладка использует эти данные чтобы вывести лучший способ набора текста. Ниже представлена тепловая карта использования клавиатуры в целом, собранная среди раскладок [ЙЦУКЕН](/layouts/1), [QWERTY](/layouts/10) и [Colemak](/layouts/12). На графике вместо раскладок отображены коды используемых клавиш раскладки [ANSI](/keyboards/1).
`;

// Diaries ANSI 60
const JCUKEN_FINGER_USAGE = {
  finger_usage_1: 0.04150116996277028,
  finger_usage_2: 0.03993086934938897,
  finger_usage_3: 0.10730044022925495,
  finger_usage_4: 0.303634118465561,
  finger_usage_5: 0.0,
  finger_usage_6: 0.0,
  finger_usage_7: 0.3489322945656697,
  finger_usage_8: 0.06519493300425856,
  finger_usage_9: 0.041982388931502704,
  finger_usage_10: 0.05152378549159385,
}

const FASTTYPE_FINGER_USAGE = {
  finger_usage_1: 0.02952498429090887,
  finger_usage_2: 0.08299649075461761,
  finger_usage_3: 0.11071044665209141,
  finger_usage_4: 0.26180600203390303,
  finger_usage_5: 0.0,
  finger_usage_6: 0.0,
  finger_usage_7: 0.2079072962321678,
  finger_usage_8: 0.12907314782155133,
  finger_usage_9: 0.09174768774407834,
  finger_usage_10: 0.08623394447068161,
}

const makeFingerUsageData = (m: any) => m ? [
  { finger: '1', usage: m.finger_usage_1, hand: 'left' },
  { finger: '2', usage: m.finger_usage_2, hand: 'left' },
  { finger: '3', usage: m.finger_usage_3, hand: 'left' },
  { finger: '4', usage: m.finger_usage_4, hand: 'left' },
  { finger: '5', usage: m.finger_usage_5, hand: 'left' },
  { finger: '6', usage: m.finger_usage_6, hand: 'right' },
  { finger: '7', usage: m.finger_usage_7, hand: 'right' },
  { finger: '8', usage: m.finger_usage_8, hand: 'right' },
  { finger: '9', usage: m.finger_usage_9, hand: 'right' },
  { finger: '10', usage: m.finger_usage_10, hand: 'right' },
] : [];

export default function Page() {
  return (
    <div className="container py-8">
      <article className="space-y-6">
        <H1>Использование пальцев</H1>

        <div className="space-y-6">
          {/* About metrics */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {ABOUT}
            </MarkdownRenderer>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              {/* JCUKEN heatmap */}
              <div className="xl:col-span-3">
                <Card>
                  <CardContent>
                    <div className="relative w-full aspect-23/9">
                      <Image
                        src="/media/heatmap_jcuken.png"
                        alt="Тепловая карта ЙЦУКЕН для корпуса дневников"
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 2048px) 100vw, 66vw"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Jcuken finger usage */}
              <div className="xl:col-span-2">
                <PlotFingerUsage
                  fingerUsageData={makeFingerUsageData(JCUKEN_FINGER_USAGE)}
                  title="ЙЦУКЕН: использование пальцев"
                />
              </div>
            </div>

            {/* Fasttype */}
            <MarkdownRenderer>
              {FASTTYPE_HEATMAP}
            </MarkdownRenderer>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              {/* Fasttype finger usage */}
              <div className="xl:col-span-2">
                <PlotFingerUsage
                  fingerUsageData={makeFingerUsageData(FASTTYPE_FINGER_USAGE)}
                  title="Скоропись: использование пальцев"
                />
              </div>
              {/* Fasttype heatmap */}
              <div className="xl:col-span-3">
                <Card>
                  <CardContent>
                    <div className="relative w-full aspect-23/9">
                      <Image
                        src="/media/heatmap_fasttype.png"
                        alt="Тепловая карта Скорописи для корпуса дневников"
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 2048px) 100vw, 66vw"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Appendix */}
            <MarkdownRenderer>
              {FASTTYPE_HEATMAP_APPENDIX}
            </MarkdownRenderer>
          </section>

          {/* Frequency analysys */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {FREQUENCY_ANALYSIS}
            </MarkdownRenderer>

            <Card>
              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/heatmap_keyboard.png"
                    alt="Частотный анализ клавиатуры"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 2048px) 100vw, 66vw"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </article>
    </div>
  );
}
