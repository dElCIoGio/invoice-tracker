import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Plus, Send, Filter } from "lucide-react"
import { BarChart } from "@/components/ui/bar-chart.tsx"

export default function Dashboard() {
  const cashFlowData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Income",
        data: [12378, 8234, 15678, 9876],
        backgroundColor: "var(--chart-1)",
      },
      {
        label: "Expenses",
        data: [5788, 3456, 7890, 4567],
        backgroundColor: "var(--chart-2)",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">Track your invoice statistics and cash flow</p>
        </div>

      </div>

      <div className="">
        <Card className="bg-zinc-100 border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-between">
            <div>
              <div className="text-2xl font-bold">€320,845.20</div>
              <p className="text-xs text-muted-foreground">
                +8.5% from last month
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Filter className="mr-2 h-4 w-4"/>
                Filter
              </Button>
              <Button size="sm">
                <Send className="mr-2 h-4 w-4"/>
                Send Invoice
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4"/>
                New Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€12,378.20</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€5,788.21</div>
            <p className="text-xs text-muted-foreground">
              +1.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={cashFlowData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Theo Lawrence",
                  amount: "€500.00",
                  date: "Aug 15, 2024",
                  status: "Success",
                  method: "Credit Card",
                },
                {
                  name: "Amy March",
                  amount: "€250.00",
                  date: "May 04, 2024",
                  status: "Pending",
                  method: "Bank Transfer",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.amount}</p>
                    <p className="text-sm text-muted-foreground">{activity.method}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€8,672.20</div>
            <p className="text-xs text-muted-foreground">
              vs €7,553.54 Last Period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€3,765.35</div>
            <p className="text-xs text-muted-foreground">
              vs €416.54 Last Period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Reserve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€14,376.16</div>
            <p className="text-xs text-muted-foreground">
              vs €12,535.65 Last Period
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 