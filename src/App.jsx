import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Guests from './pages/Guests'
import Ideas from './pages/Ideas'

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(open => !open)

    return (
        <BrowserRouter>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar: en móvil lo mostramos/ocultamos */}
                <aside
                    className={`
            fixed inset-y-0 left-0 z-20 w-64 bg-white border-r
            transform transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 md:flex md:flex-col
          `}
                >
                    <Sidebar />
                </aside>

                {/* Contenedor principal */}
                <div className="flex-1 flex flex-col">
                    <Header toggleSidebar={toggleSidebar} />

                    <main className="flex-1 p-6 overflow-auto">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/guests" element={<Guests />} />
                            <Route path="/ideas" element={<Ideas />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    )
}