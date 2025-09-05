import { useState } from "react"
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Modal } from "../../../../helpers/Modal"
import ProcessVariantsModal from "./VarientOptions"

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const PROCESS_VARIANTS = [
    { id: "A", label: "A" },
    { id: "B", label: "B" },
    { id: "C", label: "C" },
    { id: "D", label: "D" },
    { id: "E", label: "E" },
]

export default function MainFilterDashboard({ onClose, onApply }) {
    const [currentDate, setCurrentDate] = useState(new Date(2021, 5)) // June 2021
    const [selectedDates, setSelectedDates] = useState([]) //[new Date(2021, 5, 8), new Date(2021, 5, 18)]
    const [selectedVariants, setSelectedVariants] = useState([]) // "A", "B", "C", "D"
    const [minCycleTime, setMinCycleTime] = useState("")
    const [maxCycleTime, setMaxCycleTime] = useState("")
    // variant modal
    const [variantModalOpen, setVariantModalOpen] = useState(false)



    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfWeek = firstDay.getDay()

        const days = []
        for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
        for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day))
        return days
    }

    const isDateSelected = (date) => {
        if (!date) return false
        return selectedDates.some((d) => d.toDateString() === date.toDateString())
    }

    const isDateInRange = (date) => {
        if (!date || selectedDates.length !== 2) return false
        const [start, end] = [...selectedDates].sort((a, b) => a - b)
        return date >= start && date <= end
    }

    const handleDateClick = (date) => {
        const isSelected = isDateSelected(date)
        if (isSelected) {
            setSelectedDates(selectedDates.filter((d) => d.toDateString() !== date.toDateString()))
        } else {
            if (selectedDates.length === 0) {
                setSelectedDates([date])
            } else if (selectedDates.length === 1) {
                setSelectedDates([...selectedDates, date])
            } else {
                setSelectedDates([date])
            }
        }
    }

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate)
        if (direction === "prev") newDate.setMonth(newDate.getMonth() - 1)
        else newDate.setMonth(newDate.getMonth() + 1)
        setCurrentDate(newDate)
    }

    const handleVariantToggle = (variantId) => {
        if (selectedVariants.includes(variantId)) {
            setSelectedVariants(selectedVariants.filter((id) => id !== variantId))
        } else if (selectedVariants.length < 5) {
            setSelectedVariants([...selectedVariants, variantId])
        }
    }

    const handleApply = () => {
        // onApply({
        //     selectedDates,
        //     processVariants: selectedVariants,
        //     minCycleTime,
        //     maxCycleTime,
        // })
        onClose()
    }

    const days = getDaysInMonth(currentDate)

    return (
        <div className="p-6 space-y-6">
            {/* Calendar */}
            <div>
                <div className="flex items-center justify-between mb-4 text-gray-300">
                    <button onClick={() => navigateMonth("prev")} className="p-1 hover:bg-gray-700 rounded hover:cursor-pointer">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="font-medium">
                        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button onClick={() => navigateMonth("next")} className="p-1 hover:bg-gray-700 rounded hover:cursor-pointer">
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((day) => (
                        <div
                            key={day}
                            className="text-center text-xs font-medium py-2"
                            style={{ color: "var(--color-text-notActive)" }}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {days.map((date, index) => (
                        <button
                            key={index}
                            onClick={() => date && handleDateClick(date)}
                            disabled={!date}
                            className={`
                    aspect-square flex items-center justify-center text-sm rounded
                    ${!date ? "invisible" : "hover:bg-gray-700"}
                    ${date && (isDateSelected(date) || isDateInRange(date))
                                    ? "bg-auth-button-bg text-white"
                                    : "text-gray-300"
                                }
                  `}
                        >
                            {date?.getDate()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Process Variants */}
            <div>
                <h3 className="text-sm font-medium mb-3 text-text-primary">Select Process variants (Max 5)</h3>
                <div className="mb-3">
                    <button onClick={() => setVariantModalOpen(true)} className="text-xs flex items-center gap-2 bg-gray-button-bg text-text-primary px-3 py-2 hover:cursor-pointer">
                        Select variants
                        <ChevronRight size={14} />
                    </button>
                </div>
                <div className="flex gap-4">
                    {PROCESS_VARIANTS.map((variant) => (
                        <div
                            key={variant.id}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleVariantToggle(variant.id)}
                        >
                            {/* Custom Checkbox */}
                            <div
                                className={`w-5 h-5 flex items-center justify-center rounded-md border transition-colors
      ${selectedVariants.includes(variant.id)
                                        ? "bg-auth-button-bg border-auth-button-bg"
                                        : "border-gray-500 bg-transparent"
                                    }`}
                            >
                                {selectedVariants.includes(variant.id) && (
                                    <Check className="w-4 h-4 text-white" />
                                )}
                            </div>

                            {/* Label */}
                            <label
                                htmlFor={variant.id}
                                className="text-sm text-text-primary select-none"
                            >
                                {variant.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Case Filter */}
            <div>
                <h3 className="text-sm font-medium mb-3">Case Filter</h3>

                <div className="space-y-3">
                    <div>
                        <label className="block text-xs mb-1" style={{ color: "var(--color-text-notActive)" }}>
                            Min cycle time
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                placeholder="Ex. 1h"
                                value={minCycleTime}
                                onChange={(e) => setMinCycleTime(e.target.value)}
                                className="bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded px-2 py-1"
                            />
                            <input
                                placeholder="Ex. 30min"
                                className="bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded px-2 py-1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs mb-1" style={{ color: "var(--color-text-notActive)" }}>
                            Max cycle time
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                placeholder="Ex. 3h"
                                value={maxCycleTime}
                                onChange={(e) => setMaxCycleTime(e.target.value)}
                                className="bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded px-2 py-1"
                            />
                            <input
                                placeholder="Ex. 30min"
                                className="bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded px-2 py-1"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={handleApply}
                className="w-full text-white font-medium rounded py-2"
                style={{ backgroundColor: "var(--color-auth-button-bg)" }}
            >
                Apply
            </button>
            <Modal isOpen={variantModalOpen} onClose={() => setVariantModalOpen(false)}>
                <ProcessVariantsModal onClose={() => setVariantModalOpen(false)} />
            </Modal>
        </div>
    )
}
