
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, AlertCircle } from "lucide-react"

export function RecentActivity() {
    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
                <div className="space-y-6">
                    {/* Latest Payment */}
                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Acme Inc" />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Acme Inc paid invoice #INV-001</p>
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                    Paid
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$1,999.00 • 2 hours ago</p>
                        </div>
                    </div>

                    {/* Upcoming Due */}
                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Globex Corp" />
                            <AvatarFallback>GC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Globex Corp invoice #INV-002 due soon</p>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                                    Due in 3 days
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$3,500.00 • Due on May 15, 2023</p>
                            <Button size="sm" variant="outline" className="mt-2">
                                <Send className="mr-2 h-3 w-3" />
                                Send reminder
                            </Button>
                        </div>
                    </div>

                    {/* Overdue */}
                    <div className="flex items-start gap-4 rounded-lg border p-3 border-red-100 bg-red-50">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Initech" />
                            <AvatarFallback>IN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Initech invoice #INV-003 is overdue</p>
                                <Badge variant="destructive">7 days overdue</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$2,750.00 • Due on May 5, 2023</p>
                            <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="destructive">
                                    <AlertCircle className="mr-2 h-3 w-3" />
                                    Escalate
                                </Button>
                                <Button size="sm" variant="outline">
                                    <Send className="mr-2 h-3 w-3" />
                                    Send reminder
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Another Payment */}
                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Umbrella Corp" />
                            <AvatarFallback>UC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Umbrella Corp paid invoice #INV-004</p>
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                    Paid
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$5,200.00 • 1 day ago</p>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
                <div className="space-y-6">
                    {/* Latest Payment */}
                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Acme Inc" />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Acme Inc paid invoice #INV-001</p>
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                    Paid
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$1,999.00 • 2 hours ago</p>
                        </div>
                    </div>

                    {/* Another Payment */}
                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Umbrella Corp" />
                            <AvatarFallback>UC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Umbrella Corp paid invoice #INV-004</p>
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                    Paid
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$5,200.00 • 1 day ago</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Massive Dynamic" />
                            <AvatarFallback>MD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Massive Dynamic paid invoice #INV-005</p>
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                    Paid
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$3,800.00 • 3 days ago</p>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
                <div className="space-y-6">
                    {/* Upcoming Due */}
                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Globex Corp" />
                            <AvatarFallback>GC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Globex Corp invoice #INV-002 due soon</p>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                                    Due in 3 days
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$3,500.00 • Due on May 15, 2023</p>
                            <Button size="sm" variant="outline" className="mt-2">
                                <Send className="mr-2 h-3 w-3" />
                                Send reminder
                            </Button>
                        </div>
                    </div>

                    {/* Another Upcoming */}
                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Stark Industries" />
                            <AvatarFallback>SI</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Stark Industries invoice #INV-006 due soon</p>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                                    Due in 5 days
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$7,200.00 • Due on May 17, 2023</p>
                            <Button size="sm" variant="outline" className="mt-2">
                                <Send className="mr-2 h-3 w-3" />
                                Send reminder
                            </Button>
                        </div>
                    </div>

                    {/* Another Upcoming */}
                    <div className="flex items-start gap-4 rounded-lg border p-3">
                        <Avatar className="h-9 w-9 mt-1">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Wayne Enterprises" />
                            <AvatarFallback>WE</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Wayne Enterprises invoice #INV-007 due soon</p>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                                    Due in 7 days
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">$4,800.00 • Due on May 19, 2023</p>
                            <Button size="sm" variant="outline" className="mt-2">
                                <Send className="mr-2 h-3 w-3" />
                                Send reminder
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}

