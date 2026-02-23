'use client';

import { useState } from 'react';
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
import {
  appointmentStats,
  appointments,
  departmentPatientChartData,
  kpis,
  popularDoctors,
} from '@/constants/data';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Bar,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
} from 'recharts';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { PatientRegistrationDrawer } from '@/components/patient-registration-drawer';

export default function DashboardPage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const chartConfig = {
    all: {
      label: 'All',
    },
    completed: {
      label: 'Completed',
    },
    cancelled: {
      label: 'Cancelled',
    },
  };

  const departmentChartConfig = departmentPatientChartData.reduce(
    (acc: any, cur) => {
      acc[cur.name] = { label: cur.name, color: cur.fill };
      return acc;
    },
    {}
  );

  return (
    <>
      <PageHeader title="Admin Dashboard">
        <Button onClick={() => setDrawerOpen(true)}>Register Patient</Button>
      </PageHeader>
      <div className="mt-4 grid gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.iconBg}`}
                >
                  <kpi.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={`mr-1 flex items-center gap-1 text-xs ${kpi.changeColor}`}
                  >
                    <kpi.changeIcon className="h-3 w-3" />
                    {kpi.change}
                  </span>
                  {kpi.duration}
                </p>
                <div className="h-16">
                  {kpi.chartType === 'bar' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={kpi.chartData}>
                        <Bar dataKey="v" fill={kpi.chartColor} radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={kpi.chartData}>
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke={kpi.chartColor}
                          strokeWidth={2}
                          dot={false}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>
                An overview of scheduled, completed, and canceled appointments.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={chartConfig} className="h-72 w-full">
                <ResponsiveContainer>
                  <RechartsBarChart data={appointmentStats}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={12}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={12}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={false}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="all"
                      name="All"
                      fill="hsl(var(--chart-1))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="completed"
                      name="Completed"
                      fill="hsl(var(--chart-2))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="cancelled"
                      name="Cancelled"
                      fill="hsl(var(--chart-3))"
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Popular Doctors</CardTitle>
              <CardDescription>
                Top performing doctors based on patient bookings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {popularDoctors.map((doctor) => (
                  <li key={doctor.name} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={doctor.avatar} />
                      <AvatarFallback>
                        {doctor.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doctor.specialty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{doctor.bookings}</p>
                      <p className="text-sm text-muted-foreground">Bookings</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Patients by Department</CardTitle>
              <CardDescription>
                Distribution of patients across different departments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={departmentChartConfig}
                className="h-64 w-full"
              >
                <ResponsiveContainer>
                  <RechartsPieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie data={departmentPatientChartData} dataKey="value" nameKey="name">
                      {departmentPatientChartData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartLegend
                      content={<ChartLegendContent nameKey="name" />}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                A list of appointments scheduled for today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.slice(0, 5).map((appointment) => (
                    <TableRow key={appointment.patient}>
                      <TableCell>
                        <div className="font-medium">{appointment.patient}</div>
                      </TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell className="text-right">
                        {appointment.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <PatientRegistrationDrawer
        open={isDrawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
