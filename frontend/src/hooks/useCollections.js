import { useState, useEffect, useCallback } from 'react';
import { collectionsService } from '@/services/collectionsService';

export function useCollections() {
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            setIsLoading(true);
            const data = await collectionsService.getAll();
            setCollections(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addCollection = useCallback(async (name) => {
        if (!name.trim()) return;
        try {
            const newCollection = await collectionsService.create(name);
            setCollections(prev => [...prev, newCollection]);
            return newCollection;
        } catch (err) {
            setError(err);
            throw err;
        }
    }, []);

    const deleteCollection = useCallback(async (id) => {
        if (!window.confirm("Are you sure you want to delete this collection?")) return;
        try {
            await collectionsService.delete(id);
            setCollections(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            setError(err);
            throw err;
        }
    }, []);

    return {
        collections,
        error,
        isLoading,
        addCollection,
        deleteCollection,
    };
}
