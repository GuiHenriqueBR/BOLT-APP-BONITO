import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  MessageCircle, 
  Heart, 
  Share2, 
  CheckCircle,
  Award,
  Calendar,
  DollarSign,
  User,
  Camera,
  Play
} from 'lucide-react';
import Modal from '../../components/common/Modal';

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [showContactModal, setShowContactModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock service data
  const service = {
    id: '1',
    title: 'Instalação Elétrica Residencial Completa',
    description: 'Serviço completo de instalação elétrica para residências, incluindo planejamento, execução e certificação. Trabalho com materiais de primeira qualidade e ofereço garantia de 2 anos.',
    category: 'Elétrica',
    images: [
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
    ],
    professional: {
      id: '1',
      name: 'Carlos Silva',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.9,
      reviewsCount: 156,
      location: 'São Paulo, SP',
      responseTime: '1 hora',
      completedJobs: 234,
      memberSince: '2020',
      isVerified: true,
      isOnline: true
    },
    packages: [
      {
        id: 'basic',
        name: 'Básico',
        price: 150,
        deliveryTime: '3 dias',
        description: 'Instalação básica de pontos elétricos',
        features: [
          'Até 5 pontos de tomada',
          'Instalação de disjuntores',
          'Teste de funcionamento',
          'Garantia de 1 ano'
        ]
      },
      {
        id: 'standard',
        name: 'Padrão',
        price: 280,
        deliveryTime: '5 dias',
        description: 'Instalação completa com planejamento',
        features: [
          'Até 15 pontos de tomada',
          'Quadro elétrico completo',
          'Instalação de luminárias',
          'Projeto elétrico básico',
          'Garantia de 18 meses'
        ],
        popular: true
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 450,
        deliveryTime: '7 dias',
        description: 'Instalação premium com automação',
        features: [
          'Pontos ilimitados',
          'Automação residencial básica',
          'Projeto elétrico detalhado',
          'Materiais premium',
          'Garantia de 2 anos',
          'Suporte técnico'
        ]
      }
    ],
    reviews: [
      {
        id: '1',
        client: {
          name: 'Maria Santos',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        },
        rating: 5,
        comment: 'Excelente profissional! Trabalho impecável e pontualidade exemplar. Recomendo muito!',
        date: '2024-01-15',
        helpful: 12
      },
      {
        id: '2',
        client: {
          name: 'João Oliveira',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        },
        rating: 5,
        comment: 'Superou minhas expectativas. Muito profissional e preço justo.',
        date: '2024-01-10',
        helpful: 8
      }
    ],
    faq: [
      {
        question: 'Você fornece os materiais?',
        answer: 'Sim, todos os materiais estão inclusos no preço. Trabalho apenas com materiais de primeira qualidade.'
      },
      {
        question: 'Qual a garantia do serviço?',
        answer: 'Ofereço garantia de até 2 anos dependendo do pacote escolhido, cobrindo defeitos de instalação.'
      },
      {
        question: 'Você atende em finais de semana?',
        answer: 'Sim, atendo aos sábados mediante agendamento prévio. Domingos apenas para emergências.'
      }
    ]
  };

  const selectedPackageData = service.packages.find(pkg => pkg.id === selectedPackage);

  const handleContact = () => {
    setShowContactModal(true);
  };

  const handleHire = () => {
    navigate(`/checkout/${service.id}?package=${selectedPackage}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service Images */}
            <div className="card-modern overflow-hidden">
              <div className="relative h-96">
                <img
                  src={service.images[currentImageIndex]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {service.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      isFavorited 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Play Button for Video */}
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <Play className="w-8 h-8 text-primary-600 ml-1" />
                  </div>
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4 flex space-x-3 overflow-x-auto">
                {service.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex ? 'border-primary-500' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Info */}
            <div className="card-modern p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{service.professional.rating}</span>
                      <span className="text-gray-500">({service.professional.reviewsCount})</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>

              {/* Professional Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="relative">
                  <img
                    src={service.professional.avatar}
                    alt={service.professional.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {service.professional.isOnline && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{service.professional.name}</h3>
                    {service.professional.isVerified && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                    <Award className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{service.professional.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Responde em {service.professional.responseTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{service.professional.completedJobs} trabalhos</span>
                    <span>Membro desde {service.professional.memberSince}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/professional/${service.professional.id}`)}
                  className="btn-outline px-4 py-2 text-sm"
                >
                  Ver Perfil
                </button>
              </div>
            </div>

            {/* Reviews */}
            <div className="card-modern p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações dos Clientes</h2>
              
              <div className="space-y-6">
                {service.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.client.avatar}
                        alt={review.client.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{review.client.name}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                          👍 Útil ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                Ver Todas as Avaliações
              </button>
            </div>

            {/* FAQ */}
            <div className="card-modern p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
              
              <div className="space-y-4">
                {service.faq.map((item, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-900">{item.question}</span>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-gray-700">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Package Selection */}
            <div className="card-modern p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Escolha seu Pacote</h3>
              
              <div className="space-y-4 mb-6">
                {service.packages.map((pkg) => (
                  <label
                    key={pkg.id}
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedPackage === pkg.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="package"
                      value={pkg.id}
                      checked={selectedPackage === pkg.id}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{pkg.name}</span>
                        {pkg.popular && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                            Mais Popular
                          </span>
                        )}
                      </div>
                      <span className="text-2xl font-bold text-gray-900">R$ {pkg.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{pkg.deliveryTime}</span>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleHire}
                  className="w-full btn-primary py-4 text-lg font-semibold"
                >
                  Contratar Agora - R$ {selectedPackageData?.price}
                </button>
                <button
                  onClick={handleContact}
                  className="w-full btn-outline py-4 text-lg font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conversar Primeiro
                </button>
              </div>

              {/* Service Guarantees */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span>Pagamento protegido</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Garantia de qualidade</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span>Entrega no prazo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Services */}
            <div className="card-modern p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Serviços Relacionados</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <img
                      src={`https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=80&h=60&dpr=2`}
                      alt=""
                      className="w-12 h-9 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Manutenção Elétrica</p>
                      <p className="text-xs text-gray-500">A partir de R$ 80</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Conversar com o Profissional"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <img
              src={service.professional.avatar}
              alt={service.professional.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{service.professional.name}</h4>
              <p className="text-sm text-gray-600">Responde em {service.professional.responseTime}</p>
            </div>
          </div>
          
          <textarea
            placeholder="Descreva seu projeto e tire suas dúvidas..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowContactModal(false)}
              className="flex-1 btn-outline py-3"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setShowContactModal(false);
                navigate('/chat');
              }}
              className="flex-1 btn-primary py-3"
            >
              Enviar Mensagem
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceDetailsPage;