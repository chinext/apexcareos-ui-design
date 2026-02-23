'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function StaffExitPage() {
  return (
    <>
      <PageHeader title="Staff Exit" />
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Staff Exit Management</CardTitle>
            <CardDescription>
              Manage offboarding processes for exiting employees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Staff exit functionality is not yet implemented.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
