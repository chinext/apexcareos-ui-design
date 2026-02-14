'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, FileDown } from 'lucide-react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/lib/utils';

const payments = [
  { id: 'PMT001', date: '2024-05-18', payee: 'Office Supplies Inc.', amount: 125.50 },
  { id: 'PMT002', date: '2024-05-15', payee: 'Edison Electric', amount: 340.75 },
  { id: 'PMT003', date: '2024-05-10', payee: 'Tech Solutions Ltd.', amount: 1200.00 },
];
const deposits = [
  { id: 'DEP001', date: '2024-05-20', from: 'Client Payment', amount: 2500.00 },
  { id: 'DEP002', date: '2024-05-12', from: 'Online Sales', amount: 850.25 },
];


export default function AccountingBankReconciliationPage() {
    const [step, setStep] = useState(1);
    const [statementDate, setStatementDate] = useState<Date | undefined>(new Date());

    return (
        <main className="flex-1 space-y-6 p-4 md:p-6">
            <PageHeader title="Bank Reconciliation">
                <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                </Button>
            </PageHeader>

            {step === 1 && (
                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle>Reconcile an Account</CardTitle>
                        <CardDescription>Enter your statement details to begin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="account">Account</Label>
                            <Select>
                                <SelectTrigger id="account">
                                    <SelectValue placeholder="Select an account to reconcile" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="chase">Chase Bank - ****2345</SelectItem>
                                    <SelectItem value="boa">Bank of America - ****5678</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                             <div className="space-y-2">
                                <Label htmlFor="ending-balance">Statement Ending Balance</Label>
                                <Input id="ending-balance" type="number" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="statement-date">Statement Ending Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !statementDate && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {statementDate ? format(statementDate, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={statementDate} onSelect={setStatementDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                         <div className="flex justify-end pt-4">
                             <Button onClick={() => setStep(2)}>Start Reconciling</Button>
                         </div>
                    </CardContent>
                </Card>
            )}

            {step === 2 && (
                 <>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Reconciling Chase Bank - ****2345</CardTitle>
                                <CardDescription>Statement ending 05/31/2024</CardDescription>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Difference</p>
                                <p className="text-2xl font-bold text-red-500">$5,344.00</p>
                            </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                 <h3 className="font-semibold text-lg">Payments</h3>
                                 <p className="text-sm text-muted-foreground">Select all payments that have cleared the bank.</p>
                                 <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-10"><Checkbox /></TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Payee</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {payments.map(p => (
                                                <TableRow key={p.id}>
                                                    <TableCell><Checkbox /></TableCell>
                                                    <TableCell>{p.date}</TableCell>
                                                    <TableCell>{p.payee}</TableCell>
                                                    <TableCell className="text-right">${p.amount.toFixed(2)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                 </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Deposits</h3>
                                <p className="text-sm text-muted-foreground">Select all deposits that have cleared the bank.</p>
                                <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-10"><Checkbox /></TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>From</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {deposits.map(d => (
                                            <TableRow key={d.id}>
                                                <TableCell><Checkbox /></TableCell>
                                                <TableCell>{d.date}</TableCell>
                                                <TableCell>{d.from}</TableCell>
                                                <TableCell className="text-right">${d.amount.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                        <Button>Finish Reconciliation</Button>
                    </div>
                </>
            )}
        </main>
    );
}
