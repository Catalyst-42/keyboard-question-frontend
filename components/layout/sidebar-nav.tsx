'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Keyboard, 
  Settings,
  BarChart3,
  BookText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
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

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full">
      <div className="flex h-full flex-col space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}