import React, { useState, useEffect } from 'react';
import { Bell, X, Check, CheckCheck, Trash2, Settings, Filter } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import Modal from './Modal';

interface NotificationCenterProps {
  className?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ className = '' }) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_update':
        return '📅';
      case 'message':
        return '💬';
      case 'payment':
        return '💰';
      case 'review':
        return '⭐';
      case 'system':
        return '🔧';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking_update':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'message':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'payment':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'review':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400';
      case 'system':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return time.toLocaleDateString('pt-BR');
  };

  return (
    <>
      {/* Notification Bell */}
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 transform hover:scale-110 group"
        >
          <Bell className="w-6 h-6" />
          
          {/* Unread count badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-in">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}

          {/* Pulse indicator */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full opacity-75 animate-ping" />
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-ultra z-50 max-h-96 overflow-hidden animate-scale-in border border-gray-200/50 dark:border-gray-700/50">
            
            {/* Header */}
            <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notificações
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {[
                  { id: 'all', label: 'Todas' },
                  { id: 'unread', label: 'Não lidas' },
                  { id: 'message', label: 'Mensagens' },
                  { id: 'booking_update', label: 'Agendamentos' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      filter === tab.id
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Actions */}
              {unreadCount > 0 && (
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span>Marcar todas como lidas</span>
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Limpar todas</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notifications list */}
            <div className="max-h-80 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group ${
                        !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                      }`}
                      onClick={() => {
                        if (!notification.isRead) {
                          markAsRead(notification.id);
                        }
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl;
                        }
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {notification.title}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(notification.timestamp)}
                              </span>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded"
                              title="Marcar como lida"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded"
                            title="Remover"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Configurações de Notificação"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Preferências de Notificação
            </h4>
            
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Notificações por E-mail', description: 'Receba notificações importantes por e-mail' },
                { key: 'push', label: 'Notificações Push', description: 'Notificações em tempo real no navegador' },
                { key: 'sms', label: 'Notificações por SMS', description: 'Receba SMS para notificações urgentes' },
                { key: 'marketing', label: 'E-mails de Marketing', description: 'Promoções e novidades da plataforma' }
              ].map((setting) => (
                <div key={setting.key} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={setting.key}
                    checked={settings[setting.key as keyof typeof settings]}
                    onChange={(e) => setSettings({ ...settings, [setting.key]: e.target.checked })}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label htmlFor={setting.key} className="text-sm font-medium text-gray-900 dark:text-white">
                      {setting.label}
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {setting.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowSettings(false)}
              className="flex-1 btn-outline py-3"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                // Save settings
                localStorage.setItem('notificationSettings', JSON.stringify(settings));
                setShowSettings(false);
              }}
              className="flex-1 btn-primary py-3"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      </Modal>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationCenter;