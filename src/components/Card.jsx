import React from 'react'

export default function Card({ title, icon, children }) {
    return (
        <div className="bg-white shadow rounded-lg p-6 flex flex-col">
            {/* Encabezado con icono y título */}
            <div className="flex items-center mb-4">
                {icon && <div className="mr-3">{icon}</div>}
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            {/* Contenido dinámico */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}