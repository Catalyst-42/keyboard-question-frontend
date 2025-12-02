import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { H1 } from '@/components/ui/typography';
import Image from 'next/image';

const ABOUT_PROGRAMS = `
## О программах
Если вы решили сменить раскладку вашей клавиатуры, то для разрешения этой задачи существует несколько различных способов. Наиболее простой и распространённый: поменять раскладку в настройках операционной системы. Сейчас практически все операционные системы поддерживают достаточно большой список альтернативных раскладок. Самые частые раскладки можно изменить прямо там. В этот список обычно входят следующие типы:

- Русские
  - [ЙЦУКЕН](/layouts/1) 
  - [ПК](/layouts/4)
  - [Фонетическая](/layouts/5)
- Английские
  - [QWERTY](/layouts/10) 
  - [Dvorak](/layouts/13)
  - [Colemak](/layouts/12) 

## Если нужна редкая раскладка
Однако же если вы желаете поставить себе какую-то необычную раскладку, то дело становиться чуть сложнее, ведь списки заранее заданных раскладок могут ваш вариант не содержать. В таком случае необходимо либо обратиться к разработчику кастомной раскладки за файлом конфигурации, либо создать его своими руками. 

В первую очередь всегда постарайтесь сначала найти файл раскладки уже созданный. Обычно файлы прилагаются на тематических сайтах. В альтернативном случае создавать раскладку придётся самостоятельно. Для этого существует несколько программ. 

## Программное обеспечение
Приложения для смены раскладки глобально можно поделить на два типа: перехватывающие и внутренние. Внутренние программы создают файл раскладки сразу для операционной системы. Перехватывающие программы встраиваются между операционной системой и вашим вводом. Такие программы могут предоставлять больший функционал (например, вызов макросов), однако теоретически могут перехватывать ваш ввод. Поэтому рекомендуется крайне аккуратно подходить к выбору программ перехватчиков, ведь они могут скомпрометировать ваши личные данные. 

## Программы внутреннего типа
Наиболее популярные программы назначения клавиш внутреннего типа следующие: 

- macOS [Ukelele](https://software.sil.org/ru/ukelele/)
- Windows [MSKLC](https://www-microsoft-com.translate.goog/en-us/download/details.aspx?id=102134&_x_tr_sl=en&_x_tr_tl=ru&_x_tr_hl=ru&_x_tr_pto=sc)
- Linux [XKeyCaps](https://www.jwz.org/xkeycaps/)

`;

const OTHER_PROGRAMS = `
## Программы перехватывающего типа
Известные программы перехватывающего типа следующие: 

- Кросcплатформенные
	- [Kanata](https://github.com/jtroo/kanata)
- macOS
	- [Karabiner-Elements](https://karabiner-elements.pqrs.org)
- Windows
	- [AutoHotKey](https://www.autohotkey.com)
	- [EPKL](https://github.com/DreymaR/BigBagKbdTrixPKL)

Перехыватывающие программы так же могут быть использованы для модификации существующих раскладок. Например для переопределния работы определённых клавиш. 
`

export default function Page() {
  return (
    <div className="container py-8">
      <article className="space-y-6">
        <H1>Программы</H1>

        <div className="space-y-6">
          <section className="space-y-4">
            <MarkdownRenderer>
              {ABOUT_PROGRAMS}
            </MarkdownRenderer>
          </section>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Get more info */}
            <Card>
              <CardHeader>
                <CardTitle>
                  macOS Ukelele
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/ukelele.png"
                    alt="Ukelele"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 2048px) 100vw, 66vw"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Windows MSKLC
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="relative w-full aspect-23/9">
                  <Image
                    src="/media/msklc.png"
                    alt="MSKLC"
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
              {OTHER_PROGRAMS}
            </MarkdownRenderer>
          </section>

        </div>
      </article>
    </div>
  );
}
