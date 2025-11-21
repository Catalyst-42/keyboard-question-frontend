'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Keyboard, 
  Settings,
  BarChart3,
  BookText,
  Database,
  BookOpen,
  Info,
  Menu,
  Delete
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const databaseItems = [
  {
    title: "Корпуса",
    href: "/corpora",
    icon: BookText,
  },
  {
    title: "Раскладки",
    href: "/layouts",
    icon: Keyboard,
  },
  {
    title: "Клавиатуры",
    href: "/keyboards",
    icon: Settings,
  },
  {
    title: "Метрики",
    href: "/metrics",
    icon: BarChart3,
  },
];

const knowledgeItems = [
  {
    title: "О системе",
    href: "/about",
    icon: Info,
  },
  {
    title: "Метрики SFB/SFS",
    href: "/knowledge/sfb-sfs",
    icon: BookOpen,
  },
  {
    title: "Метрики Rolls",
    href: "/knowledge/rolls",
    icon: BookOpen,
  },
  {
    title: "Метрики Scissors",
    href: "/knowledge/scissors",
    icon: BookOpen,
  },
  {
    title: "Форм-факторы",
    href: "/knowledge/form-factors",
    icon: BookOpen,
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        {/* Header in Mobile Menu */}
        <div className="flex items-center gap-2 px-7 py-4 border-b">
          <Delete className="h-6 w-6" />
          <span className="text-lg font-bold">KeyboardQuestion</span>
        </div>
        
        {/* Group: Database */}
        <div className="space-y-1 p-2">
          <div className="px-4 py-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Database className="h-5 w-5" />
              База данных
            </div>
          </div>
          {databaseItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-5 w-5" />
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </div>

        <Separator className="my-2" />

        {/* Group: Knowledge */}
        <div className="space-y-1 p-2">
          <div className="px-4 py-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BookOpen className="h-5 w-5" />
              Знания
            </div>
          </div>
          {knowledgeItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-5 w-5" />
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}