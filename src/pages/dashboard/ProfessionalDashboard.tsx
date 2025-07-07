import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, DollarSign, Star, Users, TrendingUp, Calendar, MessageCircle } from 'lucide-react';

const ProfessionalDashboard: React.FC = () => {
  const recentBookings = [
    {
      id: '1',
      client: 'Maria Silva',
      service: 'Instalação Elétrica',
      date: '2024-01-25',
      value: 150,
      status: 'confirmed'
    },
    {
      id: '2',
      client: 'João Santos',
      service: 'Reparo Hidráulico',
      date: '2024-01-28',
      value: 80,
      status: 'pending'
    }
  ];

  const monthlyEarnings = [
    { month: 'Dez', earnings: 2500 },
    { month: 'Jan', earnings: 3200 },
    { month: 'Fev', earnings: 2800 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel do Profissional</h1>
          <p className="text-gray-600">Gerencie seus serviços e acompanhe seu desempenho</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">R$ 3.200</p>
                <p className="text-sm text-gray-600">Ganhos este mês</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Clientes ativos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-600">Avaliação média</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Trabalhos concluídos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link
            to="/my-services"
            className="bg-primary-600 text-white p-6 rounded-lg hover:bg-primary-700 transition-colors group"
          >
            <Plus className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">Meus Serviços</h3>
            <p className="text-primary-100 text-sm">Gerencie seus serviços</p>
          </Link>

          <Link
            to="/open-requests"
            className="bg-secondary-600 text-white p-6 rounded-lg hover:bg-secondary-700 transition-colors group"
          >
            <Search className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">Pedidos Abertos</h3>
            <p className="text-secondary-100 text-sm">Encontre novos trabalhos</p>
          </Link>

          <Link
            to="/bookings"
            className="bg-accent-600 text-white p-6 rounded-lg hover:bg-accent-700 transition-colors group"
          >
            <Calendar className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">Agendamentos</h3>
            <p className="text-accent-100 text-sm">Seus trabalhos agendados</p>
          </Link>

          <Link
            to="/chat"
            className="bg-indigo-600 text-white p-6 rounded-lg hover:bg-indigo-700 transition-colors group"
          >
            <MessageCircle className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">Mensagens</h3>
            <p className="text-indigo-100 text-sm">Chat com clientes</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Agendamentos Recentes</h2>
              <Link
                to="/bookings"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Ver todos
              </Link>
            </div>

            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                      <p className="text-sm text-gray-600">Cliente: {booking.client}</p>
                      <p className="text-sm text-gray-500">Data: {new Date(booking.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">R$ {booking.value}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ganhos Mensais</h2>
            
            <div className="space-y-4">
              {monthlyEarnings.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">{data.month}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.earnings / 4000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-semibold w-20 text-right">R$ {data.earnings}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total (3 meses)</span>
                <span className="text-xl font-bold text-gray-900">
                  R$ {monthlyEarnings.reduce((sum, month) => sum + month.earnings, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Dicas para Melhorar seu Desempenho</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">📸 Adicione mais fotos</h3>
              <p className="text-sm text-gray-600">Perfis com fotos recebem 40% mais contatos</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Responda rapidamente</h3>
              <p className="text-sm text-gray-600">Respostas em até 1 hora aumentam as chances de contratação</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">⭐ Mantenha a qualidade</h3>
              <p className="text-sm text-gray-600">Avaliações 5 estrelas garantem mais visibilidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;