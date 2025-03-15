import { useState } from "react";
import { Bell, Search, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {useSidebar, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";



const DashboardNavbar = () => {
    const [notifications, ] = useState(3); // Example notification count

    const {open} = useSidebar()

    const isMobile = useIsMobile();


    return (
        <nav className="sticky px-2 top-0 w-full py-3 flex items-center justify-between z-50 bg-white border-b h-17">


            <div className="flex items-center gap-2 transition-all duration-200 ease-in-out">
                { (!open || isMobile) &&
                    <SidebarTrigger className="text-black"/>
                }

                {/* Search Bar */}
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2  dark:border-gray-700 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                    />
                </div>
            </div>


            {/* Right Section: Notifications & User Profile */}
            <div className="flex h-full items-center space-x-2">

                {/* Notifications Button */}
                <Button variant="ghost" className="relative mr-4">
                    <Bell size={22} className="text-gray-700 dark:text-white" />
                    {notifications > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
                    )}
                </Button>

                <Separator orientation="vertical" className="max-h-[70%]"/>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/profile-pic.jpg" alt="User" />
                                <AvatarFallback>DA</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-700 dark:text-white font-medium hidden md:block">Delcio</span>
                            <ChevronDown size={18} className="text-gray-500 dark:text-gray-400 hidden md:block" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                        <DropdownMenuItem className="flex items-center space-x-2">
                            <User size={18} />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2">
                            <Settings size={18} />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 text-red-500">
                            <LogOut size={18} />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>
    );
};

export default DashboardNavbar;
