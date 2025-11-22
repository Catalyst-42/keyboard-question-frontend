import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">404 — Страница не найдена</h1>
      <p className="mt-3 text-base text-muted-foreground max-w-xl text-center">
        Запрашиваемая страница не найдена или была перемещена. Возможно, вы ввели неправильный URL.
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
}
