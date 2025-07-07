import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Zap, 
  Shield, 
  Star, 
  MessageCircle, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Users, 
  Award, 
  Clock,
  TrendingUp,
  Globe,
  Heart,
  Sparkles,
  Target,
  Rocket,
  Crown
} from 'lucide-react';
import ServiceCard from '../components/common/ServiceCard';
import ProfessionalCard from '../components/common/ProfessionalCard';

const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { 
      name: 'Elétrica', 
      icon: '⚡', 
      gradient: 'from-yellow-400 via-orange-500 to-red-500', 
      jobs: '2.5k', 
      growth: '+15%',
      description: 'Instalações e reparos elétricos'
    },
    { 
      name: 'Hidráulica', 
      icon: '🔧', 
      gradient: 'from-blue-400 via-blue-500 to-blue-600', 
      jobs: '1.8k', 
      growth: '+12%',
      description: 'Encanamento e sistemas hidráulicos'
    },
    { 
      name: 'Marcenaria', 
      icon: '🪚', 
      gradient: 'from-amber-400 via-orange-500 to-amber-600', 
      jobs: '950', 
      growth: '+8%',
      description: 'Móveis e trabalhos em madeira'
    },
    { 
      name: 'Limpeza', 
      icon: '🧽', 
      gradient: 'from-green-400 via-emerald-500 to-green-600', 
      jobs: '3.2k', 
      growth: '+20%',
      description: 'Limpeza residencial e comercial'
    },
    { 
      name: 'Jardinagem', 
      icon: '🌱', 
      gradient: 'from-emerald-400 via-green-500 to-emerald-600', 
      jobs: '780', 
      growth: '+10%',
      description: 'Paisagismo e manutenção'
    },
    { 
      name: 'Pintura', 
      icon: '🎨', 
      gradient: 'from-purple-400 via-pink-500 to-purple-600', 
      jobs: '1.2k', 
      growth: '+18%',
      description: 'Pintura e acabamentos'
    },
  ];

  const featuredServices = [
    {
      id: '1',
      title: 'Instalação Elétrica Residencial Completa',
      professional: {
        name: 'Carlos Silva',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        rating: 4.9,
        reviewsCount: 156,
        location: 'São Paulo, SP'
      },
      price: 150.00,
      deliveryTime: '2-3 dias',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'Elétrica'
    },
    {
      id: '2',
      title: 'Reparo de Vazamentos e Entupimentos',
      professional: {
        name: 'Maria Santos',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        rating: 4.8,
        reviewsCount: 89,
        location: 'Rio de Janeiro, RJ'
      },
      price: 80.00,
      deliveryTime: 'Mesmo dia',
      image: 'https://images.pexels.com/photos/4254167/pexels-photo-4254167.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'Hidráulica'
    },
    {
      id: '3',
      title: 'Móveis Planejados Sob Medida',
      professional: {
        name: 'João Ferreira',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        rating: 5.0,
        reviewsCount: 203,
        location: 'Belo Horizonte, MG'
      },
      price: 500.00,
      deliveryTime: '7-10 dias',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'Marcenaria'
    }
  ];

  const featuredProfessionals = [
    {
      id: '1',
      name: 'Ana Costa',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.9,
      reviewsCount: 245,
      location: 'São Paulo, SP',
      category: 'Limpeza Residencial',
      description: 'Especialista em limpeza profunda e organização de ambientes. Trabalho com produtos ecológicos.',
      isVerified: true,
      startingPrice: 50,
      completedJobs: 312
    },
    {
      id: '2',
      name: 'Roberto Lima',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.8,
      reviewsCount: 189,
      location: 'Rio de Janeiro, RJ',
      category: 'Jardinagem',
      description: 'Paisagista com 15 anos de experiência. Especializado em jardins residenciais e comerciais.',
      isVerified: true,
      startingPrice: 120,
      completedJobs: 267
    }
  ];

  const testimonials = [
    {
      name: 'Carla Mendes',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      comment: 'Experiência incrível! O eletricista foi pontual, profissional e resolveu meu problema rapidamente. A plataforma é muito fácil de usar.',
      service: 'Instalação Elétrica',
      location: 'São Paulo, SP',
      role: 'Arquiteta'
    },
    {
      name: 'Pedro Alves',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      comment: 'A plataforma é revolucionária! Encontrei um marceneiro excelente em poucos minutos. Qualidade excepcional e preço justo.',
      service: 'Móveis Planejados',
      location: 'Rio de Janeiro, RJ',
      role: 'Designer de Interiores'
    },
    {
      name: 'Julia Santos',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      comment: 'Profissionais verificados e de altíssima qualidade. O sistema de avaliações é transparente. Recomendo para todos!',
      service: 'Limpeza Residencial',
      location: 'Belo Horizonte, MG',
      role: 'Empresária'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Serviços Realizados', icon: CheckCircle, color: 'text-green-500', gradient: 'from-green-400 to-emerald-500' },
    { number: '15K+', label: 'Profissionais Ativos', icon: Users, color: 'text-blue-500', gradient: 'from-blue-400 to-blue-600' },
    { number: '4.9', label: 'Avaliação Média', icon: Star, color: 'text-yellow-500', gradient: 'from-yellow-400 to-orange-500' },
    { number: '24h', label: 'Suporte', icon: Clock, color: 'text-purple-500', gradient: 'from-purple-400 to-purple-600' }
  ];

  const howItWorksSteps = [
    { 
      icon: Search, 
      title: '1. Busque', 
      desc: 'Encontre o profissional ideal para seu projeto usando nossa busca inteligente', 
      gradient: 'from-blue-500 to-blue-600',
      delay: '0s'
    },
    { 
      icon: MessageCircle, 
      title: '2. Converse', 
      desc: 'Negocie detalhes, tire dúvidas e defina o escopo do trabalho', 
      gradient: 'from-green-500 to-green-600',
      delay: '0.2s'
    },
    { 
      icon: Shield, 
      title: '3. Contrate', 
      desc: 'Pague com segurança através da nossa plataforma protegida', 
      gradient: 'from-purple-500 to-purple-600',
      delay: '0.4s'
    },
    { 
      icon: Star, 
      title: '4. Avalie', 
      desc: 'Compartilhe sua experiência e ajude outros usuários', 
      gradient: 'from-yellow-500 to-orange-500',
      delay: '0.6s'
    }
  ];

  return (
    <div className="min-h-screen pt-20 overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"></div>
          <div className="absolute inset-0 particles"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
          
          {/* Interactive Cursor Effect */}
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl pointer-events-none transition-all duration-300"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />
        </div>

        <div className="relative container-ultra text-center z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg mb-8 ${isVisible ? 'animate-bounce-in' : 'opacity-0'} transition-colors duration-300`}>
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Plataforma #1 em Serviços no Brasil</span>
              <Crown className="w-5 h-5 text-yellow-500" />
            </div>

            {/* Main Heading */}
            <h1 className={`text-ultra-large font-black text-gray-900 dark:text-white mb-8 leading-none ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} transition-colors duration-300`}>
              Encontre os
              <span className="block text-gradient animate-morphing">melhores profissionais</span>
              <span className="block">para seus projetos</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in-up stagger-1' : 'opacity-0'} transition-colors duration-300`}>
              Conectamos você a profissionais verificados e qualificados. 
              <span className="text-gradient font-semibold"> Mais de 50.000 serviços realizados</span> com segurança e qualidade garantida.
            </p>

            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className={`max-w-4xl mx-auto mb-16 ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse-glow"></div>
                <div className="relative glass-morphism rounded-3xl p-3 shadow-ultra">
                  <div className="flex items-center">
                    <Search className="absolute left-8 text-gray-400 dark:text-gray-500 w-7 h-7 z-10" />
                    <input
                      type="text"
                      placeholder="O que você precisa? Ex: eletricista, encanador, faxineira..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-20 pr-6 py-6 text-xl border-0 rounded-3xl focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 bg-transparent text-gray-900 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="btn-primary m-2 px-12 py-4 text-xl group"
                    >
                      <span>Buscar</span>
                      <Rocket className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-16 ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
              <Link
                to="/register?type=client"
                className="btn-primary text-xl px-12 py-6 group shadow-ultra hover:shadow-glow"
              >
                <Target className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                Contratar Profissional
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link
                to="/register?type=professional"
                className="btn-outline text-xl px-12 py-6 group shadow-ultra hover:shadow-glow"
              >
                <Users className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                Trabalhar como Profissional
                <Zap className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-glow transition-all duration-500`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative container-ultra">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Processo Simples</span>
            </div>
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Como Funciona
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up stagger-1">
              Processo simples e seguro para conectar você aos melhores profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: step.delay }}>
                <div className="relative mb-8">
                  <div className={`w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:shadow-glow transition-all duration-500 transform group-hover:-translate-y-2`}>
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent"></div>
                  )}
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-32 bg-white dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-gray-800/50"></div>
        
        <div className="relative container-ultra">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-100 dark:bg-purple-900 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Mais Procurados</span>
            </div>
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Categorias Populares
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 animate-fade-in-up stagger-1">
              Explore os serviços mais procurados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/search?category=${category.name.toLowerCase()}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-ultra-modern p-8 text-center card-interactive hover:shadow-glow">
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-2xl group-hover:scale-110 group-hover:shadow-glow transition-all duration-500 transform group-hover:-translate-y-2`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{category.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{category.jobs} serviços</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-green-600 font-semibold">{category.growth}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-1000 group-hover:w-full`} style={{ width: '70%' }}></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-100 dark:bg-green-900 rounded-full mb-6">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">Destaque</span>
            </div>
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Serviços em Destaque
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 animate-fade-in-up stagger-1">
              Profissionais qualificados prontos para atender você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredServices.map((service, index) => (
              <div key={service.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard
                  {...service}
                  onClick={() => navigate(`/service/${service.id}`)}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/search"
              className="btn-primary text-xl px-12 py-6 group shadow-ultra hover:shadow-glow"
            >
              <Globe className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              Ver Todos os Serviços
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 particles"></div>
        
        <div className="relative container-ultra">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
              <Crown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Top Rated</span>
            </div>
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Profissionais em Destaque
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 animate-fade-in-up stagger-1">
              Conheça alguns dos nossos melhores profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {featuredProfessionals.map((professional, index) => (
              <div key={professional.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProfessionalCard
                  {...professional}
                  onClick={() => navigate(`/professional/${professional.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-6">
              <Heart className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">Depoimentos</span>
            </div>
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              O que nossos clientes dizem
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 animate-fade-in-up stagger-1">
              Milhares de clientes satisfeitos
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-8">
                    <div className="card-ultra-modern p-12 text-center shadow-ultra">
                      
                      {/* Stars */}
                      <div className="flex items-center justify-center space-x-1 mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-2xl text-gray-700 dark:text-gray-300 mb-12 italic leading-relaxed font-medium">
                        "{testimonial.comment}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center justify-center space-x-6">
                        <div className="relative">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-900 shadow-lg"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        
                        <div className="text-left">
                          <p className="font-bold text-xl text-gray-900 dark:text-white">{testimonial.name}</p>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold">{testimonial.role}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                          <div className="mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium inline-block">
                            {testimonial.service}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 scale-125 shadow-glow' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 particles"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
            <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/2 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

        <div className="relative container-ultra">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Garantia Total</span>
            </div>
            <h2 className="text-display font-black mb-6 animate-fade-in-up">
              Por que escolher a CorujaFix?
            </h2>
            <p className="text-2xl text-blue-100 animate-fade-in-up stagger-1">
              Sua segurança e satisfação são nossas prioridades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Shield, 
                title: 'Segurança Garantida', 
                desc: 'Todos os profissionais são verificados e avaliados. Pagamento protegido com garantia total.',
                gradient: 'from-blue-400 to-blue-500'
              },
              { 
                icon: CheckCircle, 
                title: 'Qualidade Comprovada', 
                desc: 'Sistema de avaliações transparente, suporte dedicado e garantia de satisfação.',
                gradient: 'from-green-400 to-green-500'
              },
              { 
                icon: Zap, 
                title: 'Rapidez e Praticidade', 
                desc: 'Encontre e contrate profissionais em poucos cliques. Interface intuitiva e moderna.',
                gradient: 'from-yellow-400 to-orange-500'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 group-hover:shadow-glow transition-all duration-500 transform group-hover:-translate-y-2`}>
                  <feature.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-yellow-300 transition-colors duration-300">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed text-xl">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 particles"></div>
        
        <div className="relative container-ultra text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Rocket className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Comece Agora</span>
            </div>
            
            <h2 className="text-display font-black mb-8 animate-fade-in-up">
              Pronto para começar?
            </h2>
            <p className="text-2xl text-gray-300 mb-16 animate-fade-in-up stagger-1">
              Junte-se a milhares de pessoas que já encontraram os melhores profissionais
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8 animate-fade-in-up stagger-2">
              <Link
                to="/register?type=client"
                className="bg-white text-gray-900 px-12 py-6 rounded-3xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl group"
              >
                <Target className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                Encontrar Profissionais
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link
                to="/register?type=professional"
                className="bg-transparent border-2 border-white text-white px-12 py-6 rounded-3xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 text-xl group"
              >
                <Users className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                Trabalhar Conosco
                <Zap className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <Link
        to="/chat"
        className="btn-floating group"
      >
        <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
      </Link>
    </div>
  );
};

export default LandingPage;