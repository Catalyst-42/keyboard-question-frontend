import { Card, CardContent } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { H1 } from '@/components/ui/typography';
import Image from 'next/image';

const ABOUT = `
## Что такое триграмма
Триграмма - это тройка символов, набираемая последовательно. Например, в слове \`каша\` две триграммы: \`каш\` и \`аша\`. Триграммы определяются корпусом текста, который набирается раскладкой. В системе KeyboardQuestion следующие метрики вычисляются с использованием триграмм: 

- Роллинг
- Чередование
- Полный роллинг / Одноручники
- Редиректы
`

const ROLLING = `
## Роллинг
Триграмма подпадает под роллинг, когда набирается перекатыванием пальцев. Триграмма является двойным роллом (2Roll или просто Roll) когда она две соседние клавиши набираются разными пальцами одной руки, а третья клавиша - пальцем другой руки. Например роллингом является триграмма \`вал\`. Роллинг является крайне приятным, поэтому раскладки стараются увеличить число роллов. 
`

const ONEHAND = `
## Полный роллинг
Частным и редким случаем сущестует полный ролл (3Roll или Onehand - одноручник) - комбинация, при которой все три символа триграммы набираются разными пальцами одной руки, при этом направление печати не прерывается. Например, триграмма \`зло\`. Одноручные триграммы являются крайне редкими, зато набирать их крайне приятно. 
`

const ALTERNATE = `
## Чередование
Альтернативой роллингу является чередование: принцип при котором первый и последний символ триграммы набираются одной рукой, а второй символ - другой. Пример триграммы чередования (Alternate - чередование): \`нет\`, \`нат\`, \`щур\`. Чередование вступает в конфликт с метриками роллинга, поэтому принято выделять два типа клавиатур: с преобладанием роллинга, или с преобладанием чередования. Лучшего показателя нет, сам пользователь решает, как ему удобнее набирать текст. 
`

const ALTERNATE_APPENDIX = `
Показатели роллинга и чередования являются положительными: чем выше показатель, тем лучше. Отличным примером раскладки с высоким роллингом является [Canary](/layouts/17). Типичная же раскладка с высоким чередованием: [Dvorak](/layouts/13). Если в корпусе языка много символов, то удобнее для оптимизации использовать чередование рук при наборе. Если же символов немного, то роллинг оказывается крайне полезным. 
`

const REDIRECTS = `
## Редиректы
Редирект является тёмной противоположностью метрики полного роллинга. Триграмма является редиректом если все символы тройки набраны одной рукой, но так, что первые два символа набраны в одном направлении, а последние два в другом. Пример редиректа: \`явы\`, \`вея\`. Эта метрика является отрицательной. Чем меньше её значение, тем лучше для печати. 
`;

export default function Page() {
  return (
    <div className="container py-8">
      <article className="space-y-6">
        <H1>Триграммные метрики</H1>

        <div className="space-y-6">
          {/* About metrics */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {ABOUT}
            </MarkdownRenderer>
          </section>

          {/* Rolling */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {ROLLING}
            </MarkdownRenderer>

            <Card>
              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/trigrams/rolling.png"
                    alt="Пример роллинга триграммы вал"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 2048px) 100vw, 66vw"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Onehand */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {ONEHAND}
            </MarkdownRenderer>

            <Card>
              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/trigrams/onehand.png"
                    alt="Пример одноручной триграммы"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 2048px) 100vw, 66vw"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Onehand */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {ONEHAND}
            </MarkdownRenderer>

            <Card>
              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/trigrams/onehand.png"
                    alt="Пример одноручной триграммы"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 2048px) 100vw, 66vw"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Alternate */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {ALTERNATE}
            </MarkdownRenderer>

            <Card>
              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/trigrams/alternate.png"
                    alt="Пример чередования при печати триграммы нет"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 2048px) 100vw, 66vw"
                  />
                </div>
              </CardContent>
            </Card>

            <MarkdownRenderer>
              {ALTERNATE_APPENDIX}
            </MarkdownRenderer>
          </section>

          {/* Redirects */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {REDIRECTS}
            </MarkdownRenderer>

            <Card>
              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/trigrams/redirect.png"
                    alt="Пример редиректа при печати триграммы явы"
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
