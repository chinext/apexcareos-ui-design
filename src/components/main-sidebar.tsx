'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { navLinks } from '@/constants/nav-links';
import { AppLogo } from './app-logo';
import { cn } from '@/lib/utils';
import { UserNav } from './user-nav';
import { ScrollArea } from './ui/scroll-area';

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-16 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <AppLogo showText={false} />
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            {navLinks.map((link) => (
              <Tooltip key={link.label} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-sidebar-accent',
                      (pathname === link.href ||
                        (link.href !== '/dashboard' &&
                          pathname.startsWith(link.href))) &&
                        'bg-sidebar-accent'
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </ScrollArea>
      <div className="p-2">
        <UserNav />
      </div>
    </aside>
  );
}
