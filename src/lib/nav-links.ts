import {
  Users,
  Calendar,
  Stethoscope,
  Pill,
  FlaskConical,
  Radiation,
  Smile,
  UserPlus,
  CreditCard,
  Boxes,
  UserRoundCog,
  Briefcase,
  BarChart,
  Settings,
  LayoutDashboard,
  LucideIcon,
  Video,
} from 'lucide-react';

export interface SubLink {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  subLinks?: SubLink[];
}

export const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    label: 'Patient',
    href: '/patients',
    icon: Users,
    subLinks: [
      { label: 'Patient List', href: '/patients' },
      { label: 'Patient Profile', href: '/medical' },
    ],
  },
  { label: 'Appointments & Queue', href: '/appointments', icon: Calendar },
  { label: 'Medical', href: '/medical', icon: Stethoscope },
  {
    label: 'Pharmacy',
    href: '/pharmacy',
    icon: Pill,
    subLinks: [
      { label: 'Prescriptions', href: '/pharmacy/prescriptions' },
      { label: 'Inventory', href: '/pharmacy/inventory' },
    ],
  },
  {
    label: 'Laboratory',
    href: '/laboratory',
    icon: FlaskConical,
    subLinks: [
      { label: 'Test Results', href: '/laboratory/results' },
      { label: 'Test Requests', href: '/laboratory/requests' },
    ],
  },
  {
    label: 'Radiology',
    href: '/radiology',
    icon: Radiation,
    subLinks: [
      { label: 'Scans', href: '/radiology/scans' },
      { label: 'Reports', href: '/radiology/reports' },
    ],
  },
  { label: 'Dental', href: '/dental', icon: Smile },
  { label: 'Nurse', href: '/nurse', icon: UserPlus },
  {
    label: 'Finance & Accounting',
    href: '/finance',
    icon: CreditCard,
    subLinks: [
      { label: 'Invoices', href: '/finance/invoices' },
      { label: 'Payment History', href: '/finance/history' },
    ],
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: Boxes,
    subLinks: [
      { label: 'Supplies', href: '/inventory/supplies' },
      { label: 'Orders', href: '/inventory/orders' },
    ],
  },
  {
    label: 'Human Resource',
    href: '/hr',
    icon: UserRoundCog,
    subLinks: [
      { label: 'Employees', href: '/hr/employees' },
      { label: 'Leave', href: '/hr/leave' },
    ],
  },
  {
    label: 'CRM',
    href: '/crm',
    icon: Briefcase,
    subLinks: [
      { label: 'Patients', href: '/crm/patients' },
      { label: 'Outreach', href: '/crm/outreach' },
    ],
  },
  {
    label: 'Reporting',
    href: '/reporting',
    icon: BarChart,
    subLinks: [
      { label: 'Analytics', href: '/reporting/analytics' },
      { label: 'Generate Reports', href: '/reporting/generate' },
    ],
  },
  {
    label: 'General',
    href: '/settings',
    icon: Settings,
    subLinks: [
      { label: 'Settings', href: '/settings' },
      { label: 'Telemedicine', href: '/telemedicine' },
    ],
  },
];
