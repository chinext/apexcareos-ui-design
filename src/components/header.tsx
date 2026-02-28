'use client';
import {
  Bell,
  CalendarDays,
  Mail,
  Moon,
  Sun,
  Search,
  Sparkles,
  User,
  ShieldAlert,
  Receipt,
  ChevronRight,
  PanelLeft,
  ListFilter,
  FileArchive,
  FileText,
  CornerDownLeft,
  LayoutGrid,
  ClipboardCheck,
  Briefcase,
  FolderOpen,
  StickyNote,
  Users,
  MessageSquare,
} from 'lucide-react';
import { Button } from './ui/button';
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
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Kbd } from './ui/kbd';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

const recentSearches = [
  {
    date: 'Today',
    items: [
      {
        type: 'file',
        icon: <FileArchive className="h-4 w-4 text-muted-foreground" />,
        name: 'fonts.zip',
        details: '#Website / v3.0',
      },
      {
        type: 'file',
        icon: <FileText className="h-4 w-4 text-muted-foreground" />,
        name: 'responsive-design-guidelines.pdf',
        details: '# UI-kit design / UI-kit design',
      },
      {
        type: 'member',
        avatar: 'https://i.pravatar.cc/40?u=sophia',
        name: 'Sophia Wilson',
        details: 'UX/UI designer',
      },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      {
        type: 'member',
        avatar: 'https://i.pravatar.cc/40?u=michael',
        name: 'Michael Brown',
        details: 'Back-end dev',
      },
      {
        type: 'file',
        icon: <FileText className="h-4 w-4 text-muted-foreground" />,
        name: 'responsive-design-guidelines.pdf',
        details: '',
      },
    ],
  },
  {
    date: '20 May',
    items: [
      {
        type: 'channel',
        icon: <span className="font-bold text-muted-foreground">#</span>,
        name: 'Front-end',
        details: '',
      },
      {
        type: 'member',
        avatar: 'https://i.pravatar.cc/40?u=nathan',
        name: 'Nathan Mitchell',
        details: 'Front-end dev',
      },
    ],
  },
];

const shortcuts = [
  { label: 'Tasks', icon: ClipboardCheck, href: '/settings/task', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { label: 'Projects', icon: Briefcase, href: '/settings/project', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { label: 'Files', icon: FolderOpen, href: '#', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { label: 'Memo', icon: StickyNote, href: '/settings/memo', color: 'text-green-600', bgColor: 'bg-green-50' },
  { label: 'Teams', icon: Users, href: '#', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { label: 'Chats', icon: MessageSquare, href: '#', color: 'text-pink-600', bgColor: 'bg-pink-50' },
];

export function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [theme, setTheme] = useState('light');
  const [isClient, setIsClient] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 md:px-6'
        )}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <Button
            variant="outline"
            className="w-full max-w-sm justify-start gap-2 rounded-lg text-muted-foreground"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="h-4 w-4" />
            Search...
            <Kbd className="ml-auto">⌘ K</Kbd>
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/summarize" passHref>
            <Button className="bg-gradient-to-r from-primary to-teal-500 text-white">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Assistance
            </Button>
          </Link>
          <Link href="/appointments/create" passHref>
            <Button variant="outline" size="icon" className="rounded-full">
              <CalendarDays className="h-5 w-5" />
              <span className="sr-only">Calendar</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <LayoutGrid className="h-5 w-5" />
                <span className="sr-only">Apps</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-4">
              <div className="grid grid-cols-3 gap-4">
                {shortcuts.map((item) => (
                  <Link 
                    key={item.label} 
                    href={item.href}
                    className="flex flex-col items-center justify-center gap-2 rounded-lg p-2 transition-colors hover:bg-muted"
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", item.bgColor)}>
                      <item.icon className={cn("h-5 w-5", item.color)} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{item.label}</span>
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {isClient && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle Theme</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-red-500" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96">
              <div className="flex items-center justify-between p-2">
                <p className="font-semibold">Notifications</p>
                <Button variant="link" size="sm" className="text-primary">
                  Clear all
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="p-1">
                <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                    <CalendarDays className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      New appointment scheduled
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Dr. Smith with John Doe
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">10m</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New patient registered</p>
                    <p className="text-xs text-muted-foreground">
                      A new patient has been added.
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">1h</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/50">
                    <ShieldAlert className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Password expiring soon</p>
                    <p className="text-xs text-muted-foreground">
                      Your password will expire in 3 days.
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">2d</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center py-2">
                <Button variant="link" className="w-full text-primary">
                  View all notifications
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Mail</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96">
              <div className="flex items-center justify-between p-2">
                <p className="font-semibold">Message</p>
              </div>
              <DropdownMenuSeparator />
              <div className="p-1">
                <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                    <Receipt className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Your store has a new order for 2 items totaling
                      $1,299.00
                    </p>
                    <p className="text-xs text-muted-foreground">just now</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">3 new customer account is created</p>
                    <p className="text-xs text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M4.32111 2.37695L15.42 12.0004L4.32111 21.6238C3.33111 22.2478 2 21.5644 2 20.392V3.60875C2 2.43555 3.33111 1.75215 4.32111 2.37695Z"
                        fill="#00A0F1"
                      />
                      <path
                        d="M19.531 9.22656L15.4199 12L19.531 14.7734C20.655 15.5204 22 14.721 22 13.4116V10.5884C22 9.27896 20.655 8.47956 19.531 9.22656Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M19.531 9.22656L4.32109 2.37695C5.07409 1.94295 6.00209 2.30875 6.00209 3.20455V20.7954C6.00209 21.6912 5.07409 22.057 4.32109 21.623L19.531 14.7734C20.089 14.4182 20.407 13.8824 20.407 13.2984C20.407 12.7144 20.089 12.1786 19.531 11.8234L15.4199 12L19.531 9.22656Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M19.531 9.22656L4.32109 2.37695C3.33109 1.75215 2 2.43555 2 3.60875V4.05315L15.4199 12L2 19.9468V20.3912C2 21.5644 3.33109 22.2478 4.32109 21.623L19.531 14.7734C20.655 15.5204 22 14.721 22 13.4116V10.5884C22 9.27896 20.655 8.47956 19.531 9.22656Z"
                        fill="#F44336"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Your android application has been approved
                    </p>
                    <p className="text-xs text-muted-foreground">
                      5 minutes ago
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background p-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M2.38379 13.5684C2.38379 13.5684 4.54299 13.3524 6.83979 10.9788C7.59219 10.158 7.97379 9.12124 8.01179 8.04604C8.04979 7.22524 7.63059 6.44284 6.90339 6.09604L6.10059 5.67604C5.75379 5.46004 5.33379 5.38324 4.91459 5.46004C4.80659 3.65524 6.06219 2.06644 7.82979 2.02804C9.52259 1.95124 11.0734 3.20644 11.209 4.93684C11.3074 6.13084 10.6546 7.22524 9.68019 7.64524L9.06579 7.89964C8.68419 8.04604 8.37579 8.35444 8.26779 8.71084C8.04979 9.37324 8.33739 10.1208 8.95179 10.6392C10.7938 12.4824 13.7314 12.336 13.7314 12.336L13.7698 12.3744C15.0638 10.9392 15.3514 9.00844 14.5866 7.22524C14.0286 5.96964 12.9342 5.09044 11.6402 4.77244C12.137 3.03844 13.8674 1.70644 15.7094 1.95124C17.7782 2.19604 19.1338 4.04924 18.8078 6.05764C18.6158 7.22524 17.963 8.22364 17.027 8.88604L16.4874 9.22284C16.1022 9.47724 15.6822 9.55404 15.2622 9.47724C15.1158 11.3196 13.7698 12.9852 11.9658 13.1316C10.273 13.2864 8.72219 12.0312 8.58659 10.3236C8.51019 9.40084 8.89179 8.56084 9.58299 8.04604C10.975 6.96124 13.0438 6.44284 15.2622 6.69724C15.2622 6.69724 15.5498 6.73564 15.8374 6.81244C16.8502 7.05724 17.6302 7.82284 17.963 8.78764C18.4214 10.0812 18.0022 11.5164 16.9486 12.4824C14.8874 14.4744 11.383 15.1368 11.383 15.1368L10.3702 20.3256C10.2622 20.9112 9.71979 21.3312 9.14379 21.3312H5.02259C4.48419 21.3312 4.02579 20.9496 3.94939 20.4336L2.38379 13.5684Z"
                        fill="#2563EB"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Paypal payment method has been enabled for your store
                    </p>
                    <p className="text-xs text-muted-foreground">
                      10 minutes ago
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center py-2">
                <Button variant="link" className="w-full text-primary">
                  See all
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserNav />
        </div>
      </header>

      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
          <CommandInput
            placeholder="Search in ApexCare OS..."
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button variant="ghost" size="icon" className="shrink-0">
            <ListFilter className="h-5 w-5" />
          </Button>
        </div>
        <Tabs defaultValue="all" className="p-2 pt-0">
          <TabsList className="h-auto justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent bg-transparent p-3 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              All results
            </TabsTrigger>
            <TabsTrigger
              value="threads"
              className="rounded-none border-b-2 border-transparent bg-transparent p-3 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Threads
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-none border-b-2 border-transparent bg-transparent p-3 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="rounded-none border-b-2 border-transparent bg-transparent p-3 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Files
            </TabsTrigger>
            <TabsTrigger
              value="direct-messages"
              className="rounded-none border-b-2 border-transparent bg-transparent p-3 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Direct messages
            </TabsTrigger>
            <TabsTrigger
              value="links"
              className="rounded-none border-b-2 border-transparent bg-transparent p-3 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Links
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="pt-2">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
                {recentSearches.map((group) => (
                  <CommandGroup key={group.date} heading={group.date}>
                    {group.items.map((item) => (
                      <CommandItem
                        key={item.name}
                        className="flex justify-between"
                        onSelect={() => {}}
                      >
                        <div className="flex items-center gap-3">
                          {item.type === 'member' ? (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.avatar} />
                              <AvatarFallback>
                                {item.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="flex h-6 w-6 items-center justify-center">
                              {item.icon}
                            </div>
                          )}
                          <div>
                            <p className="text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.details}</p>
                          </div>
                        </div>
                        {item.type === 'member' && (
                          <CornerDownLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
            </CommandList>
          </TabsContent>
        </Tabs>
        <div className="flex items-center justify-between border-t bg-muted p-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Kbd>▲</Kbd>
            <Kbd>▼</Kbd>
            <span>Move</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>↵</Kbd>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>/</Kbd>
            <span>Command</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>esc</Kbd>
            <span>Cancel</span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
