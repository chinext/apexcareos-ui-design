'use client';
import {
  Bell,
  CalendarDays,
  Languages,
  Mail,
  Moon,
  Sun,
  Search,
  Sparkles,
  User,
  ShieldAlert,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { UserNav } from './user-nav';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export function Header() {
  const [theme, setTheme] = useState('light');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

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
      <div className="flex items-center gap-1">
        <Link href="/summarize" passHref>
          <Button className="bg-gradient-to-r from-primary to-teal-500 text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Assistance
          </Button>
        </Link>
        <Link href="/appointments/create" passHref>
          <Button variant="ghost" size="icon" className="rounded-full">
            <CalendarDays className="h-5 w-5" />
            <span className="sr-only">Calendar</span>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Languages className="h-5 w-5" />
              <span className="sr-only">Language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
            <DropdownMenuItem>French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {isClient && (
           <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle Theme</span>
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-red-500" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96">
            <div className="flex items-center justify-between p-2">
                <p className="font-semibold">Notifications</p>
                <Button variant="link" size="sm" className="text-primary">Clear all</Button>
            </div>
            <DropdownMenuSeparator />
            <div className='p-1'>
              <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                      <CalendarDays className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                      <p className="text-sm font-medium">New appointment scheduled</p>
                      <p className="text-xs text-muted-foreground">Dr. Smith with John Doe</p>
                  </div>
                  <p className="text-xs text-muted-foreground">10m</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                      <p className="text-sm font-medium">New patient registered</p>
                      <p className="text-xs text-muted-foreground">A new patient has been added.</p>
                  </div>
                  <p className="text-xs text-muted-foreground">1h</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/50">
                      <ShieldAlert className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                      <p className="text-sm font-medium">Password expiring soon</p>
                      <p className="text-xs text-muted-foreground">Your password will expire in 3 days.</p>
                  </div>
                  <p className="text-xs text-muted-foreground">2d</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
             <DropdownMenuItem className="justify-center py-2">
                <Button variant="link" className="w-full text-primary">View all notifications</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Mail</span>
            </Button>
          </DropdownMenuTrigger>
           <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Inbox</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <p className="font-semibold">Patient Follow-up</p>
                <p className="text-xs text-muted-foreground">From: Dr. Smith</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <UserNav />
      </div>
    </header>
  );
}
