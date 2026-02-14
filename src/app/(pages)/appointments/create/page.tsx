'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/page-header';

export default function CreateAppointmentPage() {
  const [date, setDate] = useState<Date>();

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Create Appointment">
        <Button variant="outline" asChild>
          <Link href="/appointments">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Appointments
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="appointment-id">Appointment ID</Label>
                  <Input
                    id="appointment-id"
                    defaultValue="AP234354"
                    disabled
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="patient">Patient *</Label>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-doe">John Doe</SelectItem>
                        <SelectItem value="jane-smith">Jane Smith</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="link" className="p-0">
                      Add New
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="doctor">Doctor *</Label>
                  <Select>
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                      <SelectItem value="dr-jones">Dr. Jones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date of Appointment *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>dd/mm/yyyy</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="reason">Appointment Reason</Label>
                  <Textarea id="reason" placeholder="Enter reason..." />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dental">Dental</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="appointment-type">Appointment Type *</Label>
                  <Select>
                    <SelectTrigger id="appointment-type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="check-up">Check-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <div className="relative">
                    <Input id="time" type="time" className="pr-8" />
                    <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="pt-8">
                  <Label htmlFor="status">Status *</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Create Appointment</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
