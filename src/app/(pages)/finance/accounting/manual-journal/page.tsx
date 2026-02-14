'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { chartOfAccounts } from '@/lib/data';

type JournalLine = {
  id: number;
  accountId: string;
  description: string;
  debit: number;
  credit: number;
};

export default function AccountingManualJournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [lines, setLines] = useState<JournalLine[]>([
    { id: 1, accountId: '', description: '', debit: 0, credit: 0 },
    { id: 2, accountId: '', description: '', debit: 0, credit: 0 },
  ]);

  const addLine = () => {
    setLines([
      ...lines,
      { id: Date.now(), accountId: '', description: '', debit: 0, credit: 0 },
    ]);
  };

  const removeLine = (id: number) => {
    setLines(lines.filter((line) => line.id !== id));
  };

  const handleLineChange = (
    id: number,
    field: keyof Omit<JournalLine, 'id'>,
    value: string
  ) => {
    setLines(
      lines.map((line) => {
        if (line.id !== id) return line;

        const updatedLine = { ...line };
        if (field === 'accountId' || field === 'description') {
          updatedLine[field] = value;
        } else {
          const numValue = Number(value);
          if (field === 'debit') {
            updatedLine.debit = numValue;
            if (numValue > 0) updatedLine.credit = 0;
          } else if (field === 'credit') {
            updatedLine.credit = numValue;
            if (numValue > 0) updatedLine.debit = 0;
          }
        }
        return updatedLine;
      })
    );
  };

  const totalDebits = lines.reduce((acc, line) => acc + line.debit, 0);
  const totalCredits = lines.reduce((acc, line) => acc + line.credit, 0);
  const difference = totalDebits - totalCredits;
  const isBalanced = difference === 0 && totalDebits > 0;

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Manual Journal" />
      <Card>
        <CardHeader>
          <CardTitle>New Journal Entry</CardTitle>
          <CardDescription>
            Manually record transactions between accounts. Debits must equal
            credits.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
            <div className="space-y-2">
              <Label htmlFor="journal-no">Journal No.</Label>
              <Input id="journal-no" defaultValue="JRNL-00123" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="USD">
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="memo">Memo</Label>
            <Textarea
              id="memo"
              placeholder="Add a description for this journal entry..."
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Account</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debits</TableHead>
                  <TableHead className="text-right">Credits</TableHead>
                  <TableHead className="w-10">
                    <span className="sr-only">Remove</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell>
                      <Select
                        value={line.accountId}
                        onValueChange={(value) =>
                          handleLineChange(line.id, 'accountId', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {chartOfAccounts.map((acc) => (
                            <SelectItem key={acc.code} value={acc.code}>
                              {acc.code} - {acc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Line description"
                        value={line.description}
                        onChange={(e) =>
                          handleLineChange(line.id, 'description', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="text-right"
                        value={line.debit || ''}
                        onChange={(e) =>
                          handleLineChange(line.id, 'debit', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="text-right"
                        value={line.credit || ''}
                        onChange={(e) =>
                          handleLineChange(line.id, 'credit', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLine(line.id)}
                        disabled={lines.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button variant="outline" onClick={addLine}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add another line
          </Button>
        </CardContent>
        <CardFooter className="flex-col items-end gap-4 rounded-b-lg bg-muted/50 p-6">
          <div className="grid w-full max-w-sm grid-cols-2 gap-x-8 gap-y-2">
            <div className="text-muted-foreground">Total Debits</div>
            <div className="text-right font-mono font-medium">
              {totalDebits.toFixed(2)}
            </div>
            <div className="text-muted-foreground">Total Credits</div>
            <div className="text-right font-mono font-medium">
              {totalCredits.toFixed(2)}
            </div>
            <div className="col-span-2 border-t pt-2"></div>
            <div className="font-semibold text-muted-foreground">
              Difference
            </div>
            <div
              className={cn(
                'text-right font-mono font-semibold',
                difference !== 0 && 'text-destructive'
              )}
            >
              {difference.toFixed(2)}
            </div>
          </div>
          <div className="flex w-full justify-end gap-4 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button disabled={!isBalanced}>Save Journal</Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
