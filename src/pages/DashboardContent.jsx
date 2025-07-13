import React from 'react'
import Card from '../components/Card'
import { ClipboardList, Users } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import { useGuests } from '../hooks/useGuests'

export default function DashboardContent() {
    const { tasks } = useTasks()
    const { guests } = useGuests()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Tareas pendientes" icon={<ClipboardList size={20} />}>
                <ul className="space-y-2">
                    {tasks.filter(t => !t.completed).map(t => (
                        <li key={t.id} className="flex justify-between">
                            <span>{t.name}</span>
                            <span className="text-sm text-gray-500">{t.due}</span>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card title="Invitados confirmados" icon={<Users size={20} />}>
                <p className="text-xl font-semibold">
                    {guests.filter(g => g.confirmed).length} / {guests.length}
                </p>
            </Card>
        </div>
    )
}