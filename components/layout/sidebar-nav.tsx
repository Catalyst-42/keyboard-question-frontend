'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { navSections } from './nav-sections';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function SidebarNav() {
  const pathname = usePathname();
  const [accordionValue, setAccordionValue] = useState<string[]>(() => navSections.map((s) => s.id));

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
            {navSections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <AccordionItem key={section.id} value={section.id} className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <SectionIcon className="h-[1.2rem] w-[1.2rem]" />
                      <span>{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1">
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Button
                            key={item.href}
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                          >
                            <Link href={item.href}>
                              {/* <Icon className="mr-2 h-[1.2rem] w-[1.2rem]" /> */}
                              {item.title}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </ScrollArea>
  );
}