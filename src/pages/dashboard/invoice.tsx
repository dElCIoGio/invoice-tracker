
import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    AlertCircle,
    Send,
    Pencil,
    Trash2,
    Download,
    Mail,
    Phone,
    MessageSquare,
    Plus,
    Calendar,
    CreditCard,
    DollarSign,
    Percent,
    FileText,
} from "lucide-react"
import Timeline from "@/components/dashboard/timeline"
import {useNavigate, useParams} from "react-router";

export default function InvoiceDetailsPage() {
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const [showReminderDialog, setShowReminderDialog] = useState(false)

    const { id } = useParams() as unknown as { id: string };

    // Mock invoice data
    const invoice = {
        id,
        invoiceNumber: "INV-20240301",
        client: {
            name: "Acme Inc",
            contactPerson: "John Smith",
            email: "john@acmeinc.com",
            phone: "+1 (555) 123-4567",
            address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
        },
        issueDate: "2024-03-01",
        dueDate: "2024-03-31",
        totalAmount: 1500,
        paidAmount: 500,
        status: "partial", // "pending", "overdue", "paid", "partial"
        items: [
            {
                id: 1,
                name: "Web Design",
                description: "Website UI/UX design",
                quantity: 1,
                unitPrice: 1000,
                total: 1000,
            },
            {
                id: 2,
                name: "Hosting",
                description: "1-year hosting plan",
                quantity: 1,
                unitPrice: 500,
                total: 500,
            },
        ],
        subtotal: 1500,
        taxRate: 0,
        taxAmount: 0,
        discount: 0,
        grandTotal: 1500,
        followUps: [
            {
                id: 1,
                date: "2024-03-15",
                time: "10:30 AM",
                type: "email",
                description: "Initial invoice sent",
                status: "opened",
                notes: "Client opened email on 2024-03-15 at 2:45 PM",
            },
            {
                id: 2,
                date: "2024-03-22",
                time: "11:15 AM",
                type: "email",
                description: "Payment reminder sent",
                status: "opened",
                notes: "Client opened email on 2024-03-22 at 3:20 PM",
            },
            {
                id: 3,
                date: "2024-03-25",
                time: "2:00 PM",
                type: "phone",
                description: "Phone call follow-up",
                status: "completed",
                notes: "Spoke with John. He promised to make a partial payment by end of week.",
            },
        ],
        payments: [
            {
                id: 1,
                date: "2024-03-10",
                method: "Bank Transfer",
                amount: 500,
                status: "completed",
                reference: "REF123456",
            },
        ],
    }

    // Calculate remaining amount
    const remainingAmount = invoice.grandTotal - invoice.paidAmount

    // Get status badge
    const getStatusBadge = () => {
        switch (invoice.status) {
            case "paid":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        <CheckCircle className="mr-1 h-3 w-3" /> Paid
                    </Badge>
                )
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                        <Clock className="mr-1 h-3 w-3" /> Pending
                    </Badge>
                )
            case "overdue":
                return (
                    <Badge variant="destructive">
                        <AlertCircle className="mr-1 h-3 w-3" /> Overdue
                    </Badge>
                )
            case "partial":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        <CreditCard className="mr-1 h-3 w-3" /> Partially Paid
                    </Badge>
                )
            default:
                return null
        }
    }

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
            month: "long",
            day: "numeric",
        }).format(date)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">Invoice {invoice.invoiceNumber}</h2>
                        {getStatusBadge()}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                        <Button variant="outline" onClick={() => setShowReminderDialog(true)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Reminder
                        </Button>
                        <Button variant="outline">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Invoice Header Card */}
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt={invoice.client.name} />
                                        <AvatarFallback>{invoice.client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-semibold">{invoice.client.name}</h3>
                                        <p className="text-sm text-muted-foreground">{invoice.client.contactPerson}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{invoice.client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{invoice.client.phone}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <span>{invoice.client.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Issue Date</p>
                                        <p className="flex items-center gap-1 mt-1">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            {formatDate(invoice.issueDate)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                                        <p className="flex items-center gap-1 mt-1">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            {formatDate(invoice.dueDate)}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-lg border p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Total Amount</span>
                                        <span className="text-xl font-bold">{formatCurrency(invoice.grandTotal)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-green-600">Paid Amount</span>
                                        <span className="text-sm font-medium text-green-600">{formatCurrency(invoice.paidAmount)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-red-600">Remaining</span>
                                        <span className="text-sm font-medium text-red-600">{formatCurrency(remainingAmount)}</span>
                                    </div>

                                    {invoice.status !== "paid" && (
                                        <Button className="w-full mt-2" onClick={() => setShowPaymentDialog(true)}>
                                            <DollarSign className="mr-2 h-4 w-4" />
                                            {invoice.status === "partial" ? "Record Another Payment" : "Mark as Paid"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="details" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="details">Invoice Details</TabsTrigger>
                        <TabsTrigger value="communications">Communications</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                    </TabsList>

                    {/* Invoice Details Tab */}
                    <TabsContent value="details" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Items</CardTitle>
                                <CardDescription>Detailed breakdown of products and services</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Item</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="text-right">Quantity</TableHead>
                                            <TableHead className="text-right">Unit Price</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoice.items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.name}</TableCell>
                                                <TableCell>{item.description}</TableCell>
                                                <TableCell className="text-right">{item.quantity}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-right">
                                                Subtotal
                                            </TableCell>
                                            <TableCell className="text-right">{formatCurrency(invoice.subtotal)}</TableCell>
                                        </TableRow>
                                        {invoice.taxAmount > 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-right">
                                                    Tax ({invoice.taxRate}%)
                                                </TableCell>
                                                <TableCell className="text-right">{formatCurrency(invoice.taxAmount)}</TableCell>
                                            </TableRow>
                                        )}
                                        {invoice.discount > 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-right">
                                                    Discount
                                                </TableCell>
                                                <TableCell className="text-right">-{formatCurrency(invoice.discount)}</TableCell>
                                            </TableRow>
                                        )}
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-right font-bold">
                                                Grand Total
                                            </TableCell>
                                            <TableCell className="text-right font-bold">{formatCurrency(invoice.grandTotal)}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Terms</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-lg border p-4 bg-gray-50">
                                    <p className="text-sm">
                                        Payment is due within 30 days of invoice date. Please make payment to the bank account details
                                        below.
                                    </p>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground">Bank Name</p>
                                            <p className="text-sm">First National Bank</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground">Account Name</p>
                                            <p className="text-sm">Virelle Inc.</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground">Account Number</p>
                                            <p className="text-sm">1234567890</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground">Routing Number</p>
                                            <p className="text-sm">987654321</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-lg border p-4 bg-blue-50">
                                    <p className="text-sm">
                                        <span className="font-medium">Note:</span> Late payments are subject to a 2% late fee per month.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Communications Tab */}
                    <TabsContent value="communications" className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div>
                                    <CardTitle>Communication History</CardTitle>
                                    <CardDescription>Timeline of all communications with the client</CardDescription>
                                </div>
                                <Button onClick={() => setShowReminderDialog(true)}>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send New Reminder
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Timeline
                                    items={invoice.followUps.map((followUp) => ({
                                        id: followUp.id.toString(),
                                        title: followUp.description,
                                        date: `${followUp.date} at ${followUp.time}`,
                                        icon: followUp.type === "email" ? Mail : followUp.type === "phone" ? Phone : MessageSquare,
                                        iconColor:
                                            followUp.type === "email"
                                                ? "text-blue-500"
                                                : followUp.type === "phone"
                                                    ? "text-green-500"
                                                    : "text-purple-500",
                                        description: followUp.notes,
                                        status: followUp.status,
                                    }))}
                                />
                            </CardContent>
                            <CardFooter className="flex justify-between border-t p-4">
                                <div className="text-sm text-muted-foreground">
                                    Last communication: {invoice.followUps[invoice.followUps.length - 1].date}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Phone className="mr-2 h-3 w-3" />
                                        Log Call
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <MessageSquare className="mr-2 h-3 w-3" />
                                        Add Note
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Reminder Templates</CardTitle>
                                <CardDescription>Quick templates for common reminder scenarios</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Card
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => setShowReminderDialog(true)}
                                    >
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-base">Friendly Reminder</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <p className="text-sm text-muted-foreground">
                                                A gentle reminder about the upcoming payment due date.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => setShowReminderDialog(true)}
                                    >
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-base">Payment Due</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <p className="text-sm text-muted-foreground">
                                                A reminder that payment is now due according to terms.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => setShowReminderDialog(true)}
                                    >
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-base">Overdue Notice</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <p className="text-sm text-muted-foreground">
                                                A formal notice that payment is overdue with late fees.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Payments Tab */}
                    <TabsContent value="payments" className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div>
                                    <CardTitle>Payment History</CardTitle>
                                    <CardDescription>Record of all payments received for this invoice</CardDescription>
                                </div>
                                <Button onClick={() => setShowPaymentDialog(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Payment
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {invoice.payments.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Payment Method</TableHead>
                                                <TableHead>Reference</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {invoice.payments.map((payment) => (
                                                <TableRow key={payment.id}>
                                                    <TableCell>{formatDate(payment.date)}</TableCell>
                                                    <TableCell>{payment.method}</TableCell>
                                                    <TableCell>{payment.reference}</TableCell>
                                                    <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                                                    <TableCell>
                                                        {payment.status === "completed" ? (
                                                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                                                <CheckCircle className="mr-1 h-3 w-3" /> Completed
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                                                                <Clock className="mr-1 h-3 w-3" /> Pending
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-right">
                                                    Total Paid
                                                </TableCell>
                                                <TableCell className="text-right">{formatCurrency(invoice.paidAmount)}</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-right">
                                                    Remaining
                                                </TableCell>
                                                <TableCell className="text-right">{formatCurrency(remainingAmount)}</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-medium">No payments recorded yet</h3>
                                        <p className="text-sm text-muted-foreground mt-1 mb-4">
                                            Record a payment when you receive it from the client
                                        </p>
                                        <Button onClick={() => setShowPaymentDialog(true)}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add First Payment
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Options</CardTitle>
                                <CardDescription>Offer alternative payment options to your client</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-base">Payment Plan</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Offer a structured payment plan to help your client manage cash flow.
                                            </p>
                                            <Button variant="outline" className="w-full">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                Create Payment Plan
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-base">Early Payment Discount</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Offer a discount for early payment to incentivize faster payment.
                                            </p>
                                            <Button variant="outline" className="w-full">
                                                <Percent className="mr-2 h-4 w-4" />
                                                Offer Discount
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this invoice?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the invoice and all associated records.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                setShowDeleteDialog(false)
                                navigate("/dashboard")
                            }}
                        >
                            Delete Invoice
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Payment Dialog */}
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Record Payment</DialogTitle>
                        <DialogDescription>Enter the payment details received from the client.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="payment-amount">Payment Amount</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="payment-amount"
                                    placeholder="0.00"
                                    className="pl-9"
                                    defaultValue={remainingAmount.toString()}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-date">Payment Date</Label>
                            <Input id="payment-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-method">Payment Method</Label>
                            <Select defaultValue="bank-transfer">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                    <SelectItem value="credit-card">Credit Card</SelectItem>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="check">Check</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-reference">Reference Number</Label>
                            <Input id="payment-reference" placeholder="e.g., Transaction ID or Check Number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-notes">Notes</Label>
                            <Textarea id="payment-notes" placeholder="Any additional information about this payment" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setShowPaymentDialog(false)}>Record Payment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Send Reminder Dialog */}
            <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Send Payment Reminder</DialogTitle>
                        <DialogDescription>Customize and send a payment reminder to the client.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Reminder Type</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button variant="outline" className="justify-start">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    SMS
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    WhatsApp
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reminder-template">Template</Label>
                            <Select defaultValue="friendly">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="friendly">Friendly Reminder</SelectItem>
                                    <SelectItem value="due">Payment Due</SelectItem>
                                    <SelectItem value="overdue">Overdue Notice</SelectItem>
                                    <SelectItem value="final">Final Notice</SelectItem>
                                    <SelectItem value="custom">Custom Message</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reminder-subject">Subject</Label>
                            <Input id="reminder-subject" defaultValue={`Payment Reminder: Invoice ${invoice.invoiceNumber}`} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reminder-message">Message</Label>
                            <Textarea
                                id="reminder-message"
                                rows={6}
                                defaultValue={`Dear ${invoice.client.contactPerson},

I hope this message finds you well. This is a friendly reminder that payment for invoice ${invoice.invoiceNumber} in the amount of ${formatCurrency(remainingAmount)} is currently due.

Please let me know if you have any questions or if there's anything I can assist you with regarding this payment.

Thank you for your business!

Best regards,
Your Name
Virelle Inc.`}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="attach-invoice" />
                                <Label htmlFor="attach-invoice">Attach invoice PDF</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowReminderDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setShowReminderDialog(false)}>Send Reminder</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

