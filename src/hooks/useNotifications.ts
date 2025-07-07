import { useState, useEffect } from 'react';
import { notificationService } from '../services/notifications';

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

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Subscribe to notification updates
    const unsubscribe = notificationService.subscribe((updatedNotifications: Notification[]) => {
      setNotifications(updatedNotifications);
      setUnreadCount(notificationService.getUnreadCount());
    });

    // Load initial notifications
    setNotifications(notificationService.getNotifications());
    setUnreadCount(notificationService.getUnreadCount());

    return unsubscribe;
  }, []);

  const markAsRead = (notificationId: string) => {
    notificationService.markAsRead(notificationId);
  };

  const markAllAsRead = () => {
    notificationService.markAllAsRead();
  };

  const removeNotification = (notificationId: string) => {
    notificationService.removeNotification(notificationId);
  };

  const clearAll = () => {
    notificationService.clearAll();
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  };
};