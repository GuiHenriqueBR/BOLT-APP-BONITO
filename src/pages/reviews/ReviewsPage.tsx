import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Filter,
  Search,
  TrendingUp,
  Award,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';

interface Review {
  id: string;
  booking: {
    id: string;
    title: string;
    date: string;
  };
  reviewer: {
    id: string;
    name: string;
    avatar: string;
  };
  reviewee: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  response?: string;
  helpful: number;
  createdAt: string;
  isHelpful?: boolean;
}

const ReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      booking: {
        id: '1',
        title: 'Instalação Elétrica Residencial',
        date: '2024-01-20'
      },
      reviewer: {
        id: '2',
        name: 'Maria Santos',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      reviewee: {
        id: '1',
        name: 'Carlos Silva',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      rating: 5,
      comment: 'Excelente profissional! Trabalho impecável, pontual e muito educado. Recomendo sem dúvidas. O serviço foi executado com perfeição e dentro do prazo combinado.',
      response: 'Muito obrigado pela avaliação! Foi um prazer trabalhar com você. Fico feliz que tenha ficado satisfeita com o resultado.',
      helpful: 12,
      createdAt: '2024-01-21T10:00:00Z'
    },
    {
      id: '2',
      booking: {
        id: '2',
        title: 'Reparo Hidráulico',
        date: '2024-01-18'
      },
      reviewer: {
        id: '3',
        name: 'João Oliveira',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      reviewee: {
        id: '1',
        name: 'Carlos Silva',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      rating: 4,
      comment: 'Bom profissional, resolveu o problema rapidamente. Preço justo e trabalho de qualidade.',
      helpful: 8,
      createdAt: '2024-01-19T14:30:00Z'
    },
    {
      id: '3',
      booking: {
        id: '3',
        title: 'Limpeza Residencial',
        date: '2024-01-15'
      },
      reviewer: {
        id: '4',
        name: 'Ana Costa',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      reviewee: {
        id: '1',
        name: 'Carlos Silva',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      rating: 5,
      comment: 'Superou minhas expectativas! Deixou tudo impecável e foi muito cuidadosa com os móveis.',
      helpful: 15,
      createdAt: '2024-01-16T09:15:00Z'
    }
  ];

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesRating = selectedRating === null || review.rating === selectedRating;
    const matchesSearch = review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.reviewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.booking.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }));

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { 
              ...review, 
              helpful: review.isHelpful ? review.helpful - 1 : review.helpful + 1,
              isHelpful: !review.isHelpful 
            }
          : review
      ));
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  const handleRespondToReview = (review: Review) => {
    setSelectedReview(review);
    setResponseText(review.response || '');
    setShowResponseModal(true);
  };

  const handleSubmitResponse = async () => {
    if (!selectedReview || !responseText.trim()) return;

    try {
      setReviews(prev => prev.map(review => 
        review.id === selectedReview.id 
          ? { ...review, response: responseText }
          : review
      ));
      setShowResponseModal(false);
      setResponseText('');
      setSelectedReview(null);
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Avaliações</h1>
          <p className="text-gray-600">
            {user?.type === 'professional' 
              ? 'Veja o que seus clientes estão dizendo sobre você'
              : 'Suas avaliações sobre os profissionais'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Statistics */}
          <div className="space-y-6">
            
            {/* Overall Rating */}
            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Avaliação Geral</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{reviews.length} avaliações</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição</h3>
              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-12">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Este mês</span>
                  </div>
                  <span className="font-semibold text-gray-900">+12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">5 estrelas</span>
                  </div>
                  <span className="font-semibold text-gray-900">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Úteis</span>
                  </div>
                  <span className="font-semibold text-gray-900">94%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Filters */}
            <div className="card-modern p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar avaliações..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Rating Filter */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Estrelas:</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedRating(null)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedRating === null
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Todas
                    </button>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedRating === rating
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {rating}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="card-modern p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.reviewer.avatar}
                      alt={review.reviewer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.reviewer.name}</h4>
                          <p className="text-sm text-gray-600">{review.booking.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                      {/* Professional Response */}
                      {review.response && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <img
                              src={review.reviewee.avatar}
                              alt={review.reviewee.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              Resposta de {review.reviewee.name}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{review.response}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleMarkHelpful(review.id)}
                            className={`flex items-center space-x-2 text-sm transition-colors ${
                              review.isHelpful
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${review.isHelpful ? 'fill-current' : ''}`} />
                            <span>Útil ({review.helpful})</span>
                          </button>

                          {user?.type === 'professional' && !review.response && (
                            <button
                              onClick={() => handleRespondToReview(review)}
                              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>Responder</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>Serviço em {new Date(review.booking.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação encontrada</h3>
                <p className="text-gray-600">
                  {selectedRating 
                    ? `Nenhuma avaliação com ${selectedRating} estrelas encontrada.`
                    : 'Você ainda não tem avaliações.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response Modal */}
      <Modal
        isOpen={showResponseModal}
        onClose={() => setShowResponseModal(false)}
        title="Responder Avaliação"
        size="md"
      >
        {selectedReview && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={selectedReview.reviewer.avatar}
                  alt={selectedReview.reviewer.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900">{selectedReview.reviewer.name}</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= selectedReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700">{selectedReview.comment}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua resposta
              </label>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows={4}
                placeholder="Escreva uma resposta profissional e educada..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowResponseModal(false)}
                className="flex-1 btn-outline py-3"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitResponse}
                disabled={!responseText.trim()}
                className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Resposta
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewsPage;