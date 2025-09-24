import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useForgotPasswordMutation } from "../../../../redux/auth/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [
    forgotPass,
    { isLoading: isForgotLoading, isError: isForgotError, error: forgotError },
  ] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await forgotPass({ email });
      console.log(res);
      navigate("/auth/otp", { state: { email, from: "forgot" } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-6 lg:p-8 h-full">
      <div className="w-full max-w-md space-y-6">
        {/* Mobile Logo */}
        <div className="lg:hidden text-center mb-8 flex flex-col items-center justify-center">
          <img
            src="/logo.png"
            className="h-12 w-auto"
            height={48}
            width={180}
            alt="Logo"
          />
        </div>

        {/* Error State */}
        {isForgotError && (
          <div className="text-red-500 text-sm text-center">
            {forgotError?.data?.Message ||
              "An error occurred. Please try again."}
          </div>
        )}

        {/* Forgot Password Header */}
        <div className="text-center hidden md:block">
          <h1
            className="text-2xl lg:text-3xl font-bold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Forgot Password
          </h1>
          <p className="text-sm text-text-primary">
            Enter your email address to reset your password. We will send you an
            activation code.
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
                <MdEmail
                  className="h-5 w-5"
                  style={{ color: "var(--color-main-icon)" }}
                />
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
            disabled={isForgotLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none 
              ${
                isForgotLoading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:opacity-90 hover:cursor-pointer"
              }`}
            style={{ backgroundColor: "var(--color-auth-button-bg)" }}
          >
            {isForgotLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="text-center">
          <span style={{ color: "var(--color-text-notActive)" }}>
            Remember your password?{" "}
          </span>
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
  );
}
