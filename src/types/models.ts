// ===== Branch Types =====
export type BranchStatus = 'active' | 'expired' | 'suspended'
export type BranchCategory = 'عيادة عامة' | 'أسنان' | 'عيون' | 'جلدية' | 'أطفال' | 'قلب' | 'أعصاب' | 'نساء وتوليد'

export interface Branch {
  id: number
  name: string
  phone: string
  address: string
  category: BranchCategory
  parentBranchId?: number
  status: BranchStatus
  subscriptionExpiry: string  // ISO date
  imageUrl?: string
  latitude?: number
  longitude?: number
  createdAt: string
}

// ===== Booking Types =====
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'

export interface Booking {
  id: number
  patientName: string
  patientPhone: string
  doctorName: string
  branchId: number
  branchName: string
  date: string        // ISO date
  time: string        // HH:mm
  status: BookingStatus
  notes?: string
  createdAt: string
}

// ===== User (System) Types =====
export type SystemUserRole = 'SuperAdmin' | 'BranchAdmin' | 'Doctor'
export type SystemUserStatus = 'active' | 'inactive'

export interface SystemUser {
  id: number
  name: string
  email: string
  phone: string
  role: SystemUserRole
  branchId?: number
  branchName?: string
  status: SystemUserStatus
  createdAt: string
}

// ===== Subscription Types =====
export type PlanDuration = 'monthly' | 'quarterly' | 'yearly'
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface SubscriptionPlan {
  id: number
  name: string
  price: number
  duration: PlanDuration
  features: string[]
  isActive: boolean
  maxBranches: number
  maxUsers: number
}

export interface Payment {
  id: number
  branchId: number
  branchName: string
  planId: number
  planName: string
  amount: number
  status: PaymentStatus
  paymentDate: string
  expiryDate: string
  invoiceNumber: string
}

// ===== Offer Types =====
export type OfferActionType = 'NavigateToBranch' | 'ShowOnly' | 'ExternalLink'

export interface Offer {
  id: number
  title: string
  description: string
  imageUrl?: string
  branchId?: number   // null = all branches
  branchName?: string
  actionType: OfferActionType
  actionData?: string  // URL or branchId
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
}

// ===== Notification Types =====
export type NotificationChannel = 'fcm' | 'whatsapp'
export type NotificationAudienceType =
  | 'single_user'
  | 'branch'
  | 'all_users'
  | 'all_branches'
  | 'all_customers'
  | 'custom_group'

export interface Notification {
  id: number
  title: string
  body: string
  audienceType: NotificationAudienceType
  audienceLabel: string
  channels: NotificationChannel[]
  targetCount: number
  successCount: number
  failureCount: number
  sentAt: string
  sentByName: string
  extraData?: string  // JSON
}

// ===== Customer Types =====
export interface Customer {
  id: number
  name: string
  phone: string
  email?: string
  branchId: number
  totalBookings: number
  lastVisit: string
  joinDate: string
  avatar?: string
}

// ===== Audit Log Types =====
export type AuditAction = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'send_notification'

export interface AuditLog {
  id: number
  userId: number
  userName: string
  action: AuditAction
  resource: string
  resourceId?: number
  description: string
  ip: string
  createdAt: string
}

// ===== Schedule Types =====
export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export interface DaySchedule {
  day: DayOfWeek
  dayLabel: string
  isWorkingDay: boolean
  openTime: string   // HH:mm
  closeTime: string  // HH:mm
  breakStart?: string
  breakEnd?: string
}

export interface BranchSchedule {
  branchId: number
  schedule: DaySchedule[]
}

// ===== Chat Types =====
export interface ChatMessage {
  id: number
  senderId: number
  senderName: string
  senderType: 'branch' | 'customer'
  content: string
  contentType: 'text' | 'image' | 'file'
  fileUrl?: string
  sentAt: string
  isRead: boolean
}

export interface ChatConversation {
  id: number
  customerId: number
  customerName: string
  customerPhone: string
  customerAvatar?: string
  branchId: number
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}
