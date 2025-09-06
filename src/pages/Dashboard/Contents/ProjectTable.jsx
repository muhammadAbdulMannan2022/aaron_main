import { useState } from "react"
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi"


export default function DataTable({ data }) {
    const [openActionId, setOpenActionId] = useState(null)

    const toggleAction = (id) => {
        setOpenActionId(openActionId === id ? null : id)
    }

    const handleEdit = (item) => {
        console.log("Edit:", item)
        setOpenActionId(null)
    }

    const handleDelete = (item) => {
        console.log("Delete:", item)
        setOpenActionId(null)
    }

    const handleView = (item) => {
        console.log("View:", item)
    }

    const handleStart = (item) => {
        console.log("Start:", item)
    }

    return (
        <div className="bg-[#0f0f0f] rounded-lg overflow-hidden">
            {/* Table container with horizontal scroll */}
            <div className="overflow-x-auto pb-20">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-800">
                            <th className="px-6 py-4 text-left text-sm font-medium text-main-text">Process</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-main-text">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-main-text">Department</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-main-text">Team</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-main-text">Upload Files</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-main-text">Analysis</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-main-text">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-sm text-dark-text">{item.process}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-dark-text">{item.date}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-dark-text">{item.department}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-dark-text">{item.team}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleView(item)}
                                        className="text-[#05478B] hover:text-[#055aaf] underline hover:cursor-pointer text-sm font-medium transition-colors"
                                    >
                                        View
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleStart(item)}
                                        className="text-[#05478B] hover:text-[#055aaf] underline hover:cursor-pointer text-sm font-medium transition-colors"
                                    >
                                        Start
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="relative">
                                        <button
                                            onClick={() => toggleAction(item.id)}
                                            className="inline-flex items-center justify-center hover:cursor-pointer w-8 h-8 rounded-full hover:bg-gray-800 transition-colors"
                                        >
                                            <FiMoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>

                                        {/* Action dropdown */}
                                        {openActionId === item.id && (
                                            <>
                                                {/* Backdrop to close dropdown */}
                                                <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)} />

                                                <div className="absolute right-0 top-full mt-1 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-700 z-20">
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-notActive hover:cursor-pointer hover:bg-gray-800 transition-colors"
                                                        >
                                                            <FiEdit2 className="w-4 h-4 text-text-notActive" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item)}
                                                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:cursor-pointer hover:bg-gray-800 transition-colors"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
