import {Link} from "react-router";
import {Facebook, Instagram, Linkedin, Twitter} from "lucide-react";

function Footer() {
    return (
        <footer className="w-full border-t py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-4">
                    <div className="space-y-4">
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
                        <p className="text-sm text-gray-500">
                            Streamline your invoicing process with automated reminders and tracking solutions.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-4">Menu</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Help & Support
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Developers
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-500 hover:text-gray-900">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-4">Get in Touch</h3>
                        <div className="flex space-x-4 mb-4">
                            <Link
                                to="#"
                                className="text-gray-500 hover:text-gray-900 transition-transform duration-300 hover:scale-110"
                            >
                                <Twitter className="h-5 w-5"/>
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                to="#"
                                className="text-gray-500 hover:text-gray-900 transition-transform duration-300 hover:scale-110"
                            >
                                <Facebook className="h-5 w-5"/>
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link
                                to="#"
                                className="text-gray-500 hover:text-gray-900 transition-transform duration-300 hover:scale-110"
                            >
                                <Instagram className="h-5 w-5"/>
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                to="#"
                                className="text-gray-500 hover:text-gray-900 transition-transform duration-300 hover:scale-110"
                            >
                                <Linkedin className="h-5 w-5"/>
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                        <div className="flex space-x-4">
                            <Link
                                to="#"
                                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-300 hover:bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path
                                        d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                                </svg>
                                Google Play
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-300 hover:bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path
                                        d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                                    <path d="M10 2c1 .5 2 2 2 5"></path>
                                </svg>
                                App Store
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500">© 2025 Virelle. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link
                            to="#"
                            className="text-xs text-gray-500 hover:text-gray-900 transition-all duration-300 hover:underline"
                        >
                            Terms
                        </Link>
                        <Link
                            to="#"
                            className="text-xs text-gray-500 hover:text-gray-900 transition-all duration-300 hover:underline"
                        >
                            Privacy
                        </Link>
                        <Link
                            to="#"
                            className="text-xs text-gray-500 hover:text-gray-900 transition-all duration-300 hover:underline"
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;