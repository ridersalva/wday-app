import { Menu } from 'lucide-react'

export default function Header({ toggleSidebar }) {
    // Datos mock para estadísticas rápidas
    const stats = {
        today: 12,
        guests: 87,
        tables: 42,
    }

    return (
        <header
          className= "flex items-center justify-between …"
          role="banner">
            {/* Botón “hamburger” sólo en móvil */}
            <button
                className="md:hidden p-2 rounded hover:bg-gray-100"
                onClick={toggleSidebar}
                aria-label="Mostrar menú"
            >
                <Menu size={24} />
            </button>

            {/* Título o logo */}
            <h1 className="text-xl font-semibold md:ml-2">WDay Dashboard</h1>

            {/* Estadísticas rápidas (ocultas en xs) */}
            <ul className="hidden sm:flex space-x-6">
                <li className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Hoy</span>
                    <span className="text-lg font-medium">{stats.today}</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Invitados</span>
                    <span className="text-lg font-medium">{stats.guests}</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Mesas</span>
                    <span className="text-lg font-medium">{stats.tables}</span>
                </li>
            </ul>
        </header>
    )
}