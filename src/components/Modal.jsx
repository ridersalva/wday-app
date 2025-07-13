import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children }) {
    const overlayRef = useRef(null)
    const dialogRef = useRef(null)
    const lastFocused = useRef(null)

    useEffect(() => {
        if (isOpen) {
            // Guardar el último elemento con foco
            lastFocused.current = document.activeElement
            // Esperar a renderizar, luego enfocar el dialog
            setTimeout(() => dialogRef.current?.focus(), 0)
            // Añadir escucha de teclado
            const onKey = e => {
                if (e.key === 'Escape') onClose()
                if (e.key === 'Tab') {
                    // focus trap básico
                    const focusable = dialogRef.current.querySelectorAll(
                        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                    )
                    const first = focusable[0]
                    const last = focusable[focusable.length - 1]
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault()
                        last.focus()
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault()
                        first.focus()
                    }
                }
            }
            document.addEventListener('keydown', onKey)
            document.body.style.overflow = 'hidden' // prevenir scroll de fondo

            return () => {
                document.removeEventListener('keydown', onKey)
                document.body.style.overflow = null
                // devolver foco al elemento que lo tenía
                lastFocused.current?.focus()
            }
        }
    }, [isOpen])

    if (!isOpen) return null

    return ReactDOM.createPortal(
        <div
            ref={overlayRef}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                ref={dialogRef}
                className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-auto outline-none"
                tabIndex={-1}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h2 id="modal-title" className="text-lg font-medium">{title}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Cerrar modal"
                        className="p-2 hover:bg-gray-100 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>
                {/* Body */}
                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body
    )
}