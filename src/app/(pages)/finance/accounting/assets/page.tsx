'use client';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

const assets = [
  { id: 'ASSET001', name: 'MacBook Pro 16"', category: 'Electronics', purchaseDate: '2023-01-15', value: 2499.00, status: 'In Use' },
  { id: 'ASSET002', name: 'Herman Miller Aeron Chair', category: 'Furniture', purchaseDate: '2023-02-20', value: 1695.00, status: 'In Use' },
  { id: 'ASSET003', name: 'Sony A7 IV Camera', category: 'Photography', purchaseDate: '2022-11-10', value: 2498.00, status: 'In Use' },
  { id: 'ASSET004', name: 'Dell UltraSharp 32" Monitor', category: 'Electronics', purchaseDate: '2023-03-05', value: 1199.99, status: 'In Use' },
  { id: 'ASSET005', name: 'Company Vehicle - Ford Transit', category: 'Vehicles', purchaseDate: '2021-08-01', value: 45000.00, status: 'In Use' },
  { id: 'ASSET006', name: 'Office Printer - HP LaserJet', category: 'Office Equipment', purchaseDate: '2022-05-12', value: 899.00, status: 'Under Maintenance' },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'In Use': 'default',
  'Under Maintenance': 'outline',
};


export default function AccountingAssetsPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Fixed Assets">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Asset
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Asset Register</CardTitle>
          <CardDescription>A list of all fixed assets owned by the company.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.purchaseDate}</TableCell>
                   <TableCell>
                     <Badge variant={statusVariant[asset.status] || 'default'}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(asset.value)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
