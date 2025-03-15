import { Link } from "react-router";

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center">Register</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            placeholder="Create a password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
} 