import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { kpis } from '@/lib/data';
import { DashboardCharts } from '@/components/dashboard-charts';

export default function DashboardPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <h1 className="text-xl font-bold tracking-tight md:text-2xl">
          Welcome back, Dr. Doe!
        </h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your hospital's performance today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.changeColor}`}>{kpi.change} from yesterday</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <DashboardCharts />
    </main>
  );
}
