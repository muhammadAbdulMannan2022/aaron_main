import React, { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router'

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Forgot password request for:", email)
        navigate("/auth/otp")
    }

    return (
        <div className="w-full flex items-center justify-center p-6 lg:p-8 h-full">
            <div className="w-full max-w-md space-y-6">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8 flex flex-col items-center justify-center">
                    <img src="/logo.png" className="h-12 w-auto" height={48} width={180} alt="" />
                </div>

                {/* Forgot Password Header */}
                <div className="text-center hidden md:block">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                        Forgot Password
                    </h1>
                    <p className="text-sm text-text-primary">
                        Enter your email address to reset your password. We will send you an activation code.
                    </p>
                </div>

                {/* Forgot Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MdEmail className="h-5 w-5" style={{ color: "var(--color-main-icon)" }} />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="user@mail.com"
                                className="w-full pl-10 pr-3 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                style={{
                                    backgroundColor: "var(--color-gray-button-bg)",
                                    color: "var(--color-text-primary)",
                                    borderColor: "var(--color-gray-button-bg)",
                                }}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer py-3 px-4 rounded-lg font-medium text-white transition-all hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        style={{ backgroundColor: "var(--color-auth-button-bg)" }}
                    >
                        Send Reset Code
                    </button>
                </form>

                {/* Back to Login Link */}
                <div className="text-center">
                    <span style={{ color: "var(--color-text-notActive)" }}>Remember your password? </span>
                    <Link
                        to="/auth/login"
                        className="font-medium hover:underline transition-all"
                        style={{ color: "var(--color-auth-button-bg)" }}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}