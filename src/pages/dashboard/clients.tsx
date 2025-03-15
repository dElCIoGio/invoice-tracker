
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, DollarSign, Filter, Plus, Users, AlertCircle, BarChart3 } from "lucide-react"
import {useNavigate} from "react-router";
import {toast} from "sonner";

// Mock data for clients metrics
const clientsMetrics = {
    totalClients: 120,
    clientsWithOverduePayments: 30,
    topPayingClients: 5,
    totalOutstandingPayments: 50000,
}

// Mock data for clients
type PaymentHistory = {
    id: string;
    invoiceNumber: string;
    amount: number;
    date: string;
    status: "paid" | "overdue";
};

type Client = {
    id: string;
    name: string;
    email: string;
    company: string;
    totalInvoices: number;
    outstandingAmount: number;
    lastInvoiceDate: string;
    contactPerson: string;
    phone: string;
    address: string;
    paymentHistory: PaymentHistory[];
};

const clients: Client[] = [
    {
        id: "1",
        name: "ACME Corp",
        email: "acme@email.com",
        company: "ACME Ltd.",
        totalInvoices: 10,
        outstandingAmount: 2000,
        lastInvoiceDate: "2024-03-10",
        contactPerson: "John Smith",
        phone: "+1 (555) 123-4567",
        address: "123 Business Ave, San Francisco, CA 94107",
        paymentHistory: [
            { id: "1", invoiceNumber: "INV-001", amount: 1000, date: "2024-02-15", status: "paid" },
            { id: "2", invoiceNumber: "INV-002", amount: 1500, date: "2024-03-01", status: "paid" },
            { id: "3", invoiceNumber: "INV-003", amount: 2000, date: "2024-03-10", status: "overdue" },
        ],
    },
    // Other clients...
];

export default function ClientsPage() {
    const navigate = useNavigate()

    // State for active filter
    const [activeFilter, setActiveFilter] = useState<string | null>(null)

    // State for selected client
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)

    // State for dialogs
    const [showClientProfile, setShowClientProfile] = useState(false)
    const [showEditClient, setShowEditClient] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showNewClient, setShowNewClient] = useState(false)

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date)
    }

    // Handle card click to filter clients
    const handleCardClick = (filter: string) => {
        setActiveFilter(activeFilter === filter ? null : filter)
    }

    // Handle view client details
    const handleViewClient = (client: Client) => {
        setSelectedClient(client)
        setShowClientProfile(true)
    }

    // Handle create new invoice for client
    const handleCreateInvoice = (client: Client) => {
        // In a real app, this would navigate to the new invoice page with client pre-filled
        navigate(`/dashboard/invoices/new?client=${client.id}`)
    }

    // Handle send bulk reminders
    const handleSendReminders = (client: Client) => {
        // In a real app, this would send reminders for all overdue invoices
        toast("Reminders sent", {
            description: `Reminders have been sent for all overdue invoices to ${client.name}.`,
        })
    }

    // Handle edit client
    const handleEditClient = (client: Client) => {
        setSelectedClient(client)
        setShowEditClient(true)
    }

    // Handle save client edits
    const handleSaveClientEdits = () => {
        // In a real app, this would save the client details to the database
        setShowEditClient(false)
        toast("Client updated", {
            description: `${selectedClient? selectedClient.name: "Your client"}'s details have been updated successfully.`,
        })
    }

    // Handle delete client
    const handleDeleteClient = (client: Client) => {
        setSelectedClient(client)
        setShowDeleteConfirm(true)
    }

    // Handle confirm delete client
    const handleConfirmDeleteClient = () => {
        // In a real app, this would delete the client from the database
        setShowDeleteConfirm(false)
        setShowClientProfile(false)
        toast("Client deleted", {
            description: `${selectedClient ? selectedClient.name: "Your client"} has been deleted successfully.`,
        })
    }

    // Handle create new client
    const handleCreateClient = () => {
        setShowNewClient(true)
    }

    // Handle save new client
    const handleSaveNewClient = () => {
        // In a real app, this would save the new client to the database
        setShowNewClient(false)
        toast("Client created", {
            description: "New client has been created successfully.",
        })
    }

    // Get filtered clients based on active filter
    const getFilteredClients = () => {
        if (!activeFilter) return clients

        switch (activeFilter) {
            case "overdue":
                return clients.filter((client) => client.outstandingAmount > 0)
            case "top":
                return [...clients].sort((a, b) => b.totalInvoices - a.totalInvoices).slice(0, 5)
            default:
                return clients
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Button onClick={handleCreateClient}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Client
                        </Button>
                    </div>
                </div>

                {/* Key Metrics Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Clients */}
                    <Card
                        className={`cursor-pointer transition-all hover:border-primary ${activeFilter === "total" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleCardClick("total")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{clientsMetrics.totalClients}</div>
                            <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center gap-1">
                  +5.2%
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2" value={75} />
                        </CardContent>
                    </Card>

                    {/* Clients with Overdue Payments */}
                    <Card
                        className={`cursor-pointer transition-all hover:border-primary ${activeFilter === "overdue" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleCardClick("overdue")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Clients with Overdue Payments</CardTitle>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{clientsMetrics.clientsWithOverduePayments}</div>
                            <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center gap-1">
                  +8.1%
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2 bg-red-100" value={25} />
                        </CardContent>
                    </Card>

                    {/* Top Paying Clients */}
                    <Card
                        className={`cursor-pointer transition-all hover:border-primary ${activeFilter === "top" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleCardClick("top")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Top Paying Clients</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{clientsMetrics.topPayingClients}</div>
                            <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center gap-1">
                  +12.5%
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                                revenue increase
                            </p>
                            <Progress className="h-2 mt-2 bg-emerald-100" value={60}  />
                        </CardContent>
                    </Card>

                    {/* Total Outstanding Payments */}
                    <Card
                        className={`cursor-pointer transition-all hover:border-primary ${activeFilter === "outstanding" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleCardClick("outstanding")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Outstanding Payments</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(clientsMetrics.totalOutstandingPayments)}</div>
                            <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center gap-1">
                  +3.2%
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2" value={45} />
                        </CardContent>
                    </Card>
                </div>

                {/* Clients Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Clients</CardTitle>
                        <CardDescription>
                            Manage your clients and their invoices
                            {activeFilter && (
                                <Badge variant="outline" className="ml-2 bg-secondary/20">
                                    Filtered:{" "}
                                    {activeFilter === "overdue"
                                        ? "With Overdue Payments"
                                        : activeFilter === "top"
                                            ? "Top Paying"
                                            : activeFilter === "outstanding"
                                                ? "With Outstanding Balance"
                                                : "All Clients"}
                                </Badge>
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead className="text-right">Total Invoices</TableHead>
                                    <TableHead className="text-right">Outstanding Amount</TableHead>
                                    <TableHead>Last Invoice Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getFilteredClients().map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                {client.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell>{client.company}</TableCell>
                                        <TableCell className="text-right">{client.totalInvoices}</TableCell>
                                        <TableCell className="text-right">
                      <span className={client.outstandingAmount > 0 ? "text-red-500 font-medium" : ""}>
                        {formatCurrency(client.outstandingAmount)}
                      </span>
                                        </TableCell>
                                        <TableCell>{formatDate(client.lastInvoiceDate)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)} title="View Details">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => navigate(`/dashboard/invoices?client=${client.id}`)}
                                                    title="View Invoices"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <path d="M14 2v6h6" />
                                                        <path d="M16 13H8" />
                                                        <path d="M16 17H8" />
                                                        <path d="M10 9H8" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Client Profile Dialog */}
            <Dialog open={showClientProfile} onOpenChange={setShowClientProfile}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Client Profile</DialogTitle>
                        <DialogDescription>View and manage client details, invoices, and payment history</DialogDescription>
                    </DialogHeader>

                    {selectedClient && (
                        <div className="space-y-6">
                            {/* Client Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarFallback>{selectedClient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                                            <p className="text-muted-foreground">{selectedClient.company}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
                                            <p>{selectedClient.contactPerson}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                                            <p>{selectedClient.email}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                            <p>{selectedClient.phone}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-muted-foreground">Address</p>
                                            <p className="text-sm">{selectedClient.address}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="rounded-lg border p-4">
                                        <h3 className="font-medium mb-2">Invoice Summary</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Total Invoices:</span>
                                                <span className="font-medium">{selectedClient.totalInvoices}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Outstanding Amount:</span>
                                                <span className="font-medium text-red-500">
                          {formatCurrency(selectedClient.outstandingAmount)}
                        </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Last Invoice:</span>
                                                <span className="font-medium">{formatDate(selectedClient.lastInvoiceDate)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button onClick={() => handleCreateInvoice(selectedClient)}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create New Invoice
                                        </Button>
                                        <Button variant="outline" onClick={() => handleSendReminders(selectedClient)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4"
                                            >
                                                <path d="M22 2 11 13" />
                                                <path d="M22 2 15 22 11 13 2 9 22 2z" />
                                            </svg>
                                            Send Bulk Reminders
                                        </Button>
                                        <Button variant="outline" onClick={() => handleEditClient(selectedClient)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4"
                                            >
                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                <path d="m15 5 4 4" />
                                            </svg>
                                            Edit Client Details
                                        </Button>
                                        <Button variant="destructive" onClick={() => handleDeleteClient(selectedClient)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4"
                                            >
                                                <path d="M3 6h18" />
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                <line x1="10" x2="10" y1="11" y2="17" />
                                                <line x1="14" x2="14" y1="11" y2="17" />
                                            </svg>
                                            Delete Client
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Payment History */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Payment History</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Invoice #</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedClient.paymentHistory.map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                                                <TableCell>{formatDate(payment.date)}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={payment.status === "paid" ? "outline" : "destructive"}
                                                        className={payment.status === "paid" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""}
                                                    >
                                                        {payment.status === "paid" ? "Paid" : "Overdue"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => navigate(`/dashboard/invoices/${payment.invoiceNumber}`)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Overdue Invoices */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Overdue Invoices</h3>
                                {selectedClient.paymentHistory.filter((payment) => payment.status === "overdue").length > 0 ? (
                                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                        <div className="flex items-center gap-2 mb-4">
                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                            <h4 className="font-medium text-red-700">
                                                {selectedClient.paymentHistory.filter((payment) => payment.status === "overdue").length} overdue{" "}
                                                {selectedClient.paymentHistory.filter((payment) => payment.status === "overdue").length === 1
                                                    ? "invoice"
                                                    : "invoices"}
                                            </h4>
                                        </div>
                                        <div className="space-y-3">
                                            {selectedClient.paymentHistory
                                                .filter((payment) => payment.status === "overdue")
                                                .map((payment) => (
                                                    <div key={payment.id} className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-medium">{payment.invoiceNumber}</p>
                                                            <p className="text-sm text-red-700">Due on {formatDate(payment.date)}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium">{formatCurrency(payment.amount)}</p>
                                                            <Button variant="outline" size="sm" className="mt-1">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="mr-2 h-3 w-3"
                                                                >
                                                                    <path d="M22 2 11 13" />
                                                                    <path d="M22 2 15 22 11 13 2 9 22 2z" />
                                                                </svg>
                                                                Send Reminder
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No overdue invoices for this client.</p>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit Client Dialog */}
            <Dialog open={showEditClient} onOpenChange={setShowEditClient}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Client</DialogTitle>
                        <DialogDescription>Update client information</DialogDescription>
                    </DialogHeader>

                    {selectedClient && (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Client Name
                                    </label>
                                    <Input id="name" defaultValue={selectedClient.name} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm font-medium">
                                        Company
                                    </label>
                                    <Input id="company" defaultValue={selectedClient.company} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-person" className="text-sm font-medium">
                                    Contact Person
                                </label>
                                <Input id="contact-person" defaultValue={selectedClient.contactPerson} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input id="email" type="email" defaultValue={selectedClient.email} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium">
                                        Phone
                                    </label>
                                    <Input id="phone" defaultValue={selectedClient.phone} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-medium">
                                    Address
                                </label>
                                <Input id="address" defaultValue={selectedClient.address} />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEditClient(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveClientEdits}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Client Confirmation Dialog */}
            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Client</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this client? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedClient && (
                        <div className="py-4">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>{selectedClient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{selectedClient.name}</p>
                                    <p className="text-sm text-muted-foreground">{selectedClient.company}</p>
                                </div>
                            </div>

                            {selectedClient.outstandingAmount > 0 && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                        <p className="text-sm text-red-700">
                                            This client has outstanding invoices totaling {formatCurrency(selectedClient.outstandingAmount)}.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDeleteClient}>
                            Delete Client
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* New Client Dialog */}
            <Dialog open={showNewClient} onOpenChange={setShowNewClient}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                        <DialogDescription>Enter client information to create a new client</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="new-name" className="text-sm font-medium">
                                    Client Name
                                </label>
                                <Input id="new-name" placeholder="Enter client name" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="new-company" className="text-sm font-medium">
                                    Company
                                </label>
                                <Input id="new-company" placeholder="Enter company name" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="new-contact-person" className="text-sm font-medium">
                                Contact Person
                            </label>
                            <Input id="new-contact-person" placeholder="Enter contact person name" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="new-email" className="text-sm font-medium">
                                    Email
                                </label>
                                <Input id="new-email" type="email" placeholder="Enter email address" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="new-phone" className="text-sm font-medium">
                                    Phone
                                </label>
                                <Input id="new-phone" placeholder="Enter phone number" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="new-address" className="text-sm font-medium">
                                Address
                            </label>
                            <Input id="new-address" placeholder="Enter address" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewClient(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveNewClient}>Create Client</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

