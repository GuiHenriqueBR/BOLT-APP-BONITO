import { useEffect, useRef } from 'react';
import { websocketService } from '../services/websocket';
import { useAuth } from '../contexts/AuthContext';
import { notificationService } from '../services/notifications';

export const useWebSocket = () => {
  const { user } = useAuth();
  const isConnected = useRef(false);

  useEffect(() => {
    if (user && !isConnected.current) {
      // Connect to WebSocket
      websocketService.connect(user.id);
      isConnected.current = true;

      // Set up event listeners
      websocketService.on('connected', (data) => {
        console.log('WebSocket connected:', data);
        websocketService.updateUserStatus('online');
      });

      websocketService.on('message', (message) => {
        console.log('New message received:', message);
        // Show notification for new message
        notificationService.newMessage(
          message.senderName || 'Usuário',
          message.content.substring(0, 50) + (message.content.length > 50 ? '...' : '')
        );
      });

      websocketService.on('notification', (notification) => {
        console.log('New notification:', notification);
        notificationService.addNotification(notification);
      });

      websocketService.on('bookingUpdate', (booking) => {
        console.log('Booking update:', booking);
        notificationService.bookingConfirmed(
          booking.professionalName,
          new Date(booking.scheduledDate).toLocaleDateString('pt-BR')
        );
      });

      websocketService.on('paymentReceived', (payment) => {
        console.log('Payment received:', payment);
        notificationService.paymentReceived(payment.amount);
      });

      websocketService.on('newReview', (review) => {
        console.log('New review:', review);
        notificationService.newReview(review.rating, review.clientName);
      });
    }

    return () => {
      if (isConnected.current) {
        websocketService.updateUserStatus('offline');
        websocketService.disconnect();
        isConnected.current = false;
      }
    };
  }, [user]);

  const sendMessage = (conversationId: string, content: string, type: 'text' | 'image' | 'file' = 'text') => {
    websocketService.sendMessage(conversationId, content, type);
  };

  const joinRoom = (roomId: string) => {
    websocketService.joinRoom(roomId);
  };

  const leaveRoom = (roomId: string) => {
    websocketService.leaveRoom(roomId);
  };

  const sendTypingIndicator = (conversationId: string, isTyping: boolean) => {
    websocketService.sendTypingIndicator(conversationId, isTyping);
  };

  return {
    sendMessage,
    joinRoom,
    leaveRoom,
    sendTypingIndicator
  };
};