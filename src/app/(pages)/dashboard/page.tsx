'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  kpis,
  appointmentStats,
  popularDoctors,
  departmentPatientChartData,
  doctorSchedule,
  incomeByTreatment,
  allAppointments,
} from '@/lib/data';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Confirmed: 'default',
  Cancelled: 'destructive',
  'Checked Out': 'secondary',
  Schedule: 'outline',
};


export default function DashboardPage() {
  return (
    <main className="flex-1 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-bold">{kpi.value}</div>
              <div className="flex flex-col items-end">
                <div className={`text-xs font-semibold ${kpi.changeColor}`}>{kpi.change}</div>
                <div className="text-xs text-muted-foreground">{kpi.duration}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Appointment Statistics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Appointment Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentStats}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                  cursor={{fill: 'hsl(var(--muted))'}}
                />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="all" name="All Appointments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cancelled" name="Cancelled" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointments Calendar - simplified */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">Calendar view placeholder.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Popular Doctors */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Doctors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularDoctors.map((doctor) => (
              <div key={doctor.name} className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{doctor.name}</p>
                  <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                </div>
                <p className="text-sm text-muted-foreground">{doctor.bookings} Bookings</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Top 3 Departments */}
         <Card>
          <CardHeader>
            <CardTitle>Top Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={departmentPatientChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                   {departmentPatientChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Doctors Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Doctors Schedule</CardTitle>
            <CardDescription>Available: 48, Unavailable: 28, Leave: 12</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {doctorSchedule.map((doctor) => (
              <div key={doctor.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{doctor.name}</p>
                  <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                </div>
                <Button size="sm">Book Now</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

       {/* All Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppointments.map((apt, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{apt.doctor}</TableCell>
                  <TableCell>{apt.patient}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[apt.status] || 'default'}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
