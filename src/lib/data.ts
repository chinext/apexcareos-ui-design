import { BarChart, Calendar, DollarSign, Users } from "lucide-react";

export const kpis = [
  {
    title: "Total Patients",
    value: "1,254",
    icon: Users,
    change: "+15.2%",
    changeColor: "text-green-500",
  },
  {
    title: "Appointments Today",
    value: "82",
    icon: Calendar,
    change: "+5.0%",
    changeColor: "text-green-500",
  },
  {
    title: "Bed Occupancy",
    value: "76%",
    icon: BarChart,
    change: "-2.1%",
    changeColor: "text-red-500",
  },
  {
    title: "Revenue Today",
    value: "$12,840",
    icon: DollarSign,
    change: "+8.3%",
    changeColor: "text-green-500",
  },
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

export const patientAdmissionsChartData = [
    { date: "Jan", admissions: 120 },
    { date: "Feb", admissions: 130 },
    { date: "Mar", admissions: 155 },
    { date: "Apr", admissions: 140 },
    { date: "May", admissions: 160 },
    { date: "Jun", admissions: 180 },
];

export const departmentPatientChartData = [
  { name: 'Cardiology', value: 340, fill: "hsl(var(--chart-1))" },
  { name: 'Orthopedics', value: 280, fill: "hsl(var(--chart-2))" },
  { name: 'Neurology', value: 220, fill: "hsl(var(--chart-3))" },
  { name: 'Pediatrics', value: 190, fill: "hsl(var(--chart-4))" },
  { name: 'Oncology', value: 150, fill: "hsl(var(--chart-5))" },
]
