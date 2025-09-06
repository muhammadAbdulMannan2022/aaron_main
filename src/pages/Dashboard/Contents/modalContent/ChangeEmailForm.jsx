import { useState } from "react"
import { Mail } from "lucide-react"


export function ChangeEmailForm({ onClose }) {
    const [oldEmail, setOldEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log("Email change submitted:", { oldEmail, newEmail, confirmEmail })
        onClose?.()
    }

    return (
        <div className="bg-[#0f0f0f] text-white p-8 rounded-lg max-w-md w-full md:w-md">
            <h2 className="text-2xl font-semibold text-center mb-8">Change Email</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-3">Enter Old Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            value={oldEmail}
                            onChange={(e) => setOldEmail(e.target.value)}
                            placeholder="Enter here"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-3">New Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Enter here"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-3">Confirm New Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            placeholder="Enter here"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
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
