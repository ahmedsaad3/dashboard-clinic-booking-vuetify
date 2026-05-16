import type {
  Branch, Booking, SystemUser, SubscriptionPlan, Payment,
  Offer, Notification, Customer, AuditLog, BranchSchedule, ChatConversation, ChatMessage,
} from '@/types'

// ===== Branches =====
export const mockBranches: Branch[] = [
  { id: 1, name: 'عيادة الرياض الرئيسية', phone: '0112345678', address: 'الرياض، حي العليا، شارع الملك فهد', category: 'عيادة عامة', status: 'active', subscriptionExpiry: '2026-12-31', imageUrl: 'https://picsum.photos/seed/branch1/400/200', createdAt: '2024-01-15' },
  { id: 2, name: 'عيادة جدة', phone: '0122345678', address: 'جدة، حي الشاطئ', category: 'أسنان', status: 'active', subscriptionExpiry: '2026-09-30', imageUrl: 'https://picsum.photos/seed/branch2/400/200', createdAt: '2024-03-01' },
  { id: 3, name: 'عيادة الدمام', phone: '0132345678', address: 'الدمام، حي الفيصلية', category: 'عيون', status: 'expired', subscriptionExpiry: '2025-12-01', imageUrl: 'https://picsum.photos/seed/branch3/400/200', createdAt: '2024-04-10' },
  { id: 4, name: 'عيادة مكة', phone: '0252345678', address: 'مكة المكرمة، حي العزيزية', category: 'أطفال', status: 'active', subscriptionExpiry: '2026-11-15', createdAt: '2024-05-20' },
  { id: 5, name: 'عيادة المدينة', phone: '0482345678', address: 'المدينة المنورة، حي قباء', category: 'جلدية', status: 'suspended', subscriptionExpiry: '2025-08-01', createdAt: '2024-06-01' },
]

// ===== Bookings =====
const statusList = ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'] as const
const patientNames = ['أحمد العلي', 'فاطمة الزهراني', 'محمد الشهري', 'نورة السعدي', 'خالد المطيري', 'منى القحطاني', 'سلطان الغامدي', 'هنوف العمري']
const doctorNames = ['د. سامي الحارثي', 'د. ريم العتيبي', 'د. فيصل الدوسري', 'د. لمى الرشيدي']

export const mockBookings: Booking[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  patientName: patientNames[i % patientNames.length],
  patientPhone: `05${String(10000000 + i).slice(1)}`,
  doctorName: doctorNames[i % doctorNames.length],
  branchId: (i % 3) + 1,
  branchName: mockBranches[(i % 3)].name,
  date: new Date(Date.now() - (i * 86400000 * 0.5)).toISOString().split('T')[0],
  time: `${String(8 + (i % 10)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
  status: statusList[i % 5],
  notes: i % 3 === 0 ? 'يرجى الحضور قبل الموعد بـ 15 دقيقة' : undefined,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

// ===== System Users =====
export const mockUsers: SystemUser[] = [
  { id: 1, name: 'أحمد العمري', email: 'super@clinic.sa', phone: '0501234567', role: 'SuperAdmin', status: 'active', createdAt: '2024-01-01' },
  { id: 2, name: 'سارة الزهراني', email: 'admin@clinic.sa', phone: '0502234567', role: 'BranchAdmin', branchId: 1, branchName: 'عيادة الرياض الرئيسية', status: 'active', createdAt: '2024-01-15' },
  { id: 3, name: 'د. محمد القحطاني', email: 'doctor@clinic.sa', phone: '0503234567', role: 'Doctor', branchId: 1, branchName: 'عيادة الرياض الرئيسية', status: 'active', createdAt: '2024-02-01' },
  { id: 4, name: 'ليلى الشمري', email: 'admin2@clinic.sa', phone: '0504234567', role: 'BranchAdmin', branchId: 2, branchName: 'عيادة جدة', status: 'active', createdAt: '2024-03-01' },
  { id: 5, name: 'د. نواف الرشيدي', email: 'doc2@clinic.sa', phone: '0505234567', role: 'Doctor', branchId: 2, branchName: 'عيادة جدة', status: 'inactive', createdAt: '2024-03-15' },
]

// ===== Subscription Plans =====
export const mockPlans: SubscriptionPlan[] = [
  { id: 1, name: 'الأساسي', price: 299, duration: 'monthly', features: ['عيادة واحدة', '2 مستخدمين', 'الحجوزات الأساسية', 'التقارير البسيطة'], isActive: true, maxBranches: 1, maxUsers: 2 },
  { id: 2, name: 'الاحترافي', price: 799, duration: 'monthly', features: ['3 عيادات', '10 مستخدمين', 'الحجوزات المتقدمة', 'الإشعارات', 'الدردشة', 'التقارير التفصيلية'], isActive: true, maxBranches: 3, maxUsers: 10 },
  { id: 3, name: 'المؤسسي', price: 1999, duration: 'monthly', features: ['عيادات غير محدودة', 'مستخدمون غير محدودون', 'جميع الميزات', 'دعم مخصص', 'API كاملة'], isActive: true, maxBranches: 999, maxUsers: 999 },
]

// ===== Payments =====
export const mockPayments: Payment[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  branchId: (i % 3) + 1,
  branchName: mockBranches[i % 3].name,
  planId: (i % 3) + 1,
  planName: mockPlans[i % 3].name,
  amount: mockPlans[i % 3].price,
  status: (['paid', 'paid', 'paid', 'pending', 'failed'] as const)[i % 5],
  paymentDate: new Date(Date.now() - i * 30 * 86400000).toISOString().split('T')[0],
  expiryDate: new Date(Date.now() + (30 - i) * 86400000).toISOString().split('T')[0],
  invoiceNumber: `INV-2026-${String(1000 + i).padStart(4, '0')}`,
}))

// ===== Offers =====
export const mockOffers: Offer[] = [
  { id: 1, title: 'خصم 30% على الفحص العام', description: 'استفد من خصم 30% على الفحص الشامل لجميع أفراد الأسرة طوال شهر يونيو.', imageUrl: 'https://picsum.photos/seed/offer1/600/300', actionType: 'ShowOnly', startDate: '2026-06-01', endDate: '2026-06-30', isActive: true, createdAt: '2026-05-01' },
  { id: 2, title: 'عرض عيادة الرياض - تنظيف الأسنان', description: 'تنظيف الأسنان بالليزر بسعر مميز.', imageUrl: 'https://picsum.photos/seed/offer2/600/300', branchId: 1, branchName: 'عيادة الرياض الرئيسية', actionType: 'NavigateToBranch', startDate: '2026-05-15', endDate: '2026-07-15', isActive: true, createdAt: '2026-05-10' },
  { id: 3, title: 'فحص العيون المجاني', description: 'فحص قياس النظر مجاناً لمدة أسبوع.', imageUrl: 'https://picsum.photos/seed/offer3/600/300', branchId: 3, branchName: 'عيادة الدمام', actionType: 'ExternalLink', actionData: 'https://clinic.sa/eye-checkup', startDate: '2026-05-01', endDate: '2026-05-31', isActive: false, createdAt: '2026-04-25' },
]

// ===== Notifications =====
export const mockNotifications: Notification[] = [
  { id: 1, title: 'تذكير بالموعد', body: 'نذكرك بموعدك غداً الساعة 10 صباحاً', audienceType: 'all_customers', audienceLabel: 'جميع العملاء', channels: ['fcm'], targetCount: 1284, successCount: 1270, failureCount: 14, sentAt: '2026-05-15T09:00:00', sentByName: 'أحمد العمري' },
  { id: 2, title: 'عرض خاص', body: 'استفد من خصم 20% على الفحص الشامل', audienceType: 'branch', audienceLabel: 'عيادة الرياض', channels: ['fcm', 'whatsapp'], targetCount: 320, successCount: 315, failureCount: 5, sentAt: '2026-05-14T14:00:00', sentByName: 'سارة الزهراني' },
  { id: 3, title: 'تحديث النظام', body: 'سيتوقف النظام للصيانة يوم الجمعة من 2-4 صباحاً', audienceType: 'all_users', audienceLabel: 'جميع المستخدمين', channels: ['fcm'], targetCount: 45, successCount: 45, failureCount: 0, sentAt: '2026-05-12T10:00:00', sentByName: 'أحمد العمري' },
]

// ===== Customers =====
export const mockCustomers: Customer[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: patientNames[i % patientNames.length],
  phone: `05${String(20000000 + i).slice(1)}`,
  email: i % 2 === 0 ? `customer${i + 1}@email.com` : undefined,
  branchId: 1,
  totalBookings: Math.floor(Math.random() * 15) + 1,
  lastVisit: new Date(Date.now() - i * 7 * 86400000).toISOString().split('T')[0],
  joinDate: new Date(Date.now() - (i + 10) * 30 * 86400000).toISOString().split('T')[0],
  avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
}))

// ===== Audit Logs =====
export const mockAuditLogs: AuditLog[] = [
  { id: 1, userId: 1, userName: 'أحمد العمري', action: 'create', resource: 'Branch', resourceId: 5, description: 'إنشاء فرع جديد: عيادة المدينة', ip: '192.168.1.1', createdAt: '2026-05-16T10:00:00' },
  { id: 2, userId: 2, userName: 'سارة الزهراني', action: 'update', resource: 'Booking', resourceId: 12, description: 'تحديث حالة الحجز إلى مؤكد', ip: '192.168.1.5', createdAt: '2026-05-16T09:30:00' },
  { id: 3, userId: 1, userName: 'أحمد العمري', action: 'send_notification', resource: 'Notification', resourceId: 3, description: 'إرسال إشعار لجميع المستخدمين', ip: '192.168.1.1', createdAt: '2026-05-16T08:00:00' },
  { id: 4, userId: 3, userName: 'د. محمد القحطاني', action: 'login', resource: 'Auth', description: 'تسجيل دخول ناجح', ip: '10.0.0.22', createdAt: '2026-05-16T08:00:00' },
  { id: 5, userId: 1, userName: 'أحمد العمري', action: 'delete', resource: 'Offer', resourceId: 2, description: 'حذف عرض: تنظيف الأسنان', ip: '192.168.1.1', createdAt: '2026-05-15T15:00:00' },
]

// ===== Schedule =====
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
const dayLabels = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

export const mockSchedule: BranchSchedule = {
  branchId: 1,
  schedule: days.map((day, i) => ({
    day,
    dayLabel: dayLabels[i],
    isWorkingDay: i !== 5, // Friday off
    openTime: '08:00',
    closeTime: '22:00',
    breakStart: i !== 5 ? '13:00' : undefined,
    breakEnd: i !== 5 ? '14:30' : undefined,
  })),
}

// ===== Chats =====
export const mockConversations: ChatConversation[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  customerId: i + 1,
  customerName: patientNames[i % patientNames.length],
  customerPhone: `05${String(20000000 + i).slice(1)}`,
  customerAvatar: `https://i.pravatar.cc/150?img=${(i % 70) + 20}`,
  branchId: 1,
  lastMessage: ['موعدي غداً هل سيكون متاحاً؟', 'شكراً جزيلاً على الخدمة', 'هل يمكن تغيير الموعد؟', 'أريد الاستفسار عن الأسعار'][i % 4],
  lastMessageAt: new Date(Date.now() - i * 3600000).toISOString(),
  unreadCount: i < 3 ? Math.floor(Math.random() * 4) + 1 : 0,
}))

export const mockMessages: ChatMessage[] = [
  { id: 1, senderId: 1, senderName: 'أحمد العلي', senderType: 'customer', content: 'السلام عليكم، هل الموعد يوم الثلاثاء متاح؟', contentType: 'text', sentAt: '2026-05-16T09:00:00', isRead: true },
  { id: 2, senderId: 2, senderName: 'عيادة الرياض', senderType: 'branch', content: 'وعليكم السلام، نعم الموعد متاح الساعة 10 صباحاً أو 3 عصراً.', contentType: 'text', sentAt: '2026-05-16T09:05:00', isRead: true },
  { id: 3, senderId: 1, senderName: 'أحمد العلي', senderType: 'customer', content: 'أفضل الساعة 10، جزاكم الله خيراً', contentType: 'text', sentAt: '2026-05-16T09:07:00', isRead: false },
]

// ===== Dashboard Stats =====
export const mockDashboardStats = {
  activeBranches: 3,
  expiredBranches: 2,
  totalUsers: 45,
  todayBookings: 17,
  monthBookings: 312,
  totalRevenue: 48750,
  recentNotifications: mockNotifications.slice(0, 5),
  bookingsChart: {
    categories: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    data: [24, 38, 31, 45, 52, 18, 29],
  },
}

export const mockBranchDashboardStats = {
  todayBookings: 8,
  activeCustomers: 142,
  subscriptionExpiry: '2026-12-31',
  pendingBookings: mockBookings.filter(b => b.status === 'pending').slice(0, 5),
}
