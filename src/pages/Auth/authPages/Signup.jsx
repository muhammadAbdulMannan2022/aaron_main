import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import {
  useSignupMutation,
  useSocialLoginMutation,
} from "../../../../redux/auth/auth";
import { loginWithGoogle } from "../../../utils/LoginWithGoogle";
import Cookies from "js-cookie";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(""); // New

  const [signup, { isLoading: isSignUpLoading }] = useSignupMutation();
  const [socialLogin, { isLoading: isSocialLoading }] =
    useSocialLoginMutation();

  const navigate = useNavigate();

  // Strong password regex
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const validatePassword = (pwd) => {
    if (!pwd) {
      setPasswordStrength("");
      return;
    }
    if (strongPasswordRegex.test(pwd)) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("weak");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Check password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Check password strength
    if (!strongPasswordRegex.test(password)) {
      setErrorMessage(
        "Password is too weak. Use uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const res = await signup({ email, password }).unwrap();
      console.log("Signup successful:", res);
      navigate("/auth/otp", { state: { email, from: "signup" } });
    } catch (error) {
      setErrorMessage(error?.data?.Message || "Signup failed. Try again!");
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMessage("");
    try {
      const res = await loginWithGoogle();
      const serverRes = await socialLogin(res.email).unwrap();
      Cookies.set("access_token", serverRes.access);
      Cookies.set("refresh_token", serverRes.refresh);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error?.data?.Message ||
          "An error occurred during Google signup. Please try again."
      );
    }
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
    if (errorMessage) setErrorMessage("");

    // Live validate password
    if (setter === setPassword) {
      validatePassword(value);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-6 lg:p-8 h-full">
      <div className="w-full max-w-md space-y-6">
        {/* Mobile Logo */}
        <div className="lg:hidden text-center mb-8 flex flex-col items-center justify-center">
          <img src="/logo.svg" className="h-12 w-auto" alt="Logo" />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center">{errorMessage}</div>
        )}

        {/* Signup Form Header */}
        <div className="text-center hidden md:block">
          <h1
            className="text-2xl lg:text-3xl font-bold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Create Account
          </h1>
          <p className="text-sm text-text-primary">
            Join us and start your journey
          </p>
        </div>

        {/* Signup Form */}
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
                onChange={handleInputChange(setEmail)}
                placeholder="user@mail.com"
                className="w-full pl-10 pr-3 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-primary)",
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
                <MdLock
                  className="h-5 w-5"
                  style={{ color: "var(--color-main-icon)" }}
                />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleInputChange(setPassword)}
                placeholder="Enter strong password"
                className="w-full pl-10 pr-10 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-primary)",
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer hover:opacity-70 transition-opacity"
              >
                {showPassword ? (
                  <MdVisibilityOff
                    className="h-5 w-5"
                    style={{ color: "var(--color-main-icon)" }}
                  />
                ) : (
                  <MdVisibility
                    className="h-5 w-5"
                    style={{ color: "var(--color-main-icon)" }}
                  />
                )}
              </button>
            </div>
            {/* Password Hint */}
            <div className="flex items-center gap-2">
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-text-notActive)" }}
              >
                Min 8 chars, 1 uppercase, 1 number, 1 special (!@#$%^&*)
              </p>
              {/* Password Strength Indicator */}
              {passwordStrength && (
                <div className="text-center text-sm">
                  {passwordStrength === "strong" ? (
                    <span className="text-green-500 font-medium">
                      Strong password
                    </span>
                  ) : (
                    <span className="text-orange-500 font-medium">
                      Weak password
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLock
                  className="h-5 w-5"
                  style={{ color: "var(--color-main-icon)" }}
                />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
                placeholder="Re-enter password"
                className="w-full pl-10 pr-10 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-primary)",
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer hover:opacity-70 transition-opacity"
              >
                {showConfirmPassword ? (
                  <MdVisibilityOff
                    className="h-5 w-5"
                    style={{ color: "var(--color-main-icon)" }}
                  />
                ) : (
                  <MdVisibility
                    className="h-5 w-5"
                    style={{ color: "var(--color-main-icon)" }}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSignUpLoading || isSocialLoading}
            className="w-full hover:cursor-pointer py-3 px-4 rounded-lg font-medium text-white transition-all hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
            style={{ backgroundColor: "var(--color-auth-button-bg)" }}
          >
            {isSignUpLoading || isSocialLoading
              ? "Creating Account..."
              : "Sign Up"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <span style={{ color: "var(--color-text-notActive)" }}>
            Already have an account?{" "}
          </span>
          <Link
            to="/auth/login"
            className="font-medium hover:underline transition-all text-button-outline"
          >
            Login
          </Link>
        </div>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          disabled={isSignUpLoading || isSocialLoading}
          className="w-full hover:cursor-pointer py-3 px-4 rounded-lg border font-medium transition-all hover:opacity-90 focus:ring-2 focus:ring-gray-500 focus:outline-none flex items-center justify-center gap-3 disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-gray-button-bg)",
            borderColor: "var(--color-gray-button-bg)",
            color: "var(--color-text-primary)",
          }}
        >
          <FcGoogle className="h-5 w-5" />
          {isSignUpLoading || isSocialLoading
            ? "Signing up..."
            : "Sign Up with Google"}
        </button>
      </div>
    </div>
  );
}
