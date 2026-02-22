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
  X,
  FileDown,
  ArrowRightLeft,
  Combine,
  Search,
} from 'lucide-react';
import * as xlsx from 'xlsx';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { PageHeader } from '@/components/page-header';
import { patientsList, patientStats } from '@/lib/data';
import { PatientRegistrationDrawer } from '@/components/patient-registration-drawer';
import { cn } from '@/lib/utils';

type Patient = (typeof patientsList)[0];

type Filter = {
  id: number;
  column: keyof Patient | '';
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
};

const operators = ['contains', 'equals', 'does not contain'];

const statusVariant: {
  [key: string]: 'default' | 'secondary' | 'destructive' | 'outline';
} = {
  Active: 'default',
  Inactive: 'destructive',
};

const columns: ColumnDef<Patient>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
          <div className="text-xs text-muted-foreground">
            {row.original.id}
          </div>
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
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [advancedFilters, setAdvancedFilters] = React.useState<Filter[]>([
    { id: 1, column: '', operator: 'contains', value: '' },
  ]);
  const [appliedAdvancedFilters, setAppliedAdvancedFilters] = React.useState<Filter[]>([]);

  React.useEffect(() => {
    if(isFilterOpen) {
        setAdvancedFilters(appliedAdvancedFilters.length > 0 ? JSON.parse(JSON.stringify(appliedAdvancedFilters)) : [{ id: 1, column: '', operator: 'contains', value: '' }]);
    }
  }, [isFilterOpen, appliedAdvancedFilters]);
  
  const advancedFilteredData = React.useMemo(() => {
    return data.filter(row => {
      if (appliedAdvancedFilters.length === 0 || (appliedAdvancedFilters.length === 1 && !appliedAdvancedFilters[0].value)) {
        return true;
      }

      let result = true;
      for (let i = 0; i < appliedAdvancedFilters.length; i++) {
        const filter = appliedAdvancedFilters[i];
        if (!filter.column || !filter.value) {
            if (i === 0) result = true;
            continue;
        }
        
        const rowValue = row[filter.column as keyof Patient];
        const filterValue = filter.value.toLowerCase();
        const rowValueString = String(rowValue).toLowerCase();

        let currentFilterResult = false;
        switch (filter.operator) {
          case 'contains':
            currentFilterResult = rowValueString.includes(filterValue);
            break;
          case 'equals':
            currentFilterResult = rowValueString === filterValue;
            break;
          case 'does not contain':
            currentFilterResult = !rowValueString.includes(filterValue);
            break;
          default:
            currentFilterResult = true;
        }

        if (i === 0) {
          result = currentFilterResult;
        } else {
          if (filter.logic === 'AND') {
            result = result && currentFilterResult;
          } else if (filter.logic === 'OR') {
            result = result || currentFilterResult;
          }
        }
      }
      return result;
    });
  }, [data, appliedAdvancedFilters]);


  const table = useReactTable({
    data: advancedFilteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const handleExport = () => {
    const tableData = table.getFilteredSelectedRowModel().rows.length > 0 
        ? table.getFilteredSelectedRowModel().rows 
        : table.getFilteredRowModel().rows;
    
    if (tableData.length === 0) {
        console.warn("No data to export.");
        return;
    }

    const dataToExport = tableData.map(row => {
        const { avatar, ...original } = row.original; // Exclude avatar from export
        return {
            'ID': original.id,
            'Name': original.name,
            'Phone': original.phone,
            'Email': original.email,
            'Date of Birth': original.dob,
            'Registered Date': original.registeredDate,
            'Gender': original.gender,
            'Account': original.account,
            'Last Visit': original.lastVisit,
            'Status': original.status,
        }
    });

    const worksheet = xlsx.utils.json_to_sheet(dataToExport);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Patients');
    xlsx.writeFile(workbook, 'Patients.xlsx');
  };

  const handleAdvancedFilterChange = (
    id: number,
    field: keyof Omit<Filter, 'id'>,
    value: string
  ) => {
    const newFilters = advancedFilters.map((filter) =>
      filter.id === id ? { ...filter, [field]: value } : filter
    );
    setAdvancedFilters(newFilters);
  };

  const addFilter = () => {
    setAdvancedFilters([
      ...advancedFilters,
      { id: Date.now(), column: '', operator: 'contains', value: '', logic: 'AND' },
    ]);
  };

  const removeFilter = (id: number) => {
    const newFilters = advancedFilters.filter((filter) => filter.id !== id);
    if(newFilters.length === 0){
        setAdvancedFilters([{ id: 1, column: '', operator: 'contains', value: '' }]);
    } else {
        setAdvancedFilters(newFilters);
    }
  };

  const handleApplyFilters = () => {
    setAppliedAdvancedFilters(advancedFilters);
    setIsFilterOpen(false);
  };

  const handleClearAllFilters = () => {
    setAdvancedFilters([{ id: 1, column: '', operator: 'contains', value: '' }]);
    setAppliedAdvancedFilters([]);
  };

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
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
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
          <div className="mb-4 flex items-center">
            <Input
              placeholder="Filter patients..."
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="h-9 max-w-sm"
            />
            <div className="ml-auto">
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[580px]" align="end">
                  <div className="space-y-4 p-2">
                    <h4 className="text-sm font-medium leading-none">Filter Builder</h4>
                    <div className="space-y-2">
                      {advancedFilters.map((filter, index) => (
                        <div key={filter.id} className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() => removeFilter(filter.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {index > 0 ? (
                              <Select
                                  value={filter.logic}
                                  onValueChange={(value) => handleAdvancedFilterChange(filter.id, 'logic', value)}
                              >
                                  <SelectTrigger className="h-8 w-20 shrink-0 text-xs">
                                      <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="AND">AND</SelectItem>
                                      <SelectItem value="OR">OR</SelectItem>
                                  </SelectContent>
                              </Select>
                          ) : (
                              <div className="flex h-8 w-20 shrink-0 items-center px-3 text-xs text-muted-foreground">
                                  Where
                              </div>
                          )}
                          <Select
                            value={filter.column}
                            onValueChange={(value) =>
                              handleAdvancedFilterChange(
                                filter.id,
                                'column',
                                value
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-32 text-xs">
                              <SelectValue placeholder="Column" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="name">Name</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="status">Status</SelectItem>
                              <SelectItem value="gender">Gender</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select
                            value={filter.operator}
                            onValueChange={(value) =>
                              handleAdvancedFilterChange(
                                filter.id,
                                'operator',
                                value
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-32 text-xs">
                              <SelectValue placeholder="Operator" />
                            </SelectTrigger>
                            <SelectContent>
                              {operators.map((op) => (
                                <SelectItem key={op} value={op}>
                                  {op}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            className="h-8 flex-1 text-xs"
                            placeholder="Value"
                            value={filter.value}
                            onChange={(e) =>
                              handleAdvancedFilterChange(
                                filter.id,
                                'value',
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <Button variant="link" size="sm" className="px-1 text-xs" onClick={addFilter}>
                      + Add filter
                    </Button>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t p-2">
                      <Button variant="ghost" size="sm" onClick={handleClearAllFilters}>
                          Clear all
                      </Button>
                      <Button size="sm" onClick={handleApplyFilters}>
                          <Search className="mr-2 h-4 w-4" />
                          Search
                      </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted p-1.5">
              <span className="text-sm font-medium">
                {table.getFilteredSelectedRowModel().rows.length} selected
              </span>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleExport}>
                  <FileDown className="mr-2 h-3 w-3" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <ArrowRightLeft className="mr-2 h-3 w-3" />
                  Transfer
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Combine className="mr-2 h-3 w-3" />
                  Merge
                </Button>
              </div>
            </div>
          )}

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
                      onClick={() =>
                        router.push(`/patients/${row.original.id}`)
                      }
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-xs text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-xs font-medium">Rows per page</p>
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
            <div className="flex w-[100px] items-center justify-center text-xs font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
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
