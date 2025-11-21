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
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

export function SidebarNav() {
  const pathname = usePathname();
  const [accordionValue, setAccordionValue] = useState<string[]>(['database', 'knowledge']);

  return (
    <ScrollArea className="h-full">
      <div className="flex h-full flex-col space-y-4 py-4">
        <div className="px-3 py-2">
          <Accordion 
            type="multiple" 
            value={accordionValue}
            onValueChange={setAccordionValue}
            className="space-y-2"
          >
            {/* Database group */}
            <AccordionItem value="database" className="border-b-0">
              <AccordionTrigger className="py-2 hover:no-underline">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Database className="h-[1.2rem] w-[1.2rem]" />
                  <span>База данных</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <div className="space-y-1">
                  {databaseItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href={item.href}>
                          <Icon className="mr-2 h-[1.2rem] w-[1.2rem]" />
                          {item.title}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Knowledge group */}
            <AccordionItem value="knowledge" className="border-b-0">
              <AccordionTrigger className="py-2 hover:no-underline">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="h-[1.2rem] w-[1.2rem]" />
                  <span>Знания</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <div className="space-y-1">
                  {knowledgeItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href={item.href}>
                          <Icon className="mr-2 h-[1.2rem] w-[1.2rem]" />
                          {item.title}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </ScrollArea>
  );
}