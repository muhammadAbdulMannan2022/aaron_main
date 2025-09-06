import { useState } from "react"
import { FiTrash2, FiPlus } from "react-icons/fi"
import { Modal } from "../../../../helpers/Modal"
import { CsvUploadFormVariant } from "../../Contents/modalContent/CsvUploadFirst"
import { CsvUploadForm } from "../../Contents/modalContent/UploadCsv"
import { useNavigate } from "react-router"


const data = [
    {
        id: 1,
        process: "2 January, 2025",
        date: "2 January, 2025",
        analyzedCsv: "Customer Support",
        uploadedCsv: "Carolina Panthers",
        analysisType: "start",
    },
    {
        id: 2,
        process: "2 January, 2025",
        date: "2 January, 2025",
        analyzedCsv: "User Interface",
        uploadedCsv: "New Orleans Saints",
        analysisType: "start",
    },
    {
        id: 3,
        process: "3 January, 2025",
        date: "3 January, 2025",
        analyzedCsv: "Development",
        uploadedCsv: "San Francisco 49ers",
        analysisType: "report",
    },
    {
        id: 4,
        process: "4 January, 2025",
        date: "4 January, 2025",
        analyzedCsv: "Production",
        uploadedCsv: "Los Angeles Rams",
        analysisType: "start",
    },
    {
        id: 5,
        process: "5 January, 2025",
        date: "5 January, 2025",
        analyzedCsv: "Project Management",
        uploadedCsv: "Dallas Cowboys",
        analysisType: "start",
    },
    {
        id: 6,
        process: "6 January, 2025",
        date: "6 January, 2025",
        analyzedCsv: "Automation Testing",
        uploadedCsv: "Green Bay Packers",
        analysisType: "start",
    },
    {
        id: 7,
        process: "7 January, 2025",
        date: "7 January, 2025",
        analyzedCsv: "Automation Testing",
        uploadedCsv: "Minnesota Vikings",
        analysisType: "start",
    },
    {
        id: 8,
        process: "8 January, 2025",
        date: "8 January, 2025",
        analyzedCsv: "User Interface",
        uploadedCsv: "Atlanta Falcons",
        analysisType: "start",
    },
    {
        id: 9,
        process: "9 January, 2025",
        date: "9 January, 2025",
        analyzedCsv: "Automation Testing",
        uploadedCsv: "Detroit Lions",
        analysisType: "start",
    },
]
export default function BenchmarkTable() {
    const [openActionId, setOpenActionId] = useState(null)
    const navigate = useNavigate()

    // modals controle
    const [isUploading, setIsUploading] = useState(false)

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

    const handleStart = (item) => {
        console.log("Start:", item)
    }

    const handleReport = (item) => {
        console.log("Report:", item)
        navigate("/dashboard/v1/benchmarks/report")
    }

    const handleAdd = () => {
        setIsUploading(true)
        console.log("Add new benchmark")
    }

    return (
        <div className="bg-[#0f0f0f] text-white min-h-screen p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-medium text-text-primary">Comparison benchmarks</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-auth-button-bg hover:bg-auth-button-bg/80 hover:cursor-pointer text-white rounded-md transition-colors"
                >
                    Add
                    <FiPlus className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-black rounded-lg overflow-hidden">
                {/* Table container with horizontal scroll */}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Process</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Date</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Analyzed csv</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Uploaded CSV</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Analysis</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-text-notActive">{item.process}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-text-notActive">{item.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-text-notActive">{item.analyzedCsv}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-text-notActive">{item.uploadedCsv}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.analysisType === "report" ? (
                                            <button
                                                onClick={() => handleReport(item)}
                                                className="text-auth-button-bg hover:text-auth-button-bg/80 hover:cursor-pointer text-sm font-medium transition-colors"
                                            >
                                                Report
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleStart(item)}
                                                className="text-auth-button-bg hover:text-auth-button-bg/80 hover:cursor-pointer text-sm font-medium transition-colors"
                                            >
                                                Start
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-800 transition-colors hover:cursor-pointer"
                                        >
                                            <FiTrash2 className="w-4 h-4 text-red-700" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={isUploading} onClose={() => setIsUploading(false)}>
                <CsvUploadFormVariant onClose={() => setIsUploading(false)} />
            </Modal>

        </div>
    )
}
