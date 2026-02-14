'use client';
import { useState } from 'react';
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
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
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
import {
  AddAssetDialog,
  type AssetFormValues,
} from '@/components/add-asset-dialog';
import { format } from 'date-fns';

type Asset = {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  value: number;
  status: 'In Use' | 'Under Maintenance' | 'In Repair' | 'Disposed';
};

const initialAssets: Asset[] = [
  {
    id: 'ASSET001',
    name: 'MacBook Pro 16"',
    category: 'Electronics',
    purchaseDate: '2023-01-15',
    value: 2499.0,
    status: 'In Use',
  },
  {
    id: 'ASSET002',
    name: 'Herman Miller Aeron Chair',
    category: 'Furniture',
    purchaseDate: '2023-02-20',
    value: 1695.0,
    status: 'In Use',
  },
  {
    id: 'ASSET003',
    name: 'Sony A7 IV Camera',
    category: 'Photography',
    purchaseDate: '2022-11-10',
    value: 2498.0,
    status: 'In Use',
  },
  {
    id: 'ASSET004',
    name: 'Dell UltraSharp 32" Monitor',
    category: 'Electronics',
    purchaseDate: '2023-03-05',
    value: 1199.99,
    status: 'In Use',
  },
  {
    id: 'ASSET005',
    name: 'Company Vehicle - Ford Transit',
    category: 'Vehicles',
    purchaseDate: '2021-08-01',
    value: 45000.0,
    status: 'In Use',
  },
  {
    id: 'ASSET006',
    name: 'Office Printer - HP LaserJet',
    category: 'Office Equipment',
    purchaseDate: '2022-05-12',
    value: 899.0,
    status: 'Under Maintenance',
  },
];

const statusVariant: {
  [key: string]: 'default' | 'secondary' | 'destructive' | 'outline';
} = {
  'In Use': 'default',
  'Under Maintenance': 'outline',
  'In Repair': 'destructive',
  Disposed: 'secondary',
};

export default function AccountingAssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [isAddEditDialogOpen, setAddEditDialogOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);

  const handleSaveAsset = (formValues: AssetFormValues) => {
    if (assetToEdit) {
      setAssets(
        assets.map((asset) =>
          asset.id === assetToEdit.id
            ? {
                ...asset,
                ...formValues,
                purchaseDate: format(formValues.purchaseDate, 'yyyy-MM-dd'),
              }
            : asset
        )
      );
    } else {
      const newAsset: Asset = {
        id: `ASSET${String(assets.length + 1).padStart(3, '0')}`,
        name: formValues.name,
        category: formValues.category,
        purchaseDate: format(formValues.purchaseDate, 'yyyy-MM-dd'),
        value: formValues.value,
        status: formValues.status,
      };
      setAssets([newAsset, ...assets]);
    }
    setAssetToEdit(null);
  };

  const confirmDelete = () => {
    if (assetToDelete) {
      setAssets(assets.filter((asset) => asset.id !== assetToDelete.id));
      setAssetToDelete(null);
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Fixed Assets">
        <Button
          onClick={() => {
            setAssetToEdit(null);
            setAddEditDialogOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Asset
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Asset Register</CardTitle>
          <CardDescription>
            A list of all fixed assets owned by the company.
          </CardDescription>
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
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>
                    {format(new Date(asset.purchaseDate), 'PPP')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[asset.status] || 'default'}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(asset.value)}
                  </TableCell>
                  <TableCell className="text-right">
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
                            setAssetToEdit(asset);
                            setAddEditDialogOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setAssetToDelete(asset)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddAssetDialog
        open={isAddEditDialogOpen}
        onOpenChange={setAddEditDialogOpen}
        onSave={handleSaveAsset}
        asset={
          assetToEdit
            ? { ...assetToEdit, purchaseDate: new Date(assetToEdit.purchaseDate) }
            : null
        }
      />

      <AlertDialog
        open={!!assetToDelete}
        onOpenChange={(open) => !open && setAssetToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              asset &quot;{assetToDelete?.name}&quot; and remove its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAssetToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
