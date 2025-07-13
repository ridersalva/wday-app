import React from 'react'
import Card from '../components/Card'
import { useGuests } from '../hooks/useGuests'

export default function GuestsContent() {
    const { guests } = useGuests()

    return (
        <Card title="Primeros invitados">
            <ul className="space-y-2">
                {guests.slice(0, 5).map(g => (
                    <li key={g.id} className="flex justify-between">
                        <span>{g.name} ({g.people})</span>
                        <span className={g.confirmed ? 'text-green-600' : 'text-red-600'}>
                            {g.confirmed ? '✔ Confirmado' : 'Pendiente'}
                        </span>
                    </li>
                ))}
            </ul>
        </Card>
    )
}