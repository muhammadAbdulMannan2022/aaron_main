import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Link } from 'react-router'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
        console.log("Login attempt:", { email, password })
    }

    const handleGoogleLogin = () => {
        // Handle Google login logic here
        console.log("Google login attempt")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="w-full flex items-center justify-center p-6 lg:p-8 h-full">
            <div className="w-full max-w-md space-y-6">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8 flex flex-col items-center justify-center">
                    <img src="/logo.png" className="h-12 w-auto" height={48} width={180} alt="" />
                </div>

                {/* Login Form Header */}
                <div className="text-center hidden md:block">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                        Login Account
                    </h1>
                    <p className="text-sm text-text-primary">
                        Empowering hotels and restaurants
                    </p>
                </div>

                {/* Login Form */}
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

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MdLock className="h-5 w-5" style={{ color: "var(--color-main-icon)" }} />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-10 pr-12 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                style={{
                                    backgroundColor: "var(--color-gray-button-bg)",
                                    color: "var(--color-text-primary)",
                                    borderColor: "var(--color-gray-button-bg)",
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer hover:opacity-70 transition-opacity"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <MdVisibilityOff className="h-5 w-5" style={{ color: "var(--color-main-icon)" }} />
                                ) : (
                                    <MdVisibility className="h-5 w-5" style={{ color: "var(--color-main-icon)" }} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="text-start">

                        <Link
                            to="/auth/forgot"
                            className="font-medium hover:underline transition-all text-button-outline"
                        >
                            Forgot Password
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer py-3 px-4 rounded-lg font-medium text-white transition-all hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        style={{ backgroundColor: "var(--color-auth-button-bg)" }}
                    >
                        Login
                    </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center">
                    <span style={{ color: "var(--color-text-notActive)" }}>Need an account? </span>
                    <Link
                        to="/auth/signup"
                        className="font-medium hover:underline transition-all text-button-outline"
                    >
                        Sign up
                    </Link>
                </div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full hover:cursor-pointer py-3 px-4 rounded-lg border font-medium transition-all hover:opacity-90 focus:ring-2 focus:ring-gray-500 focus:outline-none flex items-center justify-center gap-3"
                    style={{
                        backgroundColor: "var(--color-gray-button-bg)",
                        borderColor: "var(--color-gray-button-bg)",
                        color: "var(--color-text-primary)",
                    }}
                >
                    <FcGoogle className="h-5 w-5" />
                    Login with Google
                </button>
            </div>
        </div>
    )
}
