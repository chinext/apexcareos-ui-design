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
        subLinks: [{ label: 'Admin Dashboard', href: '/dashboard' }],
      },
    ],
  },
  {
    groupLabel: 'Clinic',
    links: [
      { label: 'Appointments', href: '/appointments', icon: Calendar },
      { label: 'Doctors', href: '/hr/employees', icon: User },
      { label: 'Services', href: '/services', icon: Stethoscope },
      { label: 'Locations', href: '/locations', icon: Building },
    ],
  },
  {
    groupLabel: 'Marketing',
    links: [
      { label: 'Dashboard', href: '/crm/dashboard', icon: LayoutDashboard },
      { label: 'Lead', href: '/crm/lead', icon: UserPlus },
      { label: 'Opportunity', href: '/crm/opportunity', icon: Briefcase },
      { label: 'Retainer', href: '/crm/retainer', icon: FileText },
      { label: 'Referral', href: '/crm/referral', icon: Users },
      { label: 'Report', href: '/crm/report', icon: BarChart },
      { label: 'Campaign', href: '/crm/campaign', icon: Volume2 },
      { label: 'Patients', href: '/crm/patients', icon: Users },
    ],
  },
  {
    groupLabel: 'Human Resources',
    links: [
      { label: 'All Personnel', href: '/hr/employees', icon: Users },
      { label: 'Staff exit', href: '/hr/staff-exit', icon: LogOut },
      { label: 'Personnel Training', href: '/hr/training', icon: UserCog },
      {
        label: 'Department/Organogram',
        href: '/hr/organogram',
        icon: Network,
      },
      { label: 'Leaves', href: '/hr/leave', icon: CalendarOff },
      { label: 'Holidays', href: '/hr/holidays', icon: Calendar },
      { label: 'Attendance', href: '/hr/attendance', icon: ClipboardCheck },
      {
        label: 'Monthly Schedule',
        href: '/hr/schedule',
        icon: CalendarDays,
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
      { label: 'Cash Flow', href: '/finance/cash-flow', icon: ArrowLeftRight },
      {
        label: 'Payroll',
        href: '/finance/payroll',
        icon: Users,
        subLinks: [
          { label: 'Employee', href: '/finance/payroll/employee' },
          { label: 'Contractors', href: '/finance/payroll/contractors' },
          {
            label: 'Worke\'s Compensation',
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
      { label: 'Activities', href: '/activities', icon: Activity },
      { label: 'Messages', href: '/messages', icon: MessageSquare },
      { label: 'Reporting', href: '/reporting', icon: BarChart },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

export const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
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
    label: 'HRM',
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
