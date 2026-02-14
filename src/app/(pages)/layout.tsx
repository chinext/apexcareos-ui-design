'use client';
import { useState } from 'react';
import { Header } from '@/components/header';
import { MainSidebar } from '@/components/main-sidebar';
import { SecondarySidebar } from '@/components/secondary-sidebar';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSecondarySidebarOpen, setSecondarySidebarOpen] = useState(true);

  const toggleSecondarySidebar = () => {
    setSecondarySidebarOpen(!isSecondarySidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MainSidebar />
      <SecondarySidebar isOpen={isSecondarySidebarOpen} />
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 ease-in-out',
          isSecondarySidebarOpen ? 'sm:pl-[320px]' : 'sm:pl-[64px]'
        )}
      >
        <Header onToggleSidebar={toggleSecondarySidebar} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
