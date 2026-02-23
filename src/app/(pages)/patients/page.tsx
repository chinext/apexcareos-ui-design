'use client';
import { useState, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  X,
  Plus,
} from 'lucide-react';
import { patientsList } from '@/constants/data';
import type { Patient } from '@/constants/data';
import { PageHeader } from '@/components/page-header';
import { PatientRegistrationDrawer } from '@/components/patient-registration-drawer';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Patient',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="hidden h-8 w-8 sm:flex">
            <AvatarImage src={row.original.avatar} alt={row.original.name} />
            <AvatarFallback>
              {row.original.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'Contact',
    cell: ({ row }) => {
      return <div className="whitespace-nowrap">{row.original.phone}</div>;
    },
  },
    {
    accessorKey: 'dob',
    header: 'Date of Birth',
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {format(new Date(row.original.dob), 'dd-MMM-yyyy')}
        </div>
      );
    },
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    id: 'gender'
  },
  {
    accessorKey: 'lastVisit',
    header: 'Last Visit',
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {format(new Date(row.original.lastVisit), 'dd-MMM-yyyy')}
        </div>
      );
    },
  },
    {
    accessorKey: 'account',
    header: 'Account',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const variant =
        row.original.status === 'Active'
          ? 'default'
          : row.original.status === 'Inactive'
          ? 'destructive'
          : 'secondary';
      return <Badge variant={variant}>{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: 'registeredDate',
    header: 'Date Registered',
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {format(new Date(row.original.registeredDate), 'dd-MMM-yyyy')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit patient</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Delete patient
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type FilterRule = {
  id: number;
  field: string;
  operator: string;
  value: string;
  logic: 'AND' | 'OR';
};

export default function PatientsPage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    gender: false,
    registeredDate: false,
    account: false
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [currentFilters, setCurrentFilters] = useState<FilterRule[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState<FilterRule[]>([]);
  const router = useRouter();

  const data = useMemo(() => {
    let filteredData = [...patientsList];

    if (advancedFilters.length > 0) {
      filteredData = filteredData.filter((patient) => {
        return advancedFilters.every((filter, index) => {
          const patientValue = String(patient[filter.field as keyof Patient]).toLowerCase();
          const filterValue = filter.value.toLowerCase();
          let result = false;

          switch (filter.operator) {
            case 'is':
              result = patientValue === filterValue;
              break;
            case 'is not':
              result = patientValue !== filterValue;
              break;
            case 'contains':
              result = patientValue.includes(filterValue);
              break;
            case 'does not contain':
              result = !patientValue.includes(filterValue);
              break;
          }

          if (index === 0) return result;

          const prevFilter = advancedFilters[index - 1];
          if (prevFilter.logic === 'AND') {
            return result;
          }
          return true; // This needs more complex logic for OR
        });
      });
    }

    if (globalFilter) {
      filteredData = filteredData.filter((patient) =>
        Object.values(patient).some(
          (val) =>
            typeof val === 'string' &&
            val.toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }
    
    return filteredData;
  }, [globalFilter, advancedFilters]);

  const memoizedColumns = useMemo(() => columns, []);

  const table = useReactTable({
    data,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const addFilter = () => {
    setCurrentFilters([
      ...currentFilters,
      {
        id: Date.now(),
        field: 'name',
        operator: 'contains',
        value: '',
        logic: currentFilters.length > 0 ? 'AND' : 'OR',
      },
    ]);
  };

  const removeFilter = (id: number) => {
    setCurrentFilters(currentFilters.filter((f) => f.id !== id));
  };

  const updateFilter = (id: number, newFilter: Partial<FilterRule>) => {
    setCurrentFilters(
      currentFilters.map((f) => (f.id === id ? { ...f, ...newFilter } : f))
    );
  };

  const clearFilters = () => {
    setCurrentFilters([]);
    setAdvancedFilters([]);
  };

  const applyFilters = () => {
    setAdvancedFilters(currentFilters);
  };

  const handleExport = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const dataToExport =
      selectedRows.length > 0
        ? selectedRows.map((row) => row.original)
        : data;

    if (dataToExport.length === 0) {
      console.warn('No data to export.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');
    XLSX.writeFile(workbook, 'patients.xlsx');
  };

  return (
    <>
      <PageHeader title="Patients">
        <Button onClick={() => setDrawerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Register Patient
        </Button>
      </PageHeader>
      <div className="mt-4 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 pl-9 text-xs"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Filter className="h-3.5 w-3.5" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[30rem]" align="end">
              <div className="space-y-4 p-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">Filter Builder</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addFilter}
                    className="text-xs"
                  >
                    + Add filter
                  </Button>
                </div>
                <div className="max-h-60 space-y-3 overflow-auto p-1">
                  {currentFilters.map((filter, index) => (
                    <div key={filter.id} className="flex items-center gap-2">
                      {index > 0 && (
                        <Select
                          value={filter.logic}
                          onValueChange={(value: 'AND' | 'OR') =>
                            updateFilter(filter.id, { logic: value })
                          }
                        >
                          <SelectTrigger className="h-8 w-[5rem] text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AND">AND</SelectItem>
                            <SelectItem value="OR">OR</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <Select
                        value={filter.field}
                        onValueChange={(value) =>
                          updateFilter(filter.id, { field: value })
                        }
                      >
                        <SelectTrigger className="h-8 flex-1 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={filter.operator}
                        onValueChange={(value) =>
                          updateFilter(filter.id, { operator: value })
                        }
                      >
                        <SelectTrigger className="h-8 w-[7rem] text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="is">is</SelectItem>
                          <SelectItem value="is not">is not</SelectItem>
                          <SelectItem value="contains">contains</SelectItem>
                          <SelectItem value="does not contain">
                            does not contain
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={filter.value}
                        onChange={(e) =>
                          updateFilter(filter.id, { value: e.target.value })
                        }
                        className="h-8 flex-1 text-xs"
                        placeholder="Value..."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => removeFilter(filter.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
                {currentFilters.length > 0 && (
                  <div className="flex justify-end gap-2 border-t pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      Clear all
                    </Button>
                     <Button
                      size="sm"
                      onClick={applyFilters}
                      className="h-8 text-xs"
                    >
                       <Search className="mr-2 h-3.5 w-3.5" />
                      Search
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="border-t bg-muted/50 p-2">
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                {table.getSelectedRowModel().rows.length} row(s) selected.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={handleExport}
              >
                <Download className="mr-2 h-3.5 w-3.5" /> Export
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs">
                Transfer Record
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs">
                Merge Record
              </Button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="whitespace-nowrap">
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
                          <TableCell key={cell.id} className="whitespace-nowrap">
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
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-xs text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px] text-xs">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PatientRegistrationDrawer
        open={isDrawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
