export interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'professional';
  avatar?: string;
  phone?: string;
  city?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Professional extends User {
  type: 'professional';
  description?: string;
  specialties: string[];
  experience: number;
  education?: string;
  documents?: Document[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  responseTime: number;
}

export interface Client extends User {
  type: 'client';
  totalSpent: number;
  totalBookings: number;
}

export interface Service {
  id: string;
  professionalId: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  type: 'online' | 'presential';
  images: string[];
  packages: ServicePackage[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryTime: number;
  features: string[];
  type: 'basic' | 'standard' | 'premium';
}

export interface OpenRequest {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  type: 'online' | 'presential';
  city?: string;
  desiredDate?: string;
  budget?: number;
  attachments?: string[];
  status: 'open' | 'closed' | 'cancelled';
  proposalsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  requestId: string;
  professionalId: string;
  professional: Professional;
  value: number;
  message: string;
  deliveryTime: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Booking {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId?: string;
  requestId?: string;
  packageId?: string;
  title: string;
  description: string;
  value: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'released' | 'refunded';
  scheduledDate?: string;
  completedDate?: string;
  client: Client;
  professional: Professional;
  service?: Service;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  professionalId: string;
  rating: number;
  comment: string;
  response?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  bookingId?: string;
  type: 'payment' | 'withdrawal' | 'refund';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: string;
}

export interface Document {
  id: string;
  type: 'rg' | 'cpf' | 'cnpj' | 'diploma' | 'certificate';
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'credit_card' | 'debit_card' | 'pix';
  last4?: string;
  brand?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface BankAccount {
  id: string;
  userId: string;
  bank: string;
  agency: string;
  account: string;
  accountType: 'checking' | 'savings';
  holderName: string;
  holderDocument: string;
  isDefault: boolean;
  createdAt: string;
}