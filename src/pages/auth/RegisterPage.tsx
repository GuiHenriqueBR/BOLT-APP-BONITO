import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Users, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') as 'client' | 'professional' || 'client';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: initialType,
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    if (!formData.acceptTerms) {
      setError('Você deve aceitar os termos de uso');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: formData.type
      });
      
      // Redirect based on user type
      if (formData.type === 'professional') {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">CorujaFix</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Crie sua conta
          </h2>
          <p className="text-gray-600">
            Junte-se à nossa comunidade
          </p>
        </div>

        {/* Register Form */}
        <div className="card-modern p-8 animate-fade-in-up stagger-1">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-fade-in-up">
                {error}
              </div>
            )}

            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Tipo de conta
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border-2 rounded-2xl p-4 text-center transition-all duration-300 ${
                  formData.type === 'client' 
                    ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-lg scale-105' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="client"
                    checked={formData.type === 'client'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <User className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Cliente</div>
                  <div className="text-xs text-gray-500">Contratar serviços</div>
                </label>

                <label className={`cursor-pointer border-2 rounded-2xl p-4 text-center transition-all duration-300 ${
                  formData.type === 'professional' 
                    ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-lg scale-105' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="professional"
                    checked={formData.type === 'professional'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Profissional</div>
                  <div className="text-xs text-gray-500">Oferecer serviços</div>
                </label>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-modern pl-12 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-modern pl-12 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-modern pl-12 pr-12 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-modern pl-12 pr-12 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed">
                Li e aceito os{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500 font-medium">
                  Termos de Uso
                </Link>{' '}
                e{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500 font-medium">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <LoadingSpinner size="sm" className="text-white" />
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Entre aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-4 animate-fade-in-up stagger-2">
          {[
            { icon: Shield, title: 'Segurança Total', desc: 'Dados protegidos e verificação completa' },
            { icon: CheckCircle, title: 'Processo Simples', desc: 'Cadastro rápido e fácil' }
          ].map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <benefit.icon className="w-8 h-8 text-primary-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{benefit.title}</p>
                <p className="text-xs text-gray-600">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;