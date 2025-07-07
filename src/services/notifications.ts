interface Notification {
  id: string;
  type: 'booking_update' | 'message' | 'payment' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  data?: any;
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: Function[] = [];

  // Request permission for browser notifications
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  // Show browser notification
  showBrowserNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 5 seconds
      setTimeout(() => notification.close(), 5000);
    }
  }

  // Add notification to the list
  addNotification(notification: Omit<Notification, 'id' | 'isRead'>) {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      isRead: false
    };

    this.notifications.unshift(newNotification);
    this.notifyListeners();

    // Show browser notification
    this.showBrowserNotification(notification.title, {
      body: notification.message,
      tag: notification.type
    });

    return newNotification;
  }

  // Get all notifications
  getNotifications(): Notification[] {
    return this.notifications;
  }

  // Get unread count
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  // Mark notification as read
  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.notifyListeners();
    }
  }

  // Mark all as read
  markAllAsRead() {
    this.notifications.forEach(n => n.isRead = true);
    this.notifyListeners();
  }

  // Remove notification
  removeNotification(notificationId: string) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.notifyListeners();
  }

  // Clear all notifications
  clearAll() {
    this.notifications = [];
    this.notifyListeners();
  }

  // Subscribe to notification updates
  subscribe(callback: Function) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback(this.notifications));
  }

  // Predefined notification types
  bookingConfirmed(professionalName: string, date: string) {
    return this.addNotification({
      type: 'booking_update',
      title: 'Agendamento Confirmado',
      message: `${professionalName} confirmou seu agendamento para ${date}`,
      timestamp: new Date().toISOString(),
      actionUrl: '/bookings'
    });
  }

  newMessage(senderName: string, preview: string) {
    return this.addNotification({
      type: 'message',
      title: `Nova mensagem de ${senderName}`,
      message: preview,
      timestamp: new Date().toISOString(),
      actionUrl: '/chat'
    });
  }

  paymentReceived(amount: number) {
    return this.addNotification({
      type: 'payment',
      title: 'Pagamento Recebido',
      message: `Você recebeu R$ ${amount.toFixed(2)}`,
      timestamp: new Date().toISOString(),
      actionUrl: '/dashboard'
    });
  }

  newReview(rating: number, clientName: string) {
    return this.addNotification({
      type: 'review',
      title: 'Nova Avaliação',
      message: `${clientName} avaliou seu serviço com ${rating} estrelas`,
      timestamp: new Date().toISOString(),
      actionUrl: '/reviews'
    });
  }

  systemMaintenance(message: string) {
    return this.addNotification({
      type: 'system',
      title: 'Manutenção do Sistema',
      message,
      timestamp: new Date().toISOString()
    });
  }
}

export const notificationService = new NotificationService();

// Initialize notification permission on load
notificationService.requestPermission();