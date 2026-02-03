'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  Briefcase,
  Boxes,
  Calendar,
  CreditCard,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Pill,
  Radiation,
  Settings,
  Smile,
  Sparkles,
  Stethoscope,
  User,
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
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/patients', icon: Users, label: 'Patient Management' },
];

const medicalModules = [
  { href: '/summarize', icon: Sparkles, label: 'AI Summarizer' },
  { href: '/medical', icon: Stethoscope, label: 'Medical' },
  { href: '/nurse', icon: UserPlus, label: 'Nurse Station' },
  { href: '/pharmacy', icon: Pill, label: 'Pharmacy' },
  { href: '/laboratory', icon: FlaskConical, label: 'Laboratory' },
  { href: '/radiology', icon: Radiation, label: 'Radiology' },
  { href: '/dental', icon: Smile, label: 'Dental' },
];

const adminModules = [
  { href: '/billing', icon: CreditCard, label: 'Billing & Payments' },
  { href: '/inventory', icon: Boxes, label: 'Inventory' },
  { href: '/hrm', icon: Users, label: 'HRM' },
  { href: '/crm', icon: Briefcase, label: 'CRM' },
  { href: '/reporting', icon: BarChart, label: 'Reporting' },
];

const generalModules = [
  { href: '/telemedicine', icon: Video, label: 'Telemedicine' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

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
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarMenu>
              {adminModules.map((item) => (
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
