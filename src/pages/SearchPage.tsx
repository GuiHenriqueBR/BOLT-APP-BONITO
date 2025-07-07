import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Sliders } from 'lucide-react';
import ProfessionalCard from '../components/common/ProfessionalCard';
import ServiceCard from '../components/common/ServiceCard';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewType, setViewType] = useState<'professionals' | 'services'>('professionals');

  const categories = [
    'Elétrica', 'Hidráulica', 'Marcenaria', 'Limpeza', 'Jardinagem', 'Pintura',
    'Reforma', 'Informática', 'Automóveis', 'Educação', 'Saúde', 'Beleza'
  ];

  const cities = [
    'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Salvador, BA',
    'Brasília, DF', 'Curitiba, PR', 'Recife, PE', 'Porto Alegre, RS'
  ];

  const mockProfessionals = [
    {
      id: '1',
      name: 'Carlos Silva',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.9,
      reviewsCount: 156,
      location: 'São Paulo, SP',
      category: 'Elétrica',
      description: 'Eletricista com 15 anos de experiência em instalações residenciais e comerciais.',
      isVerified: true,
      startingPrice: 80,
      completedJobs: 234
    },
    {
      id: '2',
      name: 'Maria Santos',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.8,
      reviewsCount: 89,
      location: 'Rio de Janeiro, RJ',
      category: 'Hidráulica',
      description: 'Especialista em reparos hidráulicos, vazamentos e instalações.',
      isVerified: true,
      startingPrice: 60,
      completedJobs: 167
    },
    {
      id: '3',
      name: 'João Ferreira',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5.0,
      reviewsCount: 203,
      location: 'Belo Horizonte, MG',
      category: 'Marcenaria',
      description: 'Marceneiro especializado em móveis planejados e restauração.',
      isVerified: true,
      startingPrice: 120,
      completedJobs: 145
    }
  ];

  const mockServices = [
    {
      id: '1',
      title: 'Instalação Elétrica Completa',
      professional: {
        name: 'Carlos Silva',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        rating: 4.9,
        reviewsCount: 156,
        location: 'São Paulo, SP'
      },
      price: 150.00,
      deliveryTime: '2-3 dias',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'Elétrica'
    },
    {
      id: '2',
      title: 'Reparo de Vazamentos',
      professional: {
        name: 'Maria Santos',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        rating: 4.8,
        reviewsCount: 89,
        location: 'Rio de Janeiro, RJ'
      },
      price: 80.00,
      deliveryTime: 'Mesmo dia',
      image: 'https://images.pexels.com/photos/4254167/pexels-photo-4254167.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'Hidráulica'
    }
  ];

  useEffect(() => {
    // Update search params when filters change
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    setSearchParams(params);
  }, [searchQuery, selectedCategory, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger the search API
    console.log('Searching for:', searchQuery);
  };

  const filteredResults = viewType === 'professionals' ? mockProfessionals : mockServices;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="O que você está procurando?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Todas as cidades</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Toggle */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Sliders className="w-5 h-5" />
                <span>Filtros</span>
              </button>

              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Buscar
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faixa de preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avaliação mínima
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setMinRating(rating)}
                          className={`p-1 ${minRating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      ))}
                      <span className="text-sm text-gray-600">{minRating} estrela{minRating !== 1 ? 's' : ''} ou mais</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewType('professionals')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewType === 'professionals'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Profissionais
            </button>
            <button
              onClick={() => setViewType('services')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewType === 'services'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Serviços
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''} encontrado{filteredResults.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewType === 'professionals' ? (
            mockProfessionals.map((professional) => (
              <ProfessionalCard key={professional.id} {...professional} />
            ))
          ) : (
            mockServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Carregar Mais Resultados
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;