import { PlotRowUsage } from '@/components/metric/plot-row-usage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { H1 } from '@/components/ui/typography';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

const ABOUT = `
## На свою задачу свой ряд
Термин ряда имеет отношение в первую очередь к клавиатуре, на которой проводится набор текста. Так или иначе, все клавиатуры обладают числом рядов не превышающее 7. Полная клавиатура со всеми используемыми рядами представлена ниже. 
`

const MORE_INFO = `
Согласно стандарту [W3C](https://www.w3.org/TR/uievents-code/) ряды нумеруют снизу вверх латинскими буквами от \`A\` до \`E\`. При этом самый верхний уровень, содержащий функциональные клавиши, называется рядом \`K\`. При начале набора текста обе руки следует располагать на домашнем ряду. Домашним рядом считается ряд \`C\`. Исходно производители клавиатур полагают, что пользователь будет набирать текст следуя слепому десятипальцевому методу набора, поэтому на английских клавишах \`F\` и \`J\` (Русские \`А\` и \`О\`) на большинстве клавиатур есть насечки, помогающие наборщику не глядя на клавиатуру нащупывать домашний ряд указательными пальцами.  Ряд \`D\` - верхний для букв. Ряд \`B\` - нижний. Ряд \`E\` обычно содержит цифры и знаки пунктуации. Ряд \`A\` используется код контрольные клавиши. 

## Использование рядов
Хорошая раскладка должна уменьшать нагрузку на руки. Если мы смотрим на использование рядов, то оптимальное распределение частот использования рядов должно быть следующим: \`C\` > \`D\` > \`E\` > \`B\`.  Желательно, чтобы при печати преоблада домашний ряд. Среди верхнего и нижнего буквенного ряда следует предпочитать верхний. Причиной тому служит использование пальцев: куда легче вытянуть палец вверх или протянуть чуть дальше, чем согнуть почти до основания, чтобы дотянуться до нижнего ряда. 

Современные раскладки активно располагают самые часто используемые клавиши на домашний ряд, зачастую разделяя их на блоки. Например Dvorak создаёт два блока - гласные символы находятся слева, а согласные - справа. Ниже превью раскладки и частота использования рядов. 
`;

// ANSI 60 English
const DVORAK_ROW_USAGE = {
  row_usage_k: 0.0,
  row_usage_e: 0.0023968767163077254,
  row_usage_d: 0.23146449428179972,
  row_usage_c: 0.6786133009155791,
  row_usage_b: 0.08752532808631337,
  row_usage_a: 0.0,
}

const makeRowUsageData = (m: any) => m ? [
  { row: 'K', usage: m.row_usage_k },
  { row: 'E', usage: m.row_usage_e },
  { row: 'D', usage: m.row_usage_d },
  { row: 'C', usage: m.row_usage_c },
  { row: 'B', usage: m.row_usage_b },
  { row: 'A', usage: m.row_usage_a },
] : [];

export default function Page() {
  return (
    <div className="container py-8">
      <article className="space-y-6">
        <H1>Использование рядов</H1>

        <div className="space-y-6">
          {/* Naming */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {ABOUT}
            </MarkdownRenderer>

            <Card>
              <CardContent>
                <div className="relative w-full aspect-32/9">
                  <Image
                    src="/media/rows_ansi_100.png"
                    alt="Превью ANSI 100% с подписью рядов"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 2048px) 100vw, 66vw"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* More info */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {MORE_INFO}
            </MarkdownRenderer>
          </section>


          {/* Preview and row usage */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

            {/* Dvorak preview */}
            <div className="xl:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    <div className="flex gap-3">
                      <ImageIcon className='w-4 h-4' />
                      Превью раскладки Dvorak
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-hidden rounded-md aspect-23/9">
                    <Image
                      src="/media/rows_dvorak.png"
                      alt="Dvorak ANSI 60"
                      fill
                      className="object-contain"
                      sizes="(max-width: 2048px) 100vw, 66vw"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Row usage plot */}
            <div className="xl:col-span-2">
              <PlotRowUsage
                rowUsageData={makeRowUsageData(DVORAK_ROW_USAGE)}
              />
            </div>

          </div>
        </div>
      </article>
    </div>
  );
}
