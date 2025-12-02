import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { H1 } from '@/components/ui/typography';
import { BarChart3, GitCompare, Monitor, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const DESCRIPTION = `
## Описание

KeyboardQuestion - проект по сбору информации и исследованию способов проведения аналитики качества печати различных раскладок клавиатур.

Для улучшения точности вычисления метрик KeyboardQuestion использует при проведении аналитики не только данные о раскладке, но так же информацию о корпусе текстов, на котором набирается текст и форм фактор клавиатуры, определяющей расположение клавиш раскладке на реальной клавиатуре.
`;

const FREQUENCY_ANALYSIS = `
## Частотный анализ

Использование клавиш глобально не является равномерным. Хорошая раскладка использует эти данные чтобы вывести лучший способ набора текста. Ниже представлена тепловая карта использования клавиатуры в целом, собранная среди раскладок [ЙЦУКЕН](/layouts/1), [QWERTY](/layouts/10) и [Colemak](/layouts/12).
`;

const WHAT_NEXT = `
## Что дальше?

На этом сайте вы можете узнать, по каким параметрам мы определяем степень удобства использования раскладки, выяснить, какие раскладки являются наиболее эффективными, либо же просто посмотреть, какие различные раскладки вообще существуют.
`;

const SOURCE_CODE = `
## Исходный код

Проект состоит из трёх частей. Программы аналитики, бэкенд системы, хранящей результаты анализов и пользовательского приложения, позволяющего изучать и сравнивать полученные метрики клавиатур. Каждая из систем открыта и доступна на GitHub:

- [Анализатор](https://github.com/Catalyst-42/keyboard-question-analyzer)
- [Бэкенд](https://github.com/Catalyst-42/keyboard-question-backend)
- [Фронтенд](https://github.com/Catalyst-42/keyboard-question-frontend)
`;

export default function HomePage() {
  return (
    <div className="container py-8">
      <article className="space-y-6">
        <H1>Главная</H1>

        <div className="space-y-6">
          {/* Description */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {DESCRIPTION}
            </MarkdownRenderer>
          </section>

          {/* Usage preview */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {FREQUENCY_ANALYSIS}
            </MarkdownRenderer>

            <Card>
              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/frequency_mockup_ansi_60.png"
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

          {/* Actions */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {WHAT_NEXT}
            </MarkdownRenderer>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Get more info */}
              <Card className="flex flex-col h-full">
                <CardHeader className="grow">
                  <CardTitle>
                    <div className="flex gap-3">
                      <BarChart3 className="h-4 w-4" />
                      Изучить метрики
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Узнайте, что означает каждая метрика в разделе справки, почитайте информацию о биграммных и триграмных метриках, посмотрите примеры.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/reference/about-metrics">Узнать больше о метриках</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Search layouts */}
              <Card className="flex flex-col h-full">
                <CardHeader className="grow">
                  <CardTitle>
                    <div className="flex gap-3">
                      <Search className="h-4 w-4" />
                      Просмотреть раскладки
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Узнайте, для каких раскладок вычислены метрики и изучено их поведение. Просмотрите рендеры назначения клавиш и тепловые карты их использования.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/layouts">Просмотреть раскладки</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Compare layouts */}
              <Card className="flex flex-col h-full">
                <CardHeader className="grow">
                  <CardTitle>
                    <div className="flex gap-3">
                      <GitCompare className="h-4 w-4" />
                      Сравнить раскладки
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Сравните две раскладки по всем метрикам и узнайте, какая из них лучшая. Изучите динамику значений и узнайте, как сильно различаются конфигурации.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/compare-layouts">Сравнить раскладки</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Search programs */}
              <Card className="flex flex-col h-full">
                <CardHeader className="grow">
                  <CardTitle>
                    <div className="flex gap-3">
                      <Monitor className="h-4 w-4" />
                      Узнать о программах
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Если вы решили сменить свою раскладку на альтернативную, изучите список программного обеспечения, которое сможет помочь вам с этим делом
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/topics/programs">Узнать о программах</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Source code */}
          <section className="space-y-4">
            <MarkdownRenderer>
              {SOURCE_CODE}
            </MarkdownRenderer>
          </section>
        </div>
      </article>
    </div>
  );
}
