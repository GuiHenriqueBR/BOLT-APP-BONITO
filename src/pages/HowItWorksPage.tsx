import React from 'react';
import { 
  Search, 
  MessageCircle, 
  Shield, 
  Star, 
  CheckCircle, 
  Users, 
  Zap, 
  Award,
  ArrowRight,
  Play,
  Clock,
  DollarSign,
  Globe
} from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const clientSteps = [
    {
      icon: Search,
      title: '1. Busque ou Publique',
      description: 'Encontre profissionais qualificados ou publique seu pedido para receber propostas',
      details: [
        'Busca inteligente por categoria e localização',
        'Filtros avançados por preço e avaliação',
        'Publicação de pedidos personalizados',
        'Receba múltiplas propostas'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: '2. Compare e Converse',
      description: 'Analise perfis, compare propostas e negocie detalhes diretamente com os profissionais',
      details: [
        'Chat integrado em tempo real',
        'Histórico de trabalhos e avaliações',
        'Portfólio e certificações',
        'Negociação de preços e prazos'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: '3. Contrate com Segurança',
      description: 'Faça o pagamento protegido e acompanhe o progresso do seu projeto',
      details: [
        'Pagamento seguro na plataforma',
        'Dinheiro liberado após conclusão',
        'Acompanhamento em tempo real',
        'Suporte dedicado 24/7'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Star,
      title: '4. Avalie e Recomende',
      description: 'Compartilhe sua experiência e ajude outros usuários a encontrar os melhores profissionais',
      details: [
        'Sistema de avaliações transparente',
        'Comentários detalhados',
        'Fotos do trabalho realizado',
        'Construa sua reputação'
      ],
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const professionalSteps = [
    {
      icon: Users,
      title: '1. Crie seu Perfil',
      description: 'Complete seu cadastro profissional com portfólio e certificações',
      details: [
        'Verificação de identidade',
        'Upload de certificações',
        'Portfólio de trabalhos',
        'Definição de especialidades'
      ],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: '2. Ofereça Serviços',
      description: 'Cadastre seus serviços e responda a pedidos de clientes',
      details: [
        'Criação de pacotes de serviços',
        'Resposta a pedidos abertos',
        'Definição de preços competitivos',
        'Gestão de disponibilidade'
      ],
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: DollarSign,
      title: '3. Trabalhe e Receba',
      description: 'Execute trabalhos de qualidade e receba pagamentos garantidos',
      details: [
        'Pagamentos protegidos',
        'Transferência automática',
        'Relatórios financeiros',
        'Crescimento da reputação'
      ],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Award,
      title: '4. Cresça seu Negócio',
      description: 'Construa sua reputação e expanda sua base de clientes',
      details: [
        'Analytics detalhados',
        'Ferramentas de marketing',
        'Programa de fidelidade',
        'Suporte ao crescimento'
      ],
      color: 'from-rose-500 to-rose-600'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Profissionais verificados, pagamentos protegidos e suporte 24/7',
      stats: '100% Seguro'
    },
    {
      icon: Clock,
      title: 'Rapidez',
      description: 'Encontre profissionais em minutos e receba respostas em até 1 hora',
      stats: '< 1h Resposta'
    },
    {
      icon: Star,
      title: 'Qualidade Garantida',
      description: 'Sistema de avaliações transparente e garantia de satisfação',
      stats: '4.9★ Média'
    },
    {
      icon: Globe,
      title: 'Cobertura Nacional',
      description: 'Presente em todas as capitais e principais cidades do Brasil',
      stats: '500+ Cidades'
    }
  ];

  const faqs = [
    {
      question: 'Como funciona o pagamento?',
      answer: 'O pagamento é feito de forma segura através da plataforma. O dinheiro fica retido até a conclusão satisfatória do serviço, garantindo proteção tanto para clientes quanto profissionais.'
    },
    {
      question: 'Os profissionais são verificados?',
      answer: 'Sim! Todos os profissionais passam por um rigoroso processo de verificação que inclui validação de identidade, certificações e histórico profissional.'
    },
    {
      question: 'E se eu não ficar satisfeito com o serviço?',
      answer: 'Oferecemos garantia de satisfação. Nossa equipe de suporte está disponível 24/7 para mediar qualquer questão e garantir uma solução justa para ambas as partes.'
    },
    {
      question: 'Quanto custa usar a plataforma?',
      answer: 'Para clientes, o uso é gratuito. Profissionais pagam uma pequena taxa apenas quando recebem pagamentos, garantindo que só paguem quando ganharem.'
    },
    {
      question: 'Como posso me tornar um profissional verificado?',
      answer: 'Complete seu perfil, envie seus documentos e certificações. Nossa equipe analisa em até 24 horas e você recebe o selo de verificado.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 particles"></div>
        
        <div className="relative container-ultra text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-8 animate-bounce-in">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Processo Simples</span>
          </div>
          
          <h1 className="text-display font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            Como Funciona a CorujaFix
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 animate-fade-in-up stagger-1">
            Conectamos você aos melhores profissionais de forma simples, rápida e segura
          </p>

          {/* Video Preview */}
          <div className="relative max-w-4xl mx-auto mb-16 animate-fade-in-up stagger-2">
            <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl overflow-hidden shadow-ultra">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=2"
                alt="Como funciona"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-10 h-10 text-blue-600 ml-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Process */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6">
              Para Clientes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Encontre e contrate profissionais em 4 passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {clientSteps.map((step, index) => (
              <div key={index} className={`animate-fade-in-up stagger-${index + 1}`}>
                <div className="card-ultra-modern p-8 hover:shadow-glow transition-all duration-500 group">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Process */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6">
              Para Profissionais
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Construa seu negócio e aumente sua renda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {professionalSteps.map((step, index) => (
              <div key={index} className={`animate-fade-in-up stagger-${index + 1}`}>
                <div className="card-ultra-modern p-8 hover:shadow-glow transition-all duration-500 group">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6">
              Por que escolher a CorujaFix?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Benefícios que fazem a diferença
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`text-center group animate-fade-in-up stagger-${index + 1}`}>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                  {benefit.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <h2 className="text-display font-black text-gray-900 dark:text-white mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tire suas dúvidas sobre como funciona
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className={`group card-ultra-modern p-6 animate-fade-in-up stagger-${index + 1}`}>
                <summary className="flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {faq.question}
                  </h3>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform duration-300" />
                  </div>
                </summary>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 particles"></div>
        
        <div className="relative container-ultra text-center">
          <h2 className="text-display font-black mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Junte-se a milhares de pessoas que já encontraram os melhores profissionais na CorujaFix
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="btn-primary bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg">
              Encontrar Profissionais
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
              Trabalhar Conosco
              <Users className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;