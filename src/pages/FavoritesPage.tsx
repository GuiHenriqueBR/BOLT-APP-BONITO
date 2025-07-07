import React, { useState, useEffect } from 'react';
import { Heart, Search, Filter, Grid, List, Trash2, Share2 } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { FavoriteItem } from '../services/favoritesService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ProfessionalCard from '../components/common/ProfessionalCard';
import ServiceCard from '../components/common/ServiceCard';

const FavoritesPage: React.FC = () => {
  const { favoriteItems, loading, removeFavorite, refreshFavorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'professional' | 'service'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    refreshFavorites();
  }, []);

  const filteredItems = favoriteItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || item.itemType === filter;
    return matchesSearch && matchesFilter;
  });

  const handleRemoveFavorite = async (itemId: string) => {
    await removeFavorite(itemId);
    refreshFavorites();
  };

  const handleBulkRemove = async () => {
    const promises = Array.from(selectedItems).map(itemId => removeFavorite(itemId));
    await Promise.all(promises);
    setSelectedItems(new Set());
    refreshFavorites();
  };

  const toggleItemSelection = (itemId: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const selectAll = () => {
    setSelectedItems(new Set(filteredItems.map(item => item.itemId)));
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      <div className="container-ultra py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meus Favoritos</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {favoriteItems.length} {favoriteItems.length === 1 ? 'item salvo' : 'itens salvos'}
              </p>
            </div>
          </div>
        </div>

        {favoriteItems.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Nenhum favorito ainda"
            description="Comece explorando profissionais e serviços para adicionar aos seus favoritos"
            action={{
              label: 'Explorar Serviços',
              onClick: () => window.location.href = '/search'
            }}
          />
        ) : (
          <>
            {/* Controls */}
            <div className="card-ultra-modern p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar nos favoritos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  {/* Filter */}
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as any)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">Todos</option>
                      <option value="professional">Profissionais</option>
                      <option value="service">Serviços</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedItems.size > 0 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedItems.size} {selectedItems.size === 1 ? 'item selecionado' : 'itens selecionados'}
                    </span>
                    <button
                      onClick={clearSelection}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      Limpar seleção
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleBulkRemove}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remover</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Items Grid/List */}
            {filteredItems.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-6'
              }>
                {filteredItems.map((item) => (
                  <div key={item.itemId} className="relative group">
                    {/* Selection Checkbox */}
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.itemId)}
                        onChange={() => toggleItemSelection(item.itemId)}
                        className="w-5 h-5 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                      />
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFavorite(item.itemId)}
                      className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-110"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {/* Item Card */}
                    {item.itemType === 'professional' ? (
                      <ProfessionalCard
                        id={item.itemId}
                        name={item.title}
                        avatar={item.image || ''}
                        rating={item.rating}
                        reviewsCount={0}
                        location={item.location}
                        category=""
                        description={item.description}
                        isVerified={true}
                        startingPrice={item.price || 0}
                        completedJobs={0}
                      />
                    ) : (
                      <ServiceCard
                        id={item.itemId}
                        title={item.title}
                        professional={{
                          name: '',
                          avatar: '',
                          rating: item.rating,
                          reviewsCount: 0,
                          location: item.location
                        }}
                        price={item.price || 0}
                        deliveryTime=""
                        image={item.image || ''}
                        category=""
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tente ajustar sua busca ou filtros
                </p>
              </div>
            )}

            {/* Quick Actions */}
            {filteredItems.length > 0 && (
              <div className="mt-12 text-center">
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={selectAll}
                    className="btn-outline px-6 py-3"
                  >
                    Selecionar Todos
                  </button>
                  <button className="btn-primary px-6 py-3">
                    <Share2 className="w-5 h-5 mr-2" />
                    Compartilhar Lista
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;