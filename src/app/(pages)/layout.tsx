'use client';
import { Header } from '@/components/header';
import { MainSidebar } from '@/components/main-sidebar';
import { SecondarySidebar } from '@/components/secondary-sidebar';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/nav-links';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeModule = navLinks.find(
    (link) => link.href !== '/dashboard' && pathname.startsWith(link.href)
  );

  const hasSecondarySidebar =
    activeModule && activeModule.subLinks && activeModule.subLinks.length > 0;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MainSidebar />
      <SecondarySidebar />
      <div
        className={cn(
          'flex flex-1 flex-col transition-[padding]',
          hasSecondarySidebar ? 'sm:pl-72' : 'sm:pl-16'
        )}
      >
        <Header />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
