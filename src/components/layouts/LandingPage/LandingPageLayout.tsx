import Navbar from "@/components/layouts/LandingPage/components/Navbar.tsx";
import Footer from "@/components/layouts/LandingPage/components/Footer.tsx";
import {Outlet} from "react-router";


function LandingPageLayout() {
    return (
        <div className="h-screen">
            <Navbar/>
            <div className="flex flex-1 flex-col">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}

export default LandingPageLayout;