'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navLinks } from '@/lib/nav-links';
import { cn } from '@/lib/utils';
import { AppLogo } from './app-logo';
import { useMemo } from 'react';

export function SecondarySidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const activeModule = useMemo(
    () =>
      navLinks.find(
        (link) => link.href !== '/dashboard' && pathname.startsWith(link.href)
      ),
    [pathname]
  );

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-16 z-20 hidden w-56 flex-col bg-card transition-transform duration-300 ease-in-out sm:flex',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-16 items-center px-6">
        <AppLogo />
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {activeModule?.subLinks?.map((subLink) => (
          <Link
            key={subLink.label}
            href={subLink.href}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted',
              pathname === subLink.href &&
                'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
            )}
          >
            {subLink.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
