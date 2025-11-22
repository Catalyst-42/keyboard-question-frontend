'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Delete } from 'lucide-react';
import { navSections } from './nav-sections';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Separator } from '@/components/ui/separator';

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
        {/* Accessibility: DialogTitle for screen readers */}
        <VisuallyHidden>
          <SheetTitle>Меню навигации</SheetTitle>
        </VisuallyHidden>

        {/* Header in Mobile Menu */}
        <div className="flex items-center gap-2 px-4 py-4 border-b">
          <Delete className="h-5 w-5" />
          <span className="text-lg font-bold">KeyboardQuestion</span>
        </div>

        {/* Display all groups */}
        {navSections.map((section) => {
          const SectionIcon = section.icon;

          return (
            <div key={section.id} className="space-y-1 p-2">
              <div className="px-4 py-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <SectionIcon className="h-5 w-5" />
                  <span className="ml-2">{section.title}</span>
                </div>
              </div>

              {/* Items in group */}
              {section.items.map((item) => {
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
                      <Icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  </Button>
                );
              })}
              <Separator className="my-2" />
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}