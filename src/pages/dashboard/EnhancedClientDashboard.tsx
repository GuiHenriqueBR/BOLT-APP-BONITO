import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  MessageCircle, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Heart,
  Award,
  MapPin,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EnhancedClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    loadDashboardData();
  }, [selectedPeriod]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock dashboard data
      setDashboardData({
        stats: {
          totalSpent: 2450,
          totalServices: 12,
          averageRating: 4.8,
          savedAmount: 380,
          favoriteServices: 8,
          activeBookings: 3
        },
        monthlySpending: [
          { month: 'Jan', amount: 450 },
          { month: 'Fev', amount: 320 },
          { month: 'Mar', amount: 680 },
          { month: 'Abr', amount: 520 },
          { month: 'Mai', amount: 480 }
        ],
        categorySpending: [
          { category: 'Elétrica', amount: 850, percentage: 35 },
          { category: 'Limpeza', amount: 620, percentage: 25 },
          { category: 'Hidráulica', amount: 480, percentage: 20 },
          { category: 'Jardinagem', amount: 300, percentage: 12 },
          { category: 'Outros', amount: 200, percentage: 8 }
        ],
        recentServices: [
          {
            id: '1',
            title: 'Instalação Elétrica',
            professional: 'Carlos Silva',
            status: 'completed',
            date: '2024-01-15',
            rating: 5,
            price: 150,
            image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          },
          {
            id: '2',
            title: 'Limpeza Residencial',
            professional: 'Maria Santos',
            status: 'in_progress',
            date: '2024-01-20',
            price: 80,
            image: 'https://images.pexels.com/photos/4254167/pexels-photo-4254167.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          },
          {
            id: '3',
            title: 'Reparo Hidráulico',
            professional: 'João Ferreira',
            status: 'pending',
            date: '2024-01-25',
            price: 120,
            image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          }
        ],
        recommendations: [
          {
            id: '1',
            title: 'Manutenção Preventiva Elétrica',
            professional: 'Carlos Silva',
            price: 80,
            rating: 4.9,
            image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          },
          {
            id: '2',
            title: 'Limpeza Pós-Obra',
            professional: 'Ana Costa',
            price: 150,
            rating: 5.0,
            image: 'https://images.pexels.com/photos/4254167/pexels-photo-4254167.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          }
        ],
        upcomingBookings: [
          {
            id: '1',
            title: 'Limpeza Semanal',
            professional: 'Maria Santos',
            date: '2024-01-28',
            time: '09:00',
            status: 'confirmed'
          },
          {
            id: '2',
            title: 'Manutenção Jardim',
            professional: 'Pedro Alves',
            date: '2024-01-30',
            time: '14:00',
            status: 'pending'
          }
        ]
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'confirmed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in_progress': return 'Em andamento';
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle2 className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Olá, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Aqui está um resumo das suas atividades
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
                <option value="quarter">Últimos 3 meses</option>
                <option value="year">Este ano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Gasto',
              value: `R$ ${dashboardData.stats.totalSpent}`,
              change: '+12%',
              changeType: 'increase',
              icon: DollarSign,
              color: 'from-green-500 to-emerald-500',
              bgColor: 'bg-green-100 dark:bg-green-900'
            },
            {
              title: 'Serviços Contratados',
              value: dashboardData.stats.totalServices,
              change: '+3',
              changeType: 'increase',
              icon: CheckCircle2,
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'bg-blue-100 dark:bg-blue-900'
            },
            {
              title: 'Avaliação Média',
              value: dashboardData.stats.averageRating,
              change: '+0.2',
              changeType: 'increase',
              icon: Star,
              color: 'from-yellow-500 to-orange-500',
              bgColor: 'bg-yellow-100 dark:bg-yellow-900'
            },
            {
              title: 'Economia Total',
              value: `R$ ${dashboardData.stats.savedAmount}`,
              change: '+R$ 50',
              changeType: 'increase',
              icon: TrendingUp,
              color: 'from-purple-500 to-pink-500',
              bgColor: 'bg-purple-100 dark:bg-purple-900'
            }
          ].map((stat, index) => (
            <div key={index} className="card-ultra-modern p-6 hover:shadow-glow transition-all duration-500 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'increase' 
                    ? 'text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-400' 
                    : 'text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Actions */}
            <div className="card-ultra-modern p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/search"
                  className="group p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow"
                >
                  <Search className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2">Buscar Profissionais</h3>
                  <p className="text-blue-100 text-sm">Encontre o profissional ideal</p>
                </Link>

                <Link
                  to="/create-request"
                  className="group p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow"
                >
                  <Plus className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2">Publicar Pedido</h3>
                  <p className="text-green-100 text-sm">Receba propostas</p>
                </Link>

                <Link
                  to="/chat"
                  className="group p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow"
                >
                  <MessageCircle className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2">Mensagens</h3>
                  <p className="text-purple-100 text-sm">5 não lidas</p>
                </Link>
              </div>
            </div>

            {/* Spending Chart */}
            <div className="card-ultra-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gastos Mensais</h2>
                <BarChart3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {dashboardData.monthlySpending.map((data: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(data.amount / Math.max(...dashboardData.monthlySpending.map((m: any) => m.amount))) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        R$ {data.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Services */}
            <div className="card-ultra-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Serviços Recentes</h2>
                <Link
                  to="/bookings"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
                >
                  Ver todos
                </Link>
              </div>

              <div className="space-y-4">
                {dashboardData.recentServices.map((service: any) => (
                  <div key={service.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors duration-300 group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {service.title}
                        </h3>
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          <span>{getStatusText(service.status)}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Profissional: {service.professional}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{new Date(service.date).toLocaleDateString('pt-BR')}</span>
                        {service.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{service.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">R$ {service.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Category Spending */}
            <div className="card-ultra-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Gastos por Categoria</h3>
                <PieChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {dashboardData.categorySpending.map((category: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        R$ {category.amount}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {category.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="card-ultra-modern p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Próximos Agendamentos</h3>
              
              <div className="space-y-4">
                {dashboardData.upcomingBookings.map((booking: any) => (
                  <div key={booking.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {booking.title}
                      </h4>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span>{getStatusText(booking.status)}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {booking.professional}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(booking.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/bookings"
                className="block w-full mt-4 py-2 text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                Ver todos os agendamentos
              </Link>
            </div>

            {/* Recommendations */}
            <div className="card-ultra-modern p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recomendações</h3>
              
              <div className="space-y-4">
                {dashboardData.recommendations.map((rec: any) => (
                  <div key={rec.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer group">
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{rec.professional}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{rec.rating}</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          R$ {rec.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-ultra-modern p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Estatísticas Rápidas</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Favoritos</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {dashboardData.stats.favoriteServices}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Ativos</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {dashboardData.stats.activeBookings}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avaliações</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {dashboardData.stats.totalServices}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedClientDashboard;