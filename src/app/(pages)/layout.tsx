'use client';
import { Header } from '@/components/header';
import { MainSidebar } from '@/components/main-sidebar';
import { SecondarySidebar } from '@/components/secondary-sidebar';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/nav-links';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSecondarySidebarOpen, setSecondarySidebarOpen] = useState(true);

  const activeModule = useMemo(
    () =>
      navLinks.find(
        (link) => link.href !== '/dashboard' && pathname.startsWith(link.href)
      ),
    [pathname]
  );

  const hasSecondarySidebar =
    !!activeModule?.subLinks && activeModule.subLinks.length > 0;

  const toggleSecondarySidebar = () => {
    setSecondarySidebarOpen((prev) => !prev);
  };

  const finalIsOpen = hasSecondarySidebar && isSecondarySidebarOpen;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MainSidebar />
      <SecondarySidebar isOpen={finalIsOpen} />
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 ease-in-out',
          finalIsOpen ? 'sm:pl-72' : 'sm:pl-16'
        )}
      >
        <Header
          toggleSidebar={toggleSecondarySidebar}
          hasSecondarySidebar={hasSecondarySidebar}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
