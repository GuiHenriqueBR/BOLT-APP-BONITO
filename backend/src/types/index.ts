import { Request } from 'express';
import { 
  User, 
  UserType, 
  UserStatus, 
  BookingStatus, 
  PaymentStatus,
  NotificationType,
  NotificationPriority,
  MessageType
} from '@prisma/client';

// ================================
// AUTH TYPES
// ================================

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  status: UserStatus;
  avatar?: string;
  emailVerified?: boolean;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  userType: UserType;
  phone?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  userType: UserType;
  iat: number;
  exp: number;
}

// ================================
// API RESPONSE TYPES
// ================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ================================
// SERVICE TYPES
// ================================

export interface CreateServiceRequest {
  title: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  basePrice: number;
  priceType: 'fixed' | 'hourly' | 'custom';
  packages?: ServicePackage[];
  serviceArea?: LocationInfo;
  isRemote?: boolean;
  duration?: number;
  requirements?: string;
  includes: string[];
  excludes?: string[];
  tags: string[];
}

export interface ServicePackage {
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface LocationInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  lat?: number;
  lng?: number;
  radius?: number; // Service radius in km
}

// ================================
// BOOKING TYPES
// ================================

export interface CreateBookingRequest {
  serviceId?: string;
  professionalId: string;
  title: string;
  description: string;
  price: number;
  scheduledDate: string;
  duration?: number;
  location: LocationInfo;
  notes?: string;
  requirements?: string[];
}

export interface BookingWithDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  scheduledDate: Date;
  status: BookingStatus;
  client: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  professional: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
  };
  service?: {
    id: string;
    title: string;
    category: string;
  };
  location: LocationInfo;
  createdAt: Date;
  updatedAt: Date;
}

// ================================
// PAYMENT TYPES
// ================================

export interface CreatePaymentRequest {
  bookingId: string;
  amount: number;
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX';
  saveCard?: boolean;
}

export interface StripePaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentWithDetails {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  booking: {
    id: string;
    title: string;
  };
  client: {
    id: string;
    name: string;
  };
  professional: {
    id: string;
    name: string;
  };
  createdAt: Date;
  paidAt?: Date;
}

// ================================
// CHAT TYPES
// ================================

export interface CreateMessageRequest {
  conversationId?: string;
  receiverId?: string;
  content: string;
  type?: MessageType;
  bookingId?: string;
}

export interface MessageWithDetails {
  id: string;
  content: string;
  type: MessageType;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  receiver?: {
    id: string;
    name: string;
    avatar?: string;
  };
  isRead: boolean;
  createdAt: Date;
  attachments: string[];
}

export interface ConversationWithDetails {
  id: string;
  type: string;
  title?: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    userType: UserType;
  }[];
  lastMessage?: {
    content: string;
    createdAt: Date;
    sender: {
      name: string;
    };
  };
  unreadCount: number;
  updatedAt: Date;
}

// ================================
// NOTIFICATION TYPES
// ================================

export interface CreateNotificationRequest {
  userId: string;
  type: NotificationType;
  priority?: NotificationPriority;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  bookingId?: string;
  expiresAt?: Date;
}

export interface NotificationWithDetails {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  isRead: boolean;
  booking?: {
    id: string;
    title: string;
  };
  createdAt: Date;
}

// ================================
// FILE UPLOAD TYPES
// ================================

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  cloudinaryId?: string;
  folder?: string;
}

export interface FileUploadRequest {
  folder?: string;
  tags?: string[];
  isPublic?: boolean;
}

// ================================
// SEARCH TYPES
// ================================

export interface SearchQuery {
  q?: string;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  isRemote?: boolean;
  availability?: 'available' | 'busy';
  sortBy?: 'price' | 'rating' | 'distance' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchFilters {
  categories: string[];
  priceRange: [number, number];
  ratings: number[];
  distance: number;
  serviceTypes: string[];
}

// ================================
// DASHBOARD TYPES
// ================================

export interface DashboardStats {
  totalBookings: number;
  completedBookings: number;
  totalRevenue: number;
  averageRating: number;
  responseTime: number;
  activeServices: number;
  monthlyGrowth: {
    bookings: number;
    revenue: number;
  };
}

export interface ClientDashboardData {
  stats: {
    totalBookings: number;
    completedServices: number;
    totalSpent: number;
    savedAmount: number;
  };
  recentBookings: BookingWithDetails[];
  upcomingBookings: BookingWithDetails[];
  favoriteServices: any[];
  spendingByCategory: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface ProfessionalDashboardData {
  stats: DashboardStats;
  recentBookings: BookingWithDetails[];
  pendingRequests: any[];
  earnings: {
    today: number;
    week: number;
    month: number;
    year: number;
  };
  performance: {
    completionRate: number;
    onTimeDelivery: number;
    clientSatisfaction: number;
  };
}

// ================================
// VALIDATION TYPES
// ================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ================================
// SOCKET TYPES
// ================================

export interface SocketUser {
  id: string;
  name: string;
  userType: UserType;
  avatar?: string;
}

export interface SocketMessage {
  conversationId: string;
  message: MessageWithDetails;
}

export interface SocketNotification {
  notification: NotificationWithDetails;
}

export interface SocketBookingUpdate {
  bookingId: string;
  status: BookingStatus;
  booking: BookingWithDetails;
}

// ================================
// ERROR TYPES
// ================================

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}