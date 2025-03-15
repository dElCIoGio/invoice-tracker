
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays } from "date-fns"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
    ArrowLeft,
    CalendarIcon,
    Plus,
    Trash2,
    Send,
    Download,
    Eye,
    Save,
    X,
    Check,
    ChevronsUpDown,
} from "lucide-react"
import {useNavigate} from "react-router";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";

type Client = {
    id: string,
    name: string,
    email: string,
    address: string,
}

type DiscountType = "amount" | "percentage";

type Currency = "USD" | "EUR" | "GBP"

type InvoiceItem = {
    id: string,
    created_at: Date,
    name: string,
    description: string,
    quantity: number,
    unitPrice: number,
    total: number,
}

type Invoice = {
    id: string,
    created_at: Date,
    dueDate: Date,
    client: Client | null,
    currency: Currency,
    items: InvoiceItem[],
    taxRate: number,
    taxAmount: number,
    discountType: DiscountType,
    discountValue: number,
    discountAmount: number,
    notes: string,
    termsAndConditions: string,
    subtotal: number,
    total: number,
}


// Mock data for clients
const clients: Client[] = [
    { id: "1", name: "Acme Inc", email: "billing@acmeinc.com", address: "123 Business Ave, San Francisco, CA 94107" },
    {
        id: "2",
        name: "Globex Corporation",
        email: "accounts@globex.com",
        address: "456 Corporate Blvd, New York, NY 10001",
    },
    { id: "3", name: "Initech", email: "finance@initech.com", address: "789 Office Park, Austin, TX 78701" },
    { id: "4", name: "Umbrella Corp", email: "payments@umbrella.com", address: "101 Science Dr, Boston, MA 02115" },
    {
        id: "5",
        name: "Massive Dynamic",
        email: "invoices@massivedynamic.com",
        address: "202 Innovation Way, Seattle, WA 98101",
    },
]

// Currency options
const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "$", name: "Australian Dollar" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
]



// Default empty invoice item
const emptyInvoiceItem: InvoiceItem = {
    id: Date.now().toString(),
    created_at: new Date(),
    name: "",
    description: "",
    quantity: 1,
    unitPrice: 0,
    total: 0,
}

export default function NewInvoice() {
    const navigate = useNavigate()
    const today = new Date()

    // Generate invoice number
    const generateInvoiceNumber = () => {
        const prefix = "INV"
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, "0")
        const day = String(today.getDate()).padStart(2, "0")
        const random = Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")
        return `${prefix}-${year}${month}${day}-${random}`
    }



    // State for invoice data
    const [invoice, setInvoice] = useState<Invoice>({
        id: generateInvoiceNumber(),
        created_at: today,
        dueDate: addDays(today, 30),
        client: null,
        items: [{ ...emptyInvoiceItem }],
        currency: "USD",
        taxRate: 0,
        taxAmount: 0,
        discountType: "amount", // "amount" or "percentage"
        discountValue: 0,
        discountAmount: 0,
        notes: "",
        termsAndConditions: "Payment is due within 30 days of invoice date.",
        subtotal: 0,
        total: 0,
    })

    // State for client selection
    const [openClientCombobox, setOpenClientCombobox] = useState(false)
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)

    // State for new client dialog
    const [showNewClientDialog, setShowNewClientDialog] = useState(false)
    const [newClient, setNewClient] = useState({
        name: "",
        email: "",
        address: "",
    })

    // State for preview dialog
    const [showPreviewDialog, setShowPreviewDialog] = useState(false)

    // Get currency symbol
    const getCurrencySymbol = (code: string) => {
        const currency = currencies.find((c) => c.code === code)
        return currency ? currency.symbol : "$"
    }

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: invoice.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount)
    }

    // Handle client selection
    const handleClientSelect = (clientId: string) => {
        const client = clients.find((c) => c.id === clientId)
        setSelectedClient(client ? client : null)
        if (client)
            setInvoice((prev) => ({ ...prev, client }))
        setOpenClientCombobox(false)
    }

    // Handle adding a new client
    const handleAddNewClient = () => {
        // In a real app, this would save to a database
        const newClientWithId = {
            id: (clients.length + 1).toString(),
            ...newClient,
        }

        // Update client in invoice
        setSelectedClient(newClientWithId)
        setInvoice((prev) => ({ ...prev, client: newClientWithId }))

        // Close dialog and reset form
        setShowNewClientDialog(false)
        setNewClient({ name: "", email: "", address: "" })
    }

    // Handle adding a new invoice item
    const handleAddInvoiceItem = () => {
        setInvoice((prev) => ({
            ...prev,
            items: [...prev.items, { ...emptyInvoiceItem, id: Date.now().toString() }],
        }))
    }

    // Handle removing an invoice item
    const handleRemoveInvoiceItem = (itemId: string) => {
        setInvoice((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== itemId),
        }))
    }

    // Handle updating an invoice item
const handleUpdateInvoiceItem = (itemId: string, field: string, value: string | number | Currency | Date) => {
        setInvoice((prev) => {
            const updatedItems = prev.items.map((item) => {
                if (item.id === itemId) {
                    const updatedItem = { ...item, [field]: value }

                    // Recalculate total if quantity or unitPrice changes
                    if (field === "quantity" || field === "unitPrice") {
                        updatedItem.total = updatedItem.quantity * updatedItem.unitPrice
                    }

                    return updatedItem
                }
                return item
            })

            return { ...prev, items: updatedItems }
        })
    }

    // Calculate subtotal, tax, discount, and total
    useEffect(() => {
        const subtotal = invoice.items.reduce((sum, item) => sum + (item.total || 0), 0)

        // Calculate tax amount
        const taxAmount = (subtotal * invoice.taxRate) / 100

        // Calculate discount amount
        let discountAmount = 0
        if (invoice.discountType === "percentage") {
            discountAmount = (subtotal * invoice.discountValue) / 100
        } else {
            discountAmount = invoice.discountValue
        }

        // Calculate total
        const total = subtotal + taxAmount - discountAmount

        setInvoice((prev) => ({
            ...prev,
            subtotal,
            taxAmount,
            discountAmount,
            total,
        }))
    }, [invoice.items, invoice.taxRate, invoice.discountType, invoice.discountValue])

    // Handle saving invoice as draft
    const handleSaveAsDraft = () => {
        // In a real app, this would save to a database
        console.log("Saving invoice as draft:", invoice)
        navigate("/dashboard/invoices")
    }

    // Handle sending invoice
    const handleSendInvoice = () => {
        // In a real app, this would save to a database and send an email
        console.log("Sending invoice:", invoice)
        navigate("/dashboard/invoices")
    }

    // Handle generating PDF
    const handleGeneratePDF = () => {
        // In a real app, this would generate a PDF
        console.log("Generating PDF for invoice:", invoice)
    }

    return (
        <div className="flex flex-col">

            <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">New Invoice</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleSaveAsDraft}>
                            <Save className="mr-2 h-4 w-4" />
                            Save as Draft
                        </Button>
                        <Button variant="outline" onClick={() => setShowPreviewDialog(true)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Button>
                        <Button variant="outline" onClick={handleGeneratePDF}>
                            <Download className="mr-2 h-4 w-4" />
                            Generate PDF
                        </Button>
                        <Button onClick={handleSendInvoice}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Invoice
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Invoice Details */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Invoice Details</CardTitle>
                            <CardDescription>Enter the basic information for this invoice</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="invoice-number">Invoice Number</Label>
                                <Input
                                    id="invoice-number"
                                    value={invoice.id}
                                    onChange={(e) => setInvoice((prev) => ({ ...prev, invoiceNumber: e.target.value }))}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="invoice-date">Invoice Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {format(invoice.created_at, "PPP")}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={invoice.created_at}
                                                onSelect={(date) => setInvoice((prev) => ({ ...prev, invoiceDate: date }))}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="due-date">Due Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {format(invoice.dueDate, "PPP")}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={invoice.dueDate}
                                                onSelect={(date) => {
                                                    if (date)
                                                        setInvoice((prev) => ({ ...prev, dueDate: date }))
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Select
                                    value={invoice.currency}
                                    onValueChange={(value) => setInvoice((prev) => ({ ...prev, currency: value as Currency }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currencies.map((currency) => (
                                            <SelectItem key={currency.code} value={currency.code}>
                                                {currency.symbol} {currency.name} ({currency.code})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Client Details */}
                    <Card className="lg:col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <div>
                                <CardTitle>Client Details</CardTitle>
                                <CardDescription>Select an existing client or add a new one</CardDescription>
                            </div>
                            <Button variant="outline" onClick={() => setShowNewClientDialog(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Client
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Client</Label>
                                <Popover open={openClientCombobox} onOpenChange={setOpenClientCombobox}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openClientCombobox}
                                            className="w-full justify-between"
                                        >
                                            {selectedClient ? selectedClient.name : "Select a client..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[400px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search clients..." />
                                            <CommandList>
                                                <CommandEmpty>No client found.</CommandEmpty>
                                                <CommandGroup>
                                                    {clients.map((client) => (
                                                        <CommandItem key={client.id} value={client.id} onSelect={handleClientSelect}>
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    selectedClient?.id === client.id ? "opacity-100" : "opacity-0",
                                                                )}
                                                            />
                                                            {client.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {selectedClient && (
                                <div className="rounded-md border p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium">{selectedClient.name}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedClient(null)
                                                setInvoice((prev) => ({ ...prev, client: null }))
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        <div>{selectedClient.email}</div>
                                        <div className="whitespace-pre-line">{selectedClient.address}</div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Invoice Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Invoice Items</CardTitle>
                        <CardDescription>Add the products or services you're invoicing for</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Item</TableHead>
                                    <TableHead className="w-[300px]">Description</TableHead>
                                    <TableHead className="w-[100px] text-right">Quantity</TableHead>
                                    <TableHead className="w-[150px] text-right">Unit Price</TableHead>
                                    <TableHead className="w-[150px] text-right">Total</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoice.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Input
                                                value={item.name}
                                                onChange={(e) => handleUpdateInvoiceItem(item.id, "name", e.target.value)}
                                                placeholder="Item name"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={item.description}
                                                onChange={(e) => handleUpdateInvoiceItem(item.id, "description", e.target.value)}
                                                placeholder="Description"
                                            />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleUpdateInvoiceItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)
                                                }
                                                className="w-20 ml-auto text-right"
                                            />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="relative flex items-center w-28 ml-auto">
                                                <span className="absolute left-3 my-auto text-muted-foreground">
                                                  {getCurrencySymbol(invoice.currency)}
                                                </span>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.unitPrice}
                                                    onChange={(e) =>
                                                        handleUpdateInvoiceItem(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)
                                                    }
                                                    className="pl-7 text-right"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveInvoiceItem(item.id)}
                                                disabled={invoice.items.length === 1}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Button variant="outline" className="mt-4" onClick={handleAddInvoiceItem}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                        </Button>
                    </CardContent>
                </Card>

                {/* Invoice Summary */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Additional Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Details</CardTitle>
                            <CardDescription>Add notes, terms, and other details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Add any notes or additional information for the client..."
                                    value={invoice.notes}
                                    onChange={(e) => setInvoice((prev) => ({ ...prev, notes: e.target.value }))}
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="terms">Terms and Conditions</Label>
                                <Textarea
                                    id="terms"
                                    placeholder="Add your payment terms and conditions..."
                                    value={invoice.termsAndConditions}
                                    onChange={(e) => setInvoice((prev) => ({ ...prev, termsAndConditions: e.target.value }))}
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="file">Attach File (Optional)</Label>
                                <Input id="file" type="file" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Totals */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice Summary</CardTitle>
                            <CardDescription>Review the totals for this invoice</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal:</span>
                                    <span>{formatCurrency(invoice.subtotal)}</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="tax-rate" className="flex items-center gap-2">
                                            <span>Tax Rate:</span>
                                        </Label>
                                        <div className="flex items-center w-28">
                                            <Input
                                                id="tax-rate"
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={invoice.taxRate}
                                                onChange={(e) =>
                                                    setInvoice((prev) => ({ ...prev, taxRate: Number.parseFloat(e.target.value) || 0 }))
                                                }
                                                className="text-right"
                                            />
                                            <span className="ml-2">%</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax Amount:</span>
                                        <span>{formatCurrency(invoice.taxAmount)}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="discount" className="flex items-center gap-2">
                                            <span>Discount:</span>
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Select
                                                value={invoice.discountType}
                                                onValueChange={(value) => setInvoice((prev) => ({ ...prev, discountType: value as DiscountType }))}
                                            >
                                                <SelectTrigger className="w-24">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="amount">Amount</SelectItem>
                                                    <SelectItem value="percentage">Percentage</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <div className="flex items-center w-28">
                                                {invoice.discountType === "amount" ? (
                                                    <div className="relative w-full">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">
                              {getCurrencySymbol(invoice.currency)}
                            </span>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            value={invoice.discountValue}
                                                            onChange={(e) =>
                                                                setInvoice((prev) => ({
                                                                    ...prev,
                                                                    discountValue: Number.parseFloat(e.target.value) || 0,
                                                                }))
                                                            }
                                                            className="pl-7 text-right"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center w-full">
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={invoice.discountValue}
                                                            onChange={(e) =>
                                                                setInvoice((prev) => ({
                                                                    ...prev,
                                                                    discountValue: Number.parseFloat(e.target.value) || 0,
                                                                }))
                                                            }
                                                            className="text-right"
                                                        />
                                                        <span className="ml-2">%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Discount Amount:</span>
                                        <span>{formatCurrency(invoice.discountAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between font-medium text-lg">
                                    <span>Total:</span>
                                    <span>{formatCurrency(invoice.total)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button variant="outline" onClick={handleSaveAsDraft}>
                        <Save className="mr-2 h-4 w-4" />
                        Save as Draft
                    </Button>
                    <Button onClick={handleSendInvoice}>
                        <Send className="mr-2 h-4 w-4" />
                        Send Invoice
                    </Button>
                </div>
            </div>

            {/* New Client Dialog */}
            <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                        <DialogDescription>Enter the details for the new client.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="client-name">Client Name</Label>
                            <Input
                                id="client-name"
                                value={newClient.name}
                                onChange={(e) => setNewClient((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Company or individual name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-email">Email</Label>
                            <Input
                                id="client-email"
                                type="email"
                                value={newClient.email}
                                onChange={(e) => setNewClient((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="billing@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-address">Billing Address</Label>
                            <Textarea
                                id="client-address"
                                value={newClient.address}
                                onChange={(e) => setNewClient((prev) => ({ ...prev, address: e.target.value }))}
                                placeholder="Full billing address"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewClientDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddNewClient} disabled={!newClient.name || !newClient.email}>
                            Add Client
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Preview Dialog */}
            <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Invoice Preview</DialogTitle>
                        <DialogDescription>Preview how your invoice will look to the client.</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto p-6 border rounded-md bg-white">
                        <div className="space-y-8">
                            {/* Invoice Header */}
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">INVOICE</h2>
                                    <p className="text-muted-foreground">{invoice.id}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">Virelle Inc.</div>
                                    <div className="text-sm text-muted-foreground">
                                        <p>123 Company Street</p>
                                        <p>Business City, ST 12345</p>
                                        <p>billing@virelle.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bill To / Invoice Details */}
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-semibold mb-2">Bill To:</h3>
                                    {selectedClient ? (
                                        <div>
                                            <p className="font-medium">{selectedClient.name}</p>
                                            <p>{selectedClient.email}</p>
                                            <p className="whitespace-pre-line">{selectedClient.address}</p>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">No client selected</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Invoice Date:</span>
                                        <span>{format(invoice.created_at, "PPP")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Due Date:</span>
                                        <span>{format(invoice.dueDate, "PPP")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Currency:</span>
                                        <span>{invoice.currency}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Items */}
                            <div>
                                <h3 className="font-semibold mb-2">Invoice Items:</h3>
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="border-b">
                                        <th className="py-2 text-left">Item</th>
                                        <th className="py-2 text-left">Description</th>
                                        <th className="py-2 text-right">Quantity</th>
                                        <th className="py-2 text-right">Unit Price</th>
                                        <th className="py-2 text-right">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {invoice.items.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-2">{item.name || "—"}</td>
                                            <td className="py-2">{item.description || "—"}</td>
                                            <td className="py-2 text-right">{item.quantity}</td>
                                            <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                                            <td className="py-2 text-right">{formatCurrency(item.total)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td className="py-2 text-right font-medium">Subtotal:</td>
                                        <td className="py-2 text-right">{formatCurrency(invoice.subtotal)}</td>
                                    </tr>
                                    {invoice.taxRate > 0 && (
                                        <tr>
                                            <td colSpan={3}></td>
                                            <td className="py-2 text-right font-medium">Tax ({invoice.taxRate}%):</td>
                                            <td className="py-2 text-right">{formatCurrency(invoice.taxAmount)}</td>
                                        </tr>
                                    )}
                                    {invoice.discountValue > 0 && (
                                        <tr>
                                            <td colSpan={3}></td>
                                            <td className="py-2 text-right font-medium">
                                                Discount {invoice.discountType === "percentage" ? `(${invoice.discountValue}%)` : ""}:
                                            </td>
                                            <td className="py-2 text-right">-{formatCurrency(invoice.discountAmount)}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td className="py-2 text-right font-bold">Total:</td>
                                        <td className="py-2 text-right font-bold">{formatCurrency(invoice.total)}</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Notes & Terms */}
                            <div className="space-y-4">
                                {invoice.notes && (
                                    <div>
                                        <h3 className="font-semibold mb-1">Notes:</h3>
                                        <p className="text-sm whitespace-pre-line">{invoice.notes}</p>
                                    </div>
                                )}

                                <div>
                                    <h3 className="font-semibold mb-1">Terms and Conditions:</h3>
                                    <p className="text-sm whitespace-pre-line">{invoice.termsAndConditions}</p>
                                </div>
                            </div>

                            {/* Thank You */}
                            <div className="text-center pt-8">
                                <p className="font-medium">Thank you for your business!</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
                            Close
                        </Button>
                        <Button onClick={handleSendInvoice}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Invoice
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

