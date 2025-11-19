import { Card, CardContent } from '@/components/ui/card';
import { Keyboard } from '@/api';
import { Keyboard as KeyboardIcon, Monitor, Grid3X3, FileText } from 'lucide-react';
import Image from 'next/image';

interface KeyboardCardProps {
  keyboard: Keyboard;
}

export function KeyboardCard({ keyboard }: KeyboardCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Превью клавиатуры - увеличенное с меньшими отступами */}
        {keyboard.keyboard_preview && (
          <div className="md:w-1/2 flex items-center justify-center px-2"> {/* Уменьшили отступы */}
            <div className="relative w-full aspect-[22/9]"> {/* Убрали max-w-xs для увеличения */}
              <Image
                src={keyboard.keyboard_preview}
                alt={`Превью ${keyboard.name}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* Разделитель для десктопов */}
        {keyboard.keyboard_preview && (
          <div className="hidden md:block">
            <div className="w-px h-full bg-border" />
          </div>
        )}

        {/* Информация - уменьшаем отступы и занимаем оставшееся пространство */}
        <div className={`${keyboard.keyboard_preview ? 'md:w-1/2' : 'w-full'} p-4`}> {/* Уменьшили отступы */}
          <div className="space-y-3"> {/* Уменьшили промежутки */}
            {/* Заголовок */}
            <div className="flex items-center gap-2">
              <KeyboardIcon className="h-5 w-5" />
              <h3 className="text-xl font-semibold">{keyboard.name}</h3>
            </div>

            {/* Характеристики */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> {/* Уменьшили промежутки */}
              <div className="flex items-center gap-2"> {/* Уменьшили gap */}
                <Monitor className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Форм-фактор</div>
                  <div className="text-sm text-muted-foreground">{keyboard.form_factor}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Клавиши</div>
                  <div className="text-sm text-muted-foreground">{keyboard.keys}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Ряды</div>
                  <div className="text-sm text-muted-foreground">{keyboard.rows}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0"> {/* Добавили для правильного обрезания текста */}
                  <div className="text-sm font-medium">Модель</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {keyboard.keyboard_model.split('/').pop()}
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