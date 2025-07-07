// Favorites Service with real-time sync
class FavoritesService {
  private baseURL: string;
  private favorites: Set<string> = new Set();
  private listeners: Function[] = [];

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    this.loadFavorites();
  }

  // Load user favorites
  async loadFavorites(): Promise<void> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      const response = await fetch(`${this.baseURL}/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.favorites = new Set(data.map((fav: any) => fav.itemId));
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      // Load from localStorage as fallback
      const localFavorites = localStorage.getItem('favorites');
      if (localFavorites) {
        this.favorites = new Set(JSON.parse(localFavorites));
        this.notifyListeners();
      }
    }
  }

  // Add to favorites
  async addFavorite(itemId: string, itemType: 'professional' | 'service'): Promise<boolean> {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        const response = await fetch(`${this.baseURL}/favorites`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemId, itemType })
        });

        if (!response.ok) {
          throw new Error('Failed to add favorite');
        }
      }

      this.favorites.add(itemId);
      this.saveFavoritesToLocal();
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      // Add locally as fallback
      this.favorites.add(itemId);
      this.saveFavoritesToLocal();
      this.notifyListeners();
      return false;
    }
  }

  // Remove from favorites
  async removeFavorite(itemId: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        const response = await fetch(`${this.baseURL}/favorites/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }
      }

      this.favorites.delete(itemId);
      this.saveFavoritesToLocal();
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Remove locally as fallback
      this.favorites.delete(itemId);
      this.saveFavoritesToLocal();
      this.notifyListeners();
      return false;
    }
  }

  // Toggle favorite
  async toggleFavorite(itemId: string, itemType: 'professional' | 'service'): Promise<boolean> {
    if (this.isFavorite(itemId)) {
      return await this.removeFavorite(itemId);
    } else {
      return await this.addFavorite(itemId, itemType);
    }
  }

  // Check if item is favorite
  isFavorite(itemId: string): boolean {
    return this.favorites.has(itemId);
  }

  // Get all favorites
  getFavorites(): string[] {
    return Array.from(this.favorites);
  }

  // Get favorite items with details
  async getFavoriteItems(): Promise<FavoriteItem[]> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return [];

      const response = await fetch(`${this.baseURL}/favorites/details`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error getting favorite items:', error);
    }
    
    return [];
  }

  // Subscribe to favorites changes
  subscribe(callback: Function): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(Array.from(this.favorites)));
  }

  private saveFavoritesToLocal(): void {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }
}

export interface FavoriteItem {
  id: string;
  itemId: string;
  itemType: 'professional' | 'service';
  title: string;
  description: string;
  image?: string;
  rating: number;
  price?: number;
  location: string;
  createdAt: string;
}

export const favoritesService = new FavoritesService();