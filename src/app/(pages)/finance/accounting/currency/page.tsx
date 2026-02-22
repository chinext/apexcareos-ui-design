'use client';
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as xlsx from 'xlsx';

import {
  ArrowUpDown,
  MoreHorizontal,
  PlusCircle,
  FileDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

import { AddCurrencyDialog, type CurrencyFormValues } from '@/components/add-currency-dialog';
import { PageHeader } from '@/components/page-header';

export type Currency = {
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;
  status: 'Active' | 'Inactive';
};

const initialData: Currency[] = [
  { name: 'US Dollar', code: 'USD', symbol: '$', exchangeRate: 1.0, status: 'Active' },
  { name: 'Euro', code: 'EUR', symbol: '€', exchangeRate: 0.92, status: 'Active' },
  { name: 'British Pound', code: 'GBP', symbol: '£', exchangeRate: 0.79, status: 'Active' },
  { name: 'Japanese Yen', code: 'JPY', symbol: '¥', exchangeRate: 157.0, status: 'Inactive' },
  { name: 'Canadian Dollar', code: 'CAD', symbol: 'C$', exchangeRate: 1.37, status: 'Active' },
  { name: 'Australian Dollar', code: 'AUD', symbol: 'A$', exchangeRate: 1.50, status: 'Active' },
  { name: 'Swiss Franc', code: 'CHF', symbol: 'CHF', exchangeRate: 0.90, status: 'Active' },
];


const statusVariant: {
  [key: string]: 'default' | 'secondary' | 'destructive' | 'outline';
} = {
  Active: 'default',
  Inactive: 'destructive',
};

export default function AccountingCurrencyPage() {
  const [data, setData] = React.useState<Currency[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [isAddEditDialogOpen, setAddEditDialogOpen] = React.useState(false);
  const [currencyToEdit, setCurrencyToEdit] = React.useState<Currency | null>(null);
  const [currencyToDelete, setCurrencyToDelete] = React.useState<Currency | null>(null);

  const handleSaveCurrency = (formValues: CurrencyFormValues) => {
    if (currencyToEdit) {
      setData(
        data.map((curr) =>
          curr.code === currencyToEdit.code
            ? { ...curr, ...formValues }
            : curr
        )
      );
    } else {
      setData([
        { ...formValues },
        ...data,
      ]);
    }
    setCurrencyToEdit(null);
  };

  const confirmDelete = () => {
    if (currencyToDelete) {
      setData(data.filter((curr) => curr.code !== currencyToDelete.code));
      setCurrencyToDelete(null);
    }
  };

  const handleExport = () => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Currencies');
    xlsx.writeFile(workbook, 'Currencies.xlsx');
  };

  const columns: ColumnDef<Currency>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Currency Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'symbol',
      header: 'Symbol',
    },
    {
      accessorKey: 'exchangeRate',
      header: () => <div className="text-right">Exchange Rate</div>,
      cell: ({ row }) => {
        const rate = parseFloat(row.getValue('exchangeRate'));
        const formatted = rate.toFixed(4);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={statusVariant[status] || 'default'}>{status}</Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const currency = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrencyToEdit(currency);
                    setAddEditDialogOpen(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrencyToDelete(currency)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Currencies">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => {
              setCurrencyToEdit(null);
              setAddEditDialogOpen(true);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Currency
          </Button>
        </div>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Currency List</CardTitle>
          <CardDescription>
            Manage the currencies used in your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center">
            <Input
              placeholder="Filter by currency name..."
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
      <AddCurrencyDialog
        open={isAddEditDialogOpen}
        onOpenChange={setAddEditDialogOpen}
        onSave={handleSaveCurrency}
        currency={currencyToEdit}
      />
      <AlertDialog
        open={!!currencyToDelete}
        onOpenChange={(open) => !open && setCurrencyToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              currency &quot;{currencyToDelete?.name}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCurrencyToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
