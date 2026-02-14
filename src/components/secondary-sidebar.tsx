'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navLinks } from '@/lib/nav-links';
import { cn } from '@/lib/utils';

export function SecondarySidebar() {
  const pathname = usePathname();
  const activeModule = navLinks.find(
    (link) => link.href !== '/dashboard' && pathname.startsWith(link.href)
  );

  if (!activeModule || !activeModule.subLinks || activeModule.subLinks.length === 0) {
    return null;
  }

  return (
    <aside className="fixed inset-y-0 left-16 z-10 hidden w-56 flex-col border-r bg-card sm:flex">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">{activeModule.label}</h2>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {activeModule.subLinks.map((subLink) => (
          <Link
            key={subLink.label}
            href={subLink.href}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary',
              pathname === subLink.href && 'bg-primary text-primary-foreground'
            )}
          >
            {subLink.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
