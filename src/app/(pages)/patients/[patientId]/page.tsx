'use client';

import {
  ArrowLeft,
  Briefcase,
  Cake,
  Droplets,
  Heart,
  Info,
  Mail,
  Mars,
  Phone,
  Thermometer,
  Venus,
  Wind,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { medicalRecords, patientsList, appointments } from '@/constants/data';
import { PageHeader } from '@/components/page-header';
import { format } from 'date-fns';

export default function PatientDetailPage({
  params,
}: {
  params: { patientId: string };
}) {
  const patient = patientsList.find((p) => p.id === params.patientId);
  const medicalRecord = medicalRecords.find((r) => r.name === patient?.name);
  const patientAppointments = appointments.filter(
    (a) => a.patient === patient?.name
  );

  if (!patient) {
    return notFound();
  }

  const getGenderIcon = (gender: string) => {
    if (gender === 'Male') return <Mars className="h-4 w-4" />;
    if (gender === 'Female') return <Venus className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  return (
    <>
      <PageHeader title="Patient Details">
        <Link href="/patients" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Patients
          </Button>
        </Link>
      </PageHeader>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarImage src={patient.avatar} alt={patient.name} />
                  <AvatarFallback>
                    {patient.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{patient.name}</h2>
                  <p className="text-sm text-muted-foreground">{patient.id}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cake className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(patient.dob), 'dd-MMM-yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getGenderIcon(patient.gender)}
                  <span>{patient.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.account}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="medical_history">Medical History</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Last Vitals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {medicalRecord?.vitals ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            <Heart className="mr-2 inline h-4 w-4" />
                            Heart Rate
                          </span>
                          <strong>{medicalRecord.vitals.heartRate}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            <Droplets className="mr-2 inline h-4 w-4" />
                            Blood Pressure
                          </span>
                          <strong>
                            {medicalRecord.vitals.bloodPressure}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            <Thermometer className="mr-2 inline h-4 w-4" />
                            Temperature
                          </span>
                          <strong>{medicalRecord.vitals.temperature}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            <Wind className="mr-2 inline h-4 w-4" />
                            Resp. Rate
                          </span>
                          <strong>
                            {medicalRecord.vitals.respiratoryRate}
                          </strong>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">No vitals recorded.</p>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blood Type</span>
                      <strong>{patient.bloodGroup || 'N/A'}</strong>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Date of Birth
                      </span>
                      <strong>
                         {format(new Date(patient.dob), 'dd-MMM-yyyy')}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Visit</span>
                      <strong>
                        {format(new Date(patient.lastVisit), 'dd-MMM-yyyy')}
                      </strong>
                    </div>
                  </CardContent>
                </Card>
                <Card className="sm:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patientAppointments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Time</TableHead>
                           <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patientAppointments.slice(0, 3).map((appt, i) => (
                          <TableRow key={i}>
                            <TableCell>{appt.doctor}</TableCell>
                            <TableCell>{appt.service}</TableCell>
                            <TableCell>{appt.time}</TableCell>
                             <TableCell>
                                <Badge
                                    variant={
                                    appt.status === 'Completed'
                                        ? 'default'
                                        : appt.status === 'Pending'
                                        ? 'destructive'
                                        : 'secondary'
                                    }
                                >
                                    {appt.status}
                                </Badge>
                             </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    ) : (
                        <p className="text-center text-muted-foreground">No appointments found.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="appointments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                   {patientAppointments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Time</TableHead>
                           <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patientAppointments.map((appt, i) => (
                          <TableRow key={i}>
                            <TableCell>{appt.doctor}</TableCell>
                            <TableCell>{appt.service}</TableCell>
                            <TableCell>{appt.time}</TableCell>
                             <TableCell>
                                <Badge
                                    variant={
                                    appt.status === 'Completed'
                                        ? 'default'
                                        : appt.status === 'Pending'
                                        ? 'destructive'
                                        : 'secondary'
                                    }
                                >
                                    {appt.status}
                                </Badge>
                             </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    ) : (
                        <p className="text-center text-muted-foreground">No appointments found.</p>
                    )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="medical_history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No medical history available.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No billing information available.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
