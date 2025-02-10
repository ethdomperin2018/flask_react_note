import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collectionsService } from '@/services/collectionsService';

export const COLLECTIONS_QUERY_KEY = ['collections'];

export function useCollectionsQuery() {
    const queryClient = useQueryClient();

    const { data: collections = [], isLoading, error } = useQuery({
        queryKey: COLLECTIONS_QUERY_KEY,
        queryFn: () => collectionsService.getAll()
    });

    const addMutation = useMutation({
        mutationFn: (name) => collectionsService.create(name),
        onSuccess: (newCollection) => {
            queryClient.setQueryData(COLLECTIONS_QUERY_KEY, (old) => [...old, newCollection]);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => collectionsService.delete(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(COLLECTIONS_QUERY_KEY, (old) => 
                old.filter(c => c.id !== deletedId)
            );
        }
    });

    const renameMutation = useMutation({
        mutationFn: ({id, name}) => collectionsService.rename(id, name),
        onSuccess: (updatedCollection) => {
            queryClient.setQueryData(COLLECTIONS_QUERY_KEY, (old) => 
                old.map(c => c.id === updatedCollection.id ? updatedCollection : c)
            );
        }
    });

    const addCollection = async (name) => {
        if (!name.trim()) return;
        return addMutation.mutateAsync(name);
    };

    const deleteCollection = async (id) => {
        if (!window.confirm("Are you sure you want to delete this collection?")) return;
        return deleteMutation.mutateAsync(id);
    };

    const renameCollection = async (id, name) => {
        if (!name.trim()) return;
        return renameMutation.mutateAsync({id, name});
    };

    return {
        collections,
        isLoading,
        error,
        addCollection,
        deleteCollection,
        renameCollection
    };
}
