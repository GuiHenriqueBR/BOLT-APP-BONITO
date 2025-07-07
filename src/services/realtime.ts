// Real-time service for live updates
class RealtimeService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 1000;
  private listeners: Map<string, Function[]> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  connect(userId: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    
    try {
      this.ws = new WebSocket(`${wsUrl}?userId=${userId}`);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        this.emit('connected', { userId });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.stopHeartbeat();
        this.emit('disconnected');
        this.attemptReconnect(userId);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };

    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      this.attemptReconnect(userId);
    }
  }

  private handleMessage(data: any) {
    const { type, payload } = data;
    
    switch (type) {
      case 'message':
        this.emit('message', payload);
        break;
      case 'notification':
        this.emit('notification', payload);
        break;
      case 'booking_update':
        this.emit('bookingUpdate', payload);
        break;
      case 'payment_update':
        this.emit('paymentUpdate', payload);
        break;
      case 'user_status':
        this.emit('userStatus', payload);
        break;
      case 'typing':
        this.emit('typing', payload);
        break;
      default:
        console.log('Unknown message type:', type);
    }
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send('heartbeat', {});
      }
    }, 30000); // Send heartbeat every 30 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private attemptReconnect(userId: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1);
      
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect(userId);
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('maxReconnectAttemptsReached');
    }
  }

  disconnect() {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(type: string, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  // Message methods
  sendMessage(conversationId: string, content: string, type: 'text' | 'image' | 'file' = 'text') {
    this.send('send_message', {
      conversationId,
      content,
      type,
      timestamp: new Date().toISOString()
    });
  }

  sendTypingIndicator(conversationId: string, isTyping: boolean) {
    this.send('typing', {
      conversationId,
      isTyping,
      timestamp: new Date().toISOString()
    });
  }

  // User status methods
  updateUserStatus(status: 'online' | 'offline' | 'busy') {
    this.send('user_status', { status });
  }

  // Room methods
  joinRoom(roomId: string) {
    this.send('join_room', { roomId });
  }

  leaveRoom(roomId: string) {
    this.send('leave_room', { roomId });
  }

  // Event listeners
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  // Booking updates
  subscribeToBookingUpdates(bookingId: string) {
    this.send('subscribe_booking', { bookingId });
  }

  unsubscribeFromBookingUpdates(bookingId: string) {
    this.send('unsubscribe_booking', { bookingId });
  }

  // Payment updates
  subscribeToPaymentUpdates(paymentId: string) {
    this.send('subscribe_payment', { paymentId });
  }

  // Location sharing
  shareLocation(latitude: number, longitude: number) {
    this.send('share_location', { latitude, longitude });
  }

  // File sharing
  shareFile(conversationId: string, fileUrl: string, fileName: string, fileType: string) {
    this.send('share_file', {
      conversationId,
      fileUrl,
      fileName,
      fileType,
      timestamp: new Date().toISOString()
    });
  }
}

export const realtimeService = new RealtimeService();