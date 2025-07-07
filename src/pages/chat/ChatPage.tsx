import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical, 
  Search,
  Smile,
  Image,
  File,
  Star,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations = [
    {
      id: '1',
      participant: {
        id: '2',
        name: 'Carlos Silva',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        isOnline: true,
        lastSeen: 'Agora',
        profession: 'Eletricista'
      },
      lastMessage: {
        content: 'Perfeito! Posso começar amanhã pela manhã.',
        timestamp: '14:30',
        isRead: true,
        senderId: '2'
      },
      unreadCount: 0,
      project: 'Instalação Elétrica'
    },
    {
      id: '2',
      participant: {
        id: '3',
        name: 'Maria Santos',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        isOnline: false,
        lastSeen: '2h atrás',
        profession: 'Encanadora'
      },
      lastMessage: {
        content: 'Vou enviar o orçamento detalhado em breve.',
        timestamp: '12:15',
        isRead: false,
        senderId: '3'
      },
      unreadCount: 2,
      project: 'Reparo Hidráulico'
    },
    {
      id: '3',
      participant: {
        id: '4',
        name: 'Ana Costa',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        isOnline: true,
        lastSeen: 'Agora',
        profession: 'Faxineira'
      },
      lastMessage: {
        content: 'Obrigada pela contratação! 😊',
        timestamp: 'Ontem',
        isRead: true,
        senderId: '4'
      },
      unreadCount: 0,
      project: 'Limpeza Residencial'
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: user?.id || '1',
      content: 'Olá! Gostaria de saber mais sobre o serviço de instalação elétrica.',
      timestamp: '2024-01-20T10:00:00Z',
      type: 'text'
    },
    {
      id: '2',
      senderId: '2',
      content: 'Olá! Claro, posso te ajudar. Qual tipo de instalação você precisa?',
      timestamp: '2024-01-20T10:05:00Z',
      type: 'text'
    },
    {
      id: '3',
      senderId: user?.id || '1',
      content: 'Preciso instalar pontos de tomada na sala e quarto. São cerca de 8 pontos.',
      timestamp: '2024-01-20T10:10:00Z',
      type: 'text'
    },
    {
      id: '4',
      senderId: '2',
      content: 'Perfeito! Para 8 pontos, o valor seria R$ 240. Inclui material e mão de obra. Posso fazer uma visita técnica gratuita para avaliar melhor.',
      timestamp: '2024-01-20T10:15:00Z',
      type: 'text'
    },
    {
      id: '5',
      senderId: user?.id || '1',
      content: 'Ótimo! Quando você pode vir fazer a avaliação?',
      timestamp: '2024-01-20T10:20:00Z',
      type: 'text'
    },
    {
      id: '6',
      senderId: '2',
      content: 'Posso ir amanhã pela manhã, por volta das 9h. Te mando uma foto dos materiais que vou usar.',
      timestamp: '2024-01-20T10:25:00Z',
      type: 'text'
    },
    {
      id: '7',
      senderId: '2',
      content: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      timestamp: '2024-01-20T10:26:00Z',
      type: 'image'
    },
    {
      id: '8',
      senderId: user?.id || '1',
      content: 'Perfeito! Posso começar amanhã pela manhã.',
      timestamp: '2024-01-20T14:30:00Z',
      type: 'text'
    }
  ];

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, this would send the message to the backend
    console.log('Sending message:', message);
    setMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[calc(100vh-8rem)]">
          <div className="flex h-full">
            
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Mensagens</h1>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar conversas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-all duration-300 border-l-4 ${
                      selectedConversation === conversation.id
                        ? 'bg-primary-50 border-primary-500'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.participant.avatar}
                          alt={conversation.participant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.participant.isOnline && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {conversation.participant.name}
                            </h3>
                            <Shield className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {conversation.lastMessage.timestamp}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-1">{conversation.participant.profession}</p>
                        <p className="text-sm text-primary-600 font-medium mb-2">{conversation.project}</p>
                        
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              
              {/* Chat Header */}
              {currentConversation && (
                <div className="p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={currentConversation.participant.avatar}
                          alt={currentConversation.participant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {currentConversation.participant.isOnline && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h2 className="text-xl font-bold text-gray-900">
                            {currentConversation.participant.name}
                          </h2>
                          <Shield className="w-5 h-5 text-green-500" />
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">4.9</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{currentConversation.participant.profession}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{currentConversation.participant.lastSeen}</span>
                          </div>
                        </div>
                        <p className="text-sm text-primary-600 font-medium">
                          Projeto: {currentConversation.project}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.senderId === user?.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {msg.type === 'text' ? (
                        <p className="text-sm">{msg.content}</p>
                      ) : msg.type === 'image' ? (
                        <div className="space-y-2">
                          <img
                            src={msg.content}
                            alt="Imagem enviada"
                            className="rounded-lg max-w-full h-auto"
                          />
                        </div>
                      ) : null}
                      
                      <p
                        className={`text-xs mt-2 ${
                          msg.senderId === user?.id ? 'text-primary-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <button
                        type="button"
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
                      >
                        <Image className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="relative">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        rows={3}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="p-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;