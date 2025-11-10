import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import {
  useLoginMutation,
  useSocialLoginMutation,
} from "../../../../redux/auth/auth";
import { loginWithGoogle } from "../../../utils/LoginWithGoogle";
import Cookie from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [socialLogin, { isLoading: isSocialLoading }] =
    useSocialLoginMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await login({ email, password }).unwrap();
      console.log("Login successful:", res, res.access, res.refresh);

      // 🟢 Save tokens to cookies
      if (res?.access) {
        Cookie.set("access", res.access, { expires: 7 }); // 1 day
      }
      if (res?.refresh) {
        Cookie.set("refresh", res.refresh, { expires: 7 }); // 7 days
      }

      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error?.data?.Message || "Login failed. Try again!");
      if (error?.data?.Message === "Please verify OTP") {
        navigate("/auth/otp", { state: { email, from: "signup" } });
      }
      console.log(error, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    try {
      const res = await loginWithGoogle();
      const serverRes = await socialLogin(res.email).unwrap();
      console.log("Google login successful:", serverRes);

      // 🟢 Save tokens to cookies
      if (serverRes?.access) {
        Cookie.set("access", serverRes.access, { expires: 7 });
      }
      if (serverRes?.refresh) {
        Cookie.set("refresh", serverRes.refresh, { expires: 7 });
      }

      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error?.data?.Message ||
          "An error occurred during Google login. Please try again."
      );
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  return (
    <div className="w-full flex items-center justify-center p-6 lg:p-8 h-full">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="lg:hidden text-center mb-8 flex flex-col items-center justify-center">
          <img src="/logo.svg" className="h-12 w-auto" alt="Logo" />
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center">{errorMessage}</div>
        )}

        {/* Header */}
        <div className="text-center hidden md:block">
          <h1
            className="text-2xl lg:text-3xl font-bold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Login Account
          </h1>
          <p className="text-sm text-text-primary">
            Empowering hotels and restaurants
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
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

          {/* Password */}
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
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-primary)",
                }}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer hover:opacity-70"
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
          </div>

          {/* Forgot password */}
          <div className="text-start">
            <Link
              to="/auth/forgot"
              className="font-medium hover:underline transition-all text-button-outline"
            >
              Forgot Password
            </Link>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoginLoading || isSocialLoading}
            className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--color-auth-button-bg)" }}
          >
            {isLoginLoading ? "Logging in ..." : "Login"}
          </button>
        </form>

        {/* Signup */}
        <div className="text-center">
          <span style={{ color: "var(--color-text-notActive)" }}>
            Need an account?{" "}
          </span>
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
          disabled={isLoginLoading || isSocialLoading}
          className="w-full py-3 px-4 rounded-lg border font-medium transition-all focus:ring-2 focus:ring-gray-500 flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--color-gray-button-bg)",
            borderColor: "var(--color-gray-button-bg)",
            color: "var(--color-text-primary)",
          }}
        >
          <FcGoogle className="h-5 w-5" />
          {isSocialLoading ? "Logging in ..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
}
