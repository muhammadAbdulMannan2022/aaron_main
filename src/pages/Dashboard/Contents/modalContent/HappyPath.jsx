
import { useState } from "react"
import { Edit3 } from "lucide-react"
import { Modal } from "../../../../helpers/Modal"



export function HappyPathSetup({ isOpen, onClose }) {
    const [steps, setSteps] = useState([
        { id: "1", step: "P1", activity: "Invoice sent", duration: "25 min", hours: 0, minutes: 25 },
        { id: "2", step: "P2", activity: "Invoice sent", duration: "25 min", hours: 0, minutes: 25 },
        { id: "3", step: "P3", activity: "Invoice sent", duration: "25 min", hours: 0, minutes: 25 },
        { id: "4", step: "P4", activity: "Invoice sent", duration: "25 min", hours: 0, minutes: 25 },
        { id: "5", step: "P4", activity: "Invoice sent", duration: "35 min", hours: 0, minutes: 35 },
        { id: "6", step: "P4", activity: "Invoice sent", duration: "5 min", hours: 0, minutes: 5 },
        { id: "7", step: "P4", activity: "Invoice sent", duration: "25 min", hours: 0, minutes: 25 },
        { id: "8", step: "P4", activity: "Invoice sent", duration: "25 min", hours: 0, minutes: 25 },
        { id: "9", step: "P4", activity: "Invoice sent", duration: "25 min", hours: 0, minutes: 25 },
        { id: "10", step: "P4", activity: "Invoice sent", duration: "Set time", hours: 0, minutes: 0 },
    ])

    const [editingStep, setEditingStep] = useState(null)
    const [tempHours, setTempHours] = useState(0)
    const [tempMinutes, setTempMinutes] = useState(0)

    const handleEditDuration = (step) => {
        setEditingStep(step)
        setTempHours(step.hours)
        setTempMinutes(step.minutes)
    }

    const handleSaveDuration = () => {
        if (editingStep) {
            const newDuration = tempHours > 0 ? `${tempHours}h ${tempMinutes}min` : `${tempMinutes} min`

            setSteps(
                steps.map((step) =>
                    step.id === editingStep.id
                        ? { ...step, duration: newDuration, hours: tempHours, minutes: tempMinutes }
                        : step,
                ),
            )
        }
        setEditingStep(null)
    }

    const handleSubmit = () => {
        console.log("Happy path setup submitted:", steps)
        onClose()
    }

    return (
        <>

            <div className="w-full md:w-lg max-w-lg " style={{ backgroundColor: "var(--color-main-bg)", color: "var(--color-text-primary)" }}>
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Happy path setup</h2>
                    <p style={{ color: "var(--color-dark-text)" }}>Empowering hotels and restaurants with AI-</p>
                </div>

                {/* Complete path section */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Complete path</h3>

                    {/* Table header */}
                    <div
                        className="grid grid-cols-4 gap-4 mb-4 pb-2 border-b"
                        style={{ borderColor: "var(--color-gray-button-bg)" }}
                    >
                        <div style={{ color: "var(--color-dark-text)" }}>Process step</div>
                        <div style={{ color: "var(--color-dark-text)" }}>Activity</div>
                        <div style={{ color: "var(--color-dark-text)" }}>Duration</div>
                        <div className="text-end" style={{ color: "var(--color-dark-text)" }}>Edit</div>
                    </div>

                    {/* Table rows */}
                    <div className="space-y-3 max-h-96 overflow-y-auto element-with-scrolling">
                        {steps.map((step) => (
                            <div key={step.id} className="grid grid-cols-4 gap-4 items-center py-2">
                                <div className="font-medium">{step.step}</div>
                                <div style={{ color: "var(--color-dark-text)" }}>{step.activity}</div>
                                <div
                                    style={{
                                        color: step.duration === "Set time" ? "var(--color-dark-text)" : "var(--color-text-primary)",
                                    }}
                                >
                                    {step.duration}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleEditDuration(step)}
                                        className="p-1 rounded hover:opacity-70 transition-opacity"
                                        style={{ color: "var(--color-outer-button-bg)" }}
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit button */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 rounded-lg font-medium transition-opacity hover:opacity-90 hover:cursor-pointer"
                    style={{
                        backgroundColor: "var(--color-outer-button-bg)",
                        color: "var(--color-text-primary)",
                    }}
                >
                    Confirm and Submit
                </button>
            </div>


            {/* Duration edit modal */}
            <Modal isOpen={!!editingStep} onClose={() => setEditingStep(null)} className="max-w-sm">
                <div style={{ backgroundColor: "var(--color-main-bg)", color: "var(--color-text-primary)" }}>
                    <h3 className="text-lg font-medium mb-6 text-center">Set up Duration</h3>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                min="0"
                                max="23"
                                value={tempHours.toString().padStart(2, "0")}
                                onChange={(e) => setTempHours(Math.max(0, Math.min(23, Number.parseInt(e.target.value) || 0)))}
                                className="w-16 h-12 text-center text-xl font-medium rounded border-0 outline-none"
                                style={{
                                    backgroundColor: "var(--color-gray-button-bg)",
                                    color: "var(--color-text-primary)",
                                }}
                            />
                            <span className="text-sm mt-1" style={{ color: "var(--color-dark-text)" }}>
                                Hours
                            </span>
                        </div>

                        <span className="text-2xl font-bold">:</span>

                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={tempMinutes.toString().padStart(2, "0")}
                                onChange={(e) => setTempMinutes(Math.max(0, Math.min(59, Number.parseInt(e.target.value) || 0)))}
                                className="w-16 h-12 text-center text-xl font-medium rounded border-0 outline-none"
                                style={{
                                    backgroundColor: "var(--color-gray-button-bg)",
                                    color: "var(--color-text-primary)",
                                }}
                            />
                            <span className="text-sm mt-1" style={{ color: "var(--color-dark-text)" }}>
                                Minutes
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setEditingStep(null)}
                            className="flex-1 py-2 px-4 rounded font-medium transition-opacity hover:opacity-70"
                            style={{
                                backgroundColor: "var(--color-gray-button-bg)",
                                color: "var(--color-text-primary)",
                            }}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleSaveDuration}
                            className="flex-1 py-2 px-4 rounded font-medium transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: "var(--color-outer-button-bg)",
                                color: "var(--color-text-primary)",
                            }}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </Modal>

        </>
    )
}
