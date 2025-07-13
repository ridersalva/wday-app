import React, { createContext, useContext, useState, useEffect } from 'react'

const API_URL = 'http://localhost:4000'
const AppContext = createContext(null)

export function AppProvider({ children }) {
    const [tasks, setTasks] = useState([])
    const [guests, setGuests] = useState([])
    const [ideas, setIdeas] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadAll() {
            setLoading(true)
            const [tRes, gRes, iRes] = await Promise.all([
                fetch(`${API_URL}/tasks`),
                fetch(`${API_URL}/guests`),
                fetch(`${API_URL}/ideas`)
            ])
            const [t, g, i] = await Promise.all([tRes.json(), gRes.json(), iRes.json()])
            setTasks(t)
            setGuests(g)
            setIdeas(i)
            setLoading(false)
        }
        loadAll()
    }, [])

    const addGuest = async guest => {
        const res = await fetch(`${API_URL}/guests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guest)
        })
        const newGuest = await res.json()
        setGuests(prev => [...prev, newGuest])
    }

    const updateGuest = async updated => {
        const res = await fetch(`${API_URL}/guests/${updated.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: updated.name,
                people: updated.people,
                confirmed: updated.confirmed
            })
        })
        if (!res.ok) throw new Error(`PATCH /guests/${updated.id} falló (${res.status})`)
        const newGuest = await res.json()
        setGuests(prev => prev.map(g => (g.id === newGuest.id ? newGuest : g)))
    }

    const deleteGuest = async id => {
        await fetch(`${API_URL}/guests/${id}`, { method: 'DELETE' })
        setGuests(prev => prev.filter(g => g.id !== id))
    }

    return (
        <AppContext.Provider
            value={{
                tasks,
                guests,
                ideas,
                loading,
                addGuest,
                updateGuest,
                deleteGuest,
                // ... asegúrate de exportar aquí también addTask, updateTask, deleteTask, etc.
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider')
    return ctx
}