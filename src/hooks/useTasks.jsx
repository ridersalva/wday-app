import { useApp } from '../context/AppContext'
export function useTasks() {
    const { tasks, addTask, updateTask, deleteTask, loading } = useApp()
    return { tasks, addTask, updateTask, deleteTask, loading }
}