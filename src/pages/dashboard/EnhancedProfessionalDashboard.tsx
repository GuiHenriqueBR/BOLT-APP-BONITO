import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  DollarSign, 
  Star, 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageCircle,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EnhancedProfessionalDashboard: React.FC = () => {
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
          monthlyEarnings: 3200,
          totalClients: 24,
          averageRating: 4.9,
          completedJobs: 156,
          responseRate: 95,
          profileViews: 1247,
          pendingRequests: 8,
          activeBookings: 5
        },
        monthlyEarnings: [
          { month: 'Jan', earnings: 2800, jobs: 18 },
          { month: 'Fev', earnings: 3100, jobs: 22 },
          { month: 'Mar', earnings: 2950, jobs: 20 },
          { month: 'Abr', earnings: 3400, jobs: 25 },
          { month: 'Mai', earnings: 3200, jobs: 23 }
        ],
        serviceCategories: [
          { category: 'Instalação', earnings: 1200, jobs: 8, percentage: 38 },
          { category: 'Reparo', earnings: 950, jobs: 12, percentage: 30 },
          { category: 'Manutenção', earnings: 680, jobs: 6, percentage: 21 },
          { category: 'Emergência', earnings: 370, jobs: 3, percentage: 11 }
        ],
        recentBookings: [
          {
            id: '1',
            client: 'Maria Silva',
            service: 'Instalação Elétrica',
            date: '2024-01-25',
            value: 150,
            status: 'confirmed',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          },
          {
            id: '2',
            client: 'João Santos',
            service: 'Reparo Hidráulico',
            date: '2024-01-28',
            value: 80,
            status: 'pending',
            avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          },
          {
            id: '3',
            client: 'Ana Costa',
            service: 'Manutenção Preventiva',
            date: '2024-01-30',
            value: 120,
            status: 'in_progress',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          }
        ],
        upcomingJobs: [
          {
            id: '1',
            client: 'Pedro Alves',
            service: 'Instalação de Pontos',
            date: '2024-01-26',
            time: '09:00',
            location: 'Vila Madalena, SP',
            value: 200
          },
          {
            id: '2',
            client: 'Carla Mendes',
            service: 'Reparo de Disjuntor',
            date: '2024-01-27',
            time: '14:00',
            location: 'Pinheiros, SP',
            value: 120
          }
        ],
        recentReviews: [
          {
            id: '1',
            client: 'Maria Silva',
            rating: 5,
            comment: 'Excelente profissional! Trabalho impecável.',
            date: '2024-01-20',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          },
          {
            id: '2',
            client: 'João Santos',
            rating: 5,
            comment: 'Muito pontual e eficiente. Recomendo!',
            date: '2024-01-18',
            avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
          }
        ],
        goals: {
          monthlyTarget: 4000,
          currentProgress: 3200,
          jobsTarget: 30,
          currentJobs: 23,
          ratingTarget: 4.8,
          currentRating: 4.9
        }
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'in_progress': return 'Em andamento';
      case 'completed': return 'Concluído';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
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
                Painel Profissional 🔧
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gerencie seus serviços e acompanhe seu desempenho
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
              title: 'Ganhos Este Mês',
              value: `R$ ${dashboardData.stats.monthlyEarnings}`,
              change: '+15%',
              changeType: 'increase',
              icon: DollarSign,
              color: 'from-green-500 to-emerald-500',
              bgColor: 'bg-green-100 dark:bg-green-900'
            },
            {
              title: 'Clientes Ativos',
              value: dashboardData.stats.totalClients,
              change: '+8',
              changeType: 'increase',
              icon: Users,
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'bg-blue-100 dark:bg-blue-900'
            },
            {
              title: 'Avaliação Média',
              value: dashboardData.stats.averageRating,
              change: '+0.1',
              changeType: 'increase',
              icon: Star,
              color: 'from-yellow-500 to-orange-500',
              bgColor: 'bg-yellow-100 dark:bg-yellow-900'
            },
            {
              title: 'Trabalhos Concluídos',
              value: dashboardData.stats.completedJobs,
              change: '+12',
              changeType: 'increase',
              icon: CheckCircle,
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Link
                  to="/my-services"
                  className="group p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow"
                >
                  <Plus className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2">Meus Serviços</h3>
                  <p className="text-blue-100 text-sm">Gerencie ofertas</p>
                </Link>

                <Link
                  to="/open-requests"
                  className="group p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow"
                >
                  <Search className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2">Pedidos Abertos</h3>
                  <p className="text-green-100 text-sm">{dashboardData.stats.pendingRequests} novos</p>
                </Link>

                <Link
                  to="/bookings"
                  className="group p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow"
                >
                  <Calendar className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2">Agendamentos</h3>
                  <p className="text-purple-100 text-sm">{dashboardData.stats.activeBookings} ativos</p>
                </Link>

                <Link
                  to="/chat"
                  className="group p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow"
                >
                  <MessageCircle className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2">Mensagens</h3>
                  <p className="text-orange-100 text-sm">3 não lidas</p>
                </Link>
              </div>
            </div>

            {/* Performance Goals */}
            <div className="card-ultra-modern p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Metas de Performance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - dashboardData.goals.currentProgress / dashboardData.goals.monthlyTarget)}`}
                        className="text-green-500 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {Math.round((dashboardData.goals.currentProgress / dashboardData.goals.monthlyTarget) * 100)}%
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Meta Mensal</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    R$ {dashboardData.goals.currentProgress} / R$ {dashboardData.goals.monthlyTarget}
                  </p>
                </div>

                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - dashboardData.goals.currentJobs / dashboardData.goals.jobsTarget)}`}
                        className="text-blue-500 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {Math.round((dashboardData.goals.currentJobs / dashboardData.goals.jobsTarget) * 100)}%
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Trabalhos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dashboardData.goals.currentJobs} / {dashboardData.goals.jobsTarget}
                  </p>
                </div>

                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - dashboardData.goals.currentRating / 5)}`}
                        className="text-yellow-500 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {dashboardData.goals.currentRating}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Avaliação</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Meta: {dashboardData.goals.ratingTarget}★
                  </p>
                </div>
              </div>
            </div>

            {/* Earnings Chart */}
            <div className="card-ultra-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ganhos Mensais</h2>
                <BarChart3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {dashboardData.monthlyEarnings.map((data: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(data.earnings / Math.max(...dashboardData.monthlyEarnings.map((m: any) => m.earnings))) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        R$ {data.earnings}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {data.jobs} trabalhos
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="card-ultra-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Agendamentos Recentes</h2>
                <Link
                  to="/bookings"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
                >
                  Ver todos
                </Link>
              </div>

              <div className="space-y-4">
                {dashboardData.recentBookings.map((booking: any) => (
                  <div key={booking.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors duration-300 group">
                    <img
                      src={booking.avatar}
                      alt={booking.client}
                      className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {booking.service}
                        </h3>
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span>{getStatusText(booking.status)}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Cliente: {booking.client}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(booking.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">R$ {booking.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Performance Metrics */}
            <div className="card-ultra-modern p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Métricas de Performance</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Taxa de Resposta</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{dashboardData.stats.responseRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${dashboardData.stats.responseRate}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Visualizações do Perfil</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{dashboardData.stats.profileViews}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: '78%' }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>Ranking na categoria</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">#3 em Elétrica</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Top 5% dos profissionais</p>
                </div>
              </div>
            </div>

            {/* Service Categories */}
            <div className="card-ultra-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Categorias de Serviço</h3>
                <PieChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {dashboardData.serviceCategories.map((category: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `hsl(${index * 80}, 70%, 50%)` }}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        R$ {category.earnings}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {category.jobs} trabalhos
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Jobs */}
            <div className="card-ultra-modern p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Próximos Trabalhos</h3>
              
              <div className="space-y-4">
                {dashboardData.upcomingJobs.map((job: any) => (
                  <div key={job.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {job.service}
                      </h4>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        R$ {job.value}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Cliente: {job.client}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(job.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{job.time}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📍 {job.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="card-ultra-modern p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Avaliações Recentes</h3>
              
              <div className="space-y-4">
                {dashboardData.recentReviews.map((review: any) => (
                  <div key={review.id} className="flex items-start space-x-3">
                    <img
                      src={review.avatar}
                      alt={review.client}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {review.client}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {review.comment}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/reviews"
                className="block w-full mt-4 py-2 text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                Ver todas as avaliações
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfessionalDashboard;