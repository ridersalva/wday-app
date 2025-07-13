// src/pages/Tasks.jsx
import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { useTasks } from '../hooks/useTasks'
import { Edit2, Trash2 } from 'lucide-react'

export default function Tasks() {
    const { tasks, addTask, updateTask, deleteTask, loading } = useTasks()
    const [isOpen, setOpen] = useState(false)
    const [form, setForm] = useState({ id: null, name: '', due: '', completed: false })

    // Si editingId cambia, pre-cargar form
    const openForEdit = task => {
        setForm(task)
        setOpen(true)
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (form.id != null) {
            updateTask(form)
        } else {
            addTask({ name: form.name, due: form.due, completed: form.completed })
        }
        setForm({ id: null, name: '', due: '', completed: false })
        setOpen(false)
    }

    if (loading) return <p>Cargando tareas…</p>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Todas las tareas</h2>
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    onClick={() => setOpen(true)}
                >
                    Añadir tarea
                </button>
            </div>

            <Card title="Listado de tareas">
                <ul className="divide-y">
                    {tasks.map(t => (
                        <li key={t.id} className="py-3 flex items-center justify-between">
                            <div>
                                <p className={t.completed ? 'line-through text-gray-400' : ''}>
                                    {t.name}
                                </p>
                                <span className="text-sm text-gray-500">Fecha límite: {t.due}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => openForEdit(t)} aria-label="Editar tarea">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => deleteTask(t.id)} aria-label="Eliminar tarea">
                                    <Trash2 size={18} className="text-red-600" />
                                </button>
                                <input type="checkbox" checked={t.completed} readOnly />
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>

            <Modal isOpen={isOpen} onClose={() => { setOpen(false); setForm({ id: null, name: '', due: '', completed: false }) }} title={form.id ? 'Editar tarea' : 'Crear tarea'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ... mismos campos que antes ... */}
                    <div>
                        <label className="block text-sm">Nombre</label>
                        <input name="name" type="text" value={form.name} onChange={handleChange} required className="mt-1 w-full border rounded px-2 py-1" />
                    </div>
                    <div>
                        <label className="block text-sm">Fecha límite</label>
                        <input name="due" type="date" value={form.due} onChange={handleChange} required className="mt-1 w-full border rounded px-2 py-1" />
                    </div>
                    <div className="flex items-center">
                        <input name="completed" type="checkbox" checked={form.completed} onChange={handleChange} id="completed" />
                        <label htmlFor="completed" className="ml-2 text-sm">Completada</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded bg-gray-200">Cancelar</button>
                        <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">
                            {form.id ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}