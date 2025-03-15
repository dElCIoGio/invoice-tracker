
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/layouts/Dashboard/components/dashboard-sidebar.tsx";
import DashboardNavbar from "@/components/layouts/Dashboard/components/navbar.tsx";
import {Outlet} from "react-router";



export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
      <DashboardSidebar/>

        <main className="flex-1 flex-col flex">
            <DashboardNavbar/>
          <div className="p-6 flex flex-col flex-1">
            <Outlet/>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 