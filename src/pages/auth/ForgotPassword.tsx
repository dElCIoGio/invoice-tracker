import { Link } from "react-router";

export default function ForgotPassword() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center">Reset Password</h2>
                <p className="text-center text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
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
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Send Reset Link
                    </button>
                </form>
                <div className="text-center text-sm">
                    Remember your password?{" "}
                    <Link to="/auth/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
} 