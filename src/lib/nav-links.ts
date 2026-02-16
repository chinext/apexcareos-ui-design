'use client';
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
  Volume2,
  Network,
  CalendarOff,
  ClipboardCheck,
  CalendarDays,
  UserCog,
  TrendingUp,
  ShoppingCart,
  ArrowLeftRight,
  Book,
  ClipboardList,
  TestTube,
  Cable,
} from 'lucide-react';

export interface SubLink {
  label: string;
  href: string;
  icon?: LucideIcon;
  subLinks?: SubLink[];
  initiallyOpen?: boolean;
}

export interface NavGroup {
  groupLabel: string;
  links: NavLink[];
}

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  iconBgColor?: string;
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
        iconBgColor: 'bg-sky-500',
        initiallyOpen: true,
        subLinks: [{ label: 'Admin Dashboard', href: '/dashboard' }],
      },
    ],
  },
  {
    groupLabel: 'Clinic',
    links: [
      {
        label: 'Appointments',
        href: '/appointments',
        icon: Calendar,
        iconBgColor: 'bg-green-500',
      },
      {
        label: 'Doctors',
        href: '/hr/employees',
        icon: User,
        iconBgColor: 'bg-orange-500',
      },
      {
        label: 'Services',
        href: '/services',
        icon: Stethoscope,
        iconBgColor: 'bg-indigo-500',
      },
      {
        label: 'Locations',
        href: '/locations',
        icon: Building,
        iconBgColor: 'bg-rose-500',
      },
    ],
  },
  {
    groupLabel: 'Laboratory',
    links: [
      {
        label: 'Dashboard',
        href: '/laboratory/dashboard',
        icon: LayoutDashboard,
        iconBgColor: 'bg-teal-500',
      },
      {
        label: 'Services',
        href: '/laboratory/services',
        icon: Stethoscope,
        iconBgColor: 'bg-cyan-500',
      },
      {
        label: 'Request & Result',
        href: '/laboratory/request-result',
        icon: ClipboardList,
        iconBgColor: 'bg-fuchsia-500',
      },
      {
        label: 'Specimen',
        href: '/laboratory/specimen',
        icon: TestTube,
        iconBgColor: 'bg-lime-500',
      },
      {
        label: 'Requisition',
        href: '/laboratory/requisition',
        icon: FileText,
        iconBgColor: 'bg-amber-500',
      },
      {
        label: 'Instrument Interface',
        href: '/laboratory/instrument-interface',
        icon: Cable,
        iconBgColor: 'bg-violet-500',
      },
    ],
  },
  {
    groupLabel: 'Dental',
    links: [
      {
        label: 'Dashboard',
        href: '/dental/dashboard',
        icon: LayoutDashboard,
        iconBgColor: 'bg-sky-500',
      },
      {
        label: 'Queue',
        href: '/dental/queue',
        icon: Users,
        iconBgColor: 'bg-green-500',
      },
      {
        label: 'Appointment',
        href: '/dental/appointment',
        icon: Calendar,
        iconBgColor: 'bg-orange-500',
      },
      {
        label: 'Services',
        href: '/dental/services',
        icon: Stethoscope,
        iconBgColor: 'bg-indigo-500',
      },
      {
        label: 'Report',
        href: '/dental/report',
        icon: BarChart,
        iconBgColor: 'bg-rose-500',
      },
    ],
  },
  {
    groupLabel: 'Marketing',
    links: [
      {
        label: 'Dashboard',
        href: '/crm/dashboard',
        icon: LayoutDashboard,
        iconBgColor: 'bg-teal-500',
      },
      {
        label: 'Lead',
        href: '/crm/lead',
        icon: UserPlus,
        iconBgColor: 'bg-cyan-500',
      },
      {
        label: 'Opportunity',
        href: '/crm/opportunity',
        icon: Briefcase,
        iconBgColor: 'bg-fuchsia-500',
      },
      {
        label: 'Retainer',
        href: '/crm/retainer',
        icon: FileText,
        iconBgColor: 'bg-lime-500',
      },
      {
        label: 'Referral',
        href: '/crm/referral',
        icon: Users,
        iconBgColor: 'bg-amber-500',
      },
      {
        label: 'Report',
        href: '/crm/report',
        icon: BarChart,
        iconBgColor: 'bg-violet-500',
      },
      {
        label: 'Campaign',
        href: '/crm/campaign',
        icon: Volume2,
        iconBgColor: 'bg-sky-500',
      },
      {
        label: 'Patients',
        href: '/crm/patients',
        icon: Users,
        iconBgColor: 'bg-green-500',
      },
    ],
  },
  {
    groupLabel: 'Human Resources',
    links: [
      {
        label: 'All Personnel',
        href: '/hr/employees',
        icon: Users,
        iconBgColor: 'bg-orange-500',
      },
      {
        label: 'Staff exit',
        href: '/hr/staff-exit',
        icon: LogOut,
        iconBgColor: 'bg-indigo-500',
      },
      {
        label: 'Personnel Training',
        href: '/hr/training',
        icon: UserCog,
        iconBgColor: 'bg-rose-500',
      },
      {
        label: 'Department/Organogram',
        href: '/hr/organogram',
        icon: Network,
        iconBgColor: 'bg-teal-500',
      },
      {
        label: 'Leaves',
        href: '/hr/leave',
        icon: CalendarOff,
        iconBgColor: 'bg-cyan-500',
      },
      {
        label: 'Holidays',
        href: '/hr/holidays',
        icon: Calendar,
        iconBgColor: 'bg-fuchsia-500',
      },
      {
        label: 'Attendance',
        href: '/hr/attendance',
        icon: ClipboardCheck,
        iconBgColor: 'bg-lime-500',
      },
      {
        label: 'Monthly Schedule',
        href: '/hr/schedule',
        icon: CalendarDays,
        iconBgColor: 'bg-amber-500',
      },
    ],
  },
  {
    groupLabel: 'Finance & Accounts',
    links: [
      {
        label: 'Sales',
        href: '/finance/sales',
        icon: TrendingUp,
        iconBgColor: 'bg-green-500',
        initiallyOpen: true,
        subLinks: [
          { label: 'Dashboard', href: '/finance/sales/dashboard' },
          { label: 'Invoices', href: '/finance/sales/invoices' },
          { label: 'Expenses', href: '/finance/sales/expenses' },
          { label: 'Receipt', href: '/finance/sales/receipt' },
          { label: 'Credit Note', href: '/finance/sales/credit-note' },
          {
            label: 'Recurring Invoice',
            href: '/finance/sales/recurring-invoice',
          },
          {
            label: 'Retainer Bills',
            href: '/finance/sales/retainer-bills',
            subLinks: [
              {
                label: 'Dashboard',
                href: '/finance/sales/retainer-bills/dashboard',
              },
              {
                label: 'Price List',
                href: '/finance/sales/retainer-bills/price-list',
              },
              {
                label: 'Automatic Biller',
                href: '/finance/sales/retainer-bills/automatic-biller',
              },
              {
                label: 'Preview Bills',
                href: '/finance/sales/retainer-bills/preview-bills',
              },
              {
                label: 'Report',
                href: '/finance/sales/retainer-bills/report',
              },
            ],
          },
        ],
      },
      {
        label: 'Purchase',
        href: '/finance/purchase',
        icon: ShoppingCart,
        iconBgColor: 'bg-orange-500',
        subLinks: [
          { label: 'Vendor', href: '/finance/purchase/vendor' },
          { label: 'Expenses', href: '/finance/purchase/expenses' },
          { label: 'Bill', href: '/finance/purchase/bill' },
          { label: 'Payment Made', href: '/finance/purchase/payment-made' },
          {
            label: 'Purchase order',
            href: '/finance/purchase/purchase-order',
          },
          { label: 'Vendor Credit', href: '/finance/purchase/vendor-credit' },
        ],
      },
      {
        label: 'Cash Flow',
        href: '/finance/cash-flow',
        icon: ArrowLeftRight,
        iconBgColor: 'bg-blue-500',
      },
      {
        label: 'Payroll',
        href: '/finance/payroll',
        icon: Users,
        iconBgColor: 'bg-indigo-500',
        subLinks: [
          { label: 'Employee', href: '/finance/payroll/employee' },
          { label: 'Contractors', href: '/finance/payroll/contractors' },
          {
            label: "Worke's Compensation",
            href: '/finance/payroll/compensation',
          },
          { label: 'payslip', href: '/finance/payroll/payslip' },
          { label: 'Time Sheet', href: '/finance/payroll/time-sheet' },
        ],
      },
      {
        label: 'Accounting',
        href: '/finance/accounting',
        icon: Book,
        iconBgColor: 'bg-rose-500',
        subLinks: [
          {
            label: 'Manual Journal',
            href: '/finance/accounting/manual-journal',
          },
          {
            label: 'Chart Of Account',
            href: '/finance/accounting/chart-of-account',
          },
          { label: 'Currency', href: '/finance/accounting/currency' },
          {
            label: 'Bank Deposit',
            href: '/finance/accounting/bank-deposit',
          },
          { label: 'Transfer', href: '/finance/accounting/transfer' },
          {
            label: 'Bank Reconciliation',
            href: '/finance/accounting/bank-reconciliation',
          },
          {
            label: 'Bulk Upload',
            href: '/finance/accounting/bulk-upload',
          },
          { label: 'Budget', href: '/finance/accounting/budget' },
          { label: 'Project', href: '/finance/accounting/project' },
          { label: 'Assets', href: '/finance/accounting/assets' },
          {
            label: 'Report',
            href: '/finance/accounting/report',
            subLinks: [
              {
                label: 'Cash Flow',
                href: '/finance/accounting/report/cash-flow',
              },
              {
                label: 'Income, Profit and Lost',
                href: '/finance/accounting/report/income-profit-lost',
              },
              {
                label: 'Debt and Ageing',
                href: '/finance/accounting/report/debt-ageing',
              },
              {
                label: 'Expense',
                href: '/finance/accounting/report/expense',
              },
            ],
          },
          {
            label: 'Settings',
            href: '/finance/accounting/settings',
            subLinks: [
              { label: 'Taxes', href: '/finance/accounting/settings/taxes' },
              {
                label: 'Depreciation',
                href: '/finance/accounting/settings/depreciation',
              },
              {
                label: 'Invoice Due Type',
                href: '/finance/accounting/settings/invoice-due-type',
              },
              {
                label: 'Cost of Turn Over',
                href: '/finance/accounting/settings/cost-of-turn-over',
              },
            ],
          },
        ],
      },
      {
        label: 'Report',
        href: '/finance/report',
        icon: BarChart,
        iconBgColor: 'bg-amber-500',
        subLinks: [
          { label: 'Reports', href: '/finance/report/reports' },
          {
            label: 'Performance center',
            href: '/finance/report/performance-center',
          },
        ],
      },
    ],
  },
  {
    groupLabel: 'Other',
    links: [
      {
        label: 'Activities',
        href: '/activities',
        icon: Activity,
        iconBgColor: 'bg-violet-500',
      },
      {
        label: 'Messages',
        href: '/messages',
        icon: MessageSquare,
        iconBgColor: 'bg-teal-500',
      },
      {
        label: 'Reporting',
        href: '/reporting',
        icon: BarChart,
        iconBgColor: 'bg-cyan-500',
      },
    ],
  },
  {
    groupLabel: 'System',
    links: [
      {
        label: 'Users',
        href: '/settings/users',
        icon: Users,
        iconBgColor: 'bg-fuchsia-500',
        initiallyOpen: true,
        subLinks: [
          { label: 'Manage', href: '/settings/users/manage' },
          { label: 'Application', href: '/settings/users/application' },
          { label: 'User Group', href: '/settings/users/user-group' },
        ],
      },
      {
        label: 'Settings',
        href: '/settings/system',
        icon: Settings,
        iconBgColor: 'bg-lime-500',
        initiallyOpen: true,
        subLinks: [
          { label: 'Profile', href: '/settings/system/profile' },
          { label: 'System', href: '/settings/system/system' },
          { label: 'Features', href: '/settings/system/features' },
          { label: 'Form', href: '/settings/system/form' },
          { label: 'Template', href: '/settings/system/template' },
        ],
      },
    ],
  },
  {
    groupLabel: 'Others',
    links: [
      {
        label: 'Messages',
        href: '/settings/messages',
        icon: MessageSquare,
        iconBgColor: 'bg-amber-500',
      },
      {
        label: 'Task',
        href: '/settings/task',
        icon: ClipboardCheck,
        iconBgColor: 'bg-violet-500',
      },
      {
        label: 'Project',
        href: '/settings/project',
        icon: Briefcase,
        iconBgColor: 'bg-sky-500',
      },
      {
        label: 'Memo',
        href: '/settings/memo',
        icon: FileText,
        iconBgColor: 'bg-green-500',
      },
    ],
  },
];

export const navLinks: NavLink[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    iconBgColor: 'bg-sky-500',
  },
  {
    label: 'Appointments',
    href: '/appointments',
    icon: Calendar,
    iconBgColor: 'bg-green-500',
  },
  {
    label: 'Medical',
    href: '/medical',
    icon: Stethoscope,
    iconBgColor: 'bg-rose-500',
  },
  {
    label: 'Pharmacy',
    href: '/pharmacy',
    icon: Stethoscope,
    iconBgColor: 'bg-orange-500',
  },
  {
    label: 'Laboratory',
    href: '/laboratory',
    icon: FlaskConical,
    iconBgColor: 'bg-indigo-500',
  },
  {
    label: 'Radiology',
    href: '/radiology',
    icon: Radiation,
    iconBgColor: 'bg-amber-500',
  },
  {
    label: 'Dental',
    href: '/dental',
    icon: Smile,
    iconBgColor: 'bg-violet-500',
  },
  {
    label: 'Nurse',
    href: '/nurse',
    icon: UserPlus,
    iconBgColor: 'bg-teal-500',
  },
  {
    label: 'Finance',
    href: '/finance',
    icon: CreditCard,
    iconBgColor: 'bg-cyan-500',
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: Stethoscope,
    iconBgColor: 'bg-fuchsia-500',
  },
  {
    label: 'HRM',
    href: '/hr',
    icon: UserRoundCog,
    iconBgColor: 'bg-lime-500',
  },
  {
    label: 'CRM',
    href: '/crm',
    icon: Briefcase,
    iconBgColor: 'bg-pink-500',
  },
  {
    label: 'Reporting',
    href: '/reporting',
    icon: BarChart,
    iconBgColor: 'bg-sky-500',
  },
  {
    label: 'General',
    href: '/settings',
    icon: Settings,
    iconBgColor: 'bg-green-500',
  },
];
