import { useEffect, useRef } from 'react';
import { realtimeService } from '../services/realtime';
import { useAuth } from '../contexts/AuthContext';
import { notificationService } from '../services/notifications';

export const useRealtime = () => {
  const { user } = useAuth();
  const isConnected = useRef(false);

  useEffect(() => {
    if (user && !isConnected.current) {
      // Connect to real-time service
      realtimeService.connect(user.id);
      isConnected.current = true;

      // Set up event listeners
      realtimeService.on('connected', (data) => {
        console.log('Real-time service connected:', data);
        realtimeService.updateUserStatus('online');
      });

      realtimeService.on('disconnected', () => {
        console.log('Real-time service disconnected');
        isConnected.current = false;
      });

      realtimeService.on('message', (message) => {
        console.log('New message received:', message);
        // Show notification for new message
        notificationService.newMessage(
          message.senderName || 'Usuário',
          message.content.substring(0, 50) + (message.content.length > 50 ? '...' : '')
        );
      });

      realtimeService.on('notification', (notification) => {
        console.log('New notification:', notification);
        notificationService.addNotification(notification);
      });

      realtimeService.on('bookingUpdate', (booking) => {
        console.log('Booking update:', booking);
        notificationService.bookingConfirmed(
          booking.professionalName,
          new Date(booking.scheduledDate).toLocaleDateString('pt-BR')
        );
      });

      realtimeService.on('paymentUpdate', (payment) => {
        console.log('Payment update:', payment);
        if (payment.status === 'completed') {
          notificationService.paymentReceived(payment.amount);
        }
      });

      realtimeService.on('userStatus', (status) => {
        console.log('User status update:', status);
        // Update user status in UI
      });

      realtimeService.on('typing', (data) => {
        console.log('Typing indicator:', data);
        // Show typing indicator in chat
      });

      realtimeService.on('error', (error) => {
        console.error('Real-time service error:', error);
      });

      realtimeService.on('maxReconnectAttemptsReached', () => {
        console.error('Failed to reconnect to real-time service');
        notificationService.addNotification({
          type: 'system',
          title: 'Conexão Perdida',
          message: 'Não foi possível reconectar ao serviço em tempo real. Recarregue a página.',
          timestamp: new Date().toISOString()
        });
      });
    }

    return () => {
      if (isConnected.current) {
        realtimeService.updateUserStatus('offline');
        realtimeService.disconnect();
        isConnected.current = false;
      }
    };
  }, [user]);

  const sendMessage = (conversationId: string, content: string, type: 'text' | 'image' | 'file' = 'text') => {
    realtimeService.sendMessage(conversationId, content, type);
  };

  const sendTypingIndicator = (conversationId: string, isTyping: boolean) => {
    realtimeService.sendTypingIndicator(conversationId, isTyping);
  };

  const joinRoom = (roomId: string) => {
    realtimeService.joinRoom(roomId);
  };

  const leaveRoom = (roomId: string) => {
    realtimeService.leaveRoom(roomId);
  };

  const updateUserStatus = (status: 'online' | 'offline' | 'busy') => {
    realtimeService.updateUserStatus(status);
  };

  const shareLocation = (latitude: number, longitude: number) => {
    realtimeService.shareLocation(latitude, longitude);
  };

  const shareFile = (conversationId: string, fileUrl: string, fileName: string, fileType: string) => {
    realtimeService.shareFile(conversationId, fileUrl, fileName, fileType);
  };

  const subscribeToBookingUpdates = (bookingId: string) => {
    realtimeService.subscribeToBookingUpdates(bookingId);
  };

  const unsubscribeFromBookingUpdates = (bookingId: string) => {
    realtimeService.unsubscribeFromBookingUpdates(bookingId);
  };

  return {
    sendMessage,
    sendTypingIndicator,
    joinRoom,
    leaveRoom,
    updateUserStatus,
    shareLocation,
    shareFile,
    subscribeToBookingUpdates,
    unsubscribeFromBookingUpdates,
    isConnected: isConnected.current
  };
};