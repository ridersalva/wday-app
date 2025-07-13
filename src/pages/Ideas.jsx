import React, { useState } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { useIdeas } from '../hooks/useIdeas'
import { Lightbulb, Edit2, Trash2 } from 'lucide-react'

export default function Ideas() {
    const { ideas, addIdea, updateIdea, deleteIdea, loading } = useIdeas()
    const [isOpen, setOpen] = useState(false)
    const [form, setForm] = useState({ id: null, title: '', img: '' })

    const openForEdit = i => { setForm(i); setOpen(true) }
    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const handleSubmit = e => {
        e.preventDefault()
        if (form.id != null) updateIdea(form)
        else addIdea({ title: form.title, img: form.img })
        setForm({ id: null, title: '', img: '' }); setOpen(false)
    }

    if (loading) return <p>Cargando ideas…</p>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Ideas de decoración</h2>
                <button onClick={() => setOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">
                    Añadir idea
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map(i => (
                    <Card key={i.id} title={i.title} icon={<Lightbulb size={20} />}>
                        <img src={i.img} alt={i.title} className="w-full h-40 object-cover rounded" />
                        <div className="mt-2 flex justify-end space-x-2">
                            <button onClick={() => openForEdit(i)}><Edit2 size={18} /></button>
                            <button onClick={() => deleteIdea(i.id)}><Trash2 size={18} className="text-red-600" /></button>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={isOpen} onClose={() => { setOpen(false); setForm({ id: null, title: '', img: '' }) }} title={form.id ? 'Editar idea' : 'Crear idea'}>
                {/* Formulario con title e img idéntico al anterior */}
            </Modal>
        </div>
    )
}