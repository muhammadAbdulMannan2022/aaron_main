import { ArrowLeft, ArrowRight, TrendingUp, PieChart, Target, BarChart3, Activity } from "lucide-react"
import { useState } from "react"

const AddWidgetSidebar = ({ isOpen, onClose, onAdd, onToggle, isopen }) => {
    const [selectedName, setSelectedName] = useState("")
    const [selectedWidget, setSelectedWidget] = useState("")

    const widgetOptions = [
        {
            id: "line-chart",
            name: "Line chart",
            description: "Display trends over time",
            icon: TrendingUp,
        },
        {
            id: "pie-chart",
            name: "Pie Chart",
            description: "Show proportional data",
            icon: PieChart,
        },
        {
            id: "progress-tracker",
            name: "Progress Tracker",
            description: "Compare different categories",
            icon: Target,
        },
        {
            id: "bar-chart",
            name: "Bar Chart",
            description: "Display trends over time",
            icon: BarChart3,
        },
        {
            id: "key-metrics",
            name: "Key Metrics",
            description: "Display trends over time",
            icon: Activity,
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedName.trim() || !selectedWidget) return

        onAdd({
            title: selectedName.trim(),
            type: selectedWidget,
            dataSource: selectedWidget,
        })

        setSelectedName("")
        setSelectedWidget("")
        onClose()
    }

    return (
        <div
            className={`w-80 h-full z-[999] shadow-md border-l transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} fixed right-0 z-50 h-auto min-h-0 sidebar`}
            style={{
                backgroundColor: "var(--color-main-bg)",
                color: "var(--color-text-primary)",
                borderLeftColor: "var(--color-gray-button-bg)",
                boxShadow: "0 4px 6px -1px var(--color-shadow-button-outer)",
            }}
        >
            <div className="flex flex-col min-h-0 relative">
                <div
                    onClick={onToggle}
                    className="absolute w-10 items-center justify-center -left-10 top-5 px-4 py-2 rounded-s-full cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                        backgroundColor: "var(--color-outer-button-bg)",
                        color: "var(--color-text-primary)",
                    }}
                >
                    {isopen ? <ArrowRight /> : <ArrowLeft />}
                </div>

                <div className="p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                            Insert KPI
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-main-text)" }}>
                                Select name
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedName}
                                    onChange={(e) => setSelectedName(e.target.value)}
                                    className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all appearance-none"
                                    style={{
                                        backgroundColor: "var(--color-gray-button-bg)",
                                        borderColor: "var(--color-gray-button-bg)",
                                        color: "var(--color-text-notActive)",
                                        "--tw-ring-color": "var(--color-outer-button-bg)",
                                    }}
                                >
                                    <option value="">Select one</option>
                                    <option value="Revenue">Revenue</option>
                                    <option value="Users">Users</option>
                                    <option value="Conversion">Conversion</option>
                                    <option value="Growth">Growth</option>
                                </select>
                                <ArrowRight
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                                    style={{ color: "var(--color-text-notActive)" }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3 mt-6">
                            {widgetOptions.map((widget) => {
                                const IconComponent = widget.icon
                                return (
                                    <div
                                        key={widget.id}
                                        onClick={() => setSelectedWidget(widget.id)}
                                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:opacity-80 ${selectedWidget === widget.id ? "ring-2" : ""
                                            }`}
                                        style={{
                                            backgroundColor: "var(--color-gray-button-bg)",
                                            borderColor: "var(--color-gray-button-bg)",
                                            "--tw-ring-color": selectedWidget === widget.id ? "var(--color-outer-button-bg)" : "transparent",
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <IconComponent
                                                className="w-5 h-5 mt-0.5 flex-shrink-0"
                                                style={{ color: "var(--color-landing-icon)" }}
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>
                                                    {widget.name}
                                                </h3>
                                                <p className="text-xs mt-1" style={{ color: "var(--color-text-notActive)" }}>
                                                    {widget.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex gap-2 mt-8 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border rounded-lg hover:opacity-80 transition-opacity"
                                style={{
                                    borderColor: "var(--color-button-outline)",
                                    color: "var(--color-text-notActive)",
                                    backgroundColor: "transparent",
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                                style={{
                                    backgroundColor: "var(--color-auth-button-bg)",
                                    color: "var(--color-text-primary)",
                                }}
                            >
                                Add Widget
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddWidgetSidebar
