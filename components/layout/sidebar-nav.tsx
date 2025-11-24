'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Minus } from 'lucide-react';
import { navSections } from './nav-sections';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function SidebarNav() {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    () => navSections.map((s) => s.id)
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId]
    );
  };

  return (
    <div className="h-full overflow-y-auto relative">
      <div className="flex overscroll-contain h-full flex-col space-y-4 py-4">
        <div className="px-4 py-5">
          <div className="space-y-2">
            {navSections.map((section) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedGroups.includes(section.id);

              // Groups
              return (
                <div key={section.id} className="border-b-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-accent hover:text-accent-foreground px-3 py-2 h-auto"
                    onClick={() => toggleGroup(section.id)}
                  >
                    <div className="flex items-center gap-3 text-sm font-medium flex-1">
                      <SectionIcon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{section.title}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      )}
                    </div>
                  </Button>

                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out overflow-hidden",
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="min-h-0">
                      <div className="mt-1 space-y-1 pl-7">
                        {section.items.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;

                          // Each item in group
                          return (
                            <div key={item.href} className="relative">
                              {/* Vertical line for nested items */}
                              <div className="absolute -left-4 top-0 bottom-0 w-3.75 flex items-center justify-center">
                                <div className="w-0.5 h-full bg-border" />
                              </div>

                              {/* Link to page */}
                              <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                  "w-full justify-start relative z-10 px-3 py-2 h-auto",
                                  isActive && "bg-accent text-accent-foreground"
                                )}
                                asChild
                              >
                                <Link href={item.href}>
                                  <Icon className="mr-2 h-4 w-4 shrink-0" />
                                  <span className="text-sm">{item.title}</span>
                                </Link>
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}