
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import DateRangePicker from "@/components/dashboard/date-range-picker"
import InvoicesTable from "@/components/dashboard/invoices-table"
import InvoicePerformanceChart from "@/components/dashboard/invoice-performance-chart"
import {
    DollarSign,
    Clock,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download,
    Plus,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {Link, useNavigate} from "react-router";

export default function InvoicesPage() {
    const navigate = useNavigate()
    const [activeFilter, setActiveFilter] = useState<string | null>(null)

    // Mock data for metrics
    const metrics = {
        outstanding: {
            amount: 50000,
            change: 12.5,
            increased: true,
        },
        overdue: {
            amount: 12500,
            change: 8.1,
            increased: true,
        },
        dueSoon: {
            count: 5,
            change: 2,
            increased: false,
        },
        paidThisMonth: {
            amount: 8000,
            change: 18.2,
            increased: true,
        },
    }

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    // Handle card click to filter table
    const handleCardClick = (filter: string) => {
        setActiveFilter(activeFilter === filter ? null : filter)
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
                    <div className="flex items-center space-x-2">
                        <DateRangePicker />
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Link to="new">
                            <Button onClick={() => navigate("/dashboard/invoices/new")}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Invoice
                            </Button>
                        </Link>

                    </div>
                </div>

                {/* Key Metrics Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Outstanding */}
                    <Card
                        className={`cursor-pointer transition-all hover:border-primary ${activeFilter === "outstanding" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleCardClick("outstanding")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(metrics.outstanding.amount)}</div>
                            <p className="text-xs text-muted-foreground">
                <span
                    className={
                        metrics.outstanding.increased
                            ? "text-red-500 flex items-center gap-1"
                            : "text-green-500 flex items-center gap-1"
                    }
                >
                  {metrics.outstanding.increased ? "+" : "-"}
                    {metrics.outstanding.change}%
                    {metrics.outstanding.increased ? (
                        <ArrowUpRight className="h-4 w-4" />
                    ) : (
                        <ArrowDownRight className="h-4 w-4" />
                    )}
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2" value={65} />
                        </CardContent>
                    </Card>

                    {/* Overdue Amount */}
                    <Card
                        className={`cursor-pointer transition-all hover:border-primary ${activeFilter === "overdue" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleCardClick("overdue")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(metrics.overdue.amount)}</div>
                            <p className="text-xs text-muted-foreground">
                <span
                    className={
                        metrics.overdue.increased
                            ? "text-red-500 flex items-center gap-1"
                            : "text-green-500 flex items-center gap-1"
                    }
                >
                  {metrics.overdue.increased ? "+" : "-"}
                    {metrics.overdue.change}%
                    {metrics.overdue.increased ? (
                        <ArrowUpRight className="h-4 w-4" />
                    ) : (
                        <ArrowDownRight className="h-4 w-4" />
                    )}
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2 bg-red-100" value={25}  />
                        </CardContent>
                    </Card>

                    {/* Invoices Due Soon */}
                    <Card
                        className={`cursor-pointer transition-all hover:border-primary ${activeFilter === "dueSoon" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleCardClick("dueSoon")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Invoices Due Soon</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.dueSoon.count} invoices</div>
                            <p className="text-xs text-muted-foreground">
                <span
                    className={
                        metrics.dueSoon.increased
                            ? "text-red-500 flex items-center gap-1"
                            : "text-green-500 flex items-center gap-1"
                    }
                >
                  {metrics.dueSoon.increased ? "+" : "-"}
                    {metrics.dueSoon.change}
                    {metrics.dueSoon.increased ? (
                        <ArrowUpRight className="h-4 w-4" />
                    ) : (
                        <ArrowDownRight className="h-4 w-4" />
                    )}
                </span>
                                from last week
                            </p>
                            <Progress className="h-2 mt-2 bg-yellow-100" value={40} />
                        </CardContent>
                    </Card>

                    {/* Paid This Month */}
                    <Card
                        className={`cursor-pointer transition-all hover:border-primary ${activeFilter === "paid" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleCardClick("paid")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(metrics.paidThisMonth.amount)}</div>
                            <p className="text-xs text-muted-foreground">
                <span
                    className={
                        metrics.paidThisMonth.increased
                            ? "text-emerald-500 flex items-center gap-1"
                            : "text-red-500 flex items-center gap-1"
                    }
                >
                  {metrics.paidThisMonth.increased ? "+" : "-"}
                    {metrics.paidThisMonth.change}%
                    {metrics.paidThisMonth.increased ? (
                        <ArrowUpRight className="h-4 w-4" />
                    ) : (
                        <ArrowDownRight className="h-4 w-4" />
                    )}
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2 bg-emerald-100" value={60} />
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">All Invoices</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="overdue">Overdue</TabsTrigger>
                        <TabsTrigger value="paid">Paid</TabsTrigger>
                        <TabsTrigger value="draft">Drafts</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>All Invoices</CardTitle>
                                <CardDescription>Manage and track all your invoices in one place</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <InvoicesTable filter={activeFilter} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Performance</CardTitle>
                                <CardDescription>Track your invoice performance over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <InvoicePerformanceChart />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="pending" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Invoices</CardTitle>
                                <CardDescription>Invoices that are awaiting payment</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <InvoicesTable filter="pending" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="overdue" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overdue Invoices</CardTitle>
                                <CardDescription>Invoices that are past their due date</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <InvoicesTable filter="overdue" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="paid" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Paid Invoices</CardTitle>
                                <CardDescription>Invoices that have been paid in full</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <InvoicesTable filter="paid" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="draft" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Draft Invoices</CardTitle>
                                <CardDescription>Invoices that are still in draft mode</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <InvoicesTable filter="draft" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

