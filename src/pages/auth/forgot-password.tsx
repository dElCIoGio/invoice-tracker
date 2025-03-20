
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"
import {Link} from "react-router";

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate loading
        setTimeout(() => {
            setIsLoading(false)
            window.location.href = "/auth/verification-sent"
        }, 1500)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold">
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
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                            <path d="M12 11h4" />
                            <path d="M12 16h4" />
                            <path d="M8 11h.01" />
                            <path d="M8 16h.01" />
                        </svg>
                        Unicollector
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8 rounded-xl border bg-white p-8 shadow-sm"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="space-y-2 text-center"
                    >
                        <h1 className="text-3xl font-bold">Forgot password</h1>
                        <p className="text-gray-500">Enter your email address and we'll send you a link to reset your password</p>
                    </motion.div>
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Email
                            </label>
                            <Input id="email" type="email" placeholder="m@example.com" required className="w-full" />
                        </div>
                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                "Send reset link"
                            )}
                        </Button>
                    </motion.form>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-center text-sm"
                    >
                        Remember your password?{" "}
                        <Link to="/auth/login" className="font-medium text-teal-600 hover:underline">
                            Back to login
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

