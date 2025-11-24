import { Card, CardContent } from '@/components/ui/card';
import { Keyboard } from '@/api';
import { Keyboard as KeyboardIcon, Monitor, Grid3X3, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface KeyboardCardProps {
  keyboard: Keyboard;
}

export function KeyboardCard({ keyboard }: KeyboardCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Keyboard preview */}
        {keyboard.keyboard_preview && (
          <div className="md:w-1/2 flex items-center justify-center p-2">
            <div className="relative w-full aspect-video">
              <Image
                src={keyboard.keyboard_preview}
                alt={`Preview ${keyboard.name}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* Divider for desktops */}
        {keyboard.keyboard_preview && (
          <div className="hidden md:block">
            <div className="w-px h-full bg-border" />
          </div>
        )}

        {/* Info */}
        <div className={`${keyboard.keyboard_preview ? 'md:w-1/2' : 'w-full'} p-4`}>
          <div className="space-y-3">
            {/* Title */}
            <div className="flex items-center gap-2">
              <KeyboardIcon className="h-5 w-5" />
              <Link 
                href={`/keyboards/${keyboard.id}`}
                className="text-xl font-semibold hover:text-primary transition-colors"
              >
                {keyboard.name}
              </Link>
            </div>

            {/* Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <div className="text-sm font-medium">Form factor</div>
                  <div className="text-sm text-muted-foreground">{keyboard.form_factor}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Grid3X3 className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <div className="text-sm font-medium">Keys</div>
                  <div className="text-sm text-muted-foreground">{keyboard.keys}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Grid3X3 className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <div className="text-sm font-medium">Rows</div>
                  <div className="text-sm text-muted-foreground">{keyboard.rows}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium">Model</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {keyboard.keyboard_model.split('/').pop()}
                  </div>
                </div>
              </div>
            </div>

            {/* Link to detail page */}
            <div className="pt-2">
              <Link 
                href={`/keyboards/${keyboard.id}`}
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                More about this keyboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}