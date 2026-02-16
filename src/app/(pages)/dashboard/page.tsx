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
  AreaChart,
  Area,
} from 'recharts';
import { PageHeader } from '@/components/page-header';
import { CalendarDays, Plus } from 'lucide-react';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Confirmed: 'default',
  Cancelled: 'destructive',
  'Checked Out': 'secondary',
  Schedule: 'outline',
};


export default function DashboardPage() {
  return (
    <main className="flex-1 space-y-6">
      <PageHeader title="Admin Dashboard">
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New Appointment
        </Button>
        <Button size="sm" variant="outline" className="bg-white text-foreground hover:bg-muted">
          <CalendarDays className="h-4 w-4" />
          Schedule Availability
        </Button>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="relative overflow-hidden">
             <div
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20"
              style={{ background: `radial-gradient(circle at center, ${kpi.chartColor} 0%, transparent 60%)`}}
            />
            <CardContent className="flex justify-between p-6">
              <div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${kpi.iconBg}`}>
                  <kpi.icon className="h-6 w-6 text-white" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${kpi.changeBg}`}>
                  <kpi.changeIcon className={`h-3 w-3 ${kpi.changeColor}`} />
                  <span className={kpi.changeColor}>{kpi.change}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{kpi.duration}</p>
                <div className="mt-2 h-12 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    {kpi.chartType === 'bar' ? (
                      <BarChart data={kpi.chartData}>
                        <Bar dataKey="v" fill={kpi.chartColor} radius={2} />
                      </BarChart>
                    ) : (
                      <AreaChart data={kpi.chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id={`color-${kpi.title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={kpi.chartColor} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={kpi.chartColor} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="v" stroke={kpi.chartColor} strokeWidth={2} fillOpacity={1} fill={`url(#color-${kpi.title.replace(/\s/g, '')})`} />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </div>
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
