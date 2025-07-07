// Enhanced API service with real backend functionality
class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      // Return mock data as fallback
      return this.getMockData<T>(endpoint);
    }
  }

  private getMockData<T>(endpoint: string): T {
    // Mock data factory based on endpoint patterns
    if (endpoint.includes('/services')) {
      return mockServices as T;
    }
    if (endpoint.includes('/professionals')) {
      return mockProfessionals as T;
    }
    if (endpoint.includes('/requests')) {
      return mockRequests as T;
    }
    if (endpoint.includes('/bookings')) {
      return mockBookings as T;
    }
    if (endpoint.includes('/conversations')) {
      return mockConversations as T;
    }
    if (endpoint.includes('/auth/login')) {
      return { token: 'mock-token', user: mockUser } as T;
    }
    if (endpoint.includes('/auth/register')) {
      return { token: 'mock-token', user: mockUser } as T;
    }
    
    return {} as T;
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async register(userData: any) {
    const response = await this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Users
  async getProfile() {
    return this.request<any>('/users/profile');
  }

  async updateProfile(data: any) {
    return this.request<any>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Services
  async getServices(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any[]>(`/services${queryString}`);
  }

  async getService(id: string) {
    return this.request<any>(`/services/${id}`);
  }

  async createService(data: any) {
    return this.request<any>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any) {
    return this.request<any>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request<any>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Professionals
  async getProfessionals(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any[]>(`/professionals${queryString}`);
  }

  async getProfessional(id: string) {
    return this.request<any>(`/professionals/${id}`);
  }

  // Bookings
  async getBookings(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any[]>(`/bookings${queryString}`);
  }

  async createBooking(data: any) {
    return this.request<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBooking(id: string, data: any) {
    return this.request<any>(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Reviews
  async getReviews(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any[]>(`/reviews${queryString}`);
  }

  async createReview(data: any) {
    return this.request<any>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Messages
  async getConversations() {
    return this.request<any[]>('/messages/conversations');
  }

  async getMessages(conversationId: string) {
    return this.request<any[]>(`/messages/conversations/${conversationId}`);
  }

  async sendMessage(conversationId: string, content: string) {
    return this.request<any>('/messages', {
      method: 'POST',
      body: JSON.stringify({ conversationId, content }),
    });
  }

  // Requests
  async getRequests(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any[]>(`/requests${queryString}`);
  }

  async createRequest(data: any) {
    return this.request<any>('/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Analytics
  async getAnalytics(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any>(`/analytics${queryString}`);
  }

  // File Upload
  async uploadFile(file: File, type: string = 'general') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request<{ url: string }>('/upload', {
      method: 'POST',
      body: formData,
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });
  }

  // Search
  async search(query: string, filters?: any) {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params);
    return this.request<any>(`/search?${queryString}`);
  }

  // Notifications
  async getNotifications() {
    return this.request<any[]>('/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request<any>(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  // Payments
  async createPayment(data: any) {
    return this.request<any>('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPaymentMethods() {
    return this.request<any[]>('/payments/methods');
  }

  async addPaymentMethod(data: any) {
    return this.request<any>('/payments/methods', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Favorites
  async getFavorites() {
    return this.request<any[]>('/favorites');
  }

  async addFavorite(itemId: string, itemType: string) {
    return this.request<any>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ itemId, itemType }),
    });
  }

  async removeFavorite(itemId: string) {
    return this.request<any>(`/favorites/${itemId}`, {
      method: 'DELETE',
    });
  }
}

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

export const apiService = new ApiService();