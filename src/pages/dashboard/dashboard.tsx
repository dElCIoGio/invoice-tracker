import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  Plus,
  Send,
  Filter,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Bell,
  Clock,
  ArrowDownRight,
  ArrowUpRight
} from "lucide-react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {InvoiceChart} from "@/components/dashboard/invoice-chart.tsx";
import {RecentActivity} from "@/components/dashboard/recent-activity.tsx";
import {InvoiceTable} from "@/components/dashboard/invoice-table.tsx";
import {useState} from "react";
import {Link} from "react-router";


export default function Dashboard() {

  const [activeTab, setActiveTab] = useState("overview")
  return (
    <div className="space-y-6">


      <div className="">
        <Card className="bg-zinc-100 border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            {/*<CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>*/}
            <div>
              <CardTitle className="text-3xl font-bold">Overview</CardTitle>
              <p className="text-muted-foreground">Track your invoice statistics and cash flow</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Filter className="mr-2 h-4 w-4"/>
                Filter
              </Button>
              <Button size="sm">
                <Send className="mr-2 h-4 w-4"/>
                Send Invoice
              </Button>
              <Link to="invoices/new">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4"/>
                  New Invoice
                </Button>
              </Link>

            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className={`${activeTab === "outstanding" ? "border-primary" : ""}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$50,000</div>
                <p className="text-xs text-muted-foreground">
                    <span className="text-red-500 flex items-center gap-1">
                      +12.5% <ArrowUpRight className="h-4 w-4" />
                    </span>
                  from last month
                </p>
                <Progress className="h-2 mt-2" value={65} />
              </CardContent>
            </Card>

            <Card className={`${activeTab === "overdue" ? "border-primary" : ""}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,500</div>
                <p className="text-xs text-muted-foreground">
                    <span className="text-red-500 flex items-center gap-1">
                      +8.1% <ArrowUpRight className="h-4 w-4" />
                    </span>
                  from last month
                </p>
                <Progress
                    className="h-2 mt-2 bg-red-100"
                    value={25}
                />
              </CardContent>
            </Card>

            <Card className={`${activeTab === "paid" ? "border-primary" : ""}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,000</div>
                <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center gap-1">
                      +18.2% <ArrowUpRight className="h-4 w-4" />
                    </span>
                  from last month
                </p>
                <Progress
                    className="h-2 mt-2 bg-emerald-100"
                    value={40}
                    // indicatorClassName="bg-emerald-500"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">60%</div>
                <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center gap-1">
                      +5.2% <ArrowUpRight className="h-4 w-4" />
                    </span>
                  from last month
                </p>
                <Progress className="h-2 mt-2" value={60} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Collection Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">22 days</div>
                <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center gap-1">
                      -3 days <ArrowDownRight className="h-4 w-4" />
                    </span>
                  from last month
                </p>
                <Progress className="h-2 mt-2" value={45} />
              </CardContent>
            </Card>
          </div>

          {/* Invoice Summary Graph */}
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Invoice Summary</CardTitle>
                <CardDescription>Monthly comparison of issued vs. paid invoices</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <InvoiceChart />
              </CardContent>
            </Card>

            {/* Recent Activity & Alerts */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest payments and upcoming due dates</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>

          {/* Invoice Table */}
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage your invoices and track their status</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outstanding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Invoices</CardTitle>
              <CardDescription>All invoices that are pending payment</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceTable status="pending" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Invoices</CardTitle>
              <CardDescription>All invoices that are past their due date</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceTable status="overdue" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paid Invoices</CardTitle>
              <CardDescription>All invoices that have been paid</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceTable status="paid" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 