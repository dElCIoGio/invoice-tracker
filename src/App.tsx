import { Routes, Route } from "react-router"
import { DashboardLayout } from "@/components/layouts/Dashboard/dashboard-layout"
import Dashboard from "@/pages/dashboard/dashboard.tsx"
import { ThemeProvider } from "next-themes";
import Landing from "@/pages/Landing";
import Element from "@/pages/Elements";
import Login from "@/pages/auth/login.tsx";
import Register from "@/pages/auth/sign-up.tsx";
import ForgotPassword from "@/pages/auth/forgot-password.tsx";
import LandingPageLayout from "@/components/layouts/LandingPage/LandingPageLayout.tsx";
import InvoiceDetailsPage from "@/pages/dashboard/invoice.tsx";
import InvoicesPage from "@/pages/dashboard/invoices.tsx";
import NewInvoice from "@/pages/dashboard/new-invoice.tsx";
import SettingsPage from "@/pages/dashboard/settings.tsx";
import ClientsPage from "@/pages/dashboard/clients.tsx";
import FollowUps from "@/pages/dashboard/follow-ups-and-reminders.tsx";

export default function App() {
    return (
        <ThemeProvider defaultTheme="system" enableSystem>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPageLayout/>}>
                    <Route index element={<Landing />} />
                </Route>

                <Route path="element" element={<Element />} />
                
                {/* Auth Routes */}
                <Route path="/auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                </Route>

                <Route path="dashboard" element={<DashboardLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="invoices">
                        <Route index element={<InvoicesPage/>}/>
                        <Route path="new" element={<NewInvoice/>}/>
                        <Route path="invoice/:id" element={<InvoiceDetailsPage/>}/>
                    </Route>
                    <Route path="clients" element={<ClientsPage/>}/>
                    <Route path="follow-ups-and-reminders" element={<FollowUps/>}/>
                    <Route path="reports" element={<div className="flex-1 w-full flex justify-center items-center">
                        Coming Soon
                    </div>}/>
                    <Route path="settings" element={<SettingsPage/>}/>
                </Route>


            </Routes>
        </ThemeProvider>
    );
}