'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/lib/utils';

const recentDeposits = [
  { id: 'DEP001', date: '2024-05-20', account: 'Chase Bank - ****2345', amount: 2500.0, memo: 'Client Payment' },
  { id: 'DEP002', date: '2024-05-18', account: 'Bank of America - ****5678', amount: 1200.5, memo: 'Online Sales' },
  { id: 'DEP003', date: '2024-05-15', account: 'Chase Bank - ****2345', amount: 350.0, memo: 'Refund Received' },
];

export default function AccountingBankDepositPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Bank Deposit">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Deposit
        </Button>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Record Bank Deposit</CardTitle>
              <CardDescription>
                Fill in the details to record a new deposit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="deposit-to">Deposit to Account</Label>
                  <Select>
                    <SelectTrigger id="deposit-to">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chase">Chase Bank - ****2345</SelectItem>
                      <SelectItem value="boa">Bank of America - ****5678</SelectItem>
                      <SelectItem value="wells">Wells Fargo - ****8901</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
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

              <div className="space-y-4 pt-4">
                 <h4 className="text-sm font-medium">Received From</h4>
                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="received-from">Account</Label>
                         <Select>
                            <SelectTrigger id="received-from">
                            <SelectValue placeholder="Select source account" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="undeposited">Undeposited Funds</SelectItem>
                            <SelectItem value="sales">Sales Revenue</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                 </div>
              </div>


              <div className="space-y-2">
                <Label htmlFor="memo">Memo (Optional)</Label>
                <Textarea id="memo" placeholder="Add a note for this deposit..." />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Deposit</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDeposits.map((deposit) => (
                    <TableRow key={deposit.id}>
                      <TableCell>
                        <div className="font-medium">{deposit.date}</div>
                        <div className="text-xs text-muted-foreground">{deposit.account}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(deposit.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
