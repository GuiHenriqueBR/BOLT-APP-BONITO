import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, TrendingUp, Clock, MapPin } from 'lucide-react';
import { searchService, SearchFilters, SearchResult } from '../../services/searchService';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "O que você está procurando?",
  showFilters = true,
  className = ""
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load popular searches and recent searches
    loadPopularSearches();
    loadRecentSearches();

    // Click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setShowFiltersPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Get suggestions when query changes
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

  const loadRecentSearches = () => {
    const recent = localStorage.getItem('recentSearches');
    if (recent) {
      setRecentSearches(JSON.parse(recent));
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

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    // Save to recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

    // Hide suggestions
    setShowSuggestions(false);

    // Call search callback or navigate
    if (onSearch) {
      onSearch(searchQuery, filters);
    } else {
      const params = new URLSearchParams({ q: searchQuery });
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.set(key, value.toString());
        }
      });
      navigate(`/search?${params.toString()}`);
    }

    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setShowFiltersPanel(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Main Search Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
        
        <div className="relative glass-morphism rounded-2xl shadow-ultra">
          <div className="flex items-center">
            <Search className="absolute left-6 text-gray-400 dark:text-gray-500 w-6 h-6 z-10" />
            
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              className="w-full pl-16 pr-20 py-4 text-lg border-0 rounded-2xl focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 bg-transparent text-gray-900 dark:text-white"
            />

            <div className="absolute right-3 flex items-center space-x-2">
              {query && (
                <button
                  onClick={clearSearch}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              
              {showFilters && (
                <button
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    showFiltersPanel 
                      ? 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={() => handleSearch()}
                disabled={isLoading}
                className="btn-primary px-6 py-2 text-base disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Buscar'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-morphism rounded-2xl shadow-ultra z-50 max-h-96 overflow-y-auto animate-fade-in-up">
          
          {/* Recent Searches */}
          {recentSearches.length > 0 && !query && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Buscas Recentes
              </h4>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

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

      {/* Filters Panel */}
      {showFiltersPanel && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-morphism rounded-2xl shadow-ultra z-50 p-6 animate-fade-in-up">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filtros de Busca</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                <option value="eletrica">Elétrica</option>
                <option value="hidraulica">Hidráulica</option>
                <option value="marcenaria">Marcenaria</option>
                <option value="limpeza">Limpeza</option>
                <option value="jardinagem">Jardinagem</option>
                <option value="pintura">Pintura</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Localização
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cidade, Estado"
                  value={filters.location || ''}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value || undefined })}
                  className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Faixa de Preço
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) => setFilters({ ...filters, priceMin: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) => setFilters({ ...filters, priceMax: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => {
                setFilters({});
                setShowFiltersPanel(false);
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Limpar Filtros
            </button>
            
            <button
              onClick={() => {
                handleSearch();
                setShowFiltersPanel(false);
              }}
              className="btn-primary px-6 py-2"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;