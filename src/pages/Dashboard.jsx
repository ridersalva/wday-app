import React, { useState } from 'react'
import Tabs from '../components/Tabs'
import DashboardContent from './DashboardContent'
import TasksContent from './TasksContent'
import GuestsContent from './GuestsContent'

export default function Dashboard() {
    const tabs = [
        { id: 'overview', label: 'Resumen' },
        { id: 'tasks', label: 'Tareas' },
        { id: 'guests', label: 'Invitados' },
    ]
    const [currentTab, setCurrentTab] = useState('overview')

    return (
        <div>
            <Tabs tabs={tabs} currentTab={currentTab} onTabChange={setCurrentTab} />
            {currentTab === 'overview' && <DashboardContent />}
            {currentTab === 'tasks' && <TasksContent />}
            {currentTab === 'guests' && <GuestsContent />}
        </div>
    )
}