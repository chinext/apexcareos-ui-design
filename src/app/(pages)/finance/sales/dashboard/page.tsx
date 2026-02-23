'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DollarSign, FileText, TrendingDown, Users } from 'lucide-react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from '@/components/ui/chart';
import {
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    BarChart as RechartsBarChart,
  } from 'recharts';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const salesKpis = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      icon: DollarSign,
      change: '+20.1% from last month',
      iconBg: 'bg-green-500',
    },
    {
      title: 'Invoices',
      value: '+12,234',
      icon: FileText,
      change: '+19% from last month',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'New Customers',
      value: '+235',
      icon: Users,
      change: '+180.1% from last month',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Expenses',
      value: '$3,450.00',
      icon: TrendingDown,
      change: '-5.2% from last month',
      iconBg: 'bg-red-500',
    },
  ];

  const monthlySales = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4780 },
    { month: 'May', sales: 5890 },
    { month: 'Jun', sales: 4390 },
    { month: 'Jul', sales: 5490 },
  ];

  const recentInvoices = [
    {
      invoice: 'INV001',
      customer: 'Liam Johnson',
      amount: '$250.00',
      status: 'Paid',
    },
    {
      invoice: 'INV002',
      customer: 'Olivia Smith',
      amount: '$150.00',
      status: 'Paid',
    },
    {
      invoice: 'INV003',
      customer: 'Noah Williams',
      amount: '$350.00',
      status: 'Pending',
    },
    {
      invoice: 'INV004',
      customer: 'Emma Brown',
      amount: '$450.00',
      status: 'Paid',
    },
    {
      invoice: 'INV005',
      customer: 'James Jones',
      amount: '$550.00',
      status: 'Overdue',
    },
  ];

export default function SalesDashboardPage() {

    const chartConfig = {
        sales: {
          label: 'Sales',
          color: 'hsl(var(--chart-1))',
        },
    };

  return (
    <>
      <PageHeader title="Sales Dashboard">
        <Button>Create Invoice</Button>
      </PageHeader>
      <div className="mt-4 grid gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {salesKpis.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                 <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                    <kpi.icon className="h-5 w-5 text-white" />
                 </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">{kpi.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
           <Card>
             <CardHeader>
               <CardTitle>Sales Performance</CardTitle>
               <CardDescription>
                 An overview of your monthly sales.
               </CardDescription>
             </CardHeader>
             <CardContent>
               <ChartContainer config={chartConfig} className="h-64 w-full">
                 <RechartsBarChart data={monthlySales}>
                   <CartesianGrid vertical={false} />
                   <XAxis
                     dataKey="month"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     fontSize={12}
                   />
                   <YAxis
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     fontSize={12}
                     tickFormatter={(value) => `$${value / 1000}k`}
                   />
                   <ChartTooltip
                     content={<ChartTooltipContent />}
                     cursor={false}
                   />
                   <Bar
                     dataKey="sales"
                     fill="var(--color-sales)"
                     radius={[4, 4, 0, 0]}
                   />
                 </RechartsBarChart>
               </ChartContainer>
             </CardContent>
           </Card>
           <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>
                  A list of the most recent invoices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentInvoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.customer}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                           <Badge
                            variant={
                              invoice.status === 'Paid'
                                ? 'default'
                                : invoice.status === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
