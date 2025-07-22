import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Users, ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Placeholder for Social Icons
const GoogleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.1,5.5 15.71,6.15L17.88,4.21C16.12,2.56 14.21,1.9 12.19,1.9C6.95,1.9 2.56,6.25 2.56,12C2.56,17.6 6.8,22.1 12.19,22.1C17.5,22.1 21.5,18.33 21.5,12.23C21.5,11.63 21.45,11.35 21.35,11.1Z"></path></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path></svg>;


// Simplified LoginPage Component for AuthTabsPage
const SimplifiedLoginPage: React.FC<{ onSwitchToRegister: () => void }> = ({ onSwitchToRegister }) => {
  // Logic from LoginPage.tsx
  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Bem-vindo!</h2>
        <p className="text-gray-600 dark:text-gray-300">Entre na sua conta.</p>
      </div>
      <form className="space-y-6">
        {/* Email and Password inputs */}
        <button type="submit" className="w-full btn btn-primary">Entrar</button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Não tem uma conta?{' '}
          <button type="button" onClick={onSwitchToRegister} className="font-medium text-primary-600 hover:text-primary-500">
            Cadastre-se
          </button>
        </p>
      </form>
    </motion.div>
  );
};

// Simplified RegisterPage Component for AuthTabsPage
const SimplifiedRegisterPage: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
  const [isProfessional, setIsProfessional] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Crie sua Conta</h2>
        <p className="text-gray-600 dark:text-gray-300">É rápido e fácil.</p>
      </div>
       <div className="grid grid-cols-2 gap-4 mb-4">
          <button onClick={() => setIsProfessional(false)} className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${!isProfessional ? 'bg-primary-100 dark:bg-primary-900 border-primary-500' : 'bg-gray-50 dark:bg-gray-800'}`}>
            <User/> Cliente
          </button>
          <button onClick={() => setIsProfessional(true)} className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${isProfessional ? 'bg-secondary-100 dark:bg-secondary-900 border-secondary-500' : 'bg-gray-50 dark:bg-gray-800'}`}>
            <Zap/> Profissional
          </button>
        </div>
      <form className="space-y-6">
        {/* Name, Email, Password inputs */}
        <button type="submit" className="w-full btn btn-secondary">Cadastrar</button>
         <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Já tem uma conta?{' '}
          <button type="button" onClick={onSwitchToLogin} className="font-medium text-secondary-600 hover:text-secondary-500">
            Entre aqui
          </button>
        </p>
      </form>
    </motion.div>
  );
};

const AuthTabsPage: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 dark:bg-primary-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-200 dark:bg-secondary-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-200 dark:bg-green-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

      <main className="relative max-w-md w-full space-y-8 z-10">
        <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4 text-gray-800 dark:text-white">
                <img src="/logo.svg" className="h-10 w-auto" alt="MeChama Logo" />
                <span className="text-3xl font-bold tracking-tight">MeChama</span>
            </Link>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-2xl p-2">
            <div className="flex bg-gray-100 dark:bg-slate-900/50 rounded-xl p-1">
                <button
                    onClick={() => setTab('login')}
                    className={`w-full p-2 rounded-lg font-semibold transition-colors ${tab === 'login' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
                >
                    Entrar
                </button>
                <button
                    onClick={() => setTab('register')}
                    className={`w-full p-2 rounded-lg font-semibold transition-colors ${tab === 'register' ? 'text-secondary-700 dark:text-secondary-300' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
                >
                    Cadastrar
                </button>
            </div>
            <div className="relative p-6 overflow-x-hidden">
                <AnimatePresence mode="wait">
                    {tab === 'login' ? (
                        <motion.div key="login">
                          <SimplifiedLoginPage onSwitchToRegister={() => setTab('register')} />
                        </motion.div>
                    ) : (
                        <motion.div key="register">
                          <SimplifiedRegisterPage onSwitchToLogin={() => setTab('login')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">ou entre com</span>
          <div className="flex gap-4">
            <button className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full shadow-md hover:scale-110 hover:shadow-lg transition-all">
              <GoogleIcon />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full shadow-md hover:scale-110 hover:shadow-lg transition-all">
              <FacebookIcon />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthTabsPage;
