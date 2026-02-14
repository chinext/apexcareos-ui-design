'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navGroups, NavGroup } from '@/lib/nav-links';
import { cn } from '@/lib/utils';
import { HospitalSelector } from './hospital-selector';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { AppLogo } from './app-logo';

export function SecondarySidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  const getVisibleNavGroups = () => {
    const defaultGroups = navGroups.filter((g) => g.groupLabel === 'Main');

    if (pathname.startsWith('/dashboard')) {
      return navGroups.filter((g) => g.groupLabel === 'Main');
    }
    if (pathname.startsWith('/crm')) {
      return navGroups.filter((g) => g.groupLabel === 'Marketing');
    }
    if (pathname.startsWith('/finance')) {
      return navGroups.filter((g) => g.groupLabel === 'Finance & Accounts');
    }
    if (pathname.startsWith('/hr')) {
      return navGroups.filter((g) => g.groupLabel === 'Human Resources');
    }
    if (pathname.startsWith('/laboratory')) {
      return navGroups.filter((g) => g.groupLabel === 'Laboratory');
    }
    if (
      pathname.startsWith('/appointments') ||
      pathname.startsWith('/services') ||
      pathname.startsWith('/locations') ||
      pathname.startsWith('/medical') ||
      pathname.startsWith('/pharmacy') ||
      pathname.startsWith('/radiology') ||
      pathname.startsWith('/dental') ||
      pathname.startsWith('/nurse') ||
      pathname.startsWith('/inventory') ||
      pathname.startsWith('/patients')
    ) {
      return navGroups.filter((g) => g.groupLabel === 'Clinic');
    }
    if (
      pathname.startsWith('/activities') ||
      pathname.startsWith('/messages') ||
      pathname.startsWith('/reporting') ||
      pathname.startsWith('/settings')
    ) {
      return navGroups.filter((g) => g.groupLabel === 'Other');
    }

    return defaultGroups;
  };

  const visibleNavGroups = getVisibleNavGroups();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-16 z-20 hidden w-64 flex-col border-r bg-card transition-transform duration-300 ease-in-out sm:flex',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <HospitalSelector />
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {visibleNavGroups.map((group) => (
          <div key={group.groupLabel}>
            <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              {group.groupLabel}
            </h3>
            <div className="space-y-1">
              {group.links.map((link) =>
                link.subLinks ? (
                  <Collapsible
                    key={link.label}
                    defaultOpen={
                      link.initiallyOpen ||
                      link.subLinks.some((sl) => pathname.startsWith(sl.href))
                    }
                  >
                    <CollapsibleTrigger asChild>
                      <button className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <link.icon className="h-4 w-4" />
                        <span className="flex-1 text-left">{link.label}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 pt-1">
                      {link.subLinks.map((subLink) =>
                        subLink.subLinks ? (
                          <Collapsible
                            key={subLink.label}
                            defaultOpen={
                              subLink.initiallyOpen ||
                              subLink.subLinks.some((sl) =>
                                pathname.startsWith(sl.href)
                              )
                            }
                            className="pl-8"
                          >
                            <CollapsibleTrigger asChild>
                              <button className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                <div className="h-1.5 w-1.5 rounded-full border border-current group-hover:border-primary"></div>
                                <span className="flex-1 text-left">
                                  {subLink.label}
                                </span>
                                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                              </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 pt-1">
                              {subLink.subLinks.map((grandchildLink) => (
                                <Link
                                  key={grandchildLink.label}
                                  href={grandchildLink.href}
                                  className={cn(
                                    'group flex items-center gap-3 rounded-md py-2 pl-8 pr-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
                                    pathname === grandchildLink.href &&
                                      'text-primary'
                                  )}
                                >
                                  <div className="h-1.5 w-1.5 rounded-full border border-current group-hover:border-primary"></div>
                                  <span>{grandchildLink.label}</span>
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <Link
                            key={subLink.label}
                            href={subLink.href}
                            className={cn(
                              'group flex items-center gap-3 rounded-md py-2 pl-11 pr-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
                              pathname === subLink.href && 'text-primary'
                            )}
                          >
                            <div className="h-1.5 w-1.5 rounded-full border border-current group-hover:border-primary"></div>
                            <span>{subLink.label}</span>
                          </Link>
                        )
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
                      pathname === link.href &&
                        'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
