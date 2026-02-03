'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  Briefcase,
  Boxes,
  Calendar,
  ChevronDown,
  CreditCard,
  FlaskConical,
  LayoutDashboard,
  Pill,
  Radiation,
  Settings,
  Smile,
  Sparkles,
  Stethoscope,
  UserPlus,
  Users,
  Video,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { UserNav } from '@/components/user-nav';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/patients', icon: Users, label: 'Patient Management' },
];

const medicalModules = [
  { href: '/summarize', icon: Sparkles, label: 'AI Summarizer' },
  { href: '/medical', icon: Stethoscope, label: 'Medical' },
  { href: '/nurse', icon: UserPlus, label: 'Nurse Station' },
  {
    label: 'Pharmacy',
    icon: Pill,
    href: '/pharmacy',
    subItems: [
      { href: '/pharmacy/prescriptions', label: 'Prescriptions' },
      { href: '/pharmacy/inventory', label: 'Inventory' },
    ],
  },
  {
    label: 'Laboratory',
    icon: FlaskConical,
    href: '/laboratory',
    subItems: [
      { href: '/laboratory/results', label: 'Test Results' },
      { href: '/laboratory/requests', label: 'Test Requests' },
    ],
  },
  {
    label: 'Radiology',
    icon: Radiation,
    href: '/radiology',
    subItems: [
      { href: '/radiology/scans', label: 'Scans' },
      { href: '/radiology/reports', label: 'Reports' },
    ],
  },
  { href: '/dental', icon: Smile, label: 'Dental' },
];

const adminModules = [
  {
    label: 'Billing & Payments',
    icon: CreditCard,
    href: '/billing',
    subItems: [
      { href: '/billing/invoices', label: 'Invoices' },
      { href: '/billing/history', label: 'History' },
    ],
  },
  {
    label: 'Inventory',
    icon: Boxes,
    href: '/inventory',
    subItems: [
      { href: '/inventory/supplies', label: 'Supplies' },
      { href: '/inventory/orders', label: 'Orders' },
    ],
  },
  {
    label: 'HRM',
    icon: Users,
    href: '/hrm',
    subItems: [
      { href: '/hrm/employees', label: 'Employees' },
      { href: '/hrm/leave', label: 'Leave' },
    ],
  },
  {
    label: 'CRM',
    icon: Briefcase,
    href: '/crm',
    subItems: [
      { href: '/crm/patients', label: 'Patients' },
      { href: '/crm/outreach', label: 'Outreach' },
    ],
  },
  {
    label: 'Reporting',
    icon: BarChart,
    href: '/reporting',
    subItems: [
      { href: '/reporting/analytics', label: 'Analytics' },
      { href: '/reporting/generate', label: 'Generate Reports' },
    ],
  },
];

const generalModules = [
  { href: '/telemedicine', icon: Video, label: 'Telemedicine' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

function CollapsibleMenuItem({ item }: { item: any }) {
  const pathname = usePathname();
  const isSubMenuActive =
    item.subItems && item.subItems.some((sub: any) => pathname === sub.href);
  const [isOpen, setIsOpen] = useState(isSubMenuActive);

  if (!item.subItems) {
    return (
      <SidebarMenuItem>
        <Link href={item.href}>
          <SidebarMenuButton
            isActive={pathname === item.href}
            icon={<item.icon />}
            tooltip={item.label}
          >
            {item.label}
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isSubMenuActive}
        icon={<item.icon />}
        tooltip={item.label}
        onClick={() => setIsOpen(!isOpen)}
        className="group/sub-menu-button w-full justify-between"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-sidebar-foreground/50 transition-transform group-hover/sub-menu-button:text-sidebar-foreground',
            isOpen && 'rotate-180'
          )}
        />
      </SidebarMenuButton>
      {isOpen && (
        <SidebarMenuSub>
          {item.subItems.map((subItem: any) => (
            <SidebarMenuSubItem key={subItem.href}>
              <Link href={subItem.href}>
                <SidebarMenuSubButton isActive={pathname === subItem.href}>
                  {subItem.label}
                </SidebarMenuSubButton>
              </Link>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    icon={<item.icon />}
                    tooltip={item.label}
                  >
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Medical</SidebarGroupLabel>
            <SidebarMenu>
              {medicalModules.map((item) => (
                <CollapsibleMenuItem key={item.href || item.label} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarMenu>
              {adminModules.map((item) => (
                <CollapsibleMenuItem key={item.href || item.label} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {generalModules.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    icon={<item.icon />}
                    tooltip={item.label}
                  >
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:justify-end">
          <SidebarTrigger className="md:hidden" />
          <UserNav />
        </header>
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
