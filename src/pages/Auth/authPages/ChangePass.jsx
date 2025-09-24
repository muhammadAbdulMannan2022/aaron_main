import React, { useState } from "react";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useChangePasswordMutation } from "../../../../redux/auth/auth";
import { useNavigate } from "react-router";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [changePass, { isLoading: isChangeLoading }] =
    useChangePasswordMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const id = localStorage.getItem("reset_token") || "";
    if (newPassword !== confirmPassword || !id) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const res = await changePass({ reset_token: id, password: newPassword });
      localStorage.removeItem("reset_token");
      navigate("/auth/login");
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error?.data?.Message || "Failed to change password. Try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-6 lg:p-8 h-full">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center hidden md:block">
          <h1
            className="text-2xl lg:text-3xl font-bold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Change Password
          </h1>
          <p className="text-sm text-text-primary">Keep your account secure</p>
        </div>

        {/* Error and Loading States */}
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error ||
              "An error occurred while changing the password. Please try again."}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLock
                  className="h-5 w-5"
                  style={{ color: "var(--color-main-icon)" }}
                />
              </div>
              <input
                id="newPassword"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
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
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer hover:opacity-70 transition-opacity"
              >
                {showNew ? (
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

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Confirm New Password
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
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
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
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer hover:opacity-70 transition-opacity"
              >
                {showConfirm ? (
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
            disabled={isChangeLoading}
            className="w-full hover:cursor-pointer py-3 px-4 rounded-lg font-medium text-white transition-all hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            style={{ backgroundColor: "var(--color-auth-button-bg)" }}
          >
            {isChangeLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
