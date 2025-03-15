
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/layouts/Dashboard/components/dashboard-sidebar.tsx";
import DashboardNavbar from "@/components/layouts/Dashboard/components/Navbar.tsx";
import {Outlet} from "react-router";



export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
      <DashboardSidebar/>

        <main className="flex-1">
            <DashboardNavbar/>
          <div className="container-custom p-6">
            <Outlet/>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 