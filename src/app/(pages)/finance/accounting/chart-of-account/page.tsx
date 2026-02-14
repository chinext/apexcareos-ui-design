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

import { chartOfAccounts as initialData } from '@/lib/data';
import { AddAccountDialog } from '@/components/add-account-dialog';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/page-header';

export type Account = {
  code: string;
  name: string;
  type: string;
  description: string;
  status: 'Active' | 'Inactive';
};

const statusVariant: {
  [key: string]: 'default' | 'secondary' | 'destructive' | 'outline';
} = {
  Active: 'default',
  Inactive: 'secondary',
};

const typeVariant: Record<string, string> = {
  Asset:
    'border-transparent bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
  Liability:
    'border-transparent bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  Equity:
    'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  Revenue:
    'border-transparent bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Expense:
    'border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
};

export default function AccountingChartOfAccountPage() {
  const [data, setData] = React.useState<Account[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [isAddEditDialogOpen, setAddEditDialogOpen] = React.useState(false);
  const [accountToEdit, setAccountToEdit] = React.useState<Account | null>(
    null
  );
  const [accountToDelete, setAccountToDelete] = React.useState<Account | null>(
    null
  );

  const handleSaveAccount = (account: Account) => {
    if (accountToEdit) {
      setData(
        data.map((acc) => (acc.code === account.code ? account : acc))
      );
    } else {
      setData([account, ...data]);
    }
    setAccountToEdit(null);
  };

  const confirmDelete = () => {
    if (accountToDelete) {
      setData(data.filter((acc) => acc.code !== accountToDelete.code));
      setAccountToDelete(null);
    }
  };

  const handleExport = () => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Chart of Accounts');
    xlsx.writeFile(workbook, 'ChartOfAccounts.xlsx');
  };

  const columns: ColumnDef<Account>[] = [
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Account Name',
    },
    {
      accessorKey: 'type',
      header: 'Account Type',
      cell: ({ row }) => {
        const type = row.getValue('type') as string;
        return (
          <Badge className={cn('capitalize', typeVariant[type])}>
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.getValue('description')}
        </span>
      ),
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
        const account = row.original;
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
                    setAccountToEdit(account);
                    setAddEditDialogOpen(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAccountToDelete(account)}>
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
      <PageHeader title="Chart of Accounts">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => {
              setAccountToEdit(null);
              setAddEditDialogOpen(true);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Account
          </Button>
        </div>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Accounts List</CardTitle>
          <CardDescription>
            A comprehensive list of all financial accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center">
            <Input
              placeholder="Filter by account name..."
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
      <AddAccountDialog
        open={isAddEditDialogOpen}
        onOpenChange={setAddEditDialogOpen}
        onSave={handleSaveAccount}
        account={accountToEdit}
      />
      <AlertDialog
        open={!!accountToDelete}
        onOpenChange={(open) => !open && setAccountToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              account &quot;{accountToDelete?.name}&quot; and remove its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAccountToDelete(null)}>
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
