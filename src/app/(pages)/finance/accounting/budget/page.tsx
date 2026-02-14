'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, PlusCircle } from 'lucide-react';

const budgetData = [
  { name: 'Marketing', allocated: 4000, spent: 2500 },
  { name: 'Sales', allocated: 3000, spent: 2800 },
  { name: 'Development', allocated: 5000, spent: 4500 },
  { name: 'HR', allocated: 2000, spent: 1500 },
  { name: 'Operations', allocated: 6000, spent: 5500 },
];

export default function AccountingBudgetPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <PageHeader title="Budgeting">
         <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Budget
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$20,000</div>
            <p className="text-xs text-muted-foreground">for Q2 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
             <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$16,800</div>
            <p className="text-xs text-muted-foreground">84% of budget utilized</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,200</div>
            <p className="text-xs text-muted-foreground">16% remaining</p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Department Budget Allocation</CardTitle>
          <CardDescription>Allocated vs. Spent by department.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={budgetData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                      }}
                      cursor={{fill: 'hsl(var(--muted))'}}
                    />
                    <Legend iconType="circle" iconSize={8} />
                    <Bar dataKey="allocated" name="Allocated" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="spent" name="Spent" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
       </Card>
    </main>
  );
}
