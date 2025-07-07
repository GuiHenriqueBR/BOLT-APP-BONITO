import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MessageCircle, Star, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const recentServices = [
    {
      id: '1',
      title: 'Instalação Elétrica',
      professional: 'Carlos Silva',
      status: 'completed',
      date: '2024-01-15',
      rating: 5,
      price: 150
    },
    {
      id: '2',
      title: 'Reparo Hidráulico',
      professional: 'Maria Santos',
      status: 'in_progress',
      date: '2024-01-20',
      price: 80
    },
    {
      id: '3',
      title: 'Limpeza Residencial',
      professional: 'Ana Costa',
      status: 'pending',
      date: '2024-01-25',
      price: 120
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in_progress': return 'Em andamento';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>
          <p className="text-gray-600">Gerencie seus serviços e encontre os melhores profissionais</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Serviços Concluídos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Em Andamento</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-600">Avaliação Média</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Mensagens Não Lidas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/search"
            className="bg-primary-600 text-white p-6 rounded-lg hover:bg-primary-700 transition-colors group"
          >
            <div className="flex items-center">
              <Search className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Buscar Profissionais</h3>
            <p className="text-primary-100">Encontre o profissional ideal para seu projeto</p>
          </Link>

          <Link
            to="/create-request"
            className="bg-secondary-600 text-white p-6 rounded-lg hover:bg-secondary-700 transition-colors group"
          >
            <div className="flex items-center">
              <Plus className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Publicar Pedido</h3>
            <p className="text-secondary-100">Receba propostas de múltiplos profissionais</p>
          </Link>

          <Link
            to="/chat"
            className="bg-accent-600 text-white p-6 rounded-lg hover:bg-accent-700 transition-colors group"
          >
            <div className="flex items-center">
              <MessageCircle className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Mensagens</h3>
            <p className="text-accent-100">Converse com seus profissionais</p>
          </Link>
        </div>

        {/* Recent Services */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Serviços Recentes</h2>
            <Link
              to="/my-bookings"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Ver todos
            </Link>
          </div>

          <div className="space-y-4">
            {recentServices.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{service.title}</h3>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {getStatusIcon(service.status)}
                        <span>{getStatusText(service.status)}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Profissional: {service.professional}</p>
                    <p className="text-sm text-gray-500">Data: {new Date(service.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">R$ {service.price}</p>
                    {service.rating && (
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{service.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recentServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum serviço ainda</h3>
              <p className="text-gray-600 mb-6">Comece contratando seu primeiro profissional!</p>
              <Link
                to="/search"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Buscar Profissionais
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;