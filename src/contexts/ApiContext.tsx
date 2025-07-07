import React, { createContext, useContext, ReactNode } from 'react';

interface ApiContextType {
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, data: any) => Promise<T>;
  put: <T>(url: string, data: any) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

// Mock API implementation
const mockApi = {
  async get<T>(url: string): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    // Mock responses based on URL patterns
    if (url.includes('/services')) {
      return mockServices as T;
    }
    if (url.includes('/professionals')) {
      return mockProfessionals as T;
    }
    if (url.includes('/requests')) {
      return mockRequests as T;
    }
    if (url.includes('/bookings')) {
      return mockBookings as T;
    }
    if (url.includes('/conversations')) {
      return mockConversations as T;
    }
    
    throw new Error(`Mock API: No handler for ${url}`);
  },

  async post<T>(url: string, data: any): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (url.includes('/auth/login')) {
      return { token: 'mock-token', user: mockUser } as T;
    }
    if (url.includes('/auth/register')) {
      return { token: 'mock-token', user: { ...data, id: Date.now().toString() } } as T;
    }
    if (url.includes('/services')) {
      return { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() } as T;
    }
    if (url.includes('/requests')) {
      return { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() } as T;
    }
    if (url.includes('/bookings')) {
      return { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() } as T;
    }
    
    return data as T;
  },

  async put<T>(url: string, data: any): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { ...data, updatedAt: new Date().toISOString() } as T;
  },

  async delete<T>(url: string): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true } as T;
  }
};

// Mock data
const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  type: 'client',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
};

const mockServices = [
  {
    id: '1',
    title: 'Instalação Elétrica Residencial',
    description: 'Serviço completo de instalação elétrica',
    category: 'Elétrica',
    price: 150,
    professional: {
      id: '1',
      name: 'Carlos Silva',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.9
    }
  }
];

const mockProfessionals = [
  {
    id: '1',
    name: 'Carlos Silva',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 4.9,
    reviewsCount: 156,
    location: 'São Paulo, SP',
    category: 'Elétrica',
    isVerified: true
  }
];

const mockRequests = [
  {
    id: '1',
    title: 'Instalação de pontos elétricos',
    description: 'Preciso instalar 8 pontos de tomada',
    category: 'Elétrica',
    budget: 300,
    location: 'São Paulo, SP',
    createdAt: '2024-01-20T10:00:00Z'
  }
];

const mockBookings = [
  {
    id: '1',
    serviceId: '1',
    clientId: '1',
    professionalId: '1',
    status: 'confirmed',
    scheduledDate: '2024-01-25T09:00:00Z',
    value: 150
  }
];

const mockConversations = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: {
      content: 'Perfeito! Posso começar amanhã.',
      timestamp: '2024-01-20T14:30:00Z',
      senderId: '2'
    },
    unreadCount: 0
  }
];

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ApiContext.Provider value={mockApi}>
      {children}
    </ApiContext.Provider>
  );
};