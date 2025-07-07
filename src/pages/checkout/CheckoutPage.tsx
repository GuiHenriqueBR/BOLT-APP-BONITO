import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  Lock,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CheckoutPage: React.FC = () => {
  const { serviceId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packageId = searchParams.get('package') || 'basic';
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: '1',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    },
    scheduledDate: '',
    notes: ''
  });

  // Mock service data
  const service = {
    id: serviceId,
    title: 'Instalação Elétrica Residencial Completa',
    professional: {
      name: 'Carlos Silva',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.9,
      location: 'São Paulo, SP'
    },
    packages: {
      basic: { name: 'Básico', price: 150, deliveryTime: '3 dias' },
      standard: { name: 'Padrão', price: 280, deliveryTime: '5 dias' },
      premium: { name: 'Premium', price: 450, deliveryTime: '7 dias' }
    }
  };

  const selectedPackage = service.packages[packageId as keyof typeof service.packages];
  const serviceFee = selectedPackage.price * 0.05; // 5% service fee
  const total = selectedPackage.price + serviceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate('/booking-success');
    } catch (error) {
      alert('Erro no pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Contratação</h1>
          <p className="text-gray-600 mt-2">Complete os dados para contratar o serviço</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service Summary */}
            <div className="card-modern p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Serviço</h2>
              <div className="flex items-start space-x-4">
                <img
                  src={service.professional.avatar}
                  alt={service.professional.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-gray-600 mb-2">Profissional: {service.professional.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{service.professional.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedPackage.deliveryTime}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Pacote {selectedPackage.name}</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {selectedPackage.price}</p>
                </div>
              </div>
            </div>

            {/* Address Form */}
            <div className="card-modern p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Endereço do Serviço</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP *
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    placeholder="00000-000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rua *
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    name="address.number"
                    value={formData.address.number}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    name="address.complement"
                    value={formData.address.complement}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    name="address.neighborhood"
                    value={formData.address.neighborhood}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    {/* Add more states */}
                  </select>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="card-modern p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Agendamento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Preferencial
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações Adicionais
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Descreva detalhes específicos do seu projeto..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="card-modern p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Forma de Pagamento</h2>
              
              {/* Payment Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { id: 'credit_card', name: 'Cartão de Crédito', icon: CreditCard },
                  { id: 'pix', name: 'PIX', icon: Shield },
                  { id: 'bank_slip', name: 'Boleto', icon: AlertCircle }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      paymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <method.icon className="w-6 h-6 text-gray-600" />
                    <span className="font-medium text-gray-900">{method.name}</span>
                  </label>
                ))}
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número do Cartão *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formatCardNumber(formData.cardNumber)}
                      onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value.replace(/\s/g, '') }))}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no Cartão *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Nome como está no cartão"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formatExpiryDate(formData.expiryDate)}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="000"
                        maxLength={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parcelas
                    </label>
                    <select
                      name="installments"
                      value={formData.installments}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="1">1x de R$ {total.toFixed(2)} (à vista)</option>
                      <option value="2">2x de R$ {(total / 2).toFixed(2)}</option>
                      <option value="3">3x de R$ {(total / 3).toFixed(2)}</option>
                      <option value="6">6x de R$ {(total / 6).toFixed(2)}</option>
                      <option value="12">12x de R$ {(total / 12).toFixed(2)}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PIX Instructions */}
              {paymentMethod === 'pix' && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Pagamento via PIX</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Após confirmar o pedido, você receberá o código PIX para pagamento instantâneo.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="card-modern p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Serviço ({selectedPackage.name})</span>
                  <span className="font-medium">R$ {selectedPackage.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de serviço</span>
                  <span className="font-medium">R$ {serviceFee.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Processando...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Finalizar Pagamento
                    </>
                  )}
                </button>
              </form>

              {/* Security Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Dinheiro protegido até conclusão</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span>Suporte 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;