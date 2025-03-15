import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger, useSidebar, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar"
import {BarChart, FileText, LayoutDashboard, Send, Settings, Users} from "lucide-react";
import {useLocation, useNavigate} from "react-router";
import { Icon } from "@iconify/react";
import {Button} from "@/components/ui/button.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";


const navigation = [
    {
        name: "Dashboard",
        href: "",
        icon: LayoutDashboard
    },
    {
        name: "Invoices",
        href: "invoices",
        icon: FileText
    },
    {
        name: "Clients",
        href: "clients",
        icon: Users
    },
    {
        name: "Follow-Ups & Reminders",
        href: "follow-ups-and-reminders",
        icon: Send
    },
    {
        name: "Reports",
        href: "reports",
        icon: BarChart
    },
    {
        name: "Settings",
        href: "settings",
        icon: Settings
    }
]

function DashboardSidebar(){

    const location = useLocation();

    const {open, toggleSidebar} = useSidebar()

    const route = location.pathname.split("/")[2] || "";

    const navigate = useNavigate()

    const isMobile = useIsMobile();

    function handlePageChange(href: string) {
        if (isMobile)
            toggleSidebar()
        navigate(`/dashboard/${href}` + location.search, {replace: true})
    }
    return(
        <Sidebar collapsible="icon">
            <SidebarHeader>
                    <div className="flex items-center justify-between gap-2 py-2">
                        <div className={`text-lg font-semibold flex items-center justify-center ${open ? "gap-1":"gap-3"} `}>
                            <div className={` bg-primary rounded-md p-1 hover:bg-secondary-foreground transition-all duration-300 ease-in-out ${open? "" : "-ml-0.5"}`}>
                                <Icon icon="ic:round-bubble-chart" className="text-white" width="28" height="28" />
                            </div>
                            <span className={`${open ? "opacity-100": "opacity-0"} transition-opacity duration-300 ease-in-out`}>
                                Invoicer
                            </span>
                        </div>
                        <SidebarTrigger  className={`${open ? "": "hidden"}`} />
                    </div>
            </SidebarHeader>
            <SidebarContent>
                <div>
                    <Separator className="max-w-[90%] mx-auto"/>
                </div>
                <SidebarGroup>
            <SidebarGroupLabel className="text-primary">Menu</SidebarGroupLabel>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem className={`${item.href == route? "bg-white border-[1.5px] flex justify-center rounded-full" : "rounded-full text-zinc-400"}`} key={item.name}>
                  <SidebarMenuButton className="rounded-full flex mx-auto" asChild>
                    <button onClick={() => handlePageChange(item.href)} className={`flex ${!open && "justify-center"} gap-2`}>
                      <item.icon className={`${!open ? "ml-2": "ml-0"} ${route == item.href && ""} transition-all duration-100 ease-in-out h-4 w-4`}/>
                      <span className={`${!open && ""}`}>{item.name}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={`${open? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}>
                <div className="bg-primary mx-auto w-full rounded-lg h-28 p-3 flex flex-col justify-between">
                    <p className="text-zinc-200 text-xs font-semibold">
                        Looking for more detailed analytics to help you? Upgrade to Pro
                    </p>
                    <Button variant="outline" size="sm">
                        Upgrade Now
                    </Button>
                </div>
            </SidebarFooter>
      </Sidebar>
    )
}


export default DashboardSidebar;