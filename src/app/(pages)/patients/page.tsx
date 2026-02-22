'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
import { format, differenceInYears } from 'date-fns';
import {
  ArrowUpDown,
  PlusCircle,
  Users,
  TrendingUp,
  TrendingDown,
  UserPlus,
  ListFilter,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/page-header';
import { patientsList, patientStats } from '@/lib/data';
import { PatientRegistrationDrawer } from '@/components/patient-registration-drawer';
import { cn } from '@/lib/utils';

type Patient = (typeof patientsList)[0];

const statusVariant: {
  [key: string]: 'default' | 'secondary' | 'destructive' | 'outline';
} = {
  Active: 'default',
  Inactive: 'destructive',
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Patient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.id}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Contact
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <div>{row.original.phone}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.email}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'dob',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date of Birth
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const age = differenceInYears(new Date(), new Date(row.original.dob));
      return (
        <div>
          <div>{format(new Date(row.original.dob), 'PPP')}</div>
          <div className="text-xs text-muted-foreground">{age} years</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'registeredDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date Registered
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => format(new Date(row.original.registeredDate), 'PPP'),
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Gender
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'account',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Account
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'lastVisit',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Last Visit
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => format(new Date(row.original.lastVisit), 'PPP'),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status] || 'default'}>
        {row.original.status}
      </Badge>
    ),
  },
];

export default function PatientsPage() {
  const router = useRouter();
  const [data] = React.useState<Patient[]>(patientsList);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Patients">
        <Button onClick={() => setIsDrawerOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Register Patient
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {patientStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={cn(
                  'text-xs text-muted-foreground',
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                )}
              >
                {stat.change} vs. last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <Input
              placeholder="Filter patients..."
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium leading-none">Advanced Filters</h4>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={
                        (table.getColumn('status')?.getFilterValue() as string) ??
                        'all'
                      }
                      onValueChange={(value) =>
                        table
                          .getColumn('status')
                          ?.setFilterValue(value === 'all' ? undefined : value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                       value={
                        (table.getColumn('gender')?.getFilterValue() as string) ??
                        'all'
                      }
                      onValueChange={(value) =>
                        table
                          .getColumn('gender')
                          ?.setFilterValue(value === 'all' ? undefined : value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Genders</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={() => router.push(`/patients/${row.original.id}`)}
                      className="cursor-pointer"
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
          <div className="flex items-center justify-end space-x-4 py-4 text-xs">
            <div className="flex-1 text-muted-foreground">
              {table.getFilteredRowModel().rows.length} row(s) found.
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
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
          </div>
        </CardContent>
      </Card>
      <PatientRegistrationDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </main>
  );
}
