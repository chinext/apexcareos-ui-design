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
import { medicalRecords } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeartPulse, Droplets, Thermometer, Wind } from 'lucide-react';

type Patient = (typeof medicalRecords)[0];

export default function MedicalPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    medicalRecords[0]
  );

  return (
    <div className="grid flex-1 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
      <div className="border-r md:col-span-1 xl:col-span-1">
        <Card className="h-full rounded-none border-0 border-r">
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>
              Select a patient to view their medical record.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="sr-only">
                <TableRow>
                  <TableHead>Patient</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalRecords.map((patient) => (
                  <TableRow
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`cursor-pointer ${
                      selectedPatient?.id === patient.id ? 'bg-muted/50' : ''
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`https://i.pravatar.cc/40?u=${patient.id}`}
                            alt={patient.name}
                          />
                          <AvatarFallback>
                            {patient.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {patient.age}, {patient.gender}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 p-6 md:col-span-2 xl:col-span-3">
        {selectedPatient ? (
          <>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {selectedPatient.name}
                    </CardTitle>
                    <CardDescription>
                      {selectedPatient.age} years old, {selectedPatient.gender},
                      Blood Type: {selectedPatient.bloodType}
                    </CardDescription>
                  </div>
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={`https://i.pravatar.cc/64?u=${selectedPatient.id}`}
                      alt={selectedPatient.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {selectedPatient.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vitals</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <HeartPulse className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Heart Rate
                    </div>
                    <div className="text-base font-bold">
                      {selectedPatient.vitals.heartRate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <Droplets className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Blood Pressure
                    </div>
                    <div className="text-base font-bold">
                      {selectedPatient.vitals.bloodPressure}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <Thermometer className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Temperature
                    </div>
                    <div className="text-base font-bold">
                      {selectedPatient.vitals.temperature}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <Wind className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Respiratory Rate
                    </div>
                    <div className="text-base font-bold">
                      {selectedPatient.vitals.respiratoryRate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Last Consultation</CardTitle>
                <CardDescription>
                  {selectedPatient.lastVisit} with {selectedPatient.doctor}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Diagnosis</h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedPatient.diagnosis}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Doctor's Notes</h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedPatient.notes}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Select a patient to view their medical record.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
