import { useApp } from '../context/AppContext'
export function useIdeas() {
    const { ideas, addIdea, updateIdea, deleteIdea, loading } = useApp()
    return { ideas, addIdea, updateIdea, deleteIdea, loading }
}