import { NavLink } from 'react-router-dom'
import { Home, ClipboardList, Users, Gift } from 'lucide-react' // o react-icons

export default function Sidebar() {
    const links = [
        { to: '/', label: 'Dashboard', icon: <Home size={20} /> },
        { to: '/tasks', label: 'Tareas', icon: <ClipboardList size={20} /> },
        { to: '/guests', label: 'Invitados', icon: <Users size={20} /> },
        { to: '/ideas', label: 'Ideas', icon: <Gift size={20} /> },
    ]

    return (
        <aside className= "w-64 bg-white border-r hidden md:flex flex-col" 
        aria-label="Barra de navegación principal"
            role="navigation">
            <h2 className="text-2xl font-bold p-4">WDay</h2>
            <nav className="flex-1 px-2 space-y-1">
                {links.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-medium' : 'text-gray-600'
                            }`
                        }
                    >
                        <span className="mr-3">{icon}</span>
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}