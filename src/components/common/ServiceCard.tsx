import React from 'react';
import { Star, MapPin, Clock, Heart, Award, TrendingUp, Shield, Zap } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  professional: {
    name: string;
    avatar: string;
    rating: number;
    reviewsCount: number;
    location: string;
  };
  price: number;
  deliveryTime: string;
  image: string;
  category: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  professional,
  price,
  deliveryTime,
  image,
  category,
  onClick
}) => {
  return (
    <div 
      className="card-ultra-modern overflow-hidden card-interactive group animate-fade-in-up hover:shadow-glow cursor-pointer"
      onClick={onClick}
    >
      {/* Service Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full text-sm font-bold shadow-lg border border-white/20">
            {category}
          </span>
        </div>
        
        {/* Premium Badge */}
        <div className="absolute top-4 right-4">
          <div className="badge-premium">
            <Award className="w-3 h-3 mr-1" />
            Premium
          </div>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-16 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group/heart">
          <Heart className="w-5 h-5 text-gray-600 group-hover/heart:text-red-500 group-hover/heart:fill-current transition-colors duration-300" />
        </button>

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button className="btn-primary px-8 py-3 text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-glow">
            Ver Detalhes
          </button>
        </div>

        {/* Trending Indicator */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center space-x-1 px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>Em Alta</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-500 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {professional.name}
              </p>
              <Shield className="w-4 h-4 text-green-500" />
              <Award className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-bold text-gray-700">
                  {professional.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({professional.reviewsCount} avaliações)
              </span>
            </div>
          </div>
        </div>

        {/* Service Title */}
        <h3 className="font-black text-xl text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          {title}
        </h3>

        {/* Location and Delivery */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{professional.location}</span>
          </div>
          <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-sm text-gray-500 block">A partir de</span>
            <div className="text-3xl font-black text-gray-900">
              R$ {price.toFixed(2)}
            </div>
          </div>
          <button className="btn-primary px-6 py-3 text-lg group-hover:shadow-glow transform group-hover:scale-105 transition-all duration-300">
            <Zap className="w-5 h-5 mr-2" />
            Contratar
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-3">
          {/* Popularity */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span className="font-medium">Popularidade</span>
            <span className="font-bold">92%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 group-hover:w-full" style={{ width: '92%' }}></div>
          </div>

          {/* Response Time */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span className="font-medium">Tempo de Resposta</span>
            <span className="font-bold text-green-600">{'< 1h'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full w-full"></div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {['Verificado', 'Resposta Rápida', 'Top Rated'].map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ServiceCard;