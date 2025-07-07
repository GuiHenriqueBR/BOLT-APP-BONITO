import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star,
  Calendar,
  Eye,
  MessageCircle,
  Award,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface AnalyticsData {
  overview: {
    totalEarnings: number;
    totalBookings: number;
    averageRating: number;
    profileViews: number;
    responseRate: number;
    completionRate: number;
  };
  monthlyEarnings: Array<{
    month: string;
    earnings: number;
    bookings: number;
  }>;
  categoryPerformance: Array<{
    category: string;
    bookings: number;
    earnings: number;
    rating: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'booking' | 'review' | 'message' | 'view';
    description: string;
    timestamp: string;
    value?: number;
  }>;
}

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Mock analytics data
  const mockAnalytics: AnalyticsData = {
    overview: {
      totalEarnings: 12450,
      totalBookings: 89,
      averageRating: 4.8,
      profileViews: 1247,
      responseRate: 95,
      completionRate: 98
    },
    monthlyEarnings: [
      { month: 'Jul', earnings: 1800, bookings: 12 },
      { month: 'Ago', earnings: 2100, bookings: 15 },
      { month: 'Set', earnings: 1950, bookings: 13 },
      { month: 'Out', earnings: 2300, bookings: 16 },
      { month: 'Nov', earnings: 2150, bookings: 14 },
      { month: 'Dez', earnings: 2150, bookings: 19 }
    ],
    categoryPerformance: [
      { category: 'Elétrica', bookings: 35, earnings: 5250, rating: 4.9 },
      { category: 'Hidráulica', bookings: 28, earnings: 3360, rating: 4.7 },
      { category: 'Marcenaria', bookings: 15, earnings: 2250, rating: 4.8 },
      { category: 'Limpeza', bookings: 11, earnings: 1590, rating: 5.0 }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'booking',
        description: 'Nova contratação - Instalação Elétrica',
        timestamp: '2024-01-22T10:30:00Z',
        value: 280
      },
      {
        id: '2',
        type: 'review',
        description: 'Nova avaliação 5 estrelas de Maria Santos',
        timestamp: '2024-01-22T09:15:00Z'
      },
      {
        id: '3',
        type: 'message',
        description: 'Nova mensagem de João Silva',
        timestamp: '2024-01-22T08:45:00Z'
      },
      {
        id: '4',
        type: 'view',
        description: 'Seu perfil foi visualizado 15 vezes hoje',
        timestamp: '2024-01-22T08:00:00Z'
      }
    ]
  };

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'review': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'message': return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'view': return <Eye className="w-4 h-4 text-purple-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-600">Tente novamente mais tarde</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
            <p className="text-gray-600">Acompanhe o desempenho do seu negócio</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="1month">Último mês</option>
              <option value="3months">Últimos 3 meses</option>
              <option value="6months">Últimos 6 meses</option>
              <option value="1year">Último ano</option>
            </select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-modern p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ganhos Totais</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(analytics.overview.totalEarnings)}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card-modern p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Trabalhos</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalBookings}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card-modern p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.averageRating}</p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= analytics.overview.averageRating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="card-modern p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visualizações</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.profileViews}</p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Monthly Earnings Chart */}
            <div className="card-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Ganhos Mensais</h3>
                <BarChart3 className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="space-y-4">
                {analytics.monthlyEarnings.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(data.earnings / Math.max(...analytics.monthlyEarnings.map(m => m.earnings))) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(data.earnings)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {data.bookings} trabalhos
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="card-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Desempenho por Categoria</h3>
                <PieChart className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="space-y-4">
                {analytics.categoryPerformance.map((category, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{category.category}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{category.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Trabalhos: </span>
                        <span className="font-medium">{category.bookings}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ganhos: </span>
                        <span className="font-medium">{formatCurrency(category.earnings)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Performance Metrics */}
            <div className="card-modern p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Métricas de Performance</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Taxa de Resposta</span>
                    <span className="text-sm font-bold text-gray-900">{analytics.overview.responseRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analytics.overview.responseRate}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Taxa de Conclusão</span>
                    <span className="text-sm font-bold text-gray-900">{analytics.overview.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analytics.overview.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>Ranking na categoria</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">#3 em Elétrica</p>
                  <p className="text-xs text-gray-500">Top 5% dos profissionais</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-modern p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Atividade Recente</h3>
              
              <div className="space-y-4">
                {analytics.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                        {activity.value && (
                          <span className="text-xs font-medium text-green-600">
                            {formatCurrency(activity.value)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
                Ver todas as atividades
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card-modern p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Ações Rápidas</h3>
              
              <div className="space-y-3">
                <button className="w-full btn-primary py-3 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Promover Perfil
                </button>
                <button className="w-full btn-outline py-3 text-sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Relatório Detalhado
                </button>
                <button className="w-full btn-ghost py-3 text-sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Suporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;