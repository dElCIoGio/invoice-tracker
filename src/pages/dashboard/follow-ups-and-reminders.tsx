
import {JSX, useState} from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
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
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowUpRight,
    AlertCircle,
    Clock,
    CheckCircle,
    Eye,
    Mail,
    MessageSquare,
    DollarSign,
    Send,
    AlertTriangle,
    CheckCheck,
    BarChart,
    Calendar,
    Rocket,
    X,
    Filter,
    MoreHorizontal,
    ChevronDown,
    ChevronUp,
    Lightbulb,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {toast} from "sonner";
import EngagementHeatmap from "@/components/engagement-heatmap.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {ScrollArea} from "@/components/ui/scroll-area.tsx";


// TypeScript interfaces
interface Client {
    id: string
    name: string
    email: string
    contactPerson: string
    avatar?: string
}

interface HistoryItem {
    id: string
    date: string
    type: "email" | "phone" | "payment" | "message"
    message: string
    status: "opened" | "not_opened" | "responded" | "no_response" | "completed"
}

interface Engagement {
    emailOpened: boolean
    replied: boolean
    ignored: boolean
}

type ReminderStatus = "scheduled" | "sent" | "engaged" | "escalated" | "paid"

interface Reminder {
    id: string
    invoiceNumber: string
    client: Client
    dueDate: string
    amount: number
    lastReminderSent: string
    status: ReminderStatus
    history: HistoryItem[]
    engagement: Engagement
    suggestedAction: string
    daysOverdue: number
}

interface SummaryMetrics {
    totalOverdueAmount: number
    pendingReminders: number
    escalatedCases: number
    collectedFromReminders: number
}

// Mock data
const summaryMetrics: SummaryMetrics = {
    totalOverdueAmount: 12500,
    pendingReminders: 15,
    escalatedCases: 5,
    collectedFromReminders: 5000,
}

// Mock reminders data
const initialReminders: Reminder[] = [
    {
        id: "1",
        invoiceNumber: "INV-20240301",
        client: {
            id: "c1",
            name: "ACME Corp",
            email: "billing@acmeinc.com",
            contactPerson: "John Smith",
        },
        dueDate: "2024-03-10",
        amount: 1500,
        lastReminderSent: "2024-03-20",
        status: "scheduled",
        daysOverdue: 5,
        history: [
            { id: "h1", date: "2024-03-15", type: "email", message: "Reminder scheduled for tomorrow", status: "completed" },
        ],
        engagement: {
            emailOpened: false,
            replied: false,
            ignored: false,
        },
        suggestedAction: "Send the first reminder as the invoice is now overdue.",
    },
    {
        id: "2",
        invoiceNumber: "INV-20240302",
        client: {
            id: "c2",
            name: "XYZ Ltd",
            email: "accounts@xyzltd.com",
            contactPerson: "Jane Doe",
        },
        dueDate: "2024-02-25",
        amount: 2000,
        lastReminderSent: "2024-03-17",
        status: "sent",
        daysOverdue: 18,
        history: [
            { id: "h3", date: "2024-03-01", type: "email", message: "First reminder sent", status: "opened" },
            { id: "h4", date: "2024-03-17", type: "email", message: "Second reminder sent", status: "not_opened" },
        ],
        engagement: {
            emailOpened: true,
            replied: false,
            ignored: false,
        },
        suggestedAction: "Send another reminder or try calling the client as they haven't responded to the last email.",
    },
    {
        id: "3",
        invoiceNumber: "INV-20240303",
        client: {
            id: "c3",
            name: "BrightTech",
            email: "finance@brighttech.com",
            contactPerson: "Robert Johnson",
        },
        dueDate: "2024-02-15",
        amount: 3000,
        lastReminderSent: "2024-03-15",
        status: "engaged",
        daysOverdue: 28,
        history: [
            { id: "h6", date: "2024-02-20", type: "email", message: "First reminder sent", status: "opened" },
            { id: "h7", date: "2024-03-01", type: "email", message: "Second reminder sent", status: "responded" },
            {
                id: "h8",
                date: "2024-03-10",
                type: "phone",
                message: "Client called to discuss payment options",
                status: "responded",
            },
        ],
        engagement: {
            emailOpened: true,
            replied: true,
            ignored: false,
        },
        suggestedAction: "Offer a payment plan as the client has responded and shown interest in resolving the invoice.",
    },
    {
        id: "4",
        invoiceNumber: "INV-20240304",
        client: {
            id: "c4",
            name: "Global Industries",
            email: "ap@globalindustries.com",
            contactPerson: "Michael Brown",
        },
        dueDate: "2024-03-05",
        amount: 5000,
        lastReminderSent: "2024-03-18",
        status: "escalated",
        daysOverdue: 10,
        history: [
            { id: "h10", date: "2024-03-10", type: "email", message: "First reminder sent", status: "opened" },
            { id: "h11", date: "2024-03-15", type: "email", message: "Second reminder sent", status: "opened" },
            { id: "h12", date: "2024-03-18", type: "email", message: "Final notice sent", status: "opened" },
        ],
        engagement: {
            emailOpened: true,
            replied: false,
            ignored: true,
        },
        suggestedAction: "Consider legal action as the client has ignored multiple reminders including the final notice.",
    },
    {
        id: "5",
        invoiceNumber: "INV-20240305",
        client: {
            id: "c5",
            name: "Tech Solutions",
            email: "billing@techsolutions.com",
            contactPerson: "Sarah Wilson",
        },
        dueDate: "2024-02-28",
        amount: 1200,
        lastReminderSent: "2024-03-12",
        status: "paid",
        daysOverdue: 0,
        history: [
            { id: "h13", date: "2024-03-05", type: "email", message: "First reminder sent", status: "opened" },
            { id: "h14", date: "2024-03-12", type: "email", message: "Second reminder sent", status: "responded" },
            { id: "h15", date: "2024-03-19", type: "payment", message: "Payment received", status: "completed" },
        ],
        engagement: {
            emailOpened: true,
            replied: true,
            ignored: false,
        },
        suggestedAction: "No action needed as payment has been received.",
    },
    {
        id: "6",
        invoiceNumber: "INV-20240306",
        client: {
            id: "c6",
            name: "Innovate Inc",
            email: "accounts@innovateinc.com",
            contactPerson: "David Clark",
        },
        dueDate: "2024-03-15",
        amount: 3500,
        lastReminderSent: "2024-03-22",
        status: "sent",
        daysOverdue: 0,
        history: [{ id: "h16", date: "2024-03-22", type: "email", message: "First reminder sent", status: "opened" }],
        engagement: {
            emailOpened: true,
            replied: false,
            ignored: false,
        },
        suggestedAction:
            "Wait a few more days before sending another reminder as the client has opened the email recently.",
    },
    {
        id: "7",
        invoiceNumber: "INV-20240307",
        client: {
            id: "c7",
            name: "Quantum Systems",
            email: "finance@quantumsystems.com",
            contactPerson: "Emily White",
        },
        dueDate: "2024-02-20",
        amount: 4200,
        lastReminderSent: "2024-03-10",
        status: "escalated",
        daysOverdue: 23,
        history: [
            { id: "h17", date: "2024-02-25", type: "email", message: "First reminder sent", status: "not_opened" },
            { id: "h18", date: "2024-03-05", type: "email", message: "Second reminder sent", status: "not_opened" },
            { id: "h19", date: "2024-03-10", type: "email", message: "Final notice sent", status: "opened" },
        ],
        engagement: {
            emailOpened: true,
            replied: false,
            ignored: true,
        },
        suggestedAction: "Consider legal action or collection agency as the client has ignored multiple reminders.",
    },
    {
        id: "8",
        invoiceNumber: "INV-20240308",
        client: {
            id: "c8",
            name: "Eco Friendly",
            email: "billing@ecofriendly.com",
            contactPerson: "Thomas Green",
        },
        dueDate: "2024-03-01",
        amount: 1800,
        lastReminderSent: "2024-03-15",
        status: "engaged",
        daysOverdue: 14,
        history: [
            { id: "h20", date: "2024-03-05", type: "email", message: "First reminder sent", status: "opened" },
            { id: "h21", date: "2024-03-15", type: "email", message: "Second reminder sent", status: "responded" },
        ],
        engagement: {
            emailOpened: true,
            replied: true,
            ignored: false,
        },
        suggestedAction: "Follow up on their promise to pay by the end of the week.",
    },
]

export default function FollowUps() {
    const [reminders, setReminders] = useState<Reminder[]>(initialReminders)
    const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null)
    const [showReminderDetails, setShowReminderDetails] = useState(false)
    const [showSendReminder, setShowSendReminder] = useState(false)
    const [showEscalateDialog, setShowEscalateDialog] = useState(false)
    const [showNegotiateDialog, setShowNegotiateDialog] = useState(false)
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const [activeTab, setActiveTab] = useState<string>("all")
    const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null)

    // State for reminder form
    const [reminderForm, setReminderForm] = useState({
        channel: "email",
        template: "standard",
        message: "",
    })

    // Format currency
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    // Format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date)
    }

    // Calculate days ago
    const getDaysAgo = (dateString: string): string => {
        const date = new Date(dateString)
        const today = new Date()
        const diffTime = Math.abs(today.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays === 0 ? "Today" : diffDays === 1 ? "Yesterday" : `${diffDays} days ago`
    }

    // Handle card click to filter follow-ups
    // const handleCardClick = (filter: string) => {
    //     // setActiveFilter(activeFilter === filter ? null : filter)
    // }

    // Handle view follow-up details
    const handleViewReminder = (reminder: Reminder) => {
        setSelectedReminder(reminder)
        setShowReminderDetails(true)
    }

    // Handle send reminder
    const handleSendReminder = (reminder: Reminder) => {
        setSelectedReminder(reminder)

        // Set default message based on template
        let defaultMessage = ""
        if (reminder.status === "scheduled") {
            defaultMessage = `Dear ${reminder.client.contactPerson},

This is a friendly reminder that invoice ${reminder.invoiceNumber} for ${formatCurrency(reminder.amount)} was due on ${formatDate(reminder.dueDate)}.

Please let us know if you have any questions or if there's anything we can assist you with regarding this payment.

Thank you for your business!

Best regards,
Unicollector Inc.`
        } else if (reminder.status === "sent") {
            defaultMessage = `Dear ${reminder.client.contactPerson},

This is to inform you that invoice ${reminder.invoiceNumber} for ${formatCurrency(reminder.amount)} is now overdue. The payment was due on ${formatDate(reminder.dueDate)}.

Please process the payment as soon as possible to avoid any late fees.

If you have already made the payment, please disregard this reminder.

Best regards,
Unicollector Inc.`
        }

        setReminderForm({
            channel: "email",
            template: "standard",
            message: defaultMessage,
        })

        setShowSendReminder(true)
    }

    // Handle escalate to final notice
    const handleEscalate = (reminder: Reminder) => {
        setSelectedReminder(reminder)
        setShowEscalateDialog(true)
    }

    // Handle mark as paid
    const handleMarkAsPaid = (reminder: Reminder) => {
        setSelectedReminder(reminder)
        setShowPaymentDialog(true)
    }

    // Handle send reminder submit
    const handleSendReminderSubmit = () => {
        if (!selectedReminder) return

        // Update the reminder status
        const updatedReminders = reminders.map((reminder) => {
            if (reminder.id === selectedReminder.id) {
                const newStatus: ReminderStatus = reminder.status === "scheduled" ? "sent" : reminder.status
                const newHistory: HistoryItem[] = [
                    ...reminder.history,
                    {
                        id: `h${Date.now()}`,
                        date: new Date().toISOString().split("T")[0],
                        type: "email",
                        message: "Reminder sent",
                        status: "opened",
                    },
                ]

                return {
                    ...reminder,
                    status: newStatus,
                    lastReminderSent: new Date().toISOString().split("T")[0],
                    history: newHistory,
                }
            }
            return reminder
        })

        setReminders(updatedReminders)
        setShowSendReminder(false)
        toast("Reminder sent", {
            description: `Reminder has been sent to ${selectedReminder.client.name} via ${reminderForm.channel}.`,
        })
    }

    // Handle escalate submit
    const handleEscalateSubmit = () => {
        if (!selectedReminder) return

        // Update the reminder status to escalated
        const updatedReminders: Reminder[] = reminders.map((reminder) => {
            if (reminder.id === selectedReminder.id) {
                const newHistory: HistoryItem[] = [
                    ...reminder.history,
                    {
                        id: `h${Date.now()}`,
                        date: new Date().toISOString().split("T")[0],
                        type: "email",
                        message: "Final notice sent",
                        status: "opened",
                    },
                ]

                return {
                    ...reminder,
                    status: "escalated",
                    lastReminderSent: new Date().toISOString().split("T")[0],
                    history: newHistory,
                }
            }
            return reminder
        })

        setReminders(updatedReminders)
        setShowEscalateDialog(false)
        toast("Final notice sent", {
            description: `Final notice has been sent to ${selectedReminder.client.name}.`,
        })
    }

    // Handle negotiate payment
    const handleNegotiatePayment = (reminder: Reminder) => {
        setSelectedReminder(reminder)
        setShowNegotiateDialog(true)
    }

    // Handle negotiate submit
    const handleNegotiateSubmit = () => {
        if (!selectedReminder) return

        // Update the reminder status to engaged
        const updatedReminders: Reminder[] = reminders.map((reminder) => {
            if (reminder.id === selectedReminder.id) {
                const newHistory: HistoryItem[] = [
                    ...reminder.history,
                    {
                        id: `h${Date.now()}`,
                        date: new Date().toISOString().split("T")[0],
                        type: "email",
                        message: "Payment negotiation offer sent",
                        status: "opened",
                    },
                ]

                return {
                    ...reminder,
                    status: "engaged",
                    lastReminderSent: new Date().toISOString().split("T")[0],
                    history: newHistory,
                    engagement: {
                        ...reminder.engagement,
                        replied: true,
                    },
                }
            }
            return reminder
        })

        setReminders(updatedReminders)
        setShowNegotiateDialog(false)
        toast("Payment offer sent", {
            description: `Payment negotiation offer has been sent to ${selectedReminder.client.name}.`,
        })
    }

    // Handle payment submit
    const handlePaymentSubmit = () => {
        if (!selectedReminder) return

        // Update the reminder status to paid
        const updatedReminders: Reminder[] = reminders.map((reminder) => {
            if (reminder.id === selectedReminder.id) {
                const newHistory: HistoryItem[] = [
                    ...reminder.history,
                    {
                        id: `h${Date.now()}`,
                        date: new Date().toISOString().split("T")[0],
                        type: "payment",
                        message: "Payment received",
                        status: "completed",
                    },
                ]

                return {
                    ...reminder,
                    status: "paid",
                    history: newHistory,
                    daysOverdue: 0,
                }
            }
            return reminder
        })

        setReminders(updatedReminders)
        setShowPaymentDialog(false)
        toast("Payment recorded", {
            description: `Payment for invoice ${selectedReminder.invoiceNumber} has been recorded.`,
        })
    }

    // Handle drag and drop
    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result

        // If there's no destination or the item was dropped in the same place
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return
        }

        // Map droppableId to status
        const statusMap: Record<string, ReminderStatus> = {
            scheduled: "scheduled",
            sent: "sent",
            engaged: "engaged",
            escalated: "escalated",
            paid: "paid",
        }

        const newStatus = statusMap[destination.droppableId]

        // Update the reminder status
        const updatedReminders = reminders.map((reminder) => {
            if (reminder.id === draggableId) {
                // Add a history item based on the new status
                let historyMessage = ""
                let historyType: "email" | "phone" | "payment" | "message" = "message"

                switch (newStatus) {
                    case "scheduled":
                        historyMessage = "Reminder scheduled"
                        historyType = "message"
                        break
                    case "sent":
                        historyMessage = "Reminder sent"
                        historyType = "email"
                        break
                    case "engaged":
                        historyMessage = "Client engaged"
                        historyType = "message"
                        break
                    case "escalated":
                        historyMessage = "Escalated to final notice"
                        historyType = "email"
                        break
                    case "paid":
                        historyMessage = "Payment received"
                        historyType = "payment"
                        break
                }

                const newHistory: HistoryItem[] = [
                    ...reminder.history,
                    {
                        id: `h${Date.now()}`,
                        date: new Date().toISOString().split("T")[0],
                        type: historyType,
                        message: historyMessage,
                        status: newStatus === "paid" ? "completed" : "opened",
                    },
                ]

                return {
                    ...reminder,
                    status: newStatus,
                    lastReminderSent:
                        newStatus === "sent" || newStatus === "escalated"
                            ? new Date().toISOString().split("T")[0]
                            : reminder.lastReminderSent,
                    history: newHistory,
                    daysOverdue: newStatus === "paid" ? 0 : reminder.daysOverdue,
                }
            }
            return reminder
        })

        setReminders(updatedReminders)

        // Show toast notification
        const movedReminder = reminders.find((r) => r.id === draggableId)
        if (movedReminder) {
            toast("Reminder updated", {
                description: `${movedReminder.invoiceNumber} for ${movedReminder.client.name} moved to ${newStatus}.`,
            })
        }
    }

    // Get status icon and color
    const getStatusInfo = (status: ReminderStatus): { icon: JSX.Element; color: string; label: string } => {
        switch (status) {
            case "scheduled":
                return {
                    icon: <Rocket className="h-4 w-4" />,
                    color: "bg-blue-50 text-blue-700 border-blue-200",
                    label: "Scheduled",
                }
            case "sent":
                return {
                    icon: <Mail className="h-4 w-4" />,
                    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
                    label: "Sent",
                }
            case "engaged":
                return {
                    icon: <MessageSquare className="h-4 w-4" />,
                    color: "bg-green-50 text-green-700 border-green-200",
                    label: "Engaged",
                }
            case "escalated":
                return {
                    icon: <AlertTriangle className="h-4 w-4" />,
                    color: "bg-red-50 text-red-700 border-red-200",
                    label: "Escalated",
                }
            case "paid":
                return {
                    icon: <CheckCircle className="h-4 w-4" />,
                    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    label: "Paid",
                }
            default:
                return {
                    icon: <Clock className="h-4 w-4" />,
                    color: "bg-gray-50 text-gray-700 border-gray-200",
                    label: "Unknown",
                }
        }
    }

    // Get filtered reminders based on active tab
    const getFilteredReminders = (): Record<ReminderStatus, Reminder[]> => {
        const filtered = reminders.filter((reminder) => {
            if (activeTab === "all") return true
            return reminder.status === activeTab
        })

        // Group by status
        return {
            scheduled: filtered.filter((r) => r.status === "scheduled"),
            sent: filtered.filter((r) => r.status === "sent"),
            engaged: filtered.filter((r) => r.status === "engaged"),
            escalated: filtered.filter((r) => r.status === "escalated"),
            paid: filtered.filter((r) => r.status === "paid"),
        }
    }

    // Get suggested actions for reminders
    const getSuggestedActions = (): Reminder[] => {
        // Prioritize reminders that need action
        return reminders
            .filter((r) => r.status !== "paid")
            .sort((a, b) => {
                // Prioritize by days overdue and status
                const statusPriority: Record<ReminderStatus, number> = {
                    escalated: 4,
                    sent: 3,
                    scheduled: 2,
                    engaged: 1,
                    paid: 0,
                }

                if (a.daysOverdue !== b.daysOverdue) {
                    return b.daysOverdue - a.daysOverdue
                }

                return statusPriority[b.status] - statusPriority[a.status]
            })
            .slice(0, 5) // Get top 5 reminders that need action
    }

    // Toggle suggestion expansion
    const toggleSuggestion = (id: string) => {
        if (expandedSuggestion === id) {
            setExpandedSuggestion(null)
        } else {
            setExpandedSuggestion(id)
        }
    }

    // // Get filtered follow-ups based on active filter
    // const getFilteredFollowUps = () => {
    //     // if (!activeFilter) return followUps
    //     // switch (activeFilter) {
    //     //   case "overdue":
    //     //     return followUps.filter((followUp) => followUp.status === "overdue" || followUp.status === "final_notice")
    //     //   case "pending":
    //     //     return followUps.filter((followUp) => followUp.status === "pending")
    //     //   case "responded":
    //     //     return followUps.filter((followUp) => followUp.status === "responded")
    //     //   case "collection":
    //     //     return followUps.filter((followUp) => followUp.status !== "paid")
    //     //   default:
    //     //     return followUps
    //     // }
    // }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Follow-Ups & Reminders</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Button>
                            <Send className="mr-2 h-4 w-4" />
                            Bulk Reminders
                        </Button>
                    </div>
                </div>

                {/* Overdue Invoices Summary */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Overdue Amount */}
                    <Card className="border-l-4 border-l-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Overdue Amount</CardTitle>
                            <DollarSign className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(summaryMetrics.totalOverdueAmount)}</div>
                            <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center gap-1">
                  +8.1%
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2 bg-red-100" value={65} />
                        </CardContent>
                    </Card>

                    {/* Pending Reminders */}
                    <Card className="border-l-4 border-l-yellow-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Reminders</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summaryMetrics.pendingReminders}</div>
                            <p className="text-xs text-muted-foreground">
                <span className="text-yellow-500 flex items-center gap-1">
                  +3.2%
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                                from last week
                            </p>
                            <Progress className="h-2 mt-2 bg-yellow-100" value={40} />
                        </CardContent>
                    </Card>

                    {/* Escalated Cases */}
                    <Card className="border-l-4 border-l-orange-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Escalated Cases</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summaryMetrics.escalatedCases}</div>
                            <p className="text-xs text-muted-foreground">
                <span className="text-orange-500 flex items-center gap-1">
                  +1.5%
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2 bg-orange-100" value={25} />
                        </CardContent>
                    </Card>

                    {/* Collected from Reminders */}
                    <Card className="border-l-4 border-l-emerald-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Collected from Reminders</CardTitle>
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(summaryMetrics.collectedFromReminders)}</div>
                            <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center gap-1">
                  +12.5%
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                                from last month
                            </p>
                            <Progress className="h-2 mt-2 bg-emerald-100" value={45} />
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs for filtering */}
                <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
                    <TabsList className="hidden">
                        <TabsTrigger value="all">All Reminders</TabsTrigger>
                        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                        <TabsTrigger value="sent">Sent</TabsTrigger>
                        <TabsTrigger value="engaged">Engaged</TabsTrigger>
                        <TabsTrigger value="escalated">Escalated</TabsTrigger>
                        <TabsTrigger value="paid">Paid</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <div className="space-y-4">
                            {/* Kanban Board */}
                            <div className="l">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Reminder Progress</CardTitle>
                                        <CardDescription>
                                            Drag and drop reminders to update their status or use the action buttons
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <DragDropContext onDragEnd={handleDragEnd}>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4">
                                                {/* Scheduled Column */}
                                                <Droppable droppableId="scheduled">
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className="bg-blue-50 rounded-lg p-3 min-h-[400px]"
                                                        >
                                                            <div className="flex items-center mb-3 text-blue-700 font-medium">
                                                                <Rocket className="h-4 w-4 mr-2" />
                                                                <span>Scheduled</span>
                                                                <Badge variant="outline" className="ml-2 bg-white">
                                                                    {getFilteredReminders().scheduled.length}
                                                                </Badge>
                                                            </div>

                                                            {getFilteredReminders().scheduled.map((reminder, index) => (
                                                                <Draggable key={reminder.id} draggableId={reminder.id} index={index}>
                                                                    {(provided) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-blue-200"
                                                                        >
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <div className="font-medium">{reminder.invoiceNumber}</div>
                                                                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                                                                    {formatCurrency(reminder.amount)}
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="flex items-center mb-2">
                                                                                <Avatar className="h-6 w-6 mr-2">
                                                                                    <AvatarFallback>
                                                                                        {reminder.client.name.substring(0, 2).toUpperCase()}
                                                                                    </AvatarFallback>
                                                                                </Avatar>
                                                                                <span className="text-sm">{reminder.client.name}</span>
                                                                            </div>
                                                                            <div className="text-xs text-muted-foreground mb-2">
                                                                                Due: {formatDate(reminder.dueDate)}
                                                                                {reminder.daysOverdue > 0 && (
                                                                                    <span className="text-red-500 ml-2">
                                            ({reminder.daysOverdue} days overdue)
                                          </span>
                                                                                )}
                                                                            </div>
                                                                            <div className="flex justify-between mt-2">
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleSendReminder(reminder)}
                                                                                    className="h-8 px-2"
                                                                                >
                                                                                    <Send className="h-3.5 w-3.5 mr-1" />
                                                                                    <span className="text-xs">Send</span>
                                                                                </Button>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleViewReminder(reminder)}
                                                                                    className="h-8 px-2"
                                                                                >
                                                                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                                                                    <span className="text-xs">View</span>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>

                                                {/* Sent Column */}
                                                <Droppable droppableId="sent">
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className="bg-yellow-50 rounded-lg p-3 min-h-[400px]"
                                                        >
                                                            <div className="flex items-center mb-3 text-yellow-700 font-medium">
                                                                <Mail className="h-4 w-4 mr-2" />
                                                                <span>Sent</span>
                                                                <Badge variant="outline" className="ml-2 bg-white">
                                                                    {getFilteredReminders().sent.length}
                                                                </Badge>
                                                            </div>

                                                            {getFilteredReminders().sent.map((reminder, index) => (
                                                                <Draggable key={reminder.id} draggableId={reminder.id} index={index}>
                                                                    {(provided) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-yellow-200"
                                                                        >
                                                                            <div className="justify-between items-start mb-2">
                                                                                <div className="font-medium">{reminder.invoiceNumber}</div>
                                                                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                                                                    {formatCurrency(reminder.amount)}
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="flex items-center mb-2">
                                                                                <Avatar className="h-6 w-6 mr-2">
                                                                                    <AvatarFallback>
                                                                                        {reminder.client.name.substring(0, 2).toUpperCase()}
                                                                                    </AvatarFallback>
                                                                                </Avatar>
                                                                                <span className="text-sm">{reminder.client.name}</span>
                                                                            </div>
                                                                            <div className="text-xs text-muted-foreground mb-2">
                                                                                Sent: {getDaysAgo(reminder.lastReminderSent)}
                                                                                {reminder.daysOverdue > 0 && (
                                                                                    <span className="text-red-500 ml-2">
                                            ({reminder.daysOverdue} days overdue)
                                          </span>
                                                                                )}
                                                                            </div>
                                                                            <div className="flex justify-between mt-2">
                                                                                <DropdownMenu>
                                                                                    <DropdownMenuTrigger asChild>
                                                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                                                            <MoreHorizontal className="h-3.5 w-3.5 mr-1" />
                                                                                            <span className="text-xs">Actions</span>
                                                                                        </Button>
                                                                                    </DropdownMenuTrigger>
                                                                                    <DropdownMenuContent align="start">
                                                                                        <DropdownMenuItem onClick={() => handleSendReminder(reminder)}>
                                                                                            <Send className="h-4 w-4 mr-2" />
                                                                                            Send Another Reminder
                                                                                        </DropdownMenuItem>
                                                                                        <DropdownMenuItem onClick={() => handleEscalate(reminder)}>
                                                                                            <AlertTriangle className="h-4 w-4 mr-2" />
                                                                                            Escalate
                                                                                        </DropdownMenuItem>
                                                                                        <DropdownMenuItem onClick={() => handleMarkAsPaid(reminder)}>
                                                                                            <CheckCheck className="h-4 w-4 mr-2" />
                                                                                            Mark as Paid
                                                                                        </DropdownMenuItem>
                                                                                    </DropdownMenuContent>
                                                                                </DropdownMenu>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleViewReminder(reminder)}
                                                                                    className="h-8 px-2"
                                                                                >
                                                                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                                                                    <span className="text-xs">View</span>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>

                                                {/* Engaged Column */}
                                                <Droppable droppableId="engaged">
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className="bg-green-50 rounded-lg p-3 min-h-[400px]"
                                                        >
                                                            <div className="flex items-center mb-3 text-green-700 font-medium">
                                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                                <span>Engaged</span>
                                                                <Badge variant="outline" className="ml-2 bg-white">
                                                                    {getFilteredReminders().engaged.length}
                                                                </Badge>
                                                            </div>

                                                            {getFilteredReminders().engaged.map((reminder, index) => (
                                                                <Draggable key={reminder.id} draggableId={reminder.id} index={index}>
                                                                    {(provided) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-green-200"
                                                                        >
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <div className="font-medium">{reminder.invoiceNumber}</div>
                                                                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                                                                    {formatCurrency(reminder.amount)}
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="flex items-center mb-2">
                                                                                <Avatar className="h-6 w-6 mr-2">
                                                                                    <AvatarFallback>
                                                                                        {reminder.client.name.substring(0, 2).toUpperCase()}
                                                                                    </AvatarFallback>
                                                                                </Avatar>
                                                                                <span className="text-sm">{reminder.client.name}</span>
                                                                            </div>
                                                                            <div className="text-xs text-muted-foreground mb-2">
                                                                                Last Contact: {getDaysAgo(reminder.lastReminderSent)}
                                                                            </div>
                                                                            <div className="flex justify-between mt-2">
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleNegotiatePayment(reminder)}
                                                                                    className="h-8 px-2"
                                                                                >
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="2"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        className="h-3.5 w-3.5 mr-1"
                                                                                    >
                                                                                        <path d="M15 21v-4a2 2 0 0 1 2-2h4" />
                                                                                        <path d="M7 4v2a3 3 0 0 0 3 2h0a3 3 0 0 1 3 3v1" />
                                                                                        <path d="m21 3-6 6" />
                                                                                        <path d="m3 21 6-6" />
                                                                                    </svg>
                                                                                    <span className="text-xs">Negotiate</span>
                                                                                </Button>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleViewReminder(reminder)}
                                                                                    className="h-8 px-2"
                                                                                >
                                                                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                                                                    <span className="text-xs">View</span>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>

                                                {/* Escalated Column */}
                                                <Droppable droppableId="escalated">
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className="bg-red-50 rounded-lg p-3 min-h-[400px]"
                                                        >
                                                            <div className="flex items-center mb-3 text-red-700 font-medium">
                                                                <AlertTriangle className="h-4 w-4 mr-2" />
                                                                <span>Escalated</span>
                                                                <Badge variant="outline" className="ml-2 bg-white">
                                                                    {getFilteredReminders().escalated.length}
                                                                </Badge>
                                                            </div>

                                                            {getFilteredReminders().escalated.map((reminder, index) => (
                                                                <Draggable key={reminder.id} draggableId={reminder.id} index={index}>
                                                                    {(provided) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-red-200"
                                                                        >
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <div className="font-medium">{reminder.invoiceNumber}</div>
                                                                                <Badge variant="outline" className="bg-red-50 text-red-700">
                                                                                    {formatCurrency(reminder.amount)}
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="flex items-center mb-2">
                                                                                <Avatar className="h-6 w-6 mr-2">
                                                                                    <AvatarFallback>
                                                                                        {reminder.client.name.substring(0, 2).toUpperCase()}
                                                                                    </AvatarFallback>
                                                                                </Avatar>
                                                                                <span className="text-sm">{reminder.client.name}</span>
                                                                            </div>
                                                                            <div className="text-xs text-muted-foreground mb-2">
                                                                                Final Notice: {getDaysAgo(reminder.lastReminderSent)}
                                                                                <span className="text-red-500 ml-2">({reminder.daysOverdue} days overdue)</span>
                                                                            </div>
                                                                            <div className="flex justify-between mt-2">
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleNegotiatePayment(reminder)}
                                                                                    className="h-8 px-2"
                                                                                >
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="2"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        className="h-3.5 w-3.5 mr-1"
                                                                                    >
                                                                                        <path d="M15 21v-4a2 2 0 0 1 2-2h4" />
                                                                                        <path d="M7 4v2a3 3 0 0 0 3 2h0a3 3 0 0 1 3 3v1" />
                                                                                        <path d="m21 3-6 6" />
                                                                                        <path d="m3 21 6-6" />
                                                                                    </svg>
                                                                                    <span className="text-xs">Negotiate</span>
                                                                                </Button>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleViewReminder(reminder)}
                                                                                    className="h-8 px-2"
                                                                                >
                                                                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                                                                    <span className="text-xs">View</span>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>

                                                {/* Paid Column */}
                                                <Droppable droppableId="paid">
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className="bg-emerald-50 rounded-lg p-3 min-h-[400px]"
                                                        >
                                                            <div className="flex items-center mb-3 text-emerald-700 font-medium">
                                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                                <span>Paid</span>
                                                                <Badge variant="outline" className="ml-2 bg-white">
                                                                    {getFilteredReminders().paid.length}
                                                                </Badge>
                                                            </div>

                                                            {getFilteredReminders().paid.map((reminder, index) => (
                                                                <Draggable key={reminder.id} draggableId={reminder.id} index={index}>
                                                                    {(provided) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-emerald-200"
                                                                        >
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <div className="font-medium">{reminder.invoiceNumber}</div>
                                                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                                                                                    {formatCurrency(reminder.amount)}
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="flex items-center mb-2">
                                                                                <Avatar className="h-6 w-6 mr-2">
                                                                                    <AvatarFallback>
                                                                                        {reminder.client.name.substring(0, 2).toUpperCase()}
                                                                                    </AvatarFallback>
                                                                                </Avatar>
                                                                                <span className="text-sm">{reminder.client.name}</span>
                                                                            </div>
                                                                            <div className="text-xs text-muted-foreground mb-2">
                                                                                Paid: {getDaysAgo(reminder.history[reminder.history.length - 1].date)}
                                                                            </div>
                                                                            <div className="flex justify-end mt-2">
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleViewReminder(reminder)}
                                                                                    className="h-8 px-2"
                                                                                >
                                                                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                                                                    <span className="text-xs">View</span>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </div>
                                        </DragDropContext>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Suggested AI Actions */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                                            Suggested Actions
                                        </CardTitle>
                                        <CardDescription>AI-powered recommendations for your follow-ups</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {getSuggestedActions().map((reminder) => (
                                            <Card key={reminder.id} className="border-l-4 border-l-amber-500">
                                                <CardHeader className="p-3 pb-0">
                                                    <div className="flex justify-between items-center">
                                                        <div className="font-medium flex items-center">
                                                            <span className="mr-2">{reminder.invoiceNumber}</span>
                                                            <Badge variant="outline" className={getStatusInfo(reminder.status).color}>
                                                                {getStatusInfo(reminder.status).icon}
                                                                <span className="ml-1">{getStatusInfo(reminder.status).label}</span>
                                                            </Badge>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => toggleSuggestion(reminder.id)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            {expandedSuggestion === reminder.id ? (
                                                                <ChevronUp className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                    <div className="text-sm mt-1">
                                                        <span className="font-medium">{reminder.client.name}</span>
                                                        <span className="text-muted-foreground ml-2">{formatCurrency(reminder.amount)}</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-3 pt-2">
                                                    <div className="text-sm text-amber-700 mb-2">{reminder.suggestedAction}</div>

                                                    {expandedSuggestion === reminder.id && (
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {reminder.status === "scheduled" && (
                                                                <Button size="sm" onClick={() => handleSendReminder(reminder)} className="h-8">
                                                                    <Send className="h-3.5 w-3.5 mr-1" />
                                                                    Send Reminder
                                                                </Button>
                                                            )}

                                                            {reminder.status === "sent" && (
                                                                <>
                                                                    <Button size="sm" onClick={() => handleSendReminder(reminder)} className="h-8">
                                                                        <Send className="h-3.5 w-3.5 mr-1" />
                                                                        Send Another
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() => handleEscalate(reminder)}
                                                                        className="h-8"
                                                                    >
                                                                        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                                                                        Escalate
                                                                    </Button>
                                                                </>
                                                            )}

                                                            {reminder.status === "engaged" && (
                                                                <Button size="sm" onClick={() => handleNegotiatePayment(reminder)} className="h-8">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="h-3.5 w-3.5 mr-1"
                                                                    >
                                                                        <path d="M15 21v-4a2 2 0 0 1 2-2h4" />
                                                                        <path d="M7 4v2a3 3 0 0 0 3 2h0a3 3 0 0 1 3 3v1" />
                                                                        <path d="m21 3-6 6" />
                                                                        <path d="m3 21 6-6" />
                                                                    </svg>
                                                                    Negotiate Payment
                                                                </Button>
                                                            )}

                                                            {reminder.status === "escalated" && (
                                                                <Button size="sm" onClick={() => handleNegotiatePayment(reminder)} className="h-8">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="h-3.5 w-3.5 mr-1"
                                                                    >
                                                                        <path d="M15 21v-4a2 2 0 0 1 2-2h4" />
                                                                        <path d="M7 4v2a3 3 0 0 0 3 2h0a3 3 0 0 1 3 3v1" />
                                                                        <path d="m21 3-6 6" />
                                                                        <path d="m3 21 6-6" />
                                                                    </svg>
                                                                    Offer Settlement
                                                                </Button>
                                                            )}

                                                            {reminder.status !== "paid" && (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleMarkAsPaid(reminder)}
                                                                    className="h-8"
                                                                >
                                                                    <CheckCheck className="h-3.5 w-3.5 mr-1" />
                                                                    Mark as Paid
                                                                </Button>
                                                            )}

                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleViewReminder(reminder)}
                                                                className="h-8"
                                                            >
                                                                <Eye className="h-3.5 w-3.5 mr-1" />
                                                                View Details
                                                            </Button>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* Client Engagement Heatmap */}
                                <Card className="mt-4">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                                            Client Engagement Heatmap
                                        </CardTitle>
                                        <CardDescription>Track when clients engage with your reminders</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <EngagementHeatmap />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Other tab contents would follow the same pattern */}
                    <TabsContent value="scheduled" className="space-y-4">
                        {/* Similar content but filtered for scheduled reminders */}
                    </TabsContent>

                    <TabsContent value="sent" className="space-y-4">
                        {/* Similar content but filtered for sent reminders */}
                    </TabsContent>

                    <TabsContent value="engaged" className="space-y-4">
                        {/* Similar content but filtered for engaged reminders */}
                    </TabsContent>

                    <TabsContent value="escalated" className="space-y-4">
                        {/* Similar content but filtered for escalated reminders */}
                    </TabsContent>

                    <TabsContent value="paid" className="space-y-4">
                        {/* Similar content but filtered for paid reminders */}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Reminder Details Sheet */}
            <Sheet open={showReminderDetails} onOpenChange={setShowReminderDetails}>
                <SheetContent className="min-w-[50%]">
                    <SheetHeader>
                        <SheetTitle>Reminder Details</SheetTitle>
                        <SheetDescription className="text-zinc-400">
                            View and manage reminder details for invoice {selectedReminder?.invoiceNumber}
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="p-4 h-full">
                        {selectedReminder && (
                            <div className="space-y-6">
                                {/* Invoice & Client Details */}
                                <div className=" space-y-4">
                                    <div className=" space-y-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarFallback>{selectedReminder.client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h2 className="text-2xl font-bold">{selectedReminder.invoiceNumber}</h2>
                                                <p className="text-black">{selectedReminder.client.name}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
                                                <p className="text-black">{selectedReminder.client.contactPerson}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                                <p className="text-black">{selectedReminder.client.email}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                                                <p className="text-black">{formatDate(selectedReminder.dueDate)}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                                                <p className="font-medium text-black">{formatCurrency(selectedReminder.amount)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-8"/>
                                    <div className="space-y-4">
                                        <div className="">
                                            <h3 className="font-medium mb-2">Status</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-black">Current Status:</span>
                                                    <Badge variant="outline" className={getStatusInfo(selectedReminder.status).color}>
                                                        {getStatusInfo(selectedReminder.status).icon}
                                                        <span className="ml-1">{getStatusInfo(selectedReminder.status).label}</span>
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-black">Last Reminder:</span>
                                                    <span className="font-medium">{getDaysAgo(selectedReminder.lastReminderSent)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-black">Days Overdue:</span>
                                                    <span
                                                        className={`font-medium ${selectedReminder.daysOverdue > 0 ? "text-red-500" : "text-green-500"}`}
                                                    >
                          {selectedReminder.daysOverdue > 0 ? `${selectedReminder.daysOverdue} days` : "None"}
                        </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {selectedReminder.status !== "paid" && selectedReminder.status !== "escalated" && (
                                                <Button onClick={() => handleSendReminder(selectedReminder)}>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Send Reminder
                                                </Button>
                                            )}

                                            {selectedReminder.status !== "paid" && (
                                                <Button variant="outline" onClick={() => handleNegotiatePayment(selectedReminder)}>
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
                                                        <path d="M15 21v-4a2 2 0 0 1 2-2h4" />
                                                        <path d="M7 4v2a3 3 0 0 0 3 2h0a3 3 0 0 1 3 3v1" />
                                                        <path d="m21 3-6 6" />
                                                        <path d="m3 21 6-6" />
                                                    </svg>
                                                    Negotiate Payment
                                                </Button>
                                            )}

                                            {(selectedReminder.status === "sent" || selectedReminder.status === "scheduled") && (
                                                <Button variant="outline" onClick={() => handleEscalate(selectedReminder)}>
                                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                                    Escalate to Final Notice
                                                </Button>
                                            )}

                                            {selectedReminder.status !== "paid" && (
                                                <Button variant="outline" onClick={() => handleMarkAsPaid(selectedReminder)}>
                                                    <CheckCheck className="mr-2 h-4 w-4" />
                                                    Mark as Paid
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Follow-Up History */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Reminder History</h3>
                                    <div className="space-y-4">
                                        {selectedReminder.history.map((historyItem) => (
                                            <div key={historyItem.id} className="flex items-start gap-4">
                                                <div className="rounded-full p-2 bg-gray-100">
                                                    {historyItem.type === "email" ? (
                                                        <Mail className="h-4 w-4 text-blue-500" />
                                                    ) : historyItem.type === "phone" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="h-4 w-4 text-green-500"
                                                        >
                                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                        </svg>
                                                    ) : historyItem.type === "payment" ? (
                                                        <DollarSign className="h-4 w-4 text-emerald-500" />
                                                    ) : (
                                                        <MessageSquare className="h-4 w-4 text-purple-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <p className="font-medium">{historyItem.message}</p>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                historyItem.status === "opened"
                                                                    ? "bg-blue-50 text-blue-700"
                                                                    : historyItem.status === "responded"
                                                                        ? "bg-green-50 text-green-700"
                                                                        : historyItem.status === "completed"
                                                                            ? "bg-emerald-50 text-emerald-700"
                                                                            : "bg-gray-50 text-gray-700"
                                                            }
                                                        >
                                                            {historyItem.status === "opened"
                                                                ? "Opened"
                                                                : historyItem.status === "responded"
                                                                    ? "Responded"
                                                                    : historyItem.status === "completed"
                                                                        ? "Completed"
                                                                        : historyItem.status === "not_opened"
                                                                            ? "Not Opened"
                                                                            : "No Response"}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-black">{formatDate(historyItem.date)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Client Engagement */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Client Engagement</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div
                                            className={`rounded-lg border p-4 ${selectedReminder.engagement.emailOpened ? "bg-blue-50 border-blue-200" : "bg-gray-50"}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">Email Opened</h4>
                                                {selectedReminder.engagement.emailOpened ? (
                                                    <CheckCircle className="h-5 w-5 text-blue-500" />
                                                ) : (
                                                    <X className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-sm text-black mt-2">
                                                {selectedReminder.engagement.emailOpened
                                                    ? "Client has opened the reminder emails"
                                                    : "Client has not opened any reminder emails"}
                                            </p>
                                        </div>

                                        <div
                                            className={`rounded-lg border p-4 ${selectedReminder.engagement.replied ? "bg-green-50 border-green-200" : "bg-gray-50"}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">Replied</h4>
                                                {selectedReminder.engagement.replied ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <X className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-sm text-black mt-2">
                                                {selectedReminder.engagement.replied
                                                    ? "Client has replied to reminders"
                                                    : "Client has not replied to any reminders"}
                                            </p>
                                        </div>

                                        <div
                                            className={`rounded-lg border p-4 ${selectedReminder.engagement.ignored ? "bg-red-50 border-red-200" : "bg-gray-50"}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">Ignored</h4>
                                                {selectedReminder.engagement.ignored ? (
                                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                                ) : (
                                                    <X className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-sm text-black mt-2">
                                                {selectedReminder.engagement.ignored
                                                    ? "Client has ignored multiple reminders"
                                                    : "Client has not ignored reminders"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* AI-Powered Suggested Next Action */}
                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BarChart className="h-5 w-5 text-blue-500" />
                                        <h3 className="font-medium text-blue-700">AI-Powered Suggested Next Action</h3>
                                    </div>
                                    <p className="text-sm text-blue-700">{selectedReminder.suggestedAction}</p>
                                </div>
                            </div>
                        )}
                    </ScrollArea>

                </SheetContent>
            </Sheet>

            {/* Send Reminder Dialog */}
            <Sheet open={showSendReminder} onOpenChange={setShowSendReminder}>
                <SheetContent className="min-w-[50%]">
                    <SheetHeader>
                        <SheetTitle>Send Reminder</SheetTitle>
                        <SheetDescription>
                            Send a reminder to {selectedReminder?.client.name} for invoice {selectedReminder?.invoiceNumber}
                        </SheetDescription>
                    </SheetHeader>

                    <ScrollArea className="h-full p-4">
                        {selectedReminder && (
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Reminder Channel</Label>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={reminderForm.channel === "email" ? "default" : "outline"}
                                            className="flex-1"
                                            onClick={() => setReminderForm({ ...reminderForm, channel: "email" })}
                                        >
                                            <Mail className="mr-2 h-4 w-4" />
                                            Email
                                        </Button>
                                        <Button
                                            variant={reminderForm.channel === "sms" ? "default" : "outline"}
                                            className="flex-1"
                                            onClick={() => setReminderForm({ ...reminderForm, channel: "sms" })}
                                        >
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            SMS
                                        </Button>
                                        <Button
                                            variant={reminderForm.channel === "whatsapp" ? "default" : "outline"}
                                            className="flex-1"
                                            onClick={() => setReminderForm({ ...reminderForm, channel: "whatsapp" })}
                                        >
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            WhatsApp
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="template">Template</Label>
                                    <Select
                                        value={reminderForm.template}
                                        onValueChange={(value) => setReminderForm({ ...reminderForm, template: value })}
                                    >
                                        <SelectTrigger id="template">
                                            <SelectValue placeholder="Select a template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">Standard Reminder</SelectItem>
                                            <SelectItem value="friendly">Friendly Reminder</SelectItem>
                                            <SelectItem value="urgent">Urgent Reminder</SelectItem>
                                            <SelectItem value="custom">Custom Message</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        value={reminderForm.message}
                                        onChange={(e) => setReminderForm({ ...reminderForm, message: e.target.value })}
                                        rows={10}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Available variables: <span className="font-semibold">
                                        {"{{client}}, {{invoice_number}}, {{amount}}, {{due_date}}"}
                                    </span>
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Schedule</Label>
                                    <RadioGroup defaultValue="now">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="now" id="now" />
                                            <Label htmlFor="now">Send now</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="later" id="later" />
                                            <Label htmlFor="later">Schedule for later</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        )}
                    </ScrollArea>



                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSendReminder(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSendReminderSubmit}>Send Reminder</Button>
                    </DialogFooter>
                </SheetContent>
            </Sheet>

            {/* Escalate Dialog */}
            <Dialog open={showEscalateDialog} onOpenChange={setShowEscalateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Escalate to Final Notice</DialogTitle>
                        <DialogDescription>
                            Send a final notice to {selectedReminder?.client.name} for invoice {selectedReminder?.invoiceNumber}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedReminder && (
                        <div className="space-y-4 py-4">
                            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                    <p className="text-sm text-red-700">
                                        This will send a final notice to the client. This is typically the last step before legal action or
                                        collections.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="escalation-message">Additional Notes</Label>
                                <Textarea
                                    id="escalation-message"
                                    placeholder="Add any specific details or context for this escalation..."
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Include in Final Notice</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="late-fees" defaultChecked />
                                        <Label htmlFor="late-fees">Late fees information</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="legal-action" defaultChecked />
                                        <Label htmlFor="legal-action">Potential legal action warning</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="payment-options" defaultChecked />
                                        <Label htmlFor="payment-options">Payment options</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEscalateDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleEscalateSubmit}>
                            Send Final Notice
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Negotiate Payment Dialog */}
            <Dialog open={showNegotiateDialog} onOpenChange={setShowNegotiateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Negotiate Payment</DialogTitle>
                        <DialogDescription>
                            Offer payment options to {selectedReminder?.client.name} for invoice {selectedReminder?.invoiceNumber}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedReminder && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Payment Option</Label>
                                <RadioGroup defaultValue="plan">
                                    <div className="flex items-start space-x-2">
                                        <RadioGroupItem value="plan" id="plan" className="mt-1" />
                                        <div>
                                            <Label htmlFor="plan" className="font-medium">
                                                Payment Plan
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Offer to split the payment into multiple installments
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <RadioGroupItem value="discount" id="discount" className="mt-1" />
                                        <div>
                                            <Label htmlFor="discount" className="font-medium">
                                                Discount for Immediate Payment
                                            </Label>
                                            <p className="text-sm text-muted-foreground">Offer a discount if payment is made immediately</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <RadioGroupItem value="extension" id="extension" className="mt-1" />
                                        <div>
                                            <Label htmlFor="extension" className="font-medium">
                                                Payment Extension
                                            </Label>
                                            <p className="text-sm text-muted-foreground">Extend the payment deadline without penalties</p>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="negotiation-message">Message</Label>
                                <Textarea
                                    id="negotiation-message"
                                    defaultValue={`Dear ${selectedReminder.client.contactPerson},

We understand that cash flow can sometimes be challenging. To help with the payment of invoice ${selectedReminder.invoiceNumber} for ${formatCurrency(selectedReminder.amount)}, we'd like to offer you some flexible payment options.

Please let us know which option works best for you, and we can proceed accordingly.

Thank you for your business!

Best regards,
Unicollector Inc.`}
                                    rows={8}
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNegotiateDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleNegotiateSubmit}>Send Offer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Payment Dialog */}
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Record Payment</DialogTitle>
                        <DialogDescription>Record payment for invoice {selectedReminder?.invoiceNumber}</DialogDescription>
                    </DialogHeader>

                    {selectedReminder && (
                        <div className="space-y-4 py-4">
                            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                                    <p className="text-sm text-emerald-700">
                                        This will mark the invoice as paid and move it to the completed status.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="payment-amount">Payment Amount</Label>
                                    <Input id="payment-amount" type="text" defaultValue={formatCurrency(selectedReminder.amount)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="payment-date">Payment Date</Label>
                                    <Input id="payment-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="payment-method">Payment Method</Label>
                                <Select defaultValue="bank_transfer">
                                    <SelectTrigger id="payment-method">
                                        <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="credit_card">Credit Card</SelectItem>
                                        <SelectItem value="paypal">PayPal</SelectItem>
                                        <SelectItem value="check">Check</SelectItem>
                                        <SelectItem value="cash">Cash</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="payment-notes">Notes</Label>
                                <Textarea id="payment-notes" placeholder="Add any notes about this payment..." rows={3} />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handlePaymentSubmit}>Record Payment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

