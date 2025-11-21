import { SidebarNav } from './sidebar-nav';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Delete } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50  border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-14 items-center">
          <MobileNav />

          <div className="flex items-center px-4 gap-2 mr-4">
            <Delete className="h-[1.2rem] w-[1.2rem]" />
            <span className="text-md font-bold">KeyboardQuestion</span>
          </div>

          <div className="flex flex-1 items-center justify-end px-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Left panel */}
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <SidebarNav />
        </aside>

        {/* Page Content */}
        <main className="flex w-full flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}