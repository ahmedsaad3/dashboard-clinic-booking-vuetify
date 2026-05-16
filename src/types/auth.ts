// ===== Authentication & Authorization Types =====

export type UserRole = 'SuperAdmin' | 'BranchAdmin' | 'Doctor'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: UserRole
  avatar?: string
  branchId?: number   // null for SuperAdmin
  branchName?: string // null for SuperAdmin
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  isLoggedIn: boolean
}

// Mock users for prototype simulation
export const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: 1,
    name: 'أحمد العمري',
    email: 'super@clinic.sa',
    password: '123456',
    role: 'SuperAdmin',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    name: 'سارة الزهراني',
    email: 'admin@clinic.sa',
    password: '123456',
    role: 'BranchAdmin',
    branchId: 1,
    branchName: 'عيادة الرياض الرئيسية',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'د. محمد القحطاني',
    email: 'doctor@clinic.sa',
    password: '123456',
    role: 'Doctor',
    branchId: 1,
    branchName: 'عيادة الرياض الرئيسية',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
]

export function getRoleDefaultRoute(role: UserRole): string {
  switch (role) {
    case 'SuperAdmin': return '/admin'
    case 'BranchAdmin': return '/branch'
    case 'Doctor': return '/branch'
  }
}
