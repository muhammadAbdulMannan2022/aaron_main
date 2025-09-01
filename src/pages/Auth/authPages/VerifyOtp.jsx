import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

export default function ActivationCode() {
    const [otp, setOtp] = useState(['', '', '', ''])
    const [activeInput, setActiveInput] = useState(0)
    const navigate = useNavigate()

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, '') // Allow only numbers
        if (value.length <= 1) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Move to next input if value is entered
            if (value && index < 3) {
                document.getElementById(`otp-input-${index + 1}`).focus()
            }
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4)
        if (pasteData.length === 4) {
            setOtp(pasteData.split(''))
            document.getElementById('otp-input-3').focus()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Activation code submitted:", otp.join(''))
        navigate("/auth/login")
    }

    useEffect(() => {
        document.getElementById('otp-input-0').focus()
    }, [])

    return (
        <div className="w-full flex items-center justify-center p-6 lg:p-8 h-full">
            <div className="w-full max-w-md space-y-6">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8 flex flex-col items-center justify-center">
                    <img src="/logo.png" className="h-12 w-auto" height={48} width={180} alt="" />
                </div>

                {/* Activation Code Header */}
                <div className="text-center hidden md:block">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                        Activation Code
                    </h1>
                    <p className="text-sm text-text-primary">
                        We have sent you an activation code. An email has been sent to your email address containing a code to reset your password.
                    </p>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* OTP Input Fields */}
                    <div className="text-center">
                        <label className="block text-sm font-medium mb-4" style={{ color: "var(--color-text-primary)" }}>
                            Enter verification code
                        </label>
                        <div className="flex justify-center gap-3 mb-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste}
                                    maxLength="1"
                                    className="w-12 h-12 text-center text-2xl rounded-full border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                    style={{
                                        backgroundColor: "var(--color-gray-button-bg)",
                                        color: "var(--color-text-primary)",
                                    }}
                                    required
                                    autoFocus={index === 0}
                                    placeholder='*'
                                />
                            ))}
                        </div>
                        <p className="text-sm mb-4" style={{ color: "var(--color-text-notActive)" }}>
                            if you didn't receive a code! <button className="text-button-outline hover:underline">click here...</button>
                        </p>
                    </div>

                    {/* Confirm Button */}
                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer py-3 px-4 rounded-lg font-medium text-white transition-all hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        style={{ backgroundColor: "var(--color-auth-button-bg)" }}
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    )
}