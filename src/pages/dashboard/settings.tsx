
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import {
    AlertCircle,
    Bell,
    Check,
    CreditCard,
    Download,
    Edit,
    FileText,
    Mail,
    MessageSquare,
    Plus,
    Save,
    Shield,
    Trash,
    Users,
    X,
} from "lucide-react"
import {useNavigate} from "react-router";
import { toast } from "sonner"




// Mock data for team members

type Member = {
    id: string,
    name: string,
    email: string,
    role: string,
    avatar: string
}

const teamMembers: Member[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", avatar: "/placeholder.svg?height=40&width=40" },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Finance",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Viewer",
        avatar: "/placeholder.svg?height=40&width=40",
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

// Invoice number format options
const invoiceNumberFormats = [
    { id: "standard", name: "Standard", example: "INV-001", description: "Simple sequential numbering" },
    { id: "date", name: "Date-based", example: "INV-20240501-001", description: "Includes date in format" },
    { id: "custom", name: "Custom", example: "CUSTOM-001", description: "Define your own prefix" },
]

export default function SettingsPage() {
    const navigate = useNavigate();

    // General settings state
    const [generalSettings, setGeneralSettings] = useState({
        businessName: "Virelle Inc.",
        businessLogo: "/placeholder.svg?height=100&width=100",
        defaultCurrency: "USD",
        invoiceNumberFormat: "date",
        customPrefix: "INV",
    })

    // Reminder settings state
    const [reminderSettings, setReminderSettings] = useState({
        beforeDueDate: 3, // days
        onDueDate: true,
        afterDueDate: [1, 7, 14], // days after
        channels: {
            email: true,
            sms: false,
            whatsapp: false,
        },
        escalationDays: 30, // days after due date for final notice
        templates: {
            friendly:
                "Dear {{client}},\n\nThis is a friendly reminder that invoice {{invoice_number}} for {{amount}} is due on {{due_date}}.\n\nThank you for your business!\n\nBest regards,\n{{business_name}}",
            due: "Dear {{client}},\n\nThis is to remind you that invoice {{invoice_number}} for {{amount}} is due today.\n\nPlease process the payment at your earliest convenience.\n\nBest regards,\n{{business_name}}",
            overdue:
                "Dear {{client}},\n\nThis is to inform you that invoice {{invoice_number}} for {{amount}} is now overdue. The payment was due on {{due_date}}.\n\nPlease process the payment as soon as possible.\n\nBest regards,\n{{business_name}}",
            final:
                "Dear {{client}},\n\nThis is a final notice regarding invoice {{invoice_number}} for {{amount}} which was due on {{due_date}} and is now significantly overdue.\n\nPlease process the payment immediately to avoid further action.\n\nBest regards,\n{{business_name}}",
        },
        activeTemplate: "friendly",
    })

    // Payment settings state
    const [paymentSettings, setPaymentSettings] = useState({
        integrations: {
            stripe: false,
            paypal: false,
        },
        bankDetails: {
            accountName: "Virelle Inc.",
            accountNumber: "1234567890",
            routingNumber: "987654321",
            bankName: "First National Bank",
            swiftCode: "FNBUS12345",
        },
        autoUpdateStatus: true,
    })

    // Team management state
    const [teamManagement, setTeamManagement] = useState<{
        members: Member[],
        newMember: {
            email: string,
            role: string
        },
        showInviteDialog: boolean,
        showRemoveDialog: boolean,
        memberToRemove: null | Member,
    }>({
        members: teamMembers,
        newMember: {
            email: "",
            role: "Viewer",
        },
        showInviteDialog: false,
        showRemoveDialog: false,
        memberToRemove: null,
    })

    // Security settings state
    const [securitySettings, setSecuritySettings] = useState({
        email: "admin@virelle.com",
        newEmail: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactorEnabled: false,
        showDeleteDialog: false,
        deleteConfirmation: "",
    })

    // Handle logo upload
    const handleLogoUpload = (file: File | undefined) => {
        if (file) {
            const url = URL.createObjectURL(file)
            setGeneralSettings((prev) => ({ ...prev, businessLogo: url }))
            toast("Logo uploaded", {
                description: "Your business logo has been updated successfully.",
            })
        }
    }

    // Handle saving general settings
    const handleSaveGeneralSettings = () => {
        // In a real app, this would save to a database
        toast("Settings saved", {
            description: "Your general settings have been updated successfully.",
        })
    }

    // Handle saving reminder settings
    const handleSaveReminderSettings = () => {
        // In a real app, this would save to a database
        toast("Reminder settings saved", {
            description: "Your reminder settings have been updated successfully.",
        })
    }

    // Handle saving payment settings
    const handleSavePaymentSettings = () => {
        // In a real app, this would save to a database
        toast("Payment settings saved", {
            description: "Your payment settings have been updated successfully.",
        })
    }

    // Handle inviting a team member
    const handleInviteTeamMember = () => {
        // In a real app, this would send an invitation email

        const id = teamManagement.members.length + 1;

        const newMember: Member = {
            id: id.toString(),
            name: "New Member",
            email: teamManagement.newMember.email,
            role: teamManagement.newMember.role,
            avatar: "/placeholder.svg?height=40&width=40",
        }

        setTeamManagement((prev) => ({
            ...prev,
            members: [...prev.members, newMember],
            newMember: { email: "", role: "Viewer" },
            showInviteDialog: false,
        }))

        toast("Invitation sent", {
            description: `An invitation has been sent to ${teamManagement.newMember.email}.`,
        })
    }

    // Handle removing a team member
    const handleRemoveTeamMember = () => {
        if (!teamManagement.memberToRemove) return

        setTeamManagement((prev) => ({
            ...prev,
            members: prev.members.filter((member) => member.id !== prev.memberToRemove?.id),
            memberToRemove: null,
            showRemoveDialog: false,
        }))

        toast("Team member removed", {
            description: `${teamManagement.memberToRemove.name} has been removed from your team.`,
        })
    }

    // Handle changing email
    const handleChangeEmail = () => {
        // In a real app, this would verify the current password and update the email
        setSecuritySettings((prev) => ({
            ...prev,
            email: prev.newEmail,
            newEmail: "",
            currentPassword: "",
        }))

        toast("Email updated", {
            description: "Your email address has been updated successfully.",
        })
    }

    // Handle changing password
    const handleChangePassword = () => {
        // In a real app, this would verify the current password and update the password
        setSecuritySettings((prev) => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }))

        toast("Password updated", {
            description: "Your password has been updated successfully.",
        })
    }

    // Handle enabling/disabling 2FA
    const handleToggle2FA = () => {
        setSecuritySettings((prev) => ({
            ...prev,
            twoFactorEnabled: !prev.twoFactorEnabled,
        }))

        toast(securitySettings.twoFactorEnabled ? "2FA disabled" : "2FA enabled", {
            description: securitySettings.twoFactorEnabled
                ? "Two-factor authentication has been disabled."
                : "Two-factor authentication has been enabled for your account.",
        })
    }

    // Handle deleting account
    const handleDeleteAccount = () => {
        if (securitySettings.deleteConfirmation !== "DELETE") {
            toast("Error", {
                description: "Please type DELETE to confirm account deletion.",
            })
            return
        }

        // In a real app, this would delete the account
        toast("Account deleted", {
            description: "Your account has been deleted. You will be redirected to the login page.",
        })

        // Redirect to login page after a short delay
        setTimeout(() => {
            navigate("/auth/login")
        }, 2000)
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                </div>

                <Tabs defaultValue="general" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="general" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">General</span>
                        </TabsTrigger>
                        <TabsTrigger value="reminders" className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            <span className="hidden sm:inline">Reminders</span>
                        </TabsTrigger>
                        <TabsTrigger value="payments" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="hidden sm:inline">Payments</span>
                        </TabsTrigger>
                        <TabsTrigger value="team" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="hidden sm:inline">Team</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Security</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* General Settings Tab */}
                    <TabsContent value="general" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Business Information</CardTitle>
                                <CardDescription>Update your business details that will appear on your invoices</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="business-name">Business Name</Label>
                                    <Input
                                        id="business-name"
                                        value={generalSettings.businessName}
                                        onChange={(e) => setGeneralSettings((prev) => ({ ...prev, businessName: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="business-logo">Business Logo</Label>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-20 w-20 rounded-md">
                                            <AvatarImage src={generalSettings.businessLogo} alt="Business Logo" />
                                            <AvatarFallback className="rounded-md">LOGO</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col gap-2">
                                            <Input id="business-logo" type="file" accept="image/*" onChange={(event) => handleLogoUpload(event.target.files ? event.target.files[0]: undefined )} />
                                            <p className="text-xs text-muted-foreground">Recommended size: 200x200px. Max file size: 2MB.</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Preferences</CardTitle>
                                <CardDescription>Set your default invoice settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="default-currency">Default Currency</Label>
                                    <Select
                                        value={generalSettings.defaultCurrency}
                                        onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, defaultCurrency: value }))}
                                    >
                                        <SelectTrigger id="default-currency">
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

                                <div className="space-y-2">
                                    <Label>Invoice Number Format</Label>
                                    <RadioGroup
                                        value={generalSettings.invoiceNumberFormat}
                                        onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, invoiceNumberFormat: value }))}
                                        className="space-y-3"
                                    >
                                        {invoiceNumberFormats.map((format) => (
                                            <div key={format.id} className="flex items-start space-x-2">
                                                <RadioGroupItem value={format.id} id={`format-${format.id}`} className="mt-1" />
                                                <div className="grid gap-1.5 leading-none">
                                                    <Label htmlFor={`format-${format.id}`} className="font-medium">
                                                        {format.name} <span className="text-muted-foreground">({format.example})</span>
                                                    </Label>
                                                    <p className="text-sm text-muted-foreground">{format.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                {generalSettings.invoiceNumberFormat === "custom" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="custom-prefix">Custom Prefix</Label>
                                        <Input
                                            id="custom-prefix"
                                            value={generalSettings.customPrefix}
                                            onChange={(e) => setGeneralSettings((prev) => ({ ...prev, customPrefix: e.target.value }))}
                                            placeholder="e.g., INV, INVOICE, etc."
                                        />
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSaveGeneralSettings}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Reminders Tab */}
                    <TabsContent value="reminders" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Reminder Schedule</CardTitle>
                                <CardDescription>Configure when to send automatic reminders to clients</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Before Due Date</Label>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            value={[reminderSettings.beforeDueDate]}
                                            min={0}
                                            max={14}
                                            step={1}
                                            onValueChange={(value) => setReminderSettings((prev) => ({ ...prev, beforeDueDate: value[0] }))}
                                            className="w-[200px]"
                                        />
                                        <span className="w-16 text-center">{reminderSettings.beforeDueDate} days</span>
                                        <p className="text-sm text-muted-foreground">
                                            Send a reminder {reminderSettings.beforeDueDate} days before the due date
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="on-due-date"
                                        checked={reminderSettings.onDueDate}
                                        onCheckedChange={(checked) => setReminderSettings((prev) => ({ ...prev, onDueDate: checked }))}
                                    />
                                    <Label htmlFor="on-due-date">Send a reminder on the due date</Label>
                                </div>

                                <div className="space-y-2">
                                    <Label>After Due Date (Overdue Reminders)</Label>
                                    <div className="space-y-4">
                                        {reminderSettings.afterDueDate.map((days, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <Slider
                                                    value={[days]}
                                                    min={1}
                                                    max={60}
                                                    step={1}
                                                    onValueChange={(value) => {
                                                        const newAfterDueDates = [...reminderSettings.afterDueDate]
                                                        newAfterDueDates[index] = value[0]
                                                        setReminderSettings((prev) => ({ ...prev, afterDueDate: newAfterDueDates }))
                                                    }}
                                                    className="w-[200px]"
                                                />
                                                <span className="w-16 text-center">{days} days</span>
                                                <p className="text-sm text-muted-foreground">Send a reminder {days} days after the due date</p>
                                                {reminderSettings.afterDueDate.length > 1 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            const newAfterDueDates = reminderSettings.afterDueDate.filter((_, i) => i !== index)
                                                            setReminderSettings((prev) => ({ ...prev, afterDueDate: newAfterDueDates }))
                                                        }}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}

                                        {reminderSettings.afterDueDate.length < 5 && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    const lastValue = reminderSettings.afterDueDate[reminderSettings.afterDueDate.length - 1]
                                                    const newValue = lastValue + 7 > 60 ? 60 : lastValue + 7
                                                    setReminderSettings((prev) => ({
                                                        ...prev,
                                                        afterDueDate: [...prev.afterDueDate, newValue],
                                                    }))
                                                }}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Another Reminder
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Final Notice (Escalation)</Label>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            value={[reminderSettings.escalationDays]}
                                            min={15}
                                            max={90}
                                            step={1}
                                            onValueChange={(value) => setReminderSettings((prev) => ({ ...prev, escalationDays: value[0] }))}
                                            className="w-[200px]"
                                        />
                                        <span className="w-16 text-center">{reminderSettings.escalationDays} days</span>
                                        <p className="text-sm text-muted-foreground">
                                            Send a final notice {reminderSettings.escalationDays} days after the due date
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Reminder Channels</CardTitle>
                                <CardDescription>Select which channels to use for sending reminders</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="email-channel"
                                        checked={reminderSettings.channels.email}
                                        onCheckedChange={(checked) =>
                                            setReminderSettings((prev) => ({
                                                ...prev,
                                                channels: { ...prev.channels, email: checked },
                                            }))
                                        }
                                    />
                                    <Label htmlFor="email-channel" className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="sms-channel"
                                        checked={reminderSettings.channels.sms}
                                        onCheckedChange={(checked) =>
                                            setReminderSettings((prev) => ({
                                                ...prev,
                                                channels: { ...prev.channels, sms: checked },
                                            }))
                                        }
                                    />
                                    <Label htmlFor="sms-channel" className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        SMS
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="whatsapp-channel"
                                        checked={reminderSettings.channels.whatsapp}
                                        onCheckedChange={(checked) =>
                                            setReminderSettings((prev) => ({
                                                ...prev,
                                                channels: { ...prev.channels, whatsapp: checked },
                                            }))
                                        }
                                    />
                                    <Label htmlFor="whatsapp-channel" className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        WhatsApp
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Reminder Templates</CardTitle>
                                <CardDescription>Customize the message templates for different reminder types</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Tabs
                                    value={reminderSettings.activeTemplate}
                                    onValueChange={(value) => setReminderSettings((prev) => ({ ...prev, activeTemplate: value }))}
                                >
                                    <TabsList className="grid w-full grid-cols-4">
                                        <TabsTrigger value="friendly">Friendly Reminder</TabsTrigger>
                                        <TabsTrigger value="due">Due Today</TabsTrigger>
                                        <TabsTrigger value="overdue">Overdue</TabsTrigger>
                                        <TabsTrigger value="final">Final Notice</TabsTrigger>
                                    </TabsList>

                                    {Object.entries(reminderSettings.templates).map(([key, template]) => (
                                        <TabsContent key={key} value={key} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`template-${key}`}>Template Content</Label>
                                                <Textarea
                                                    id={`template-${key}`}
                                                    value={template}
                                                    onChange={(e) =>
                                                        setReminderSettings((prev) => ({
                                                            ...prev,
                                                            templates: { ...prev.templates, [key]: e.target.value },
                                                        }))
                                                    }
                                                    rows={10}
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                    Available variables:{" "}
                                                    {"{{client}}, {{invoice_number}}, {{amount}}, {{due_date}}, {{business_name}}"}
                                                </p>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSaveReminderSettings}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Payments Tab */}
                    <TabsContent value="payments" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Integrations</CardTitle>
                                <CardDescription>Connect payment processors to accept online payments</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M2 10H22"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M12 14H18"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M2 6H22V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M6 14H8"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Stripe</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Accept credit card payments directly on your invoices
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={paymentSettings.integrations.stripe ? "default" : "outline"}>
                                                {paymentSettings.integrations.stripe ? "Connected" : "Not Connected"}
                                            </Badge>
                                            <Switch
                                                checked={paymentSettings.integrations.stripe}
                                                onCheckedChange={(checked) =>
                                                    setPaymentSettings((prev) => ({
                                                        ...prev,
                                                        integrations: { ...prev.integrations, stripe: checked },
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>

                                    {paymentSettings.integrations.stripe && (
                                        <div className="mt-4 pl-14">
                                            <p className="text-sm">
                                                Connected as: <span className="font-medium">account_123456</span>
                                            </p>
                                            <Button variant="outline" size="sm" className="mt-2">
                                                <Edit className="mr-2 h-3 w-3" />
                                                Configure Stripe Settings
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-md border p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M19.0001 7C18.5001 7 17.0001 7.3 17.0001 9C17.0001 10.7 18.5001 11 19.0001 11C19.5001 11 21.0001 10.7 21.0001 9C21.0001 7.3 19.5001 7 19.0001 7Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M5 7C4.5 7 3 7.3 3 9C3 10.7 4.5 11 5 11C5.5 11 7 10.7 7 9C7 7.3 5.5 7 5 7Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M12.0001 3C11.5001 3 10.0001 3.3 10.0001 5C10.0001 6.7 11.5001 7 12.0001 7C12.5001 7 14.0001 6.7 14.0001 5C14.0001 3.3 12.5001 3 12.0001 3Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M12.0001 17C11.5001 17 10.0001 17.3 10.0001 19C10.0001 20.7 11.5001 21 12.0001 21C12.5001 21 14.0001 20.7 14.0001 19C14.0001 17.3 12.5001 17 12.0001 17Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M5 11C5 12.7 5.5 14 7 14H17C18.5 14 19 12.7 19 11"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M12 7V17"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">PayPal</h3>
                                                <p className="text-sm text-muted-foreground">Accept payments via PayPal on your invoices</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={paymentSettings.integrations.paypal ? "default" : "outline"}>
                                                {paymentSettings.integrations.paypal ? "Connected" : "Not Connected"}
                                            </Badge>
                                            <Switch
                                                checked={paymentSettings.integrations.paypal}
                                                onCheckedChange={(checked) =>
                                                    setPaymentSettings((prev) => ({
                                                        ...prev,
                                                        integrations: { ...prev.integrations, paypal: checked },
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>

                                    {paymentSettings.integrations.paypal && (
                                        <div className="mt-4 pl-14">
                                            <p className="text-sm">
                                                Connected as: <span className="font-medium">business@example.com</span>
                                            </p>
                                            <Button variant="outline" size="sm" className="mt-2">
                                                <Edit className="mr-2 h-3 w-3" />
                                                Configure PayPal Settings
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="auto-update"
                                        checked={paymentSettings.autoUpdateStatus}
                                        onCheckedChange={(checked) =>
                                            setPaymentSettings((prev) => ({
                                                ...prev,
                                                autoUpdateStatus: checked,
                                            }))
                                        }
                                    />
                                    <Label htmlFor="auto-update">Automatically mark invoices as paid when payment is received</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Bank Transfer Details</CardTitle>
                                <CardDescription>
                                    Set up your bank details for clients who prefer to pay via bank transfer
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="account-name">Account Name</Label>
                                        <Input
                                            id="account-name"
                                            value={paymentSettings.bankDetails.accountName}
                                            onChange={(e) =>
                                                setPaymentSettings((prev) => ({
                                                    ...prev,
                                                    bankDetails: { ...prev.bankDetails, accountName: e.target.value },
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bank-name">Bank Name</Label>
                                        <Input
                                            id="bank-name"
                                            value={paymentSettings.bankDetails.bankName}
                                            onChange={(e) =>
                                                setPaymentSettings((prev) => ({
                                                    ...prev,
                                                    bankDetails: { ...prev.bankDetails, bankName: e.target.value },
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="account-number">Account Number</Label>
                                        <Input
                                            id="account-number"
                                            value={paymentSettings.bankDetails.accountNumber}
                                            onChange={(e) =>
                                                setPaymentSettings((prev) => ({
                                                    ...prev,
                                                    bankDetails: { ...prev.bankDetails, accountNumber: e.target.value },
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="routing-number">Routing Number</Label>
                                        <Input
                                            id="routing-number"
                                            value={paymentSettings.bankDetails.routingNumber}
                                            onChange={(e) =>
                                                setPaymentSettings((prev) => ({
                                                    ...prev,
                                                    bankDetails: { ...prev.bankDetails, routingNumber: e.target.value },
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="swift-code">SWIFT/BIC Code</Label>
                                        <Input
                                            id="swift-code"
                                            value={paymentSettings.bankDetails.swiftCode}
                                            onChange={(e) =>
                                                setPaymentSettings((prev) => ({
                                                    ...prev,
                                                    bankDetails: { ...prev.bankDetails, swiftCode: e.target.value },
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSavePaymentSettings}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Team Management Tab */}
                    <TabsContent value="team" className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>Manage your team members and their access levels</CardDescription>
                                </div>
                                <Button onClick={() => setTeamManagement((prev) => ({ ...prev, showInviteDialog: true }))}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Invite Member
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {teamManagement.members.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={member.avatar} alt={member.name} />
                                                            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                        <span>{member.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{member.email}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            member.role === "Admin" ? "default" : member.role === "Finance" ? "secondary" : "outline"
                                                        }
                                                    >
                                                        {member.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                setTeamManagement((prev) => ({
                                                                    ...prev,
                                                                    showRemoveDialog: true,
                                                                    memberToRemove: member,
                                                                }))
                                                            }
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Role Permissions</CardTitle>
                                <CardDescription>Understand what each role can do in the system</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Permission</TableHead>
                                            <TableHead className="text-center">Admin</TableHead>
                                            <TableHead className="text-center">Finance</TableHead>
                                            <TableHead className="text-center">Viewer</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { name: "View Invoices", admin: true, finance: true, viewer: true },
                                            { name: "Create Invoices", admin: true, finance: true, viewer: false },
                                            { name: "Edit Invoices", admin: true, finance: true, viewer: false },
                                            { name: "Delete Invoices", admin: true, finance: false, viewer: false },
                                            { name: "Send Reminders", admin: true, finance: true, viewer: false },
                                            { name: "Manage Clients", admin: true, finance: true, viewer: false },
                                            { name: "View Reports", admin: true, finance: true, viewer: true },
                                            { name: "Manage Team", admin: true, finance: false, viewer: false },
                                            { name: "Manage Settings", admin: true, finance: false, viewer: false },
                                        ].map((permission) => (
                                            <TableRow key={permission.name}>
                                                <TableCell>{permission.name}</TableCell>
                                                <TableCell className="text-center">
                                                    {permission.admin ? (
                                                        <Check className="mx-auto h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="mx-auto h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {permission.finance ? (
                                                        <Check className="mx-auto h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="mx-auto h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {permission.viewer ? (
                                                        <Check className="mx-auto h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="mx-auto h-4 w-4 text-red-500" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Email Address</CardTitle>
                                <CardDescription>Update the email address associated with your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-email">Current Email</Label>
                                    <Input id="current-email" value={securitySettings.email} disabled />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-email">New Email</Label>
                                    <Input
                                        id="new-email"
                                        type="email"
                                        value={securitySettings.newEmail}
                                        onChange={(e) => setSecuritySettings((prev) => ({ ...prev, newEmail: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password-email">Current Password</Label>
                                    <Input
                                        id="confirm-password-email"
                                        type="password"
                                        value={securitySettings.currentPassword}
                                        onChange={(e) => setSecuritySettings((prev) => ({ ...prev, currentPassword: e.target.value }))}
                                        placeholder="Enter your current password to confirm"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={handleChangeEmail}
                                    disabled={!securitySettings.newEmail || !securitySettings.currentPassword}
                                >
                                    Update Email
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>Change your account password</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        value={securitySettings.currentPassword}
                                        onChange={(e) => setSecuritySettings((prev) => ({ ...prev, currentPassword: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={securitySettings.newPassword}
                                        onChange={(e) => setSecuritySettings((prev) => ({ ...prev, newPassword: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={securitySettings.confirmPassword}
                                        onChange={(e) => setSecuritySettings((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={handleChangePassword}
                                    disabled={
                                        !securitySettings.currentPassword ||
                                        !securitySettings.newPassword ||
                                        !securitySettings.confirmPassword ||
                                        securitySettings.newPassword !== securitySettings.confirmPassword
                                    }
                                >
                                    Update Password
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Two-Factor Authentication</CardTitle>
                                <CardDescription>Add an extra layer of security to your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <h4 className="font-medium">Two-Factor Authentication (2FA)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {securitySettings.twoFactorEnabled
                                                ? "Your account is protected with 2FA"
                                                : "Protect your account with 2FA"}
                                        </p>
                                    </div>
                                    <Switch checked={securitySettings.twoFactorEnabled} onCheckedChange={handleToggle2FA} />
                                </div>

                                {securitySettings.twoFactorEnabled && (
                                    <div className="rounded-md border p-4 mt-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-20 w-20 bg-gray-100 flex items-center justify-center rounded-md">
                                                <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M12 16V12"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M12 8H12.01"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-medium">Recovery Codes</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Save these recovery codes in a secure place. You can use them to access your account if you
                                                    lose your 2FA device.
                                                </p>
                                                <Button variant="outline" size="sm">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download Recovery Codes
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Delete Account</CardTitle>
                                <CardDescription>Permanently delete your account and all associated data</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border border-destructive p-4 bg-destructive/5">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-destructive" />
                                        <h4 className="font-medium text-destructive">Warning: This action cannot be undone</h4>
                                    </div>
                                    <p className="mt-2 text-sm">
                                        Deleting your account will permanently remove all your data, including invoices, clients, and
                                        settings. This action cannot be reversed.
                                    </p>
                                </div>

                                <Button
                                    variant="destructive"
                                    onClick={() => setSecuritySettings((prev) => ({ ...prev, showDeleteDialog: true }))}
                                >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Account
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Invite Team Member Dialog */}
            <Dialog
                open={teamManagement.showInviteDialog}
                onOpenChange={(open) => setTeamManagement((prev) => ({ ...prev, showInviteDialog: open }))}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite Team Member</DialogTitle>
                        <DialogDescription>Send an invitation to join your team</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="invite-email">Email Address</Label>
                            <Input
                                id="invite-email"
                                type="email"
                                value={teamManagement.newMember.email}
                                onChange={(e) =>
                                    setTeamManagement((prev) => ({
                                        ...prev,
                                        newMember: { ...prev.newMember, email: e.target.value },
                                    }))
                                }
                                placeholder="colleague@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="invite-role">Role</Label>
                            <Select
                                value={teamManagement.newMember.role}
                                onValueChange={(value) =>
                                    setTeamManagement((prev) => ({
                                        ...prev,
                                        newMember: { ...prev.newMember, role: value },
                                    }))
                                }
                            >
                                <SelectTrigger id="invite-role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Finance">Finance</SelectItem>
                                    <SelectItem value="Viewer">Viewer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setTeamManagement((prev) => ({ ...prev, showInviteDialog: false }))}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleInviteTeamMember} disabled={!teamManagement.newMember.email}>
                            Send Invitation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Remove Team Member Dialog */}
            <Dialog
                open={teamManagement.showRemoveDialog}
                onOpenChange={(open) => setTeamManagement((prev) => ({ ...prev, showRemoveDialog: open }))}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Team Member</DialogTitle>
                        <DialogDescription>Are you sure you want to remove this team member?</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {teamManagement.memberToRemove && (
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={teamManagement.memberToRemove.avatar} alt={teamManagement.memberToRemove.name} />
                                    <AvatarFallback>{teamManagement.memberToRemove.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{teamManagement.memberToRemove.name}</p>
                                    <p className="text-sm text-muted-foreground">{teamManagement.memberToRemove.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setTeamManagement((prev) => ({ ...prev, showRemoveDialog: false }))}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleRemoveTeamMember}>
                            Remove
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Account Dialog */}
            <Dialog
                open={securitySettings.showDeleteDialog}
                onOpenChange={(open) => setSecuritySettings((prev) => ({ ...prev, showDeleteDialog: open }))}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="rounded-md border border-destructive p-4 bg-destructive/5">
                            <p className="text-sm">
                                To confirm, type <span className="font-bold">DELETE</span> in the field below:
                            </p>
                        </div>

                        <Input
                            value={securitySettings.deleteConfirmation}
                            onChange={(e) => setSecuritySettings((prev) => ({ ...prev, deleteConfirmation: e.target.value }))}
                            placeholder="Type DELETE to confirm"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setSecuritySettings((prev) => ({ ...prev, showDeleteDialog: false }))}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            disabled={securitySettings.deleteConfirmation !== "DELETE"}
                        >
                            Delete Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

