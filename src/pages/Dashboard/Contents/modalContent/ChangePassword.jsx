import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useChangePasswordWhenLoggedInMutation } from "../../../../../redux/api/api";

export function ChangePasswordForm({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [change, { isLoading }] = useChangePasswordWhenLoggedInMutation();

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const res = await change({
        old_password: oldPassword,
        new_password: newPassword,
      }).unwrap();

      // ✅ success
      onClose?.();
    } catch (error) {
      // ❌ error (API or validation)
      console.error("Password change failed:", error);
      setErrorMsg(
        error?.data?.detail ||
          error?.data?.Message ||
          error?.message ||
          "Failed to change password. Please try again."
      );
    }
  };

  const inputClass =
    "w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="bg-[#0f0f0f] text-white p-8 rounded-lg max-w-md w-full md:w-md">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Change Password
      </h2>

      {errorMsg && (
        <div className="mb-4 text-red-500 text-sm text-center">{errorMsg}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium mb-3">Old Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className={inputClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowOld((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium mb-3">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className={inputClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={inputClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#574bff] hover:bg-[#574bff]/80 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Confirm"}
        </button>
      </form>
    </div>
  );
}
