import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Youtube,
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Zap,
  Shield,
  Award,
  Globe,
  Send,
  ArrowRight
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600', bg: 'hover:bg-blue-50' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600', bg: 'hover:bg-pink-50' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400', bg: 'hover:bg-blue-50' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700', bg: 'hover:bg-blue-50' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600', bg: 'hover:bg-red-50' }
  ];

  const footerSections = [
    {
      title: 'Serviços',
      links: [
        { to: '/search?category=eletrica', label: 'Elétrica' },
        { to: '/search?category=hidraulica', label: 'Hidráulica' },
        { to: '/search?category=marcenaria', label: 'Marcenaria' },
        { to: '/search?category=limpeza', label: 'Limpeza' },
        { to: '/search?category=jardinagem', label: 'Jardinagem' },
        { to: '/search?category=pintura', label: 'Pintura' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { to: '/about', label: 'Sobre Nós' },
        { to: '/careers', label: 'Carreiras' },
        { to: '/press', label: 'Imprensa' },
        { to: '/investors', label: 'Investidores' },
        { to: '/blog', label: 'Blog' },
        { to: '/partnerships', label: 'Parcerias' }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { to: '/help', label: 'Central de Ajuda' },
        { to: '/how-it-works', label: 'Como Funciona' },
        { to: '/faq', label: 'FAQ' },
        { to: '/contact', label: 'Contato' },
        { to: '/safety', label: 'Segurança' },
        { to: '/community', label: 'Comunidade' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { to: '/terms', label: 'Termos de Uso' },
        { to: '/privacy', label: 'Política de Privacidade' },
        { to: '/cookies', label: 'Política de Cookies' },
        { to: '/gdpr', label: 'LGPD' },
        { to: '/accessibility', label: 'Acessibilidade' },
        { to: '/licenses', label: 'Licenças' }
      ]
    }
  ];

  const features = [
    { icon: Shield, title: 'Segurança Total', desc: 'Pagamentos protegidos e profissionais verificados' },
    { icon: Award, title: 'Qualidade Garantida', desc: 'Avaliações reais e suporte 24/7' },
    { icon: Zap, title: 'Rapidez', desc: 'Encontre profissionais em minutos' },
    { icon: Globe, title: 'Nacional', desc: 'Presente em todo o Brasil' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 particles"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <div className="relative">
        
        {/* Top Section - Features */}
        <div className="border-b border-gray-700/50 py-16">
          <div className="container-ultra">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Por que escolher a CorujaFix?</h2>
              <p className="text-gray-300 text-lg animate-fade-in-up stagger-1">A plataforma mais confiável para conectar talentos</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className={`text-center group animate-fade-in-up stagger-${index + 1}`}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-glow">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="container-ultra">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
              
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 gradient-animated rounded-2xl flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-glow">
                    <span className="text-white font-black text-2xl">C</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-gradient">CorujaFix</span>
                    <div className="text-sm text-gray-400">Conectamos Talentos</div>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed text-lg">
                  A plataforma líder em conectar pessoas aos melhores profissionais. 
                  Mais de 50.000 serviços realizados com segurança, qualidade e confiança garantida.
                </p>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Siga-nos</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} ${social.bg} transition-all duration-300 hover:scale-110 hover:shadow-glow transform`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Contato</h4>
                  <div className="space-y-3">
                    {[
                      { icon: Mail, text: 'contato@corujafix.com', color: 'text-blue-400' },
                      { icon: Phone, text: '(11) 9999-9999', color: 'text-green-400' },
                      { icon: MapPin, text: 'São Paulo, SP - Brasil', color: 'text-red-400' }
                    ].map((contact, index) => (
                      <div key={index} className="flex items-center space-x-3 text-gray-300 group hover:text-white transition-colors duration-300">
                        <contact.icon className={`w-5 h-5 ${contact.color} group-hover:scale-110 transition-transform duration-300`} />
                        <span>{contact.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Sections */}
              {footerSections.map((section, sectionIndex) => (
                <div key={section.title} className={`animate-fade-in-up stagger-${sectionIndex + 2}`}>
                  <h3 className="text-xl font-semibold text-white mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.to}>
                        <Link 
                          to={link.to} 
                          className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center group"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700/50 py-12">
          <div className="container-ultra">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4 animate-fade-in-up">Fique por dentro das novidades</h3>
              <p className="text-gray-300 mb-8 animate-fade-in-up stagger-1">Receba dicas, promoções e atualizações exclusivas</p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in-up stagger-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <button className="btn-primary px-8 py-4 whitespace-nowrap group">
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Inscrever-se
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 py-8">
          <div className="container-ultra">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              <div className="flex items-center space-x-2 text-gray-400">
                <span>© {currentYear} CorujaFix. Desenvolvido com</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>no Brasil</span>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                {[
                  { to: '/privacy', label: 'Privacidade' },
                  { to: '/terms', label: 'Termos' },
                  { to: '/cookies', label: 'Cookies' },
                  { to: '/sitemap', label: 'Sitemap' }
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;