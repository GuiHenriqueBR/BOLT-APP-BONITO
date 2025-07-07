import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  DollarSign, 
  Clock, 
  Shield,
  Sliders,
  X,
  TrendingUp
} from 'lucide-react';
import { searchService, SearchFilters } from '../../services/searchService';

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  className?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    location: '',
    priceMin: undefined,
    priceMax: undefined,
    rating: undefined,
    verified: false,
    availability: '',
    sortBy: 'relevance',
    sortOrder: 'desc'
  });

  const categories = [
    'Elétrica', 'Hidráulica', 'Marcenaria', 'Limpeza', 
    'Jardinagem', 'Pintura', 'Reforma', 'Informática'
  ];

  const locations = [
    'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG',
    'Salvador, BA', 'Brasília, DF', 'Curitiba, PR'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'rating', label: 'Melhor Avaliação' },
    { value: 'price_asc', label: 'Menor Preço' },
    { value: 'price_desc', label: 'Maior Preço' },
    { value: 'distance', label: 'Distância' }
  ];

  useEffect(() => {
    loadPopularSearches();
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      getSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const loadPopularSearches = async () => {
    try {
      const popular = await searchService.getPopularSearches();
      setPopularSearches(popular);
    } catch (error) {
      console.error('Error loading popular searches:', error);
    }
  };

  const getSuggestions = async (searchQuery: string) => {
    try {
      const suggestions = await searchService.getSuggestions(searchQuery);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion, filters);
    setShowSuggestions(false);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (query) {
      onSearch(query, newFilters);
    }
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      category: '',
      location: '',
      priceMin: undefined,
      priceMax: undefined,
      rating: undefined,
      verified: false,
      availability: '',
      sortBy: 'relevance',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    if (query) {
      onSearch(query, clearedFilters);
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== undefined && value !== false && value !== 'relevance'
  );

  return (
    <div className={`relative ${className}`}>
      
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          
          <div className="relative glass-morphism rounded-2xl shadow-ultra">
            <div className="flex items-center">
              <Search className="absolute left-6 text-gray-400 dark:text-gray-500 w-6 h-6 z-10" />
              
              <input
                type="text"
                placeholder="Buscar profissionais, serviços..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-16 pr-32 py-4 text-lg border-0 rounded-2xl focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 bg-transparent text-gray-900 dark:text-white"
              />

              <div className="absolute right-3 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    showFilters || hasActiveFilters
                      ? 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Sliders className="w-5 h-5" />
                  {hasActiveFilters && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 text-base"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-morphism rounded-2xl shadow-ultra z-50 max-h-96 overflow-y-auto animate-fade-in-up">
          
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Sugestões
              </h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center"
                  >
                    <Search className="w-4 h-4 mr-3 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {popularSearches.length > 0 && !query && (
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Buscas Populares
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-morphism rounded-2xl shadow-ultra z-50 p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros Avançados</h4>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Limpar Filtros
                </button>
              )}
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Localização
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filters.location || ''}
                  onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
                  className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todas as cidades</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Faixa de Preço
              </label>
              <div className="flex space-x-2">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin || ''}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax || ''}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Avaliação Mínima
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleFilterChange('rating', rating === filters.rating ? undefined : rating)}
                    className={`p-1 transition-colors ${
                      filters.rating && rating <= filters.rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
                {filters.rating && (
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {filters.rating}+ estrelas
                  </span>
                )}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Disponibilidade
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filters.availability || ''}
                  onChange={(e) => handleFilterChange('availability', e.target.value || undefined)}
                  className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Qualquer horário</option>
                  <option value="today">Hoje</option>
                  <option value="this_week">Esta semana</option>
                  <option value="this_month">Este mês</option>
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ordenar por
              </label>
              <select
                value={filters.sortBy || 'relevance'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Verified Filter */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verified || false}
                onChange={(e) => handleFilterChange('verified', e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Apenas profissionais verificados
                </span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {(showSuggestions || showFilters) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSuggestions(false);
            setShowFilters(false);
          }}
        />
      )}
    </div>
  );
};

export default AdvancedSearch;