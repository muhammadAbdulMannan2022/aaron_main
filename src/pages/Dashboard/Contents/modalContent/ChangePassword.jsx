import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"

export function ChangePasswordForm({ onClose }) {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Password change submitted:", { oldPassword, newPassword, confirmPassword })
        onClose?.()
    }

    const inputClass =
        "w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

    return (
        <div className="bg-black text-white p-8 rounded-lg max-w-md w-full md:w-md">
            <h2 className="text-2xl font-semibold text-center mb-8">Change Password</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Old Password */}
                <div>
                    <label className="block text-sm font-medium mb-3">Old Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 hover:cursor-pointer"
                        >
                            {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium mb-3">New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Confirm New Password */}
                <div>
                    <label className="block text-sm font-medium mb-3">Confirm New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-modal-button-bg hover:bg-modal-button-bg/80 hover:cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                    Confirm
                </button>
            </form>
        </div>
    )
}
