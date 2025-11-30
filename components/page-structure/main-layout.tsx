import { ThemeToggle } from '@/components/theme/theme-toggle';
import { CircleDot, SquareDot } from 'lucide-react';
import { MobileNav } from './mobile-nav';
import { SidebarNav } from './sidebar-nav';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background shadow-xl">
        <div className="flex h-14 items-center">
          <MobileNav />

          <div className="hidden md:block">
            <Link href="/" className="flex items-center px-4.5 gap-3">
              {
                Math.random() < 0.05 ?
                  <CircleDot className="h-4 w-4 text-md font-bold" /> :
                  <SquareDot className="h-4 w-4 text-md font-bold" />
              }
              <span className="text-md font-bold">KeyboardQuestion</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end px-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 items-start sm:grid md:grid-cols-[300px_minmax(0,1fr)]">
        {/* Left panel */}
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <SidebarNav />
        </aside>

        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden px-4 sm:px-16">
          {children}
        </main>
      </div>
    </div>
  );
}
