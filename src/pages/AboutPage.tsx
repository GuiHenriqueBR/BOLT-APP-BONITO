import React from 'react';
import { 
  Heart, 
  Target, 
  Eye, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Zap,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { number: '50K+', label: 'Serviços Realizados', icon: CheckCircle },
    { number: '15K+', label: 'Profissionais Ativos', icon: Users },
    { number: '4.9', label: 'Avaliação Média', icon: Star },
    { number: '500+', label: 'Cidades Atendidas', icon: Globe }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Priorizamos a segurança em todas as transações, com verificação rigorosa de profissionais e pagamentos protegidos.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Confiança',
      description: 'Construímos relacionamentos baseados na transparência, honestidade e comprometimento com a excelência.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Inovação',
      description: 'Utilizamos tecnologia de ponta para criar soluções que simplificam e melhoram a experiência de todos.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Valorizamos cada membro da nossa comunidade, promovendo crescimento mútuo e oportunidades para todos.',
      color: 'from-green-500 to-green-600'
    }
  ];

  const team = [
    {
      name: 'Ana Silva',
      role: 'CEO & Fundadora',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Empreendedora serial com 15 anos de experiência em tecnologia e marketplace.',
      linkedin: '#'
    },
    {
      name: 'Carlos Santos',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Especialista em arquitetura de sistemas e desenvolvimento de plataformas escaláveis.',
      linkedin: '#'
    },
    {
      name: 'Maria Oliveira',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Designer de produto com foco em experiência do usuário e inovação.',
      linkedin: '#'
    },
    {
      name: 'João Ferreira',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Especialista em operações e crescimento de marketplaces digitais.',
      linkedin: '#'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Fundação',
      description: 'CorujaFix nasce com a missão de conectar pessoas a profissionais qualificados.'
    },
    {
      year: '2021',
      title: 'Expansão',
      description: 'Chegamos a 50 cidades e alcançamos 1.000 profissionais cadastrados.'
    },
    {
      year: '2022',
      title: 'Crescimento',
      description: '10.000 serviços realizados e lançamento do app mobile.'
    },
    {
      year: '2023',
      title: 'Consolidação',
      description: 'Presença nacional e 50.000 serviços realizados com excelência.'
    },
    {
      year: '2024',
      title: 'Inovação',
      description: 'Lançamento de IA para matching inteligente e novos recursos.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 particles"></div>
        
        <div className="relative container-ultra">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-8 animate-bounce-in">
              <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Nossa História</span>
            </div>
            
            <h1 className="text-display font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Conectamos Talentos,
              <span className="block text-gradient">Transformamos Vidas</span>
            </h1>
            
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed animate-fade-in-up stagger-1">
              Somos a plataforma líder em conectar pessoas aos melhores profissionais do Brasil. 
              Nossa missão é democratizar o acesso a serviços de qualidade e criar oportunidades 
              para profissionais crescerem seus negócios.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up stagger-2">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Mission */}
            <div className="text-center group animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Nossa Missão
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Democratizar o acesso a serviços de qualidade, conectando pessoas a profissionais 
                qualificados de forma simples, segura e eficiente, transformando a maneira como 
                contratamos e oferecemos serviços no Brasil.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center group animate-fade-in-up stagger-1">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Nossa Visão
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Ser a principal plataforma de serviços da América Latina, reconhecida pela 
                excelência, inovação e impacto positivo na vida de milhões de pessoas, 
                criando um ecossistema próspero para profissionais e clientes.
              </p>
            </div>

            {/* Values Preview */}
            <div className="text-center group animate-fade-in-up stagger-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Nossos Valores
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Guiados por princípios sólidos de segurança, confiança, inovação e comunidade, 
                construímos relacionamentos duradouros baseados na transparência e no 
                comprometimento com a excelência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Detail */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Os princípios que guiam cada decisão e ação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`card-ultra-modern p-8 hover:shadow-glow transition-all duration-500 group animate-fade-in-up stagger-${index + 1}`}>
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6">
              Nossa Jornada
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Marcos importantes da nossa história
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-start space-x-8 animate-fade-in-up stagger-${index + 1}`}>
                    {/* Timeline dot */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-10">
                      <span className="text-white font-bold text-lg">{item.year}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 card-ultra-modern p-6 group hover:shadow-glow transition-all duration-500">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              As pessoas por trás da CorujaFix
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className={`text-center group animate-fade-in-up stagger-${index + 1}`}>
                <div className="card-ultra-modern p-6 hover:shadow-glow transition-all duration-500">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 particles"></div>
        
        <div className="relative container-ultra text-center">
          <h2 className="text-display font-black mb-6">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram suas vidas com a CorujaFix
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="btn-primary bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg">
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
              Trabalhe Conosco
              <Users className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;