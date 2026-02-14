'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud } from 'lucide-react';

export default function AccountingBulkUploadPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Bulk Upload" />
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Upload Transactions</CardTitle>
          <CardDescription>
            Import bank statements, invoices, or bills in bulk.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="upload-type">Type of Upload</Label>
            <Select>
              <SelectTrigger id="upload-type">
                <SelectValue placeholder="Select upload type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank-statement">Bank Statement</SelectItem>
                <SelectItem value="invoices">Invoices</SelectItem>
                <SelectItem value="bills">Bills</SelectItem>
                 <SelectItem value="chart-of-accounts">Chart of Accounts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file-upload">File</Label>
             <div className="flex w-full items-center justify-center">
                <label htmlFor="dropzone-file" className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <UploadCloud className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, or XLSX (MAX. 5MB)</p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Start Import</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
