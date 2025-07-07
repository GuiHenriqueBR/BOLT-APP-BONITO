import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  X, 
  Check, 
  Trash2, 
  Settings,
  MessageCircle,
  Calendar,
  DollarSign,
  Star,
  Gift,
  Clock,
  AlertTriangle,
  CheckCircle,
  Filter,
  MarkEmailRead,
  Archive
} from 'lucide-react';
import { notificationService, Notification } from '../../services/notificationService';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  onNotificationClick
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | Notification['type']>('all');
  const [showSettings, setShowSettings] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const unsubscribe = notificationService.subscribe(handleNotificationsUpdate);
      loadNotifications();
      return unsubscribe;
    }
  }, [isOpen]);

  useEffect(() => {
    applyFilter();
  }, [notifications, filter]);

  const handleNotificationsUpdate = (newNotifications: Notification[]) => {
    setNotifications(newNotifications);
    setLoading(false);
  };

  const loadNotifications = async () => {
    try {
      setLoading(true);
      await notificationService.fetchNotifications();
    } catch (error) {
      console.error('Error loading notifications:', error);
      setLoading(false);
    }
  };

  const applyFilter = () => {
    let filtered = [...notifications];

    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.isRead);
    } else if (filter !== 'all') {
      filtered = filtered.filter(n => n.type === filter);
    }

    setFilteredNotifications(filtered);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    await notificationService.markAsRead([notificationId]);
  };

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead();
  };

  const handleDeleteNotification = async (notificationId: string) => {
    await notificationService.deleteNotification(notificationId);
  };

  const handleClearAll = async () => {
    if (window.confirm('Tem certeza que deseja limpar todas as notificações?')) {
      await notificationService.clearAll();
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    
    if (onNotificationClick) {
      onNotificationClick(notification);
    } else if (notification.actionUrl) {
      onClose();
      // Navigate to the URL
      window.location.href = notification.actionUrl;
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message': return MessageCircle;
      case 'booking_update': return Calendar;
      case 'payment': return DollarSign;
      case 'review': return Star;
      case 'promotion': return Gift;
      case 'reminder': return Clock;
      case 'system': return AlertTriangle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'message': return 'text-blue-600 bg-blue-100';
      case 'booking_update': return 'text-green-600 bg-green-100';
      case 'payment': return 'text-purple-600 bg-purple-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'promotion': return 'text-pink-600 bg-pink-100';
      case 'reminder': return 'text-orange-600 bg-orange-100';
      case 'system': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIndicator = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />;
      case 'high':
        return <div className="w-3 h-3 bg-orange-500 rounded-full" />;
      case 'normal':
        return <div className="w-3 h-3 bg-blue-500 rounded-full" />;
      case 'low':
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
      default:
        return null;
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h atrás`;
    } else if (diffInHours < 48) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const typeFilters = [
    { key: 'all', label: 'Todas', count: notifications.length },
    { key: 'unread', label: 'Não lidas', count: unreadCount },
    { key: 'message', label: 'Mensagens', count: notifications.filter(n => n.type === 'message').length },
    { key: 'booking_update', label: 'Agendamentos', count: notifications.filter(n => n.type === 'booking_update').length },
    { key: 'payment', label: 'Pagamentos', count: notifications.filter(n => n.type === 'payment').length },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Notification Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div ref={containerRef} className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-gray-900 dark:text-white" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Notificações
                </h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {unreadCount} não lida{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between space-x-4">
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                  className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <MarkEmailRead className="w-4 h-4" />
                  <span>Marcar todas como lidas</span>
                </button>
                
                <button
                  onClick={handleClearAll}
                  className="flex items-center space-x-2 px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Limpar todas</span>
                </button>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtros:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key as any)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filter === filterOption.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {filterOption.label}
                  {filterOption.count > 0 && (
                    <span className="ml-1 font-medium">({filterOption.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <Bell className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                  {filter === 'unread' 
                    ? 'Todas as suas notificações foram lidas!'
                    : 'Você não tem notificações no momento.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getNotificationColor(notification.type);
                  
                  return (
                    <div
                      key={notification.id}
                      className={`relative p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group ${
                        !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        
                        {/* Icon/Avatar */}
                        <div className="flex-shrink-0">
                          {notification.avatar ? (
                            <img
                              src={notification.avatar}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className={`font-semibold text-sm ${
                                  !notification.isRead 
                                    ? 'text-gray-900 dark:text-white' 
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {notification.title}
                                </h4>
                                {getPriorityIndicator(notification.priority)}
                              </div>
                              
                              <p className={`text-sm mb-2 ${
                                !notification.isRead 
                                  ? 'text-gray-700 dark:text-gray-300' 
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatRelativeTime(notification.createdAt)}
                                </span>
                                
                                {notification.actionText && (
                                  <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                                    {notification.actionText}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!notification.isRead && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkAsRead(notification.id);
                                  }}
                                  className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                  title="Marcar como lida"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteNotification(notification.id);
                                }}
                                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded transition-colors"
                                title="Remover notificação"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Unread indicator */}
                          {!notification.isRead && (
                            <div className="absolute left-2 top-4 w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <button
                  onClick={loadNotifications}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Atualizar notificações
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;