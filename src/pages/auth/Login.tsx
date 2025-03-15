import { Link } from "react-router";

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center">Login</h2>
                <form className="space-y-4">
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
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center space-y-2">
                    <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                    </Link>
                    <div className="text-sm">
                        Don't have an account?{" "}
                        <Link to="/auth/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 