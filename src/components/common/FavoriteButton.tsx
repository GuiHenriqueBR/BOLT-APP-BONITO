import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { favoritesService } from '../../services/favoritesService';

interface FavoriteButtonProps {
  itemId: string;
  itemType: 'professional' | 'service';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  itemId,
  itemType,
  size = 'md',
  className = '',
  showLabel = false
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsFavorite(favoritesService.isFavorite(itemId));

    // Subscribe to favorites changes
    const unsubscribe = favoritesService.subscribe((favorites: string[]) => {
      setIsFavorite(favorites.includes(itemId));
    });

    return unsubscribe;
  }, [itemId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    setIsAnimating(true);

    try {
      await favoritesService.toggleFavorite(itemId, itemType);
      
      // Animation timeout
      setTimeout(() => setIsAnimating(false), 300);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 p-1.5';
      case 'lg':
        return 'w-12 h-12 p-3';
      default:
        return 'w-10 h-10 p-2.5';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        ${getSizeClasses()}
        relative group rounded-full transition-all duration-300 transform
        ${isFavorite 
          ? 'bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-xl' 
          : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-red-500 dark:hover:text-red-400 shadow-md hover:shadow-lg'
        }
        ${isAnimating ? 'scale-125' : 'hover:scale-110'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        backdrop-blur-sm
        ${className}
      `}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100
        ${isFavorite ? 'bg-red-400/30' : 'bg-red-400/20'}
        blur-sm
      `} />
      
      {/* Heart icon */}
      <Heart 
        className={`
          ${getIconSize()}
          relative z-10 transition-all duration-300
          ${isFavorite ? 'fill-current' : ''}
          ${isAnimating ? 'animate-pulse' : ''}
        `} 
      />

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Ripple effect */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
      )}

      {/* Label */}
      {showLabel && (
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {isFavorite ? 'Remover' : 'Favoritar'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;