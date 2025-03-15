import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from "@/components/ui/card.tsx";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { 
    Table, 
    TableHeader, 
    TableRow, 
    TableHead, 
    TableBody, 
    TableCell 
} from "@/components/ui/table.tsx";
import { 
    Tabs, 
    TabsList, 
    TabsTrigger, 
    TabsContent 
} from "@/components/ui/tabs.tsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.tsx";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTheme } from "next-themes";

function Elements() {
    const form = useForm();
    const { theme, setTheme } = useTheme();

    return (
        <div className="container mx-auto p-6 space-y-12">
            {/* Theme Toggle */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Theme</h2>
                <Button
                    variant="outline"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </section>

            <Separator />

            {/* Buttons Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Buttons</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Default</h3>
                        <Button>Default</Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Secondary</h3>
                        <Button variant="secondary">Secondary</Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Destructive</h3>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Outline</h3>
                        <Button variant="outline">Outline</Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Ghost</h3>
                        <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Link</h3>
                        <Button variant="link">Link</Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Small</h3>
                        <Button size="sm">Small</Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Large</h3>
                        <Button size="lg">Large</Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Icon</h3>
                        <Button size="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                        </Button>
                    </div>
                </div>
            </section>
            
            <Separator />
            
            {/* Badges Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Badges</h2>
                <div className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
            </section>
            
            <Separator />
            
            {/* Form Elements Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Form Elements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Input</h3>
                        <Input placeholder="Input placeholder" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Textarea</h3>
                        <Textarea placeholder="Textarea placeholder" />
                    </div>
                </div>
            </section>
            
            <Separator />
            
            {/* Cards Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card description goes here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card content goes here. This is the main body of the card.</p>
                        </CardContent>
                        <CardFooter>
                            <Button>Action</Button>
                        </CardFooter>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Another Card</CardTitle>
                            <CardDescription>With different content</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">John Doe</p>
                                    <p className="text-sm text-muted-foreground">john@example.com</p>
                                </div>
                            </div>
                            <Progress value={60} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
            
            <Separator />
            
            {/* Avatars Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Avatars</h2>
                <div className="flex flex-wrap gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                </div>
            </section>
            
            <Separator />
            
            {/* Skeleton Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Skeletons</h2>
                <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                </div>
            </section>
            
            <Separator />
            
            {/* Tables Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Tables</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">John Doe</TableCell>
                            <TableCell>john@example.com</TableCell>
                            <TableCell><Badge>Active</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Jane Smith</TableCell>
                            <TableCell>jane@example.com</TableCell>
                            <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
            
            <Separator />
            
            {/* Tabs Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Tabs</h2>
                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="p-4 border rounded-md mt-2">
                        <h3 className="font-medium">Account Settings</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage your account settings and preferences.
                        </p>
                    </TabsContent>
                    <TabsContent value="password" className="p-4 border rounded-md mt-2">
                        <h3 className="font-medium">Password Settings</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Change your password here.
                        </p>
                    </TabsContent>
                    <TabsContent value="settings" className="p-4 border rounded-md mt-2">
                        <h3 className="font-medium">Other Settings</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage other settings and preferences.
                        </p>
                    </TabsContent>
                </Tabs>
            </section>
            
            <Separator />
            
            {/* Progress Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Progress</h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium mb-1">25%</p>
                        <Progress value={25} />
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-1">50%</p>
                        <Progress value={50} />
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-1">75%</p>
                        <Progress value={75} />
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-1">100%</p>
                        <Progress value={100} />
                    </div>
                </div>
            </section>

            <Separator />
            
            {/* Tooltip Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Tooltips</h2>
                <div className="flex gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline">Hover me</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>This is a tooltip</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </section>

            <Separator />

            {/* Toast Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Toasts</h2>
                <div className="flex gap-4">
                    <Button onClick={() => toast("This is a toast message")}>Show Toast</Button>
                    <Button onClick={() => toast.success("Operation successful!")}>Success Toast</Button>
                    <Button onClick={() => toast.error("Something went wrong!")}>Error Toast</Button>
                </div>
                <Toaster />
            </section>

            <Separator />

            {/* Sheet Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Sheet</h2>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Sheet Title</SheetTitle>
                            <SheetDescription>
                                This is a sheet component that slides in from the side.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">Sheet content goes here</div>
                    </SheetContent>
                </Sheet>
            </section>

            <Separator />

            {/* Select Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Select</h2>
                <div className="w-[240px]">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </section>

            <Separator />

            {/* Navigation Menu Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Navigation Menu</h2>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-4 w-[400px]">
                                    <NavigationMenuLink>Link 1</NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-4 w-[400px]">
                                    <NavigationMenuLink>Link 2</NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </section>

            <Separator />

            {/* Menubar Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Menubar</h2>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>New <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                            <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Edit</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                            <MenubarItem>Redo <MenubarShortcut>⌘Y</MenubarShortcut></MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </section>

            <Separator />

            {/* Form Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Form</h2>
                <Form {...form}>
                    <form className="space-y-4 w-full max-w-md">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter username" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </section>

            <Separator />

            {/* Dropdown Menu Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Dropdown Menu</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>

            <Separator />

            {/* Dialog Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Dialog</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Dialog Title</DialogTitle>
                            <DialogDescription>
                                This is a dialog description that explains the purpose of the dialog.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">Dialog content goes here</div>
                    </DialogContent>
                </Dialog>
            </section>

            <Separator />

            {/* Drawer Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Drawer</h2>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline">Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Drawer Title</DrawerTitle>
                            <DrawerDescription>
                                This is a drawer that slides up from the bottom.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4">Drawer content goes here</div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </section>

            <Separator />

            {/* Breadcrumb Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Breadcrumb</h2>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Category</BreadcrumbPage>
                    </BreadcrumbItem>
                </Breadcrumb>
            </section>
        </div>
    );
}

export default Elements;