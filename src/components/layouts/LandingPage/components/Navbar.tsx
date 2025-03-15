import {Link} from "react-router";
import {ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

function Navbar() {
    return (
        <header className=" sticky top-0 z-50 w-full border-b bg-white">
            <div className="flex h-16 items-center justify-between container-custom">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-teal-600"
                        >
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                            <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                            <path d="M12 11h4"/>
                            <path d="M12 16h4"/>
                            <path d="M8 11h.01"/>
                            <path d="M8 16h.01"/>
                        </svg>
                        Virelle
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link to="#" className="flex items-center gap-1 text-sm font-medium">
                            Solutions <ChevronDown className="h-4 w-4"/>
                        </Link>
                        <Link to="#" className="flex items-center gap-1 text-sm font-medium">
                            Industries <ChevronDown className="h-4 w-4"/>
                        </Link>
                        <Link to="#" className="flex items-center gap-1 text-sm font-medium">
                            Resources <ChevronDown className="h-4 w-4"/>
                        </Link>
                        <Link to="#" className="text-sm font-medium">
                            Company
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/auth/login" className="hidden md:block text-sm font-medium">
                        Log in
                    </Link>
                    <Button className="">
                        <Link to="/auth/signup">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;