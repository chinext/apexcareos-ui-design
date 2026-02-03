'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { format } from 'date-fns';

export function ScheduleAppointmentDialog() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Schedule New Appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details to book a new appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patient" className="text-right">
              Patient
            </Label>
            <Input id="patient" placeholder="Patient Name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctor" className="text-right">
              Doctor
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ava-williams">Dr. Ava Williams</SelectItem>
                <SelectItem value="noah-brown">Dr. Noah Brown</SelectItem>
                <SelectItem value="sophia-garcia">Dr. Sophia Garcia</SelectItem>
                <SelectItem value="james-davis">Dr. James Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Service
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checkup">General Checkup</SelectItem>
                <SelectItem value="dental">Dental Cleaning</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'col-span-3 justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
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
        </div>
        <DialogFooter>
          <Button type="submit">Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
