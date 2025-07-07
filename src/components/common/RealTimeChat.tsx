import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Image,
  File,
  Mic,
  MicOff
} from 'lucide-react';
import { useRealtime } from '../../hooks/useRealtime';

interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio';
  timestamp: string;
  isRead: boolean;
}

interface RealTimeChatProps {
  conversationId: string;
  currentUserId: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
}

const RealTimeChat: React.FC<RealTimeChatProps> = ({
  conversationId,
  currentUserId,
  participant
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [participantTyping, setParticipantTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const { sendMessage, sendTypingIndicator } = useRealtime();

  useEffect(() => {
    // Load initial messages
    loadMessages();
    
    // Join conversation room
    // joinRoom(conversationId);

    return () => {
      // Leave room on cleanup
      // leaveRoom(conversationId);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    // Mock messages for demo
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: participant.id,
        content: 'Olá! Vi seu pedido de instalação elétrica. Posso te ajudar!',
        type: 'text',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: true
      },
      {
        id: '2',
        senderId: currentUserId,
        content: 'Oi! Que bom! Preciso instalar alguns pontos de tomada na sala.',
        type: 'text',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        isRead: true
      },
      {
        id: '3',
        senderId: participant.id,
        content: 'Perfeito! Quantos pontos você precisa? Posso fazer uma visita técnica gratuita.',
        type: 'text',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        isRead: true
      }
    ];
    setMessages(mockMessages);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: newMessage,
      type: 'text',
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    sendMessage(conversationId, newMessage);
    setNewMessage('');
    setIsTyping(false);
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (!isTyping) {
      setIsTyping(true);
      sendTypingIndicator(conversationId, true);
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      sendTypingIndicator(conversationId, false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Handle file upload logic here
    console.log('File selected:', file);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      
      {/* Chat Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-600"
              />
              {participant.isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{participant.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {participant.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => {
          const isOwn = message.senderId === currentUserId;
          const showDate = index === 0 || 
            formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

          return (
            <div key={message.id}>
              {showDate && (
                <div className="text-center my-4">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    isOwn
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  } shadow-sm`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {participantTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
          
          {/* Attachment Options */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <button
              type="button"
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300"
            >
              <Image className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isRecording
                  ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Message Input */}
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={newMessage}
                onChange={(e) => handleTyping(e.target.value)}
                placeholder="Digite sua mensagem..."
                rows={1}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Send Button */}
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />
      </div>
    </div>
  );
};

export default RealTimeChat;