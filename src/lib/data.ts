import { User, Users, Calendar, DollarSign } from 'lucide-react';

export const kpis = [
  {
    title: 'Doctors',
    value: '247',
    icon: User,
    change: '+20%',
    changeColor: 'text-green-500',
    duration: 'in last 7 days',
  },
  {
    title: 'Patients',
    value: '4178',
    icon: Users,
    change: '-12%',
    changeColor: 'text-red-500',
    duration: 'in last 7 days',
  },
  {
    title: 'Appointments',
    value: '1278',
    icon: Calendar,
    change: '+5%',
    changeColor: 'text-green-500',
    duration: 'in last 7 days',
  },
  {
    title: 'Revenue',
    value: '$55,240',
    icon: DollarSign,
    change: '+8%',
    changeColor: 'text-green-500',
    duration: 'in last 7 days',
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
  { name: 'Dr. Sarah Johnson', specialty: 'Orthopedic Surgeon' },
  { name: 'Dr. Emily Carter', specialty: 'Pediatrician' },
  { name: 'Dr. David Lee', specialty: 'Gynecologist' },
  { name: 'Dr. Michael Smith', specialty: 'Cardiologist' },
];


export const incomeByTreatment = [
  { treatment: 'Cardiology', appointments: 4558, income: 5985 },
  { treatment: 'Radiology', appointments: 4125, income: 5194 },
  { treatment: 'Dental Surgery', appointments: 1795, income: 2716 },
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
  },
  {
    code: '1200',
    name: 'Accounts Receivable',
    type: 'Asset',
    description: 'Money owed to the company by its customers.',
    status: 'Active',
  },
  {
    code: '1600',
    name: 'Prepaid Expenses',
    type: 'Asset',
    description: 'Expenses paid in advance.',
    status: 'Active',
  },
  {
    code: '1700',
    name: 'Fixed Assets',
    type: 'Asset',
    description: 'Long-term assets like equipment and buildings.',
    status: 'Active',
  },
  {
    code: '2010',
    name: 'Accounts Payable',
    type: 'Liability',
    description: 'Money the company owes to its suppliers.',
    status: 'Active',
  },
  {
    code: '2200',
    name: 'Accrued Liabilities',
    type: 'Liability',
    description: 'Expenses that have been incurred but not yet paid.',
    status: 'Active',
  },
  {
    code: '3000',
    name: 'Common Stock',
    type: 'Equity',
    description: 'Investment from shareholders.',
    status: 'Active',
  },
  {
    code: '3500',
    name: 'Retained Earnings',
    type: 'Equity',
    description: 'Cumulative net earnings or profits of the company after accounting for dividend payments.',
    status: 'Active',
  },
  {
    code: '4000',
    name: 'Service Revenue',
    type: 'Revenue',
    description: 'Revenue from services provided.',
    status: 'Active',
  },
  {
    code: '4500',
    name: 'Interest Income',
    type: 'Revenue',
    description: 'Revenue from interest on investments.',
    status: 'Inactive',
  },
  {
    code: '5010',
    name: 'Salaries and Wages',
    type: 'Expense',
    description: 'Employee salaries and wages.',
    status: 'Active',
  },
  {
    code: '5020',
    name: 'Rent Expense',
    type: 'Expense',
    description: 'Rent for office space.',
    status: 'Active',
  },
  {
    code: '5030',
    name: 'Utilities Expense',
    type: 'Expense',
    description: 'Cost of utilities like electricity, water, gas.',
    status: 'Active',
  },
  {
    code: '5040',
    name: 'Depreciation Expense',
    type: 'Expense',
    description: 'The allocation of the cost of a tangible asset over its useful life.',
    status: 'Inactive',
  },
];
