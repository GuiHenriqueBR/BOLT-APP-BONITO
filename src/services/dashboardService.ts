import { apiService } from './api';

export interface DashboardStats {
  totalSpent: number;
  totalServices: number;
  averageRating: number;
  savedAmount: number;
  favoriteServices: number;
  activeBookings: number;
  monthlySpending: Array<{ month: string; amount: number }>;
  categorySpending: Array<{ category: string; amount: number; percentage: number }>;
  recentServices: Array<{
    id: string;
    title: string;
    professional: string;
    status: string;
    date: string;
    rating?: number;
    price: number;
    image?: string;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    professional: string;
    price: number;
    rating: number;
    image?: string;
    reason?: string;
  }>;
  upcomingBookings: Array<{
    id: string;
    title: string;
    professional: string;
    date: string;
    time: string;
    status: string;
  }>;
}

class DashboardService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private getFromCache(key: string) {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getClientDashboardData(userId: string, period = 'month'): Promise<DashboardStats> {
    const cacheKey = `client-dashboard-${userId}-${period}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // In production, this would make real API calls
      // For now, we'll use enhanced mock data with better logic
      const data = await this.generateClientDashboardData(userId, period);
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  async getProfessionalDashboardData(userId: string, period = 'month') {
    const cacheKey = `professional-dashboard-${userId}-${period}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.generateProfessionalDashboardData(userId, period);
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching professional dashboard data:', error);
      throw error;
    }
  }

  private async generateClientDashboardData(userId: string, period: string): Promise<DashboardStats> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const now = new Date();
    const currentMonth = now.getMonth();
    
    // Generate realistic spending data based on period
    const monthlySpending = this.generateMonthlySpending(period, currentMonth);
    const totalSpent = monthlySpending.reduce((sum, month) => sum + month.amount, 0);
    
    // Generate category spending with realistic distribution
    const categorySpending = this.generateCategorySpending(totalSpent);
    
    // Generate services based on spending
    const totalServices = Math.floor(totalSpent / 150); // Average service price
    const averageRating = 4.3 + Math.random() * 0.7; // 4.3 to 5.0
    
    const recentServices = this.generateRecentServices(totalServices);
    const recommendations = this.generateRecommendations(categorySpending);
    const upcomingBookings = this.generateUpcomingBookings();

    return {
      totalSpent,
      totalServices,
      averageRating: Math.round(averageRating * 10) / 10,
      savedAmount: Math.floor(totalSpent * 0.15), // 15% savings
      favoriteServices: Math.floor(totalServices * 0.3),
      activeBookings: upcomingBookings.filter(b => b.status === 'confirmed').length,
      monthlySpending,
      categorySpending,
      recentServices,
      recommendations,
      upcomingBookings
    };
  }

  private generateMonthlySpending(period: string, currentMonth: number) {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const data = [];
    
    let numMonths = 5;
    if (period === 'quarter') numMonths = 3;
    if (period === 'year') numMonths = 12;
    if (period === 'week') numMonths = 1;

    for (let i = numMonths - 1; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const baseAmount = 200 + Math.random() * 600; // R$ 200-800
      const seasonalMultiplier = this.getSeasonalMultiplier(monthIndex);
      
      data.push({
        month: months[monthIndex],
        amount: Math.floor(baseAmount * seasonalMultiplier)
      });
    }
    
    return data;
  }

  private getSeasonalMultiplier(month: number): number {
    // December (11) and January (0) have higher spending (holidays)
    // June (5) and July (6) have higher spending (winter maintenance)
    const seasonalFactors = [1.2, 0.9, 0.8, 0.9, 1.0, 1.3, 1.4, 1.1, 1.0, 1.1, 1.2, 1.5];
    return seasonalFactors[month];
  }

  private generateCategorySpending(totalSpent: number) {
    const categories = [
      { name: 'Elétrica', basePercent: 30 },
      { name: 'Limpeza', basePercent: 25 },
      { name: 'Hidráulica', basePercent: 20 },
      { name: 'Jardinagem', basePercent: 15 },
      { name: 'Pintura', basePercent: 10 }
    ];

    return categories.map(cat => {
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      const percentage = Math.max(5, cat.basePercent + (cat.basePercent * variation));
      const amount = Math.floor((totalSpent * percentage) / 100);
      
      return {
        category: cat.name,
        amount,
        percentage: Math.round(percentage)
      };
    }).sort((a, b) => b.amount - a.amount);
  }

  private generateRecentServices(totalServices: number) {
    const serviceTypes = [
      'Instalação Elétrica', 'Limpeza Residencial', 'Reparo Hidráulico', 
      'Manutenção Jardim', 'Pintura de Ambiente', 'Conserto de Torneira'
    ];
    
    const professionals = [
      { name: 'Carlos Silva', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      { name: 'Maria Santos', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      { name: 'João Ferreira', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      { name: 'Ana Costa', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }
    ];

    const statuses = ['completed', 'in_progress', 'pending'];
    const services = [];

    for (let i = 0; i < Math.min(5, totalServices); i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const professional = professionals[Math.floor(Math.random() * professionals.length)];
      
      services.push({
        id: (i + 1).toString(),
        title: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
        professional: professional.name,
        status,
        date: date.toISOString().split('T')[0],
        rating: status === 'completed' ? (4 + Math.random()) : undefined,
        price: 80 + Math.floor(Math.random() * 300),
        image: professional.image
      });
    }

    return services.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private generateRecommendations(categorySpending: any[]) {
    const topCategory = categorySpending[0]?.category || 'Elétrica';
    
    const recommendations = [
      {
        id: '1',
        title: `Manutenção Preventiva ${topCategory}`,
        professional: 'Carlos Silva',
        price: 80 + Math.floor(Math.random() * 100),
        rating: 4.8 + Math.random() * 0.2,
        image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        reason: `Baseado nos seus serviços de ${topCategory.toLowerCase()}`
      },
      {
        id: '2',
        title: 'Limpeza Profunda Residencial',
        professional: 'Maria Santos',
        price: 120 + Math.floor(Math.random() * 80),
        rating: 4.9 + Math.random() * 0.1,
        image: 'https://images.pexels.com/photos/4254167/pexels-photo-4254167.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        reason: 'Profissional bem avaliado na sua região'
      }
    ];

    return recommendations;
  }

  private generateUpcomingBookings() {
    const bookings = [];
    const now = new Date();
    
    for (let i = 0; i < 3; i++) {
      const futureDate = new Date(now);
      futureDate.setDate(now.getDate() + (i + 1) * 3);
      
      bookings.push({
        id: (i + 1).toString(),
        title: ['Limpeza Semanal', 'Manutenção Jardim', 'Revisão Elétrica'][i],
        professional: ['Maria Santos', 'Pedro Alves', 'Carlos Silva'][i],
        date: futureDate.toISOString().split('T')[0],
        time: ['09:00', '14:00', '10:30'][i],
        status: ['confirmed', 'pending', 'confirmed'][i]
      });
    }

    return bookings;
  }

  private async generateProfessionalDashboardData(userId: string, period: string) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Similar logic for professional dashboard
    // This would include earnings, client count, rating distribution, etc.
    
    return {
      totalEarnings: 3500 + Math.random() * 2000,
      totalClients: 15 + Math.floor(Math.random() * 10),
      averageRating: 4.7 + Math.random() * 0.3,
      completedJobs: 25 + Math.floor(Math.random() * 15),
      // ... more professional-specific data
    };
  }

  // Refresh data manually
  async refreshDashboardData(userId: string, userType: 'client' | 'professional') {
    const keys = Array.from(this.cache.keys()).filter(key => 
      key.includes(`${userType}-dashboard-${userId}`)
    );
    
    keys.forEach(key => this.cache.delete(key));
    
    if (userType === 'client') {
      return this.getClientDashboardData(userId);
    } else {
      return this.getProfessionalDashboardData(userId);
    }
  }

  // Get user insights based on their data
  async getUserInsights(userId: string): Promise<string[]> {
    const data = await this.getClientDashboardData(userId);
    const insights = [];

    // Spending insights
    if (data.monthlySpending.length >= 2) {
      const lastMonth = data.monthlySpending[data.monthlySpending.length - 1].amount;
      const previousMonth = data.monthlySpending[data.monthlySpending.length - 2].amount;
      
      if (lastMonth > previousMonth * 1.2) {
        insights.push('💸 Seus gastos aumentaram 20% no último mês');
      } else if (lastMonth < previousMonth * 0.8) {
        insights.push('💰 Você economizou 20% no último mês!');
      }
    }

    // Category insights
    const topCategory = data.categorySpending[0];
    if (topCategory && topCategory.percentage > 40) {
      insights.push(`🔧 ${topCategory.percentage}% dos seus gastos são com ${topCategory.category}`);
    }

    // Rating insights
    if (data.averageRating >= 4.8) {
      insights.push('⭐ Você tem excelente relacionamento com os profissionais!');
    }

    // Savings insights
    if (data.savedAmount > 200) {
      insights.push(`💝 Você já economizou R$ ${data.savedAmount} usando nossa plataforma`);
    }

    return insights;
  }
}

export const dashboardService = new DashboardService();