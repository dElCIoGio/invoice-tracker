
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Send, Eye, CheckCircle, AlertCircle, Clock } from "lucide-react"

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

export type Invoice = {
    id: string
    invoiceNumber: string
    client: string
    issueDate: string
    dueDate: string
    amount: number
    status: "pending" | "paid" | "overdue"
    lastFollowUp: string | null
}

const data: Invoice[] = [
    {
        id: "INV-001",
        invoiceNumber: "INV-001",
        client: "Acme Inc",
        issueDate: "2023-04-15",
        dueDate: "2023-05-15",
        amount: 1999.0,
        status: "paid",
        lastFollowUp: "2023-05-10",
    },
    {
        id: "INV-002",
        invoiceNumber: "INV-002",
        client: "Globex Corp",
        issueDate: "2023-04-20",
        dueDate: "2023-05-15",
        amount: 3500.0,
        status: "pending",
        lastFollowUp: null,
    },
    {
        id: "INV-003",
        invoiceNumber: "INV-003",
        client: "Initech",
        issueDate: "2023-04-05",
        dueDate: "2023-05-05",
        amount: 2750.0,
        status: "overdue",
        lastFollowUp: "2023-05-08",
    },
    {
        id: "INV-004",
        invoiceNumber: "INV-004",
        client: "Umbrella Corp",
        issueDate: "2023-04-10",
        dueDate: "2023-05-10",
        amount: 5200.0,
        status: "paid",
        lastFollowUp: "2023-05-05",
    },
    {
        id: "INV-005",
        invoiceNumber: "INV-005",
        client: "Massive Dynamic",
        issueDate: "2023-04-12",
        dueDate: "2023-05-12",
        amount: 3800.0,
        status: "paid",
        lastFollowUp: "2023-05-07",
    },
    {
        id: "INV-006",
        invoiceNumber: "INV-006",
        client: "Stark Industries",
        issueDate: "2023-04-22",
        dueDate: "2023-05-17",
        amount: 7200.0,
        status: "pending",
        lastFollowUp: null,
    },
    {
        id: "INV-007",
        invoiceNumber: "INV-007",
        client: "Wayne Enterprises",
        issueDate: "2023-04-25",
        dueDate: "2023-05-19",
        amount: 4800.0,
        status: "pending",
        lastFollowUp: null,
    },
    {
        id: "INV-008",
        invoiceNumber: "INV-008",
        client: "Cyberdyne Systems",
        issueDate: "2023-04-02",
        dueDate: "2023-05-02",
        amount: 6500.0,
        status: "overdue",
        lastFollowUp: "2023-05-06",
    },
    {
        id: "INV-009",
        invoiceNumber: "INV-009",
        client: "Oscorp Industries",
        issueDate: "2023-04-28",
        dueDate: "2023-05-28",
        amount: 3200.0,
        status: "pending",
        lastFollowUp: null,
    },
    {
        id: "INV-010",
        invoiceNumber: "INV-010",
        client: "LexCorp",
        issueDate: "2023-04-30",
        dueDate: "2023-05-30",
        amount: 8900.0,
        status: "pending",
        lastFollowUp: null,
    },
]

export const columns: ColumnDef<Invoice>[] = [
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
        cell: ({ row }) => <div className="font-medium">{row.getValue("invoiceNumber")}</div>,
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
        cell: ({ row }) => <div className="text-black">{row.getValue("client")}</div>,
    },
    {
        accessorKey: "issueDate",
        header: "Issue Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("issueDate"))
            return <div className="text-black">{date.toLocaleDateString()}</div>
        },
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("dueDate"))
            return <div className="text-black">{date.toLocaleDateString()}</div>
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium text-black">{formatted}</div>
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

            if (!lastFollowUp) {
                return <div className="text-zinc-500">None</div>
            }

            const date = new Date(lastFollowUp)
            return <div className="text-black">{date.toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const invoice = row.original

            return (
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Send className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="text-black">View details</DropdownMenuItem>
                            <DropdownMenuItem className="text-black">Send reminder</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-black">Mark as paid</DropdownMenuItem>
                            {invoice.status === "overdue" && <DropdownMenuItem className="text-red-600">Escalate</DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]

export function InvoiceTable({ status }: { status?: string }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    // Filter data based on status prop if provided
    const filteredData = React.useMemo(() => {
        if (!status) return data
        return data.filter((invoice) => invoice.status === status)
    }, [status])

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
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by client..."
                    value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("client")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
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
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-2">
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
                                        {column.id === "invoiceNumber" ? "Invoice #" : column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
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
                                        <TableCell className="" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
                <div className="flex-1 text-sm text-zinc-500">
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
        </div>
    )
}

