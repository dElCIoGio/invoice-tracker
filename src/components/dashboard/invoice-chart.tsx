
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

const monthlyData = [
    {
        name: "Jan",
        issued: 4000,
        paid: 2400,
        pending: 1600,
        overdue: 0,
    },
    {
        name: "Feb",
        issued: 3000,
        paid: 1398,
        pending: 1200,
        overdue: 402,
    },
    {
        name: "Mar",
        issued: 2000,
        paid: 1800,
        pending: 200,
        overdue: 0,
    },
    {
        name: "Apr",
        issued: 2780,
        paid: 2500,
        pending: 280,
        overdue: 0,
    },
    {
        name: "May",
        issued: 1890,
        paid: 1500,
        pending: 300,
        overdue: 90,
    },
    {
        name: "Jun",
        issued: 2390,
        paid: 1800,
        pending: 400,
        overdue: 190,
    },
    {
        name: "Jul",
        issued: 3490,
        paid: 2300,
        pending: 900,
        overdue: 290,
    },
    {
        name: "Aug",
        issued: 4000,
        paid: 2400,
        pending: 1000,
        overdue: 600,
    },
    {
        name: "Sep",
        issued: 3200,
        paid: 2100,
        pending: 700,
        overdue: 400,
    },
    {
        name: "Oct",
        issued: 2800,
        paid: 1800,
        pending: 600,
        overdue: 400,
    },
    {
        name: "Nov",
        issued: 3500,
        paid: 2000,
        pending: 1000,
        overdue: 500,
    },
    {
        name: "Dec",
        issued: 4200,
        paid: 2500,
        pending: 1200,
        overdue: 500,
    },
]

export function InvoiceChart() {
    return (
        <Tabs defaultValue="bar" className="w-full">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                    <TabsTrigger value="line">Line Chart</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="bar" className="space-y-4">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="issued" name="Issued" fill="#10b981" />
                        <Bar dataKey="paid" name="Paid" fill="#0ea5e9" />
                    </BarChart>
                </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="line" className="space-y-4">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="overdue" name="Overdue" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </TabsContent>
        </Tabs>
    )
}

