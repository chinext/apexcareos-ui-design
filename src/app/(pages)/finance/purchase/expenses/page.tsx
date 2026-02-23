'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function PurchaseExpensesPage() {
  return (
    <>
      <PageHeader title="Purchase Expenses" />
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Manage Expenses</CardTitle>
            <CardDescription>
              Track and manage your purchase-related expenses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Purchase expenses functionality is not yet implemented.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
