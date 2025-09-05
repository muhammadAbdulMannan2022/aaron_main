import { useState } from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"

export default function ProcessVariantsModal({ onClose, onSelect }) {
    const variants = [
        { id: "1", name: "variant A", count: 20 },
        { id: "2", name: "variant B", count: 10 },
        { id: "3", name: "variant C", count: 10 },
        { id: "4", name: "variant D", count: 15 },
        { id: "5", name: "variant E", count: 8 },
        { id: "6", name: "variant F", count: 12 },
        { id: "7", name: "variant G", count: 5 },
    ]
    const [selectedVariants, setSelectedVariants] = useState(new Set())
    const [isExpanded, setIsExpanded] = useState(false)

    const handleVariantToggle = (variantId) => {
        const newSelected = new Set(selectedVariants)

        if (newSelected.has(variantId)) {
            newSelected.delete(variantId)
        } else if (newSelected.size < 5) {
            newSelected.add(variantId)
        }

        setSelectedVariants(newSelected)
    }

    const handleSelect = () => {
        const selected = variants.filter((variant) => selectedVariants.has(variant.id))
        onClose()
        // onSelect(selected)
    }

    const selectedCount = selectedVariants.size

    return (
        <div className="p-4 w-full md:w-md max-w-md">
            <div className="mb-6">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between p-4 bg-[var(--color-gray-button-bg)] hover:bg-opacity-80 transition-colors rounded-lg border border-[var(--color-button-outline)]"
                >
                    <span className="text-[var(--color-text-primary)] font-medium">Select ({variants && variants.length})</span>
                    {isExpanded ? (
                        <ChevronUp size={20} className="text-[var(--color-main-icon)]" />
                    ) : (
                        <ChevronDown size={20} className="text-[var(--color-main-icon)]" />
                    )}
                </button>

                {isExpanded && (
                    <div className="mt-2 border border-[var(--color-button-outline)] rounded-lg bg-[var(--color-main-bg)] max-h-64 overflow-y-auto">
                        {variants.map((variant, index) => (
                            <div
                                key={variant.id}
                                className={`flex items-center justify-between p-4 hover:bg-[var(--color-gray-button-bg)] transition-colors cursor-pointer ${variant && index !== variants.length - 1 ? "border-b border-[var(--color-gray-button-bg)]" : ""
                                    }`}
                                onClick={() => handleVariantToggle(variant.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div
                                            className={`w-5 h-5 border-2 rounded transition-colors ${selectedVariants.has(variant.id)
                                                ? "bg-[var(--color-outer-button-bg)] border-[var(--color-outer-button-bg)]"
                                                : "border-[var(--color-main-icon)]"
                                                }`}
                                        >
                                            {selectedVariants.has(variant.id) && (
                                                <Check size={12} className="text-white absolute top-0.5 left-0.5" />
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-[var(--color-text-primary)]">{variant.name}</span>
                                </div>
                                <span className="text-[var(--color-dark-text)] text-sm">{variant.count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Variants Display Section */}
            {selectedCount > 0 && (
                <div className="mb-6">
                    <h3 className="text-[var(--color-text-primary)] text-sm font-medium mb-3">Selected Variants:</h3>
                    <div className="space-y-2">
                        {variants
                            .filter((variant) => selectedVariants.has(variant.id))
                            .map((variant) => (
                                <div
                                    key={`selected-${variant.id}`}
                                    className="flex items-center justify-between p-3 bg-[var(--color-gray-button-bg)] rounded-lg border border-[var(--color-button-outline)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-[var(--color-outer-button-bg)] border-2 border-[var(--color-outer-button-bg)] rounded flex items-center justify-center">
                                            <Check size={12} className="text-white" />
                                        </div>
                                        <span className="text-[var(--color-text-primary)]">{variant.name}</span>
                                    </div>
                                    <span className="text-[var(--color-dark-text)] text-sm">{variant.count}</span>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Selection Info */}
            {selectedCount > 0 && (
                <div className="mb-4 text-sm text-[var(--color-dark-text)]">{selectedCount}/5 variants selected</div>
            )}

            {/* Select Button */}
            <button
                onClick={handleSelect}
                disabled={selectedCount === 0}
                className="w-full bg-[var(--color-auth-button-bg)] hover:cursor-pointer hover:bg-[var(--color-modal-button-bg)] disabled:bg-[var(--color-gray-button-bg)] disabled:text-[var(--color-text-notActive)] text-white py-3 rounded-lg font-medium transition-colors"
            >
                Select
            </button>
        </div>

    )
}
