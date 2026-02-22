'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

export default function PatientsPage() {
  const [dob, setDob] = useState<Date>();

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Patient Registration">
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Register Patient
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>New Patient Details</CardTitle>
          <CardDescription>
            Fill out the form to register a new patient.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="text-lg font-medium leading-6 text-foreground">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <Label htmlFor="full-name">Full Name *</Label>
                    <Input
                      id="full-name"
                      placeholder="Enter patient's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !dob && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dob ? format(dob, 'PPP') : <span>dd/mm/yyyy</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dob}
                          onSelect={setDob}
                          captionLayout="dropdown-buttons"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="text-lg font-medium leading-6 text-foreground">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter patient's full address"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="text-lg font-medium leading-6 text-foreground">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <Label htmlFor="emergency-name">Contact Name *</Label>
                    <Input
                      id="emergency-name"
                      placeholder="Enter emergency contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency-phone">Contact Phone *</Label>
                    <Input
                      id="emergency-phone"
                      type="tel"
                      placeholder="Enter emergency contact phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency-relation">Relationship</Label>
                    <Input
                      id="emergency-relation"
                      placeholder="e.g. Spouse, Parent"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="text-lg font-medium leading-6 text-foreground">
                  Medical Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="blood-type">Blood Type</Label>
                    <Select>
                      <SelectTrigger id="blood-type">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a+">A+</SelectItem>
                        <SelectItem value="a-">A-</SelectItem>
                        <SelectItem value="b+">B+</SelectItem>
                        <SelectItem value="b-">B-</SelectItem>
                        <SelectItem value="ab+">AB+</SelectItem>
                        <SelectItem value="ab-">AB-</SelectItem>
                        <SelectItem value="o+">O+</SelectItem>
                        <SelectItem value="o-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div></div>
                  <div className="md:col-span-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      placeholder="List any known allergies..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="medical-history">
                      Past Medical History
                    </Label>
                    <Textarea
                      id="medical-history"
                      placeholder="List any significant past medical history..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Register Patient</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
