import React from 'react'
import Card from '../components/Card'
import { useTasks } from '../hooks/useTasks'

export default function TasksContent() {
    const { tasks } = useTasks()

    return (
        <Card title="Últimas tareas">
            <ul className="space-y-2">
                {tasks.slice(0, 5).map(t => (
                    <li key={t.id} className="flex items-center justify-between">
                        <div>
                            <p className={t.completed ? 'line-through text-gray-400' : ''}>
                                {t.name}
                            </p>
                            <span className="text-sm text-gray-500">Para: {t.due}</span>
                        </div>
                        <input type="checkbox" checked={t.completed} readOnly />
                    </li>
                ))}
            </ul>
        </Card>
    )
}