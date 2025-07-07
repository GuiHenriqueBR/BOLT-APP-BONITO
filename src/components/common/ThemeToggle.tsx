import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 group"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        <Sun className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500 transform ${
          isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`} />
        <Moon className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-500 transform ${
          isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
        isDarkMode 
          ? 'bg-blue-400/20 shadow-lg shadow-blue-400/25' 
          : 'bg-yellow-400/20 shadow-lg shadow-yellow-400/25'
      } opacity-0 group-hover:opacity-100`}></div>
    </button>
  );
};

export default ThemeToggle;