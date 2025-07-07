import { useState, useEffect } from 'react';
import { favoritesService, FavoriteItem } from '../services/favoritesService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to favorites changes
    const unsubscribe = favoritesService.subscribe((updatedFavorites: string[]) => {
      setFavorites(updatedFavorites);
    });

    // Load initial favorites
    setFavorites(favoritesService.getFavorites());
    loadFavoriteItems();

    return unsubscribe;
  }, []);

  const loadFavoriteItems = async () => {
    try {
      setLoading(true);
      const items = await favoritesService.getFavoriteItems();
      setFavoriteItems(items);
    } catch (error) {
      console.error('Error loading favorite items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (itemId: string, itemType: 'professional' | 'service') => {
    return await favoritesService.addFavorite(itemId, itemType);
  };

  const removeFavorite = async (itemId: string) => {
    return await favoritesService.removeFavorite(itemId);
  };

  const toggleFavorite = async (itemId: string, itemType: 'professional' | 'service') => {
    return await favoritesService.toggleFavorite(itemId, itemType);
  };

  const isFavorite = (itemId: string) => {
    return favoritesService.isFavorite(itemId);
  };

  return {
    favorites,
    favoriteItems,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    refreshFavorites: loadFavoriteItems
  };
};