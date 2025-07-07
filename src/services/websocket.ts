class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 1000;
  private listeners: Map<string, Function[]> = new Map();

  connect(userId: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    // In a real app, this would connect to your WebSocket server
    // For now, we'll simulate WebSocket functionality
    this.simulateConnection(userId);
  }

  private simulateConnection(userId: string) {
    // Simulate connection events
    setTimeout(() => {
      this.emit('connected', { userId });
      
      // Simulate receiving messages
      setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance every 5 seconds
          this.emit('message', {
            id: Date.now().toString(),
            conversationId: '1',
            senderId: '2',
            content: 'Nova mensagem simulada!',
            timestamp: new Date().toISOString(),
            type: 'text'
          });
        }
      }, 5000);

      // Simulate notifications
      setInterval(() => {
        if (Math.random() > 0.9) { // 10% chance every 10 seconds
          this.emit('notification', {
            id: Date.now().toString(),
            type: 'booking_update',
            title: 'Agendamento Confirmado',
            message: 'Seu agendamento foi confirmado pelo profissional',
            timestamp: new Date().toISOString()
          });
        }
      }, 10000);
    }, 1000);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  sendMessage(conversationId: string, content: string, type: 'text' | 'image' | 'file' = 'text') {
    // In a real app, this would send the message through WebSocket
    console.log('Sending message:', { conversationId, content, type });
    
    // Simulate message sent
    this.emit('messageSent', {
      id: Date.now().toString(),
      conversationId,
      content,
      type,
      timestamp: new Date().toISOString()
    });
  }

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

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  // Real-time features
  joinRoom(roomId: string) {
    console.log('Joining room:', roomId);
  }

  leaveRoom(roomId: string) {
    console.log('Leaving room:', roomId);
  }

  updateUserStatus(status: 'online' | 'offline' | 'busy') {
    console.log('Updating user status:', status);
  }

  sendTypingIndicator(conversationId: string, isTyping: boolean) {
    console.log('Typing indicator:', { conversationId, isTyping });
  }
}

export const websocketService = new WebSocketService();