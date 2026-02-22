'use client';

import { useParams } from 'next/navigation';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { patientsList } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { differenceInYears, format } from 'date-fns';

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.patientId as string;

  const patient = patientsList.find((p) => p.id === patientId);

  if (!patient) {
    return (
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <PageHeader title="Patient Not Found" />
        <p>The patient with ID {patientId} could not be found.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Patient Details" />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback className="text-3xl">
                {patient.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{patient.name}</CardTitle>
              <CardDescription>
                {patient.id} &bull; {patient.gender} &bull;{' '}
                {differenceInYears(new Date(), new Date(patient.dob))} years old
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold">Contact Information</h4>
              <p className="text-sm">Phone: {patient.phone}</p>
              <p className="text-sm">Email: {patient.email}</p>
            </div>
            <div>
              <h4 className="font-semibold">Medical Information</h4>
              <p className="text-sm">Blood Group: {patient.bloodGroup}</p>
              <p className="text-sm">
                Last Visit: {format(new Date(patient.lastVisit), 'PPP')}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Account Information</h4>
            <p className="text-sm">Provider: {patient.account}</p>
            <p className="text-sm">
              Registered on:{' '}
              {format(new Date(patient.registeredDate), 'PPP')}
            </p>
            <p className="text-sm">Status: {patient.status}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
