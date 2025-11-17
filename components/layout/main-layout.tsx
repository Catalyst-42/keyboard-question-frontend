import { SidebarNav } from './sidebar-nav';
import { MobileNav } from './mobile-nav';
import { ModeToggle } from '../ui/mode-toggle';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-3">
          <MobileNav />
          <div className="flex flex-1 items-center space-x-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold">KeyboardQuestion</h1>
              <ModeToggle />
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                {/* Здесь позже добавим поиск */}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <SidebarNav />
        </aside>

        {/* Page Content */}
        <main className="flex w-full flex-col overflow-hidden px-3">
          {children}
        </main>
      </div>
    </div>
  );
}