'use client';
import {
  Bell,
  CalendarDays,
  Hexagon,
  Moon,
  Search,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { UserNav } from './user-nav';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 md:px-6'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="rounded-lg bg-background pl-10"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/summarize" passHref>
          <Button className="bg-gradient-to-r from-primary to-teal-500 text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Assistance
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CalendarDays className="h-5 w-5" />
          <span className="sr-only">Calendar</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Hexagon className="h-5 w-5" />
          <span className="sr-only">Apps</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Moon className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Notifications</span>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
