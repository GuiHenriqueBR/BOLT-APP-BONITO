import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  MessageCircle, 
  Bell, 
  Search,
  ChevronDown,
  Zap,
  Shield,
  Star,
  TrendingUp,
  Globe,
  Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import SearchBar from '../common/SearchBar';
import NotificationCenter from '../common/NotificationCenter';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const navigationItems = [
    { to: '/how-it-works', label: 'Como Funciona', icon: Zap },
    { to: '/about', label: 'Sobre', icon: Globe },
    { to: '/faq', label: 'FAQ', icon: Shield }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-morphism shadow-ultra backdrop-blur-xl' 
        : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="container-ultra">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 gradient-animated rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-glow">
                <span className="text-white font-black text-2xl">C</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-black text-gradient group-hover:scale-105 transition-transform duration-300">
                CorujaFix
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Conectamos Talentos</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link group animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Advanced Search Bar */}
          <div className="hidden xl:flex flex-1 max-w-2xl mx-8">
            <SearchBar 
              placeholder="Buscar profissionais, serviços..."
              showFilters={false}
              className="w-full"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                
                {/* Quick Actions */}
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/favorites"
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 relative group"
                  >
                    <Heart className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  <Link
                    to="/chat"
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 relative"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  </Link>
                </div>

                {/* Notifications */}
                <NotificationCenter />

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
                  >
                    <div className="relative">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-200 dark:group-hover:ring-blue-400 transition-all duration-300 shadow-lg" 
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                    </div>
                    
                    <div className="hidden sm:block text-left">
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>4.9</span>
                        <span>•</span>
                        <span className="text-green-500">Online</span>
                      </div>
                    </div>
                    
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Enhanced User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-ultra py-3 z-50 animate-scale-in border border-gray-200/50 dark:border-gray-700/50">
                      
                      {/* User Info Header */}
                      <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="badge-verified">
                                <Shield className="w-3 h-3 mr-1" />
                                Verificado
                              </div>
                              <div className="badge-premium">
                                <Star className="w-3 h-3 mr-1" />
                                Pro
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">4.9</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">156</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Trabalhos</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">R$ 2.5k</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Este mês</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        {[
                          { to: '/dashboard', icon: TrendingUp, label: 'Dashboard', color: 'text-blue-600 dark:text-blue-400', bg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
                          { to: '/profile', icon: User, label: 'Meu Perfil', color: 'text-purple-600 dark:text-purple-400', bg: 'hover:bg-purple-50 dark:hover:bg-purple-900/20' },
                          { to: '/chat', icon: MessageCircle, label: 'Mensagens', color: 'text-green-600 dark:text-green-400', bg: 'hover:bg-green-50 dark:hover:bg-green-900/20' },
                          { to: '/settings', icon: Settings, label: 'Configurações', color: 'text-gray-600 dark:text-gray-400', bg: 'hover:bg-gray-50 dark:hover:bg-gray-800' }
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center px-6 py-3 text-sm transition-all duration-200 group ${item.bg}`}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className={`w-10 h-10 ${item.bg.replace('hover:', '')} rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                              <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200/50 dark:border-gray-700/50 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-6 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                            <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </div>
                          <span className="font-medium">Sair da Conta</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all duration-300 px-6 py-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Cadastrar-se
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-110 duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 py-6 animate-slide-in-top bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <div className="space-y-4">
              
              {/* Mobile Search */}
              <SearchBar 
                placeholder="Buscar serviços..."
                showFilters={false}
                className="w-full"
              />

              {/* Mobile Navigation */}
              {navigationItems.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all duration-300 py-3 px-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {!user && (
                <>
                  <hr className="border-gray-200/50 dark:border-gray-700/50 my-4" />
                  <Link
                    to="/login"
                    className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors py-3 px-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="block btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cadastrar-se
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;