'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
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
import { MoreHorizontal, Plus } from 'lucide-react';

const vendors = [
  {
    id: 'VEND001',
    name: 'MediSupplies Co.',
    email: 'sales@medisupplies.com',
    phone: '555-0201',
    status: 'Active',
  },
  {
    id: 'VEND002',
    name: 'PharmaPlus Distributors',
    email: 'contact@pharmaplus.com',
    phone: '555-0202',
    status: 'Active',
  },
  {
    id: 'VEND003',
    name: 'Global MedTech',
    email: 'info@globalmedtech.com',
    phone: '555-0203',
    status: 'Inactive',
  },
  {
    id: 'VEND004',
    name: 'Healthcare Logistics',
    email: 'support@healthcarelogistics.com',
    phone: '555-0204',
    status: 'Active',
  },
];

export default function PurchaseVendorPage() {
  return (
    <>
      <PageHeader title="Vendors">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </PageHeader>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>All Vendors</CardTitle>
            <CardDescription>
              Manage your suppliers and vendors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.phone}</TableCell>
                    <TableCell>
                      <Badge variant={vendor.status === 'Active' ? 'default' : 'secondary'}>
                        {vendor.status}
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
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
    </>
  );
}
