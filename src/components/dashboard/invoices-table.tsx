
import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    Send,
    Eye,
    CheckCircle,
    AlertCircle,
    Clock,
    FileText,
    MessageSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {Link} from "react-router";

export type Invoice = {
    id: string
    invoiceNumber: string
    client: string
    dueDate: string
    amount: number
    status: "pending" | "paid" | "overdue" | "draft" | "partial"
    lastFollowUp: string | null
    paymentStatus: "unpaid" | "partial" | "paid"
}

// Mock data for invoices
const data: Invoice[] = [
    {
        id: "INV-20240301",
        invoiceNumber: "INV-20240301",
        client: "ACME Corp",
        dueDate: "2024-04-01",
        amount: 1500,
        status: "pending",
        lastFollowUp: "2024-03-29",
        paymentStatus: "unpaid",
    },
    {
        id: "INV-20240302",
        invoiceNumber: "INV-20240302",
        client: "XYZ Ltd",
        dueDate: "2024-03-15",
        amount: 2000,
        status: "overdue",
        lastFollowUp: "2024-03-25",
        paymentStatus: "unpaid",
    },
    {
        id: "INV-20240303",
        invoiceNumber: "INV-20240303",
        client: "BrightTech",
        dueDate: "2024-03-20",
        amount: 3000,
        status: "paid",
        lastFollowUp: null,
        paymentStatus: "paid",
    },
    {
        id: "INV-20240304",
        invoiceNumber: "INV-20240304",
        client: "Global Industries",
        dueDate: "2024-04-05",
        amount: 5000,
        status: "pending",
        lastFollowUp: "2024-03-28",
        paymentStatus: "unpaid",
    },
    {
        id: "INV-20240305",
        invoiceNumber: "INV-20240305",
        client: "Tech Solutions",
        dueDate: "2024-03-10",
        amount: 1200,
        status: "overdue",
        lastFollowUp: "2024-03-20",
        paymentStatus: "unpaid",
    },
    {
        id: "INV-20240306",
        invoiceNumber: "INV-20240306",
        client: "Innovate Inc",
        dueDate: "2024-03-25",
        amount: 3500,
        status: "paid",
        lastFollowUp: null,
        paymentStatus: "paid",
    },
    {
        id: "INV-20240307",
        invoiceNumber: "INV-20240307",
        client: "Future Systems",
        dueDate: "2024-04-10",
        amount: 2800,
        status: "pending",
        lastFollowUp: "2024-03-27",
        paymentStatus: "unpaid",
    },
    {
        id: "INV-20240308",
        invoiceNumber: "INV-20240308",
        client: "Quantum Corp",
        dueDate: "2024-03-18",
        amount: 4200,
        status: "overdue",
        lastFollowUp: "2024-03-22",
        paymentStatus: "unpaid",
    },
    {
        id: "INV-20240309",
        invoiceNumber: "INV-20240309",
        client: "Apex Solutions",
        dueDate: "2024-03-30",
        amount: 1800,
        status: "partial",
        lastFollowUp: "2024-03-25",
        paymentStatus: "partial",
    },
    {
        id: "INV-20240310",
        invoiceNumber: "INV-20240310",
        client: "Stellar Inc",
        dueDate: "2024-04-15",
        amount: 3200,
        status: "draft",
        lastFollowUp: null,
        paymentStatus: "unpaid",
    },
]

export default function InvoicesTable({ filter }: { filter?: string | null }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [showReminderDialog, setShowReminderDialog] = React.useState(false)
    const [showEscalateDialog, setShowEscalateDialog] = React.useState(false)
    const [showPaymentDialog, setShowPaymentDialog] = React.useState(false)
    const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null)

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

    // Calculate days ago for last follow-up
    const getDaysAgo = (dateString: string | null) => {
        if (!dateString) return "—"

        const date = new Date(dateString)
        const today = new Date()
        const diffTime = Math.abs(today.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`
    }

    // Handle send reminder
    const handleSendReminder = (invoice: Invoice) => {
        setSelectedInvoice(invoice)
        setShowReminderDialog(true)
    }

    // Handle escalate
    const handleEscalate = (invoice: Invoice) => {
        setSelectedInvoice(invoice)
        setShowEscalateDialog(true)
    }

    // Handle mark as paid
    const handleMarkAsPaid = (invoice: Invoice) => {
        setSelectedInvoice(invoice)
        setShowPaymentDialog(true)
    }

    const columns: ColumnDef<Invoice>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "invoiceNumber",
            header: "Invoice #",
            cell: ({ row }) => (
                <Link to={`invoice/${row.original.id}`} className="font-medium text-primary hover:underline">
                    {row.getValue("invoiceNumber")}
                </Link>
            ),
        },
        {
            accessorKey: "client",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Client
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("client")}</div>,
        },
        {
            accessorKey: "dueDate",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Due Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                // const date = new Date(row.getValue("dueDate"))
                return <div>{formatDate(row.getValue("dueDate"))}</div>
            },
        },
        {
            accessorKey: "amount",
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => {
                const amount = Number.parseFloat(row.getValue("amount"))
                const formatted = formatCurrency(amount)

                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string

                return (
                    <div className="flex justify-start">
                        {status === "paid" && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                <CheckCircle className="mr-1 h-3 w-3" /> Paid
                            </Badge>
                        )}
                        {status === "pending" && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                                <Clock className="mr-1 h-3 w-3" /> Pending
                            </Badge>
                        )}
                        {status === "overdue" && (
                            <Badge variant="destructive">
                                <AlertCircle className="mr-1 h-3 w-3" /> Overdue
                            </Badge>
                        )}
                        {status === "draft" && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
                                <FileText className="mr-1 h-3 w-3" /> Draft
                            </Badge>
                        )}
                        {status === "partial" && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                <CheckCircle className="mr-1 h-3 w-3" /> Partially Paid
                            </Badge>
                        )}
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "lastFollowUp",
            header: "Last Follow-Up",
            cell: ({ row }) => {
                const lastFollowUp = row.getValue("lastFollowUp") as string | null
                return <div>{getDaysAgo(lastFollowUp)}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const invoice = row.original

                return (
                    <div className="flex items-center justify-end gap-2">
                        {invoice.status !== "paid" && invoice.status !== "draft" && (
                            <Button className="hidden" variant="ghost" size="icon" onClick={() => handleSendReminder(invoice)} title="Send Reminder">
                                <Send className="h-4 w-4" />
                            </Button>
                        )}

                        {invoice.status === "overdue" && (
                            <Button className="hidden" variant="ghost" size="icon" onClick={() => handleEscalate(invoice)} title="Escalate">
                                <AlertCircle className="h-4 w-4 text-red-500" />
                            </Button>
                        )}

                        {invoice.status !== "paid" && invoice.status !== "draft" && (
                            <Button className="hidden" variant="ghost" size="icon" onClick={() => handleMarkAsPaid(invoice)} title="Mark as Paid">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                        )}

                        <Link to={`invoice/${invoice.id}`} className="hidden">
                            <Button variant="ghost" size="icon" title="View Details">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => (window.location.href = `/dashboard/invoices/${invoice.id}`)}>
                                    View details
                                </DropdownMenuItem>

                                {invoice.status !== "paid" && invoice.status !== "draft" && (
                                    <>
                                        <DropdownMenuItem onClick={() => handleSendReminder(invoice)}>Send reminder</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice)}>Mark as paid</DropdownMenuItem>
                                    </>
                                )}

                                {invoice.status === "overdue" && (
                                    <DropdownMenuItem onClick={() => handleEscalate(invoice)} className="text-red-600">
                                        Escalate to final notice
                                    </DropdownMenuItem>
                                )}

                                {invoice.status === "draft" && <DropdownMenuItem>Edit draft</DropdownMenuItem>}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]

    // Filter data based on filter prop
    const filteredData = React.useMemo(() => {
        if (!filter) return data

        switch (filter) {
            case "outstanding":
                return data.filter(
                    (invoice) => invoice.status === "pending" || invoice.status === "overdue" || invoice.status === "partial",
                )
            case "overdue":
                return data.filter((invoice) => invoice.status === "overdue")
            case "dueSoon":
                // Filter invoices due in the next 7 days
                { const today = new Date()
                const nextWeek = new Date(today)
                nextWeek.setDate(today.getDate() + 7)

                return data.filter((invoice) => {
                    const dueDate = new Date(invoice.dueDate)
                    return dueDate >= today && dueDate <= nextWeek && invoice.status !== "paid"
                }) }
            case "paid":
                return data.filter((invoice) => invoice.status === "paid")
            case "pending":
                return data.filter((invoice) => invoice.status === "pending")
            case "draft":
                return data.filter((invoice) => invoice.status === "draft")
            default:
                return data
        }
    }, [filter])

    const table = useReactTable({
        data: filteredData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by client..."
                    value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("client")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Status <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem
                                checked={table.getColumn("status")?.getFilterValue() === undefined}
                                onCheckedChange={() => table.getColumn("status")?.setFilterValue(undefined)}
                            >
                                All
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes("pending")}
                                onCheckedChange={(checked) => {
                                    const filterValues = (table.getColumn("status")?.getFilterValue() as string[]) || []
                                    if (checked) {
                                        table.getColumn("status")?.setFilterValue([...filterValues, "pending"])
                                    } else {
                                        table.getColumn("status")?.setFilterValue(filterValues.filter((value) => value !== "pending"))
                                    }
                                }}
                            >
                                Pending
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes("overdue")}
                                onCheckedChange={(checked) => {
                                    const filterValues = (table.getColumn("status")?.getFilterValue() as string[]) || []
                                    if (checked) {
                                        table.getColumn("status")?.setFilterValue([...filterValues, "overdue"])
                                    } else {
                                        table.getColumn("status")?.setFilterValue(filterValues.filter((value) => value !== "overdue"))
                                    }
                                }}
                            >
                                Overdue
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes("paid")}
                                onCheckedChange={(checked) => {
                                    const filterValues = (table.getColumn("status")?.getFilterValue() as string[]) || []
                                    if (checked) {
                                        table.getColumn("status")?.setFilterValue([...filterValues, "paid"])
                                    } else {
                                        table.getColumn("status")?.setFilterValue(filterValues.filter((value) => value !== "paid"))
                                    }
                                }}
                            >
                                Paid
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes("partial")}
                                onCheckedChange={(checked) => {
                                    const filterValues = (table.getColumn("status")?.getFilterValue() as string[]) || []
                                    if (checked) {
                                        table.getColumn("status")?.setFilterValue([...filterValues, "partial"])
                                    } else {
                                        table.getColumn("status")?.setFilterValue(filterValues.filter((value) => value !== "partial"))
                                    }
                                }}
                            >
                                Partially Paid
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes("draft")}
                                onCheckedChange={(checked) => {
                                    const filterValues = (table.getColumn("status")?.getFilterValue() as string[]) || []
                                    if (checked) {
                                        table.getColumn("status")?.setFilterValue([...filterValues, "draft"])
                                    } else {
                                        table.getColumn("status")?.setFilterValue(filterValues.filter((value) => value !== "draft"))
                                    }
                                }}
                            >
                                Draft
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id === "invoiceNumber"
                                                ? "Invoice #"
                                                : column.id === "lastFollowUp"
                                                    ? "Last Follow-Up"
                                                    : column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>

            {/* Send Reminder Dialog */}
            <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Send Payment Reminder</DialogTitle>
                        <DialogDescription>Customize and send a payment reminder to {selectedInvoice?.client}.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Reminder Type</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button variant="outline" className="justify-start">
                                    <Send className="mr-2 h-4 w-4" />
                                    Email
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    <MessageSquare className="mr-1 h-4 w-4" />
                                    SMS
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    <MessageSquare className="mr-1 h-4 w-4" />
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
                            <Input
                                id="reminder-subject"
                                defaultValue={`Payment Reminder: Invoice ${selectedInvoice?.invoiceNumber}`}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reminder-message">Message</Label>
                            <Textarea
                                id="reminder-message"
                                rows={6}
                                defaultValue={`Dear Client,

I hope this message finds you well. This is a friendly reminder that payment for invoice ${selectedInvoice?.invoiceNumber} in the amount of ${selectedInvoice ? formatCurrency(selectedInvoice.amount) : ""} is currently due.

Please let me know if you have any questions or if there's anything I can assist you with regarding this payment.

Thank you for your business!

Best regards,
Your Name
Unicollector Inc.`}
                            />
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

            {/* Escalate Dialog */}
            <Dialog open={showEscalateDialog} onOpenChange={setShowEscalateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Escalate to Final Notice</DialogTitle>
                        <DialogDescription>
                            This will send a final notice to {selectedInvoice?.client} regarding invoice{" "}
                            {selectedInvoice?.invoiceNumber}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="rounded-lg border p-4 bg-red-50 text-red-800">
                            <p className="text-sm">
                                <AlertCircle className="inline-block mr-2 h-4 w-4" />A final notice is a serious escalation that may
                                affect your relationship with the client. Consider contacting them directly before proceeding.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="escalation-message">Additional Notes</Label>
                            <Textarea
                                id="escalation-message"
                                rows={4}
                                placeholder="Add any specific details or context for this escalation..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEscalateDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => setShowEscalateDialog(false)}>
                            Send Final Notice
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Mark as Paid Dialog */}
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Record Payment</DialogTitle>
                        <DialogDescription>Record payment for invoice {selectedInvoice?.invoiceNumber}.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="payment-amount">Payment Amount</Label>
                            <Input
                                id="payment-amount"
                                type="number"
                                defaultValue={selectedInvoice?.amount.toString()}
                                placeholder="0.00"
                            />
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
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setShowPaymentDialog(false)}>Record Payment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

