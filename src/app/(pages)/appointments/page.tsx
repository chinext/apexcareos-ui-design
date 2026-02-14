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
import { appointments } from '@/lib/data';
import { ScheduleAppointmentDialog } from '@/components/schedule-appointment-dialog';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Confirmed: 'default',
  Completed: 'secondary',
  Pending: 'outline',
};

export default function AppointmentsPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">Appointments</h1>
          <p className="text-muted-foreground">
            Manage and schedule patient appointments.
          </p>
        </div>
        <ScheduleAppointmentDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>A list of appointments for today.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.patient}>
                  <TableCell className="font-medium">{apt.patient}</TableCell>
                  <TableCell>{apt.doctor}</TableCell>
                  <TableCell>{apt.service}</TableCell>
                  <TableCell>{apt.time}</TableCell>
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
