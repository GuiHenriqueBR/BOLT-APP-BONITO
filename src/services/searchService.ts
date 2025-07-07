// Enhanced Search Service with real-time capabilities
class SearchService {
  private baseURL: string;
  private cache: Map<string, any> = new Map();
  private debounceTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  }

  // Real-time search with debouncing
  async searchRealTime(
    query: string, 
    filters: SearchFilters = {}, 
    callback: (results: SearchResult[]) => void
  ): Promise<void> {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(async () => {
      try {
        const results = await this.search(query, filters);
        callback(results);
      } catch (error) {
        console.error('Real-time search error:', error);
        callback([]);
      }
    }, 300);
  }

  // Main search function
  async search(
    query: string, 
    filters: SearchFilters = {}, 
    page: number = 1, 
    limit: number = 20
  ): Promise<SearchResponse> {
    const cacheKey = this.generateCacheKey(query, filters, page, limit);
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
      ...this.filtersToParams(filters)
    });

    try {
      const response = await fetch(`${this.baseURL}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache results for 5 minutes
      this.cache.set(cacheKey, data);
      setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);

      return data;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  // Get search suggestions
  async getSuggestions(query: string): Promise<string[]> {
    if (query.length < 2) return [];

    try {
      const response = await fetch(`${this.baseURL}/search/suggestions?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Suggestions failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Suggestions error:', error);
      return [];
    }
  }

  // Get popular searches
  async getPopularSearches(): Promise<string[]> {
    // Simulate async operation with a small delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return mock data directly instead of making a network request
    return ['Eletricista', 'Encanador', 'Limpeza', 'Marceneiro', 'Pintor', 'Jardinagem', 'Reforma', 'Informática'];
  }

  // Get search filters
  async getFilters(): Promise<SearchFiltersConfig> {
    try {
      const response = await fetch(`${this.baseURL}/search/filters`);
      
      if (!response.ok) {
        throw new Error(`Filters failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Filters error:', error);
      return this.getDefaultFilters();
    }
  }

  private generateCacheKey(query: string, filters: SearchFilters, page: number, limit: number): string {
    return `${query}-${JSON.stringify(filters)}-${page}-${limit}`;
  }

  private filtersToParams(filters: SearchFilters): Record<string, string> {
    const params: Record<string, string> = {};
    
    if (filters.category) params.category = filters.category;
    if (filters.location) params.location = filters.location;
    if (filters.priceMin) params.priceMin = filters.priceMin.toString();
    if (filters.priceMax) params.priceMax = filters.priceMax.toString();
    if (filters.rating) params.rating = filters.rating.toString();
    if (filters.verified) params.verified = filters.verified.toString();
    if (filters.availability) params.availability = filters.availability;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    return params;
  }

  private getDefaultFilters(): SearchFiltersConfig {
    return {
      categories: [
        'Elétrica', 'Hidráulica', 'Marcenaria', 'Limpeza', 
        'Jardinagem', 'Pintura', 'Reforma', 'Informática'
      ],
      locations: [
        'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG',
        'Salvador, BA', 'Brasília, DF', 'Curitiba, PR'
      ],
      priceRanges: [
        { label: 'Até R$ 100', min: 0, max: 100 },
        { label: 'R$ 100 - R$ 300', min: 100, max: 300 },
        { label: 'R$ 300 - R$ 500', min: 300, max: 500 },
        { label: 'Acima de R$ 500', min: 500, max: null }
      ],
      sortOptions: [
        { value: 'relevance', label: 'Relevância' },
        { value: 'rating', label: 'Melhor Avaliação' },
        { value: 'price_asc', label: 'Menor Preço' },
        { value: 'price_desc', label: 'Maior Preço' },
        { value: 'distance', label: 'Distância' }
      ]
    };
  }
}

// Types
export interface SearchFilters {
  category?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  verified?: boolean;
  availability?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  id: string;
  type: 'professional' | 'service';
  title: string;
  description: string;
  image?: string;
  rating: number;
  reviewsCount: number;
  price?: number;
  location: string;
  verified: boolean;
  availability: string;
  professional?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  totalPages: number;
  filters: SearchFiltersConfig;
}

export interface SearchFiltersConfig {
  categories: string[];
  locations: string[];
  priceRanges: Array<{
    label: string;
    min: number;
    max: number | null;
  }>;
  sortOptions: Array<{
    value: string;
    label: string;
  }>;
}

export const searchService = new SearchService();