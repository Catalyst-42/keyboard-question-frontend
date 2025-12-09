'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { navSections } from './nav-sections';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const pathname = usePathname();

  // Toggle expansion state for navigation groups
  const toggleGroup = (groupId: string) => {
    setExpandedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId]
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center pl-2 gap-3">
          <Button
            variant="ghost"
            className="ml-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Открыть меню навигации</span>
          </Button>
          <span className="text-md font-bold md:hidden cursor-pointer">Меню</span>
        </div>

      </SheetTrigger>

      <SheetContent side="left" className="pr-0 flex flex-col">
        {/* Accessibility: Dialog title for screen readers */}
        <VisuallyHidden>
          <SheetTitle>Навигация по сайту</SheetTitle>
        </VisuallyHidden>

        {/* Mobile menu header with quick navigation text */}
        <div className="flex items-center px-5 py-4 shadow-xl shrink-0">
          <span className="text-md font-bold">Навигация по сайту</span>
        </div>

        {/* Scrollable navigation sections with collapsible groups */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1 py-2">
            {navSections.map((section, index) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedGroups.includes(section.id);
              const isLastSection = index === navSections.length - 1;

              return (
                <div key={section.id} className="px-2">
                  {/* Section group header with toggle button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-3 hover:bg-accent hover:text-accent-foreground my-1"
                    onClick={() => toggleGroup(section.id)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <SectionIcon className="h-5 w-5 shrink-0" />
                      <span className="flex-1 text-left text-sm font-medium">
                        {section.title}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      )}
                    </div>
                  </Button>

                  {/* Collapsible section content */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out overflow-hidden",
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="min-h-0">
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;

                          return (
                            <Button
                              key={item.href}
                              variant={isActive ? "secondary" : "ghost"}
                              className={cn(
                                "w-full justify-start gap-3 px-3 py-2 h-auto",
                                isActive && "bg-accent text-accent-foreground"
                              )}
                              asChild
                              onClick={() => setOpen(false)}
                            >
                              <Link href={item.href}>
                                <Icon className="h-5 w-5 shrink-0" />
                                <span className="text-sm">{item.title}</span>
                              </Link>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Separator between sections */}
                  {!isLastSection && <Separator className="my-2" />}
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
