'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ArrowRightLeft } from 'lucide-react';

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

const recentTransfers = [
    { id: 'TRN001', date: '2024-05-21', from: 'Chase Bank', to: 'Savings Account', amount: 5000.00 },
    { id: 'TRN002', date: '2024-05-19', from: 'Bank of America', to: 'Chase Bank', amount: 1500.00 },
    { id: 'TRN003', date: '2024-05-12', from: 'Savings Account', to: 'Investment Fund', amount: 10000.00 },
];

export default function AccountingTransferPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Transfer Funds">
        <Button>
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          New Transfer
        </Button>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
           <Card>
            <CardHeader>
                <CardTitle>Record a Transfer</CardTitle>
                <CardDescription>Move funds between your accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="from-account">From Account</Label>
                        <Select>
                            <SelectTrigger id="from-account">
                            <SelectValue placeholder="Select source account" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="chase">Chase Bank - ****2345</SelectItem>
                            <SelectItem value="boa">Bank of America - ****5678</SelectItem>
                            <SelectItem value="savings">Savings Account - ****1122</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="to-account">To Account</Label>
                        <Select>
                            <SelectTrigger id="to-account">
                            <SelectValue placeholder="Select destination account" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="chase">Chase Bank - ****2345</SelectItem>
                            <SelectItem value="boa">Bank of America - ****5678</SelectItem>
                            <SelectItem value="savings">Savings Account - ****1122</SelectItem>
                             <SelectItem value="investment">Investment Fund</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Transfer Date</Label>
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

                <div className="space-y-2">
                    <Label htmlFor="memo">Memo (Optional)</Label>
                    <Textarea id="memo" placeholder="Add a note for this transfer..." />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Transfer</Button>
                </div>
            </CardContent>
           </Card>
        </div>
         <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
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
                  {recentTransfers.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell>
                        <div className="font-medium">{transfer.date}</div>
                        <div className="text-xs text-muted-foreground">{transfer.from} to {transfer.to}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transfer.amount)}
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
