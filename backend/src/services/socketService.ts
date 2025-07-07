import { Server as SocketIOServer } from 'socket.io';
import { logger } from '../utils/logger';

export const initializeSocket = (io: SocketIOServer): void => {
  logger.info('🔌 Socket.IO server initialized');
  
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
    
    // Placeholder - will implement full chat functionality later
    socket.on('join_room', (room) => {
      socket.join(room);
      logger.info(`User ${socket.id} joined room: ${room}`);
    });
    
    socket.on('send_message', (data) => {
      logger.info(`Message from ${socket.id}:`, data);
      // Will implement message handling later
    });
  });
};