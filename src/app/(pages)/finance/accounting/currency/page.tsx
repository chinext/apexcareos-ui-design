'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddCurrencyDialog, CurrencyFormValues } from '@/components/add-currency-dialog';

type Currency = CurrencyFormValues & {
    // any extra fields if needed, but looks like CurrencyFormValues is enough
};

const initialCurrencies: Currency[] = [
    { name: 'US Dollar', code: 'USD', symbol: '$', exchangeRate: 1, status: 'Active' },
    { name: 'Euro', code: 'EUR', symbol: '€', exchangeRate: 0.92, status: 'Active' },
    { name: 'Nigerian Naira', code: 'NGN', symbol: '₦', exchangeRate: 1450, status: 'Active' },
    { name: 'British Pound', code: 'GBP', symbol: '£', exchangeRate: 0.79, status: 'Inactive' },
];

export default function AccountingCurrencyPage() {
  const [currencies, setCurrencies] = useState<Currency[]>(initialCurrencies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Partial<Currency> | null>(null);

  const handleSave = (data: CurrencyFormValues) => {
    if (selectedCurrency && selectedCurrency.code) {
      // It's an edit
      setCurrencies(currencies.map(c => c.code === selectedCurrency.code ? { ...c, ...data } : c));
    } else {
      // It's a new currency
      setCurrencies([...currencies, { ...data, code: data.code.toUpperCase() }]);
    }
  };

  const openDialog = (currency: Partial<Currency> | null = null) => {
    setSelectedCurrency(currency);
    setIsDialogOpen(true);
  };

  return (
    <>
      <PageHeader title="Currencies">
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Currency
        </Button>
      </PageHeader>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Manage Currencies</CardTitle>
            <CardDescription>
              Add, edit, and manage currency exchange rates for your business.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Currency Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Exchange Rate (to USD)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currencies.map((currency) => (
                  <TableRow key={currency.code}>
                    <TableCell className="font-medium">{currency.name}</TableCell>
                    <TableCell>{currency.code}</TableCell>
                    <TableCell>{currency.symbol}</TableCell>
                    <TableCell>{currency.exchangeRate}</TableCell>
                    <TableCell>
                      <Badge variant={currency.status === 'Active' ? 'default' : 'secondary'}>
                        {currency.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDialog(currency)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <AddCurrencyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        currency={selectedCurrency}
      />
    </>
  );
}
