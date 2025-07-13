import React from 'react'

export default function Tabs({ tabs, currentTab, onTabChange }) {
    return (
        <div
            className="border-b border-gray-200 mb-6"
            role="tablist"
            aria-label="Secciones del dashboard"
        >
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-controls={`panel-${tab.id}`}
                    aria-selected={currentTab === tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${currentTab === tab.id
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}