import {
  Users,
  Calendar,
  Stethoscope,
  User,
  Activity,
  MessageSquare,
  FileText,
  DollarSign,
  LogOut,
  Building,
  UserRoundCog,
  CreditCard,
  BarChart,
  Settings,
  LayoutDashboard,
  LucideIcon,
  FlaskConical,
  Radiation,
  Smile,
  UserPlus,
  Briefcase,
} from 'lucide-react';

export interface SubLink {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface NavGroup {
  groupLabel: string;
  links: NavLink[];
}

export interface NavLink {
  label:string;
  href: string;
  icon: LucideIcon;
  subLinks?: SubLink[];
  initiallyOpen?: boolean;
}

export const navGroups: NavGroup[] = [
  {
    groupLabel: 'Main',
    links: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        initiallyOpen: true,
        subLinks: [
          { label: 'Admin Dashboard', href: '/dashboard' },
        ],
      },
    ],
  },
  {
    groupLabel: 'Clinic',
    links: [
      { label: 'Appointments', href: '/appointments', icon: Calendar },
      { label: 'Doctors', href: '/hr/employees', icon: User },
      { label: 'Patients', href: '/crm/patients', icon: Users },
      { label: 'Services', href: '/services', icon: Stethoscope },
      { label: 'Locations', href: '/locations', icon: Building },
    ],
  },
  {
    groupLabel: 'Staffs',
    links: [
      { label: 'Staff', href: '/hr/employees', icon: UserRoundCog },
      { label: 'Leaves', href: '/hr/leave', icon: LogOut },
      { label: 'Payroll', href: '/finance/payroll', icon: DollarSign },
    ],
  },
  {
    groupLabel: 'Finance & Accounts',
    links: [
      { label: 'Invoices', href: '/finance/invoices', icon: FileText },
      { label: 'Expenses', href: '/finance/expenses', icon: CreditCard },
    ],
  },
  {
    groupLabel: 'Other',
    links: [
      { label: 'Activities', href: '/activities', icon: Activity },
      { label: 'Messages', href: '/messages', icon: MessageSquare },
      { label: 'Reporting', href: '/reporting', icon: BarChart },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];


export const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    label: 'Patient',
    href: '/patients',
    icon: Users,
  },
  { label: 'Appointments', href: '/appointments', icon: Calendar },
  { label: 'Medical', href: '/medical', icon: Stethoscope },
  {
    label: 'Pharmacy',
    href: '/pharmacy',
    icon: Stethoscope,
  },
  {
    label: 'Laboratory',
    href: '/laboratory',
    icon: FlaskConical,
  },
  {
    label: 'Radiology',
    href: '/radiology',
    icon: Radiation,
  },
  { label: 'Dental', href: '/dental', icon: Smile },
  { label: 'Nurse', href: '/nurse', icon: UserPlus },
  {
    label: 'Finance',
    href: '/finance',
    icon: CreditCard,
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: Stethoscope,
  },
  {
    label: 'HR',
    href: '/hr',
    icon: UserRoundCog,
  },
  {
    label: 'CRM',
    href: '/crm',
    icon: Briefcase,
  },
  {
    label: 'Reporting',
    href: '/reporting',
    icon: BarChart,
  },
  {
    label: 'General',
    href: '/settings',
    icon: Settings,
  },
];
