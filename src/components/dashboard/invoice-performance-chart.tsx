
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for invoice performance
const monthlyData = [
    {
        name: "Jan",
        issued: 12000,
        paid: 8000,
        pending: 3000,
        overdue: 1000,
    },
    {
        name: "Feb",
        issued: 15000,
        paid: 10000,
        pending: 4000,
        overdue: 1000,
    },
    {
        name: "Mar",
        issued: 18000,
        paid: 12000,
        pending: 4000,
        overdue: 2000,
    },
    {
        name: "Apr",
        issued: 20000,
        paid: 15000,
        pending: 3000,
        overdue: 2000,
    },
    {
        name: "May",
        issued: 22000,
        paid: 16000,
        pending: 4000,
        overdue: 2000,
    },
    {
        name: "Jun",
        issued: 25000,
        paid: 18000,
        pending: 5000,
        overdue: 2000,
    },
]

export default function InvoicePerformanceChart() {
    return (
        <Tabs defaultValue="issued-vs-paid" className="w-full">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="issued-vs-paid">Issued vs. Paid</TabsTrigger>
                    <TabsTrigger value="pending-vs-overdue">Pending vs. Overdue</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="issued-vs-paid" className="space-y-4">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="issued" name="Issued" fill="#10b981" />
                        <Bar dataKey="paid" name="Paid" fill="#0ea5e9" />
                    </BarChart>
                </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="pending-vs-overdue" className="space-y-4">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Line type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="overdue" name="Overdue" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </TabsContent>
        </Tabs>
    )
}

