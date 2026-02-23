import { User, Users, Calendar, DollarSign, TrendingUp, TrendingDown, UserPlus } from 'lucide-react';

export const kpis = [
  {
    title: 'Doctors',
    value: '247',
    icon: User,
    iconBg: 'bg-indigo-500',
    change: '+95%',
    changeIcon: TrendingUp,
    changeColor: 'text-green-600',
    changeBg: 'bg-green-100 dark:bg-green-900/50',
    duration: 'in last 7 Days',
    chartType: 'bar',
    chartData: [ { v: 5 }, { v: 7 }, { v: 10 }, { v: 8 }, { v: 15 }, { v: 12 } ],
    chartColor: 'hsl(var(--primary))'
  },
  {
    title: 'Patients',
    value: '4,178',
    icon: Users,
    iconBg: 'bg-red-500',
    change: '-15%',
    changeIcon: TrendingDown,
    changeColor: 'text-red-600',
    changeBg: 'bg-red-100 dark:bg-red-900/50',
    duration: 'in last 7 Days',
    chartType: 'bar',
    chartData: [ { v: 15 }, { v: 12 }, { v: 8 }, { v: 10 }, { v: 7 }, { v: 5 } ],
    chartColor: 'hsl(var(--primary))'
  },
  {
    title: 'Appointment',
    value: '12,178',
    icon: Calendar,
    iconBg: 'bg-sky-500',
    change: '+25%',
    changeIcon: TrendingUp,
    changeColor: 'text-green-600',
    changeBg: 'bg-green-100 dark:bg-green-900/50',
    duration: 'in last 7 Days',
    chartType: 'line',
    chartData: [ { v: 5 }, { v: 7 }, { v: 6 }, { v: 9 }, { v: 8 }, { v: 11 } ],
    chartColor: '#f87171'
  },
  {
    title: 'Revenue',
    value: '$55,240',
    icon: DollarSign,
    iconBg: 'bg-emerald-500',
    change: '+25%',
    changeIcon: TrendingUp,
    changeColor: 'text-green-600',
    changeBg: 'bg-green-100 dark:bg-green-900/50',
    duration: 'in last 7 Days',
    chartType: 'line',
    chartData: [ { v: 5 }, { v: 6 }, { v: 8 }, { v: 7 }, { v: 9 }, { v: 12 } ],
    chartColor: '#34d399'
  },
];

export const hospitals = [
  {
    id: 'trustcare',
    name: 'Trustcare Clinic',
    location: 'Las Vegas',
    avatar: 'https://i.pravatar.cc/40?u=trustcare',
  },
  {
    id: 'apexhealth',
    name: 'Apex Health',
    location: 'New York',
    avatar: 'https://i.pravatar.cc/40?u=apexhealth',
  },
  {
    id: 'summitmed',
    name: 'Summit Medical',
    location: 'Chicago',
    avatar: 'https://i.pravatar.cc/40?u=summitmed',
  },
];

export const appointmentStats = [
  { month: 'Jan', all: 4000, completed: 2400, cancelled: 400 },
  { month: 'Feb', all: 3000, completed: 1398, cancelled: 300 },
  { month: 'Mar', all: 5000, completed: 4800, cancelled: 500 },
  { month: 'Apr', all: 4780, completed: 3908, cancelled: 450 },
  { month: 'May', all: 5890, completed: 4800, cancelled: 600 },
  { month: 'Jun', all: 4390, completed: 3800, cancelled: 550 },
  { month: 'Jul', all: 5490, completed: 4300, cancelled: 650 },
  { month: 'Aug', all: 4490, completed: 3300, cancelled: 450 },
  { month: 'Sep', all: 3490, completed: 2300, cancelled: 350 },
  { month: 'Oct', all: 4490, completed: 3300, cancelled: 450 },
  { month: 'Nov', all: 3490, completed: 2300, cancelled: 350 },
  { month: 'Dec', all: 5490, completed: 4300, cancelled: 650 },
];

export const popularDoctors = [
    { name: 'Dr. Alex Morgan', specialty: 'Cardiologist', bookings: 258, avatar: 'https://i.pravatar.cc/40?u=alex' },
    { name: 'Dr. Emily Carter', specialty: 'Pediatrician', bookings: 125, avatar: 'https://i.pravatar.cc/40?u=emily' },
    { name: 'Dr. David Lee', specialty: 'Gynecologist', bookings: 115, avatar: 'https://i.pravatar.cc/40?u=david' },
];

export const departmentPatientChartData = [
  { name: 'Cardiology', value: 214, fill: "hsl(var(--chart-1))" },
  { name: 'Dental', value: 150, fill: "hsl(var(--chart-2))" },
  { name: 'Neurology', value: 101, fill: "hsl(var(--chart-3))" },
  { name: 'Other', value: 173, fill: "hsl(var(--chart-4))" },
];

export const doctorSchedule = [
  { name: 'Dr. Sarah Johnson', specialty: 'Orthopedic Surgeon', avatar: 'https://i.pravatar.cc/40?u=sarah' },
  { name: 'Dr. Emily Carter', specialty: 'Pediatrician', avatar: 'https://i.pravatar.cc/40?u=emily' },
  { name: 'Dr. David Lee', specialty: 'Gynecologist', avatar: 'https://i.pravatar.cc/40?u=david' },
  { name: 'Dr. Michael Smith', specialty: 'Cardiologist', avatar: 'https://i.pravatar.cc/40?u=michael' },
];


export const incomeByTreatment = [
  { treatment: 'Cardiology', appointments: 4556, income: 5985 },
  { treatment: 'Radiology', appointments: 4125, income: 5194 },
  { treatment: 'Dental Surgery', appointments: 1796, income: 2716 },
  { treatment: 'Orthopaedics', appointments: 3827, income: 4682 },
  { treatment: 'General Medicine', appointments: 9894, income: 9450 },
];

export const allAppointments = [
    { doctor: 'Dr. John Smith', patient: 'Jesus Adams', date: '28 May 2025 - 11:15 AM', status: 'Confirmed' },
    { doctor: 'Dr. Lisa White', patient: 'Ezra Belcher', date: '29 May 2025 - 11:30 AM', status: 'Cancelled' },
    { doctor: 'Dr. Patrick Brown', patient: 'Glen Lentz', date: '30 May 2025 - 09:30 AM', status: 'Confirmed' },
    { doctor: 'Dr. Rachel Green', patient: 'Bernard Griffith', date: '30 May 2025 - 10:00 AM', status: 'Checked Out' },
    { doctor: 'Dr. Michael Smith', patient: 'John Elsass', date: '30 May 2025 - 11:00 AM', status: 'Schedule' },
];

export const appointments = [
  {
    patient: "Liam Johnson",
    doctor: "Dr. Ava Williams",
    service: "General Checkup",
    time: "9:00 AM",
    status: "Confirmed",
  },
  {
    patient: "Olivia Smith",
    doctor: "Dr. Noah Brown",
    service: "Dental Cleaning",
    time: "10:30 AM",
    status: "Completed",
  },
  {
    patient: "Elijah Jones",
    doctor: "Dr. Sophia Garcia",
    service: "Cardiology",
    time: "11:00 AM",
    status: "Confirmed",
  },
  {
    patient: "Emma Miller",
    doctor: "Dr. James Davis",
    service: "Radiology (X-Ray)",
    time: "1:15 PM",
    status: "Pending",
  },
  {
    patient: "Benjamin Wilson",
    doctor: "Dr. Isabella Martinez",
    service: "Neurology",
    time: "2:45 PM",
    status: "Confirmed",
  },
    {
    patient: "Mia Anderson",
    doctor: "Dr. William Taylor",
    service: "Pediatrics",
    time: "3:00 PM",
    status: "Completed",
  },
];

export const employees = [
  {
    id: 'EMP001',
    name: 'Dr. Ava Williams',
    role: 'Cardiologist',
    department: 'Cardiology',
    email: 'ava.williams@apexcare.com',
    phone: '555-0101',
    status: 'Active',
  },
  {
    id: 'EMP002',
    name: 'Dr. Noah Brown',
    role: 'Dentist',
    department: 'Dental',
    email: 'noah.brown@apexcare.com',
    phone: '555-0102',
    status: 'Active',
  },
  {
    id: 'EMP003',
    name: 'Dr. Sophia Garcia',
    role: 'Neurologist',
    department: 'Neurology',
    email: 'sophia.garcia@apexcare.com',
    phone: '555-0103',
    status: 'On Leave',
  },
  {
    id: 'EMP004',
    name: 'Dr. James Davis',
    role: 'Radiologist',
    department: 'Radiology',
    email: 'james.davis@apexcare.com',
    phone: '555-0104',
    status: 'Active',
  },
  {
    id: 'EMP005',
    name: 'Nurse Liam Johnson',
    role: 'Registered Nurse',
    department: 'General Medicine',
    email: 'liam.johnson@apexcare.com',
    phone: '555-0105',
    status: 'Active',
  },
  {
    id: 'EMP006',
    name: 'Nurse Olivia Smith',
    role: 'Nurse Practitioner',
    department: 'Pediatrics',
    email: 'olivia.smith@apexcare.com',
    phone: '555-0106',
    status: 'Active',
  },
];

export const medicalRecords = [
    {
        id: 'PAT001',
        name: 'Liam Johnson',
        age: 28,
        gender: 'Male',
        bloodType: 'O+',
        lastVisit: '2024-05-15',
        diagnosis: 'Common Cold',
        doctor: 'Dr. Ava Williams',
        notes: 'Prescribed rest and fluids. Follow up if symptoms worsen.',
        vitals: {
            heartRate: '75 bpm',
            bloodPressure: '120/80 mmHg',
            temperature: '98.6°F',
            respiratoryRate: '16 breaths/min',
        }
    },
    {
        id: 'PAT002',
        name: 'Olivia Smith',
        age: 45,
        gender: 'Female',
        bloodType: 'A-',
        lastVisit: '2024-05-10',
        diagnosis: 'Migraine',
        doctor: 'Dr. Sophia Garcia',
        notes: 'Patient reports severe headaches. Prescribed Sumatriptan. Advised to avoid triggers.',
        vitals: {
            heartRate: '82 bpm',
            bloodPressure: '125/85 mmHg',
            temperature: '98.7°F',
            respiratoryRate: '18 breaths/min',
        }
    },
    {
        id: 'PAT003',
        name: 'Elijah Jones',
        age: 62,
        gender: 'Male',
        bloodType: 'B+',
        lastVisit: '2024-05-20',
        diagnosis: 'Hypertension',
        doctor: 'Dr. Ava Williams',
        notes: 'Monitoring blood pressure. Lifestyle modifications discussed. Continue with Lisinopril.',
        vitals: {
            heartRate: '68 bpm',
            bloodPressure: '140/90 mmHg',
            temperature: '98.5°F',
            respiratoryRate: '15 breaths/min',
        }
    },
    {
        id: 'PAT004',
        name: 'Emma Miller',
        age: 34,
        gender: 'Female',
        bloodType: 'AB+',
        lastVisit: '2024-04-28',
        diagnosis: 'Sprained Ankle',
        doctor: 'Dr. James Davis',
        notes: 'X-Ray confirmed no fracture. RICE protocol advised. Follow up in 2 weeks.',
        vitals: {
            heartRate: '78 bpm',
            bloodPressure: '118/78 mmHg',
            temperature: '98.8°F',
            respiratoryRate: '17 breaths/min',
        }
    }
];

export const patientStats = [
  { title: 'Total Patients', value: '1,254', change: '+12.5%', changeType: 'increase', icon: Users },
  { title: 'New Patients', value: '89', change: '+8.2%', changeType: 'increase', icon: UserPlus },
  { title: 'In-patients', value: '45', change: '-2.1%', changeType: 'decrease', icon: TrendingUp },
  { title: 'Out-patients', value: '1,209', change: '+15.0%', changeType: 'increase', icon: TrendingDown },
];


export const patientsList = [
    { id: 'PID-001', name: 'Liam Johnson', avatar: 'https://i.pravatar.cc/40?u=liam', phone: '555-0101', email: 'liam.j@example.com', dob: '1995-05-20', registeredDate: '2023-01-15', gender: 'Male', account: 'Aetna', lastVisit: '2024-05-10', bloodGroup: 'O+', status: 'Active' },
    { id: 'PID-002', name: 'Olivia Smith', avatar: 'https://i.pravatar.cc/40?u=olivia', phone: '555-0102', email: 'olivia.s@example.com', dob: '1988-11-30', registeredDate: '2023-02-20', gender: 'Female', account: 'Private', lastVisit: '2024-04-22', bloodGroup: 'A-', status: 'Active' },
    { id: 'PID-003', name: 'Noah Williams', avatar: 'https://i.pravatar.cc/40?u=noah', phone: '555-0103', email: 'noah.w@example.com', dob: '2001-08-12', registeredDate: '2023-03-10', gender: 'Male', account: 'Cigna', lastVisit: '2024-03-15', bloodGroup: 'B+', status: 'Inactive' },
    { id: 'PID-004', name: 'Emma Brown', avatar: 'https://i.pravatar.cc/40?u=emma', phone: '555-0104', email: 'emma.b@example.com', dob: '1992-03-25', registeredDate: '2023-04-05', gender: 'Female', account: 'Private', lastVisit: '2024-05-18', bloodGroup: 'AB+', status: 'Active' },
    { id: 'PID-005', name: 'James Jones', avatar: 'https://i.pravatar.cc/40?u=james', phone: '555-0105', email: 'james.j@example.com', dob: '1976-07-14', registeredDate: '2023-05-21', gender: 'Male', account: 'Blue Cross', lastVisit: '2024-05-01', bloodGroup: 'O-', status: 'Active' },
    { id: 'PID-006', name: 'Sophia Garcia', avatar: 'https://i.pravatar.cc/40?u=sophia', phone: '555-0106', email: 'sophia.g@example.com', dob: '1999-12-01', registeredDate: '2023-06-18', gender: 'Female', account: 'Private', lastVisit: '2024-05-20', bloodGroup: 'A+', status: 'Active' },
    { id: 'PID-007', name: 'Logan Miller', avatar: 'https://i.pravatar.cc/40?u=logan', phone: '555-0107', email: 'logan.m@example.com', dob: '2005-02-18', registeredDate: '2023-07-02', gender: 'Male', account: 'UnitedHealthcare', lastVisit: '2024-02-11', bloodGroup: 'B-', status: 'Inactive' },
    { id: 'PID-008', name: 'Isabella Davis', avatar: 'https://i.pravatar.cc/40?u=isabella', phone: '555-0108', email: 'isabella.d@example.com', dob: '1985-09-05', registeredDate: '2023-08-30', gender: 'Female', account: 'Private', lastVisit: '2024-05-12', bloodGroup: 'AB-', status: 'Active' },
    { id: 'PID-009', name: 'Mason Rodriguez', avatar: 'https://i.pravatar.cc/40?u=mason', phone: '555-0109', email: 'mason.r@example.com', dob: '1990-10-10', registeredDate: '2023-09-11', gender: 'Male', account: 'Humana', lastVisit: '2024-05-09', bloodGroup: 'O+', status: 'Active' },
    { id: 'PID-010', name: 'Ava Martinez', avatar: 'https://i.pravatar.cc/40?u=ava', phone: '555-0110', email: 'ava.m@example.com', dob: '1998-06-22', registeredDate: '2023-10-25', gender: 'Female', account: 'Private', lastVisit: '2024-04-30', bloodGroup: 'A-', status: 'Active' },
    { id: 'PID-011', name: 'Ethan Wilson', avatar: 'https://i.pravatar.cc/40?u=ethan', phone: '555-0111', email: 'ethan.w@example.com', dob: '1983-04-15', registeredDate: '2023-11-01', gender: 'Male', account: 'Aetna', lastVisit: '2024-05-11', bloodGroup: 'B+', status: 'Active' },
    { id: 'PID-012', name: 'Mia Taylor', avatar: 'https://i.pravatar.cc/40?u=mia', phone: '555-0112', email: 'mia.t@example.com', dob: '2000-01-20', registeredDate: '2023-11-15', gender: 'Female', account: 'Cigna', lastVisit: '2024-05-14', bloodGroup: 'O+', status: 'Active' },
    { id: 'PID-013', name: 'Alexander Anderson', avatar: 'https://i.pravatar.cc/40?u=alexander', phone: '555-0113', email: 'alex.a@example.com', dob: '1996-09-03', registeredDate: '2023-12-01', gender: 'Male', account: 'Private', lastVisit: '2024-05-05', bloodGroup: 'A-', status: 'Active' },
    { id: 'PID-014', name: 'Harper Thomas', avatar: 'https://i.pravatar.cc/40?u=harper', phone: '555-0114', email: 'harper.t@example.com', dob: '1991-11-11', registeredDate: '2023-12-20', gender: 'Female', account: 'Blue Cross', lastVisit: '2024-05-02', bloodGroup: 'B-', status: 'Inactive' },
    { id: 'PID-015', name: 'Daniel Jackson', avatar: 'https://i.pravatar.cc/40?u=daniel', phone: '555-0115', email: 'daniel.j@example.com', dob: '1987-08-25', registeredDate: '2024-01-10', gender: 'Male', account: 'UnitedHealthcare', lastVisit: '2024-05-19', bloodGroup: 'AB+', status: 'Active' },
    { id: 'PID-016', name: 'Abigail White', avatar: 'https://i.pravatar.cc/40?u=abigail', phone: '555-0116', email: 'abigail.w@example.com', dob: '1993-02-28', registeredDate: '2024-01-25', gender: 'Female', account: 'Private', lastVisit: '2024-05-13', bloodGroup: 'O-', status: 'Active' },
    { id: 'PID-017', name: 'Matthew Harris', avatar: 'https://i.pravatar.cc/40?u=matthew', phone: '555-0117', email: 'matthew.h@example.com', dob: '1994-07-19', registeredDate: '2024-02-14', gender: 'Male', account: 'Humana', lastVisit: '2024-05-08', bloodGroup: 'A+', status: 'Active' },
    { id: 'PID-018', name: 'Emily Martin', avatar: 'https://i.pravatar.cc/40?u=emily_m', phone: '555-0118', email: 'emily.m@example.com', dob: '1989-04-04', registeredDate: '2024-03-01', gender: 'Female', account: 'Private', lastVisit: '2024-05-17', bloodGroup: 'B+', status: 'Active' },
    { id: 'PID-019', name: 'Joseph Thompson', avatar: 'https://i.pravatar.cc/40?u=joseph', phone: '555-0119', email: 'joseph.t@example.com', dob: '2002-06-09', registeredDate: '2024-03-20', gender: 'Male', account: 'Aetna', lastVisit: '2024-05-03', bloodGroup: 'O+', status: 'Active' },
    { id: 'PID-020', name: 'Charlotte Clark', avatar: 'https://i.pravatar.cc/40?u=charlotte', phone: '555-0120', email: 'charlotte.c@example.com', dob: '1997-10-27', registeredDate: '2024-04-05', gender: 'Female', account: 'Cigna', lastVisit: '2024-05-01', bloodGroup: 'A-', status: 'Inactive' },
];


export const patientAdmissionsChartData = [
    { date: "Jan", admissions: 120 },
    { date: "Feb", admissions: 130 },
    { date: "Mar", admissions: 155 },
    { date: "Apr", admissions: 140 },
    { date: "May", admissions: 160 },
    { date: "Jun", admissions: 180 },
];

export const chartOfAccounts = [
  {
    code: '1010',
    name: 'Cash',
    type: 'Asset',
    description: 'Cash on hand and in bank accounts.',
    status: 'Active',
    currency: 'USD',
    balance: 150000.75,
  },
  {
    code: '1200',
    name: 'Accounts Receivable',
    type: 'Asset',
    description: 'Money owed to the company by its customers.',
    status: 'Active',
    currency: 'USD',
    balance: 75000.0,
  },
  {
    code: '1600',
    name: 'Prepaid Expenses',
    type: 'Asset',
    description: 'Expenses paid in advance.',
    status: 'Active',
    currency: 'USD',
    balance: 12000.5,
  },
  {
    code: '1700',
    name: 'Fixed Assets',
    type: 'Asset',
    description: 'Long-term assets like equipment and buildings.',
    status: 'Active',
    currency: 'USD',
    balance: 550000.0,
  },
  {
    code: '2010',
    name: 'Accounts Payable',
    type: 'Liability',
    description: 'Money the company owes to its suppliers.',
    status: 'Active',
    currency: 'USD',
    balance: -45000.0,
  },
  {
    code: '2200',
    name: 'Accrued Liabilities',
    type: 'Liability',
    description: 'Expenses that have been incurred but not yet paid.',
    status: 'Active',
    currency: 'USD',
    balance: -25000.0,
  },
  {
    code: '3000',
    name: 'Common Stock',
    type: 'Equity',
    description: 'Investment from shareholders.',
    status: 'Active',
    currency: 'USD',
    balance: -300000.0,
  },
  {
    code: '3500',
    name: 'Retained Earnings',
    type: 'Equity',
    description:
      'Cumulative net earnings or profits of the company after accounting for dividend payments.',
    status: 'Active',
    currency: 'USD',
    balance: -150000.0,
  },
  {
    code: '4000',
    name: 'Service Revenue',
    type: 'Revenue',
    description: 'Revenue from services provided.',
    status: 'Active',
    currency: 'USD',
    balance: -250000.25,
  },
  {
    code: '4500',
    name: 'Interest Income',
    type: 'Revenue',
    description: 'Revenue from interest on investments.',
    status: 'Inactive',
    currency: 'USD',
    balance: -5000.0,
  },
  {
    code: '5010',
    name: 'Salaries and Wages',
    type: 'Expense',
    description: 'Employee salaries and wages.',
    status: 'Active',
    currency: 'USD',
    balance: 85000.0,
  },
  {
    code: '5020',
    name: 'Rent Expense',
    type: 'Expense',
    description: 'Rent for office space.',
    status: 'Active',
    currency: 'USD',
    balance: 15000.0,
  },
  {
    code: '5030',
    name: 'Utilities Expense',
    type: 'Expense',
    description: 'Cost of utilities like electricity, water, gas.',
    status: 'Active',
    currency: 'USD',
    balance: 3500.0,
  },
  {
    code: '5040',
    name: 'Depreciation Expense',
    type: 'Expense',
    description:
      'The allocation of the cost of a tangible asset over its useful life.',
    status: 'Inactive',
    currency: 'USD',
    balance: 10000.0,
  },
];
