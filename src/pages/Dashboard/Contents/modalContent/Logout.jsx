export function LogoutConfirmation({ onConfirm, onCancel }) {
    return (
        <div className="bg-black text-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Do you want to logout?
            </h2>

            <div className="flex gap-4 justify-center">
                {/* Confirm */}
                <button
                    onClick={onConfirm}
                    className="w-full bg-modal-button-bg hover:bg-modal-button-bg/80 hover:cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                    Yes
                </button>

                {/* Cancel */}
                <button
                    onClick={onCancel}
                    className="w-full bg-gray-800 hover:bg-gray-700 hover:cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-black"
                >
                    No
                </button>
            </div>
        </div>
    )
}
