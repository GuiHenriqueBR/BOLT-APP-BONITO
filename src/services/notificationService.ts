import { apiService } from './api';

export interface Notification {
  id: string;
  type: 'booking_update' | 'message' | 'payment' | 'review' | 'system' | 'promotion' | 'reminder';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: string;
  expiresAt?: string;
  actionUrl?: string;
  actionText?: string;
  avatar?: string;
  category?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  categories: {
    bookings: boolean;
    messages: boolean;
    payments: boolean;
    reviews: boolean;
    promotions: boolean;
    reminders: boolean;
  };
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];
  private settings: NotificationSettings;
  private retryAttempts = 3;
  private retryDelay = 2000;

  constructor() {
    this.settings = this.loadSettings();
    this.loadStoredNotifications();
    this.startPolling();
    this.scheduleCleanup();
  }

  // Subscription management
  subscribe(callback: (notifications: Notification[]) => void) {
    this.listeners.push(callback);
    // Send current notifications immediately
    callback(this.notifications);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener([...this.notifications]);
      } catch (error) {
        console.error('Error notifying listener:', error);
      }
    });
  }

  // Core notification methods
  async fetchNotifications(userId?: string): Promise<Notification[]> {
    try {
      // In production, this would be a real API call
      // For now, we'll generate realistic notifications
      const newNotifications = await this.generateRealisticNotifications();
      this.mergeNotifications(newNotifications);
      this.saveNotifications();
      this.notifyListeners();
      return this.notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return this.notifications;
    }
  }

  private async generateRealisticNotifications(): Promise<Notification[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const now = new Date();
    const notifications: Notification[] = [];

    // Generate various types of notifications based on time and user activity
    const notificationTypes = [
      {
        type: 'booking_update' as const,
        templates: [
          { title: 'Agendamento Confirmado', message: 'Carlos Silva confirmou seu agendamento para amanhã às 09:00' },
          { title: 'Serviço Concluído', message: 'Maria Santos marcou o serviço de limpeza como concluído' },
          { title: 'Agendamento Próximo', message: 'Lembrete: Você tem um serviço agendado em 2 horas' }
        ]
      },
      {
        type: 'message' as const,
        templates: [
          { title: 'Nova Mensagem', message: 'Carlos Silva enviou uma mensagem sobre o projeto' },
          { title: 'Resposta Recebida', message: 'João Ferreira respondeu sua pergunta' }
        ]
      },
      {
        type: 'payment' as const,
        templates: [
          { title: 'Pagamento Aprovado', message: 'Pagamento de R$ 150,00 foi aprovado com sucesso' },
          { title: 'Economia Disponível', message: 'Você economizou R$ 50,00 neste mês com nossa plataforma!' }
        ]
      },
      {
        type: 'review' as const,
        templates: [
          { title: 'Nova Avaliação', message: 'Carlos Silva avaliou seu serviço com 5 estrelas' },
          { title: 'Avalie o Profissional', message: 'Que tal avaliar o serviço de Maria Santos?' }
        ]
      },
      {
        type: 'promotion' as const,
        templates: [
          { title: 'Oferta Especial', message: '20% de desconto em serviços de limpeza esta semana!' },
          { title: 'Profissional Recomendado', message: 'Novo eletricista 5 estrelas na sua região' }
        ]
      },
      {
        type: 'reminder' as const,
        templates: [
          { title: 'Complete seu Perfil', message: 'Adicione uma foto para receber mais propostas' },
          { title: 'Avaliação Pendente', message: 'Você tem 2 serviços para avaliar' }
        ]
      }
    ];

    // Generate 2-5 random notifications
    const numNotifications = 2 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numNotifications; i++) {
      const typeData = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const template = typeData.templates[Math.floor(Math.random() * typeData.templates.length)];
      
      // Create notification with realistic timestamp
      const createdAt = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000); // Last 24 hours
      
      notifications.push({
        id: `notif_${Date.now()}_${i}`,
        type: typeData.type,
        title: template.title,
        message: template.message,
        isRead: Math.random() > 0.6, // 40% chance of being unread
        priority: this.getRandomPriority(typeData.type),
        createdAt: createdAt.toISOString(),
        expiresAt: typeData.type === 'promotion' 
          ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() // Promotions expire in 7 days
          : undefined,
        actionUrl: this.getActionUrl(typeData.type),
        actionText: this.getActionText(typeData.type),
        avatar: this.getAvatar(typeData.type),
        category: typeData.type,
        data: this.getNotificationData(typeData.type)
      });
    }

    return notifications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  private getRandomPriority(type: Notification['type']): Notification['priority'] {
    switch (type) {
      case 'payment':
      case 'booking_update':
        return Math.random() > 0.7 ? 'high' : 'normal';
      case 'message':
        return Math.random() > 0.8 ? 'high' : 'normal';
      case 'system':
        return Math.random() > 0.9 ? 'urgent' : 'high';
      default:
        return 'normal';
    }
  }

  private getActionUrl(type: Notification['type']): string | undefined {
    switch (type) {
      case 'booking_update': return '/bookings';
      case 'message': return '/chat';
      case 'payment': return '/payments';
      case 'review': return '/reviews';
      case 'promotion': return '/search';
      default: return undefined;
    }
  }

  private getActionText(type: Notification['type']): string | undefined {
    switch (type) {
      case 'booking_update': return 'Ver Agendamento';
      case 'message': return 'Responder';
      case 'payment': return 'Ver Detalhes';
      case 'review': return 'Avaliar';
      case 'promotion': return 'Ver Oferta';
      default: return undefined;
    }
  }

  private getAvatar(type: Notification['type']): string | undefined {
    const avatars = [
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
    ];
    
    if (['message', 'booking_update', 'review'].includes(type)) {
      return avatars[Math.floor(Math.random() * avatars.length)];
    }
    
    return undefined;
  }

  private getNotificationData(type: Notification['type']): any {
    switch (type) {
      case 'payment':
        return { amount: 150 + Math.random() * 300, currency: 'BRL' };
      case 'booking_update':
        return { bookingId: `booking_${Math.random().toString(36).substr(2, 9)}` };
      case 'review':
        return { rating: 4 + Math.random(), serviceId: `service_${Math.random().toString(36).substr(2, 9)}` };
      default:
        return {};
    }
  }

  private mergeNotifications(newNotifications: Notification[]) {
    // Merge new notifications with existing ones, avoiding duplicates
    const existingIds = new Set(this.notifications.map(n => n.id));
    const uniqueNew = newNotifications.filter(n => !existingIds.has(n.id));
    
    this.notifications = [...uniqueNew, ...this.notifications]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 100); // Keep only last 100 notifications
  }

  // Mark notifications as read
  async markAsRead(notificationIds: string[]): Promise<void> {
    try {
      this.notifications = this.notifications.map(notification =>
        notificationIds.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      );
      
      this.saveNotifications();
      this.notifyListeners();
      
      // In production, sync with server
      // await apiService.request('/notifications/read', {
      //   method: 'POST',
      //   body: { notificationIds }
      // });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  }

  async markAllAsRead(): Promise<void> {
    const unreadIds = this.notifications
      .filter(n => !n.isRead)
      .map(n => n.id);
    
    if (unreadIds.length > 0) {
      await this.markAsRead(unreadIds);
    }
  }

  // Delete notifications
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      this.notifications = this.notifications.filter(n => n.id !== notificationId);
      this.saveNotifications();
      this.notifyListeners();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  async clearAll(): Promise<void> {
    this.notifications = [];
    this.saveNotifications();
    this.notifyListeners();
  }

  // Getters
  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  getNotificationsByType(type: Notification['type']): Notification[] {
    return this.notifications.filter(n => n.type === type);
  }

  getNotificationsByPriority(priority: Notification['priority']): Notification[] {
    return this.notifications.filter(n => n.priority === priority);
  }

  // Create custom notifications
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<void> {
    const newNotification: Notification = {
      ...notification,
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    this.notifications.unshift(newNotification);
    this.saveNotifications();
    this.notifyListeners();

    // Show browser notification if enabled
    if (this.settings.pushNotifications && 'Notification' in window) {
      this.showBrowserNotification(newNotification);
    }
  }

  // Quick notification creators
  async bookingUpdate(title: string, message: string, bookingId?: string): Promise<void> {
    await this.createNotification({
      type: 'booking_update',
      title,
      message,
      isRead: false,
      priority: 'high',
      actionUrl: `/bookings${bookingId ? `/${bookingId}` : ''}`,
      actionText: 'Ver Agendamento',
      data: { bookingId }
    });
  }

  async messageReceived(senderName: string, preview: string, chatId?: string): Promise<void> {
    await this.createNotification({
      type: 'message',
      title: `Nova mensagem de ${senderName}`,
      message: preview,
      isRead: false,
      priority: 'normal',
      actionUrl: `/chat${chatId ? `/${chatId}` : ''}`,
      actionText: 'Responder',
      data: { chatId, senderName }
    });
  }

  async paymentUpdate(amount: number, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
    const titles = {
      approved: 'Pagamento Aprovado',
      rejected: 'Pagamento Rejeitado',
      pending: 'Pagamento Pendente'
    };

    const messages = {
      approved: `Pagamento de R$ ${amount.toFixed(2)} foi aprovado com sucesso`,
      rejected: `Pagamento de R$ ${amount.toFixed(2)} foi rejeitado`,
      pending: `Pagamento de R$ ${amount.toFixed(2)} está sendo processado`
    };

    await this.createNotification({
      type: 'payment',
      title: titles[status],
      message: messages[status],
      isRead: false,
      priority: status === 'rejected' ? 'high' : 'normal',
      actionUrl: '/payments',
      actionText: 'Ver Detalhes',
      data: { amount, status }
    });
  }

  async reviewReceived(rating: number, reviewerName: string): Promise<void> {
    await this.createNotification({
      type: 'review',
      title: 'Nova Avaliação Recebida',
      message: `${reviewerName} avaliou seu serviço com ${rating} estrelas`,
      isRead: false,
      priority: 'normal',
      actionUrl: '/reviews',
      actionText: 'Ver Avaliação',
      data: { rating, reviewerName }
    });
  }

  // Settings management
  getSettings(): NotificationSettings {
    return { ...this.settings };
  }

  async updateSettings(newSettings: Partial<NotificationSettings>): Promise<void> {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
    
    // Request permission for browser notifications if enabled
    if (newSettings.pushNotifications && 'Notification' in window) {
      await this.requestNotificationPermission();
    }
  }

  // Browser notifications
  private async requestNotificationPermission(): Promise<void> {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }

  private showBrowserNotification(notification: Notification): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      const browserNotification = new Notification(notification.title, {
        body: notification.message,
        icon: notification.avatar || '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: notification.id,
        requireInteraction: notification.priority === 'urgent'
      });

      browserNotification.onclick = () => {
        window.focus();
        if (notification.actionUrl) {
          window.location.href = notification.actionUrl;
        }
        browserNotification.close();
      };

      // Auto close after 5 seconds unless urgent
      if (notification.priority !== 'urgent') {
        setTimeout(() => browserNotification.close(), 5000);
      }
    }
  }

  // Polling for new notifications
  private startPolling(): void {
    setInterval(() => {
      this.fetchNotifications();
    }, 30000); // Poll every 30 seconds
  }

  // Cleanup expired notifications
  private scheduleCleanup(): void {
    setInterval(() => {
      const now = new Date();
      const beforeCount = this.notifications.length;
      
      this.notifications = this.notifications.filter(notification => {
        if (notification.expiresAt) {
          return new Date(notification.expiresAt) > now;
        }
        // Remove notifications older than 30 days
        const notificationAge = now.getTime() - new Date(notification.createdAt).getTime();
        return notificationAge < 30 * 24 * 60 * 60 * 1000;
      });

      if (this.notifications.length !== beforeCount) {
        this.saveNotifications();
        this.notifyListeners();
      }
    }, 60000); // Check every minute
  }

  // Persistence
  private loadStoredNotifications(): void {
    try {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        this.notifications = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading stored notifications:', error);
      this.notifications = [];
    }
  }

  private saveNotifications(): void {
    try {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  private loadSettings(): NotificationSettings {
    try {
      const stored = localStorage.getItem('notificationSettings');
      if (stored) {
        return { ...this.getDefaultSettings(), ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
    return this.getDefaultSettings();
  }

  private saveSettings(): void {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  }

  private getDefaultSettings(): NotificationSettings {
    return {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      categories: {
        bookings: true,
        messages: true,
        payments: true,
        reviews: true,
        promotions: true,
        reminders: true
      }
    };
  }
}

export const notificationService = new NotificationService();