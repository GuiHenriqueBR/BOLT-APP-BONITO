import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  Shield,
  DollarSign,
  Users,
  Star,
  Clock,
  ArrowRight
} from 'lucide-react';

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'Todas', icon: HelpCircle, count: 24 },
    { id: 'getting-started', name: 'Primeiros Passos', icon: Users, count: 6 },
    { id: 'payments', name: 'Pagamentos', icon: DollarSign, count: 5 },
    { id: 'safety', name: 'Segurança', icon: Shield, count: 4 },
    { id: 'reviews', name: 'Avaliações', icon: Star, count: 3 },
    { id: 'support', name: 'Suporte', icon: MessageCircle, count: 6 }
  ];

  const faqs = [
    {
      id: '1',
      category: 'getting-started',
      question: 'Como funciona a CorujaFix?',
      answer: 'A CorujaFix é uma plataforma que conecta clientes a profissionais qualificados. Você pode buscar profissionais por categoria, comparar perfis, conversar diretamente e contratar com segurança. Todo o processo é protegido e transparente.',
      popular: true
    },
    {
      id: '2',
      category: 'getting-started',
      question: 'Como me cadastro na plataforma?',
      answer: 'O cadastro é simples e gratuito. Clique em "Cadastrar-se", escolha se você é cliente ou profissional, preencha seus dados básicos e confirme seu e-mail. Para profissionais, há um processo adicional de verificação.'
    },
    {
      id: '3',
      category: 'payments',
      question: 'Como funciona o pagamento?',
      answer: 'O pagamento é processado de forma segura através da plataforma. O dinheiro fica retido até a conclusão satisfatória do serviço. Aceitamos cartão de crédito, PIX e boleto bancário. Para profissionais, o pagamento é liberado após a confirmação do cliente.',
      popular: true
    },
    {
      id: '4',
      category: 'payments',
      question: 'Quais são as taxas cobradas?',
      answer: 'Para clientes, o uso da plataforma é gratuito. Profissionais pagam uma taxa de 5% sobre o valor recebido, que já inclui processamento de pagamento e todas as funcionalidades da plataforma.'
    },
    {
      id: '5',
      category: 'safety',
      question: 'Os profissionais são verificados?',
      answer: 'Sim! Todos os profissionais passam por um rigoroso processo de verificação que inclui validação de identidade, certificações profissionais e análise de histórico. Profissionais verificados recebem um selo especial.',
      popular: true
    },
    {
      id: '6',
      category: 'safety',
      question: 'Meus dados estão seguros?',
      answer: 'Absolutamente. Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança. Seus dados pessoais e financeiros são protegidos conforme a LGPD e nunca são compartilhados sem sua autorização.'
    },
    {
      id: '7',
      category: 'reviews',
      question: 'Como funciona o sistema de avaliações?',
      answer: 'Após a conclusão de um serviço, tanto cliente quanto profissional podem avaliar um ao outro. As avaliações são públicas e ajudam a construir reputação na plataforma. Só quem realmente contratou pode avaliar.'
    },
    {
      id: '8',
      category: 'support',
      question: 'E se eu não ficar satisfeito com o serviço?',
      answer: 'Oferecemos garantia de satisfação. Nossa equipe de suporte está disponível 24/7 para mediar qualquer questão. Se necessário, podemos reter o pagamento até que uma solução seja encontrada.',
      popular: true
    },
    {
      id: '9',
      category: 'getting-started',
      question: 'Posso cancelar um agendamento?',
      answer: 'Sim, você pode cancelar um agendamento seguindo nossa política de cancelamento. Cancelamentos com mais de 24h de antecedência são gratuitos. Para cancelamentos de última hora, podem ser aplicadas taxas.'
    },
    {
      id: '10',
      category: 'payments',
      question: 'Como recebo meu dinheiro como profissional?',
      answer: 'O pagamento é liberado automaticamente após a confirmação do cliente ou 7 dias após a conclusão do serviço. O dinheiro é transferido para sua conta bancária cadastrada em até 2 dias úteis.'
    },
    {
      id: '11',
      category: 'safety',
      question: 'O que fazer em caso de emergência?',
      answer: 'Em caso de emergência durante um serviço, entre em contato imediatamente com nosso suporte 24/7 pelo telefone (11) 9999-9999. Temos protocolos específicos para situações de emergência.'
    },
    {
      id: '12',
      category: 'support',
      question: 'Como entro em contato com o suporte?',
      answer: 'Você pode entrar em contato conosco através do chat na plataforma, e-mail (suporte@corujafix.com), telefone (11) 9999-9999 ou WhatsApp. Nosso suporte funciona 24/7.'
    }
  ];

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFaqs = faqs.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 particles"></div>
        
        <div className="relative container-ultra text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-8 animate-bounce-in">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Central de Ajuda</span>
          </div>
          
          <h1 className="text-display font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            Perguntas Frequentes
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-up stagger-1">
            Encontre respostas rápidas para suas dúvidas sobre a CorujaFix
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up stagger-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              
              <div className="relative glass-morphism rounded-2xl shadow-ultra">
                <div className="flex items-center">
                  <Search className="absolute left-6 text-gray-400 dark:text-gray-500 w-6 h-6 z-10" />
                  <input
                    type="text"
                    placeholder="Busque por uma pergunta..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 text-lg border-0 rounded-2xl focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 bg-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      {!searchQuery && (
        <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container-ultra">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Perguntas Mais Populares
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {popularFaqs.map((faq, index) => (
                <div key={faq.id} className={`card-ultra-modern p-6 hover:shadow-glow transition-all duration-500 group cursor-pointer animate-fade-in-up stagger-${index + 1}`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {faq.answer}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="container-ultra">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-ultra-modern p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Categorias</h3>
                
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className="w-5 h-5" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.id} className={`card-ultra-modern overflow-hidden animate-fade-in-up stagger-${index + 1}`}>
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          {faq.popular && (
                            <div className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full">
                              Popular
                            </div>
                          )}
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          openItems.has(faq.id) ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </button>
                    
                    {openItems.has(faq.id) && (
                      <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4 animate-fade-in-up">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhuma pergunta encontrada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tente buscar com outras palavras-chave ou entre em contato conosco.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
        <div className="container-ultra text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Não encontrou sua resposta?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Nossa equipe está pronta para ajudar você
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: 'Chat ao Vivo',
                description: 'Converse conosco em tempo real',
                action: 'Iniciar Chat',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Mail,
                title: 'E-mail',
                description: 'suporte@corujafix.com',
                action: 'Enviar E-mail',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Phone,
                title: 'Telefone',
                description: '(11) 9999-9999',
                action: 'Ligar Agora',
                color: 'from-purple-500 to-purple-600'
              }
            ].map((contact, index) => (
              <div key={index} className={`card-ultra-modern p-8 text-center hover:shadow-glow transition-all duration-500 group animate-fade-in-up stagger-${index + 1}`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <contact.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {contact.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {contact.description}
                </p>
                
                <button className="btn-primary px-6 py-3 w-full">
                  {contact.action}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-gray-900 dark:text-white">Horário de Atendimento</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Suporte 24/7 - Estamos sempre aqui para você!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;