import React, { useState, useCallback } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { useGuests } from '../hooks/useGuests'
import { Edit2, Trash2 } from 'lucide-react'

export default function Guests() {
    const { guests, addGuest, updateGuest, deleteGuest, loading } = useGuests()

    const [isOpen, setOpen] = useState(false)
    const [form, setForm] = useState({
        id: null,
        name: '',
        people: 1,
        confirmed: false
    })

    // Memoizamos el cierre para que Modal no pierda foco
    const handleClose = useCallback(() => {
        setOpen(false)
        setForm({ id: null, name: '', people: 1, confirmed: false })
    }, [])

    // Abre el modal con los datos al editar
    const openForEdit = guest => {
        setForm(guest)
        setOpen(true)
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : name === 'people'
                    ? +value
                    : value
        }))
    }

    // IMPORTANTE: async para await updateGuest / addGuest
    const handleSubmit = async e => {
        e.preventDefault()
        console.log('Form antes de save:', form)

        try {
            if (form.id != null) {
                console.log('Llamando a updateGuest…')
                await updateGuest(form)
                console.log('updateGuest completado')
            } else {
                console.log('Llamando a addGuest…')
                await addGuest({
                    name: form.name,
                    people: form.people,
                    confirmed: form.confirmed
                })
                console.log('addGuest completado')
            }

            console.log('Estado de guests tras save:', guests)
            handleClose()
        } catch (err) {
            console.error('Error guardando invitado', err)
        }
    }

    if (loading) {
        return <p>Cargando invitados…</p>
    }

    return (
        <div className="space-y-6">
            {/* Cabecera con botón */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Invitados</h2>
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    onClick={() => setOpen(true)}
                >
                    Añadir invitado
                </button>
            </div>

            {/* Tabla de invitados */}
            <Card title="Gestión de invitados">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Nombre</th>
                            <th className="py-2">Personas</th>
                            <th className="py-2">Estado</th>
                            <th className="py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map(g => (
                            <tr key={g.id} className="border-t">
                                <td className="py-2">{g.name}</td>
                                <td className="py-2">{g.people}</td>
                                <td className={`py-2 ${g.confirmed ? 'text-green-600' : 'text-red-600'}`}>
                                    {g.confirmed ? 'Confirmado' : 'Pendiente'}
                                </td>
                                <td className="py-2">
                                    <button
                                        onClick={() => openForEdit(g)}
                                        aria-label="Editar invitado"
                                        className="mr-2"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteGuest(g.id)}
                                        aria-label="Eliminar invitado"
                                    >
                                        <Trash2 size={18} className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {/* Modal de creación/edición */}
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                title={form.id ? 'Editar invitado' : 'Crear invitado'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div>
                        <label htmlFor="people" className="block text-sm font-medium">Número de personas</label>
                        <input
                            id="people"
                            name="people"
                            type="number"
                            min="1"
                            value={form.people}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="confirmed"
                            name="confirmed"
                            type="checkbox"
                            checked={form.confirmed}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label htmlFor="confirmed" className="ml-2 text-sm">Confirmado</label>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            {form.id ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}