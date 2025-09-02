"use client"

import type React from "react"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
    overlayClassName?: string
    showCloseButton?: boolean
}

export function Modal({ isOpen, onClose, children, className, overlayClassName, showCloseButton = true }: ModalProps) {
    // Handle escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName || ""}`}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

            {/* Modal Content */}
            <div
                className={`relative w-fit max-w-4xl border border-gray-button-bg bg-main-bg max-h-[90vh] overflow-auto bg-card flex items-center justify-center rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 ${className || ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute hover:cursor-pointer right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <X className="h-5 w-5 text-white" />
                        <span className="sr-only">Close</span>
                    </button>
                )}

                {/* Modal Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>,
        document.body,
    )
}
