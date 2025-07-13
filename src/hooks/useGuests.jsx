import { useApp } from '../context/AppContext'
export function useGuests() {
    const { guests, addGuest, updateGuest, deleteGuest, loading } = useApp()
    return { guests, addGuest, updateGuest, deleteGuest, loading }
}