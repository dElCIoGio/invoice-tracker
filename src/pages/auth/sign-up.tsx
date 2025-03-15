
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Github, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import {Link} from "react-router";

export default function SignupPage() {
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
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
                        Virelle
                    </Link>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md space-y-8 rounded-xl border bg-white p-8 shadow-sm"
                >
                    <motion.div variants={itemVariants} className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Create an account</h1>
                        <p className="text-gray-500">Enter your information to get started</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                <Github className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="first-name"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        First name
                                    </label>
                                    <Input id="first-name" placeholder="John" required className="w-full" />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="last-name"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Last name
                                    </label>
                                    <Input id="last-name" placeholder="Doe" required className="w-full" />
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Email
                                </label>
                                <Input id="email" type="email" placeholder="m@example.com" required className="w-full" />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label
                                    htmlFor="company"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Company name
                                </label>
                                <Input id="company" placeholder="Your company" className="w-full" />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Password
                                </label>
                                <Input id="password" type="password" placeholder="••••••••" required className="w-full" />
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex items-center space-x-2">
                                <Checkbox id="terms" required />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-teal-600 hover:underline">
                                        terms of service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-teal-600 hover:underline">
                                        privacy policy
                                    </Link>
                                </label>
                            </motion.div>
                            <motion.div variants={itemVariants}>
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
                                            Creating account...
                                        </div>
                                    ) : (
                                        "Create account"
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                    <motion.div variants={itemVariants} className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="font-medium text-teal-600 hover:underline">
                            Sign in
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

