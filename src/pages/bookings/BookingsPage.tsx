import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  MessageCircle, 
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Download,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';

interface Booking {
  id: string;
  title: string;
  professional: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    phone: string;
  };
  client: {
    id: string;
    name: string;
    avatar: string;
  };
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  completedDate?: string;
  value: number;
  address: string;
  description: string;
  paymentStatus: 'pending' | 'paid' | 'released' | 'refunded';
  createdAt: string;
}

const BookingsPage: React.FC = () => {
  const { user } = useAuth();
  const api = useApi();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock bookings data
  const mockBookings: Booking[] = [
    {
      id: '1',
      title: 'Instalação Elétrica Residencial',
      professional: {
        id: '1',
        name: 'Carlos Silva',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.9,
        phone: '(11) 99999-9999'
      },
      client: {
        id: '2',
        name: 'Maria Santos',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      status: 'confirmed',
      scheduledDate: '2024-01-25T09:00:00Z',
      value: 280,
      address: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
      description: 'Instalação de 15 pontos de tomada e quadro elétrico completo',
      paymentStatus: 'paid',
      createdAt: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      title: 'Reparo Hidráulico',
      professional: {
        id: '2',
        name: 'João Ferreira',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.8,
        phone: '(11) 88888-8888'
      },
      client: {
        id: '3',
        name: 'Ana Costa',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      status: 'completed',
      scheduledDate: '2024-01-20T14:00:00Z',
      completedDate: '2024-01-20T16:30:00Z',
      value: 150,
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
      description: 'Reparo de vazamento na cozinha e banheiro',
      paymentStatus: 'released',
      createdAt: '2024-01-18T08:00:00Z'
    },
    {
      id: '3',
      title: 'Limpeza Residencial',
      professional: {
        id: '3',
        name: 'Lucia Oliveira',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 5.0,
        phone: '(11) 77777-7777'
      },
      client: {
        id: '4',
        name: 'Pedro Alves',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      status: 'in_progress',
      scheduledDate: '2024-01-22T08:00:00Z',
      value: 120,
      address: 'Rua Augusta, 500 - Consolação, São Paulo',
      description: 'Limpeza completa do apartamento',
      paymentStatus: 'paid',
      createdAt: '2024-01-19T12:00:00Z'
    }
  ];

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookings(mockBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-purple-600 bg-purple-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'in_progress': return 'Em Andamento';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesSearch = booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.professional.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      // In a real app, this would call the API
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus as any } : booking
      ));
    } catch (error) {
      console.error('Error updating booking status:', error);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Agendamentos</h1>
          <p className="text-gray-600">Gerencie seus serviços agendados</p>
        </div>

        {/* Filters */}
        <div className="card-modern p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar agendamentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Status:</span>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="in_progress">Em Andamento</option>
                <option value="completed">Concluído</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            {/* Export Button */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="card-modern p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{booking.title}</h3>
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span>{getStatusText(booking.status)}</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <img
                        src={user?.type === 'client' ? booking.professional.avatar : booking.client.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>
                        {user?.type === 'client' ? booking.professional.name : booking.client.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(booking.scheduledDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(booking.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{booking.address}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 mb-2">R$ {booking.value}</p>
                  <div className="flex items-center space-x-2">
                    {user?.type === 'client' && (
                      <>
                        <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300">
                          <Phone className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{booking.description}</p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  {booking.status === 'pending' && user?.type === 'professional' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                        className="btn-primary px-4 py-2 text-sm"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      >
                        Recusar
                      </button>
                    </>
                  )}
                  
                  {booking.status === 'confirmed' && user?.type === 'professional' && (
                    <button
                      onClick={() => handleUpdateStatus(booking.id, 'in_progress')}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      Iniciar Trabalho
                    </button>
                  )}
                  
                  {booking.status === 'in_progress' && user?.type === 'professional' && (
                    <button
                      onClick={() => handleUpdateStatus(booking.id, 'completed')}
                      className="btn-secondary px-4 py-2 text-sm"
                    >
                      Finalizar
                    </button>
                  )}
                  
                  {booking.status === 'completed' && !booking.completedDate && (
                    <button className="btn-accent px-4 py-2 text-sm">
                      <Star className="w-4 h-4 mr-2" />
                      Avaliar
                    </button>
                  )}
                </div>

                <div className="text-sm text-gray-500">
                  Criado em {new Date(booking.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-gray-600">
              {selectedStatus === 'all' 
                ? 'Você ainda não tem agendamentos.' 
                : `Nenhum agendamento com status "${getStatusText(selectedStatus)}".`
              }
            </p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Detalhes do Agendamento"
        size="lg"
      >
        {selectedBooking && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedBooking.title}</h3>
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                  {getStatusIcon(selectedBooking.status)}
                  <span>{getStatusText(selectedBooking.status)}</span>
                </span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">R$ {selectedBooking.value}</p>
                <p className="text-sm text-gray-500">Pagamento: {selectedBooking.paymentStatus}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {user?.type === 'client' ? 'Profissional' : 'Cliente'}
                </h4>
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.type === 'client' ? selectedBooking.professional.avatar : selectedBooking.client.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {user?.type === 'client' ? selectedBooking.professional.name : selectedBooking.client.name}
                    </p>
                    {user?.type === 'client' && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{selectedBooking.professional.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Agendamento</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedBooking.scheduledDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(selectedBooking.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {selectedBooking.completedDate && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Concluído em {new Date(selectedBooking.completedDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Endereço</h4>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                <p className="text-gray-600">{selectedBooking.address}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Descrição</h4>
              <p className="text-gray-600">{selectedBooking.description}</p>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 btn-outline py-3"
              >
                Fechar
              </button>
              <button className="flex-1 btn-primary py-3">
                <MessageCircle className="w-4 h-4 mr-2" />
                Conversar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingsPage;