import React from 'react';
import { Star, MapPin, Shield, MessageCircle, Award, Clock, TrendingUp, Zap, Crown, CheckCircle } from 'lucide-react';

interface ProfessionalCardProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  location: string;
  category: string;
  description: string;
  isVerified: boolean;
  startingPrice: number;
  completedJobs: number;
  onClick?: () => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  name,
  avatar,
  rating,
  reviewsCount,
  location,
  category,
  description,
  isVerified,
  startingPrice,
  completedJobs,
  onClick
}) => {
  return (
    <div 
      className="card-ultra-modern p-8 card-interactive group animate-fade-in-up hover:shadow-glow cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
      
      {/* Header */}
      <div className="flex items-start space-x-6 mb-8 relative z-10">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-500 shadow-lg"
          />
          
          {/* Status Indicators */}
          {isVerified && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
          
          {/* Premium Badge */}
          <div className="absolute -top-3 -right-3">
            <div className="badge-premium">
              <Crown className="w-3 h-3" />
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-black text-2xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {name}
            </h3>
            {isVerified && (
              <div className="badge-verified">
                <Shield className="w-3 h-3 mr-1" />
                Verificado
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-bold text-lg text-gray-900">{rating}</span>
              <span className="text-gray-500">({reviewsCount})</span>
            </div>
            <div className="badge-new">
              <TrendingUp className="w-3 h-3 mr-1" />
              Top 5%
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="font-semibold">{completedJobs} trabalhos</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">&lt; 1h resposta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-6">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
          <Zap className="w-4 h-4 mr-2" />
          {category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-lg line-clamp-3 mb-8 leading-relaxed">{description}</p>

      {/* Skills/Specialties */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['Instalação', 'Reparo', 'Manutenção', 'Emergência'].map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">
            {skill}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-500">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600 font-medium">Avaliação</span>
          </div>
          <span className="text-2xl font-black text-gray-900">{rating}</span>
        </div>
        <div className="w-px h-12 bg-gray-200"></div>
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2 font-medium">Trabalhos</div>
          <span className="text-2xl font-black text-gray-900">{completedJobs}</span>
        </div>
        <div className="w-px h-12 bg-gray-200"></div>
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2 font-medium">A partir de</div>
          <span className="text-2xl font-black text-blue-600">R$ {startingPrice}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button className="flex-1 btn-primary py-4 text-lg group-hover:shadow-glow transform group-hover:scale-105 transition-all duration-300">
          <Star className="w-5 h-5 mr-2" />
          Ver Perfil
        </button>
        <button className="p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group/message">
          <MessageCircle className="w-6 h-6 text-gray-600 group-hover/message:text-blue-600 group-hover/message:scale-110 transition-all duration-300" />
        </button>
      </div>

      {/* Performance Indicator */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">Performance</span>
          <span className="font-bold text-green-600">Excelente</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 group-hover:w-full" style={{ width: '95%' }}></div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProfessionalCard;