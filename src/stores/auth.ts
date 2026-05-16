import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthUser, LoginCredentials, UserRole } from '@/types'
import { MOCK_USERS, getRoleDefaultRoute } from '@/types'

const TOKEN_KEY = 'clinic_auth_token'
const USER_KEY = 'clinic_auth_user'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const loginError = ref<string | null>(null)
  const isLoading = ref(false)

  // Getters
  const isLoggedIn = computed(() => !!user.value && !!token.value)
  const role = computed<UserRole | null>(() => user.value?.role ?? null)
  const isSuperAdmin = computed(() => user.value?.role === 'SuperAdmin')
  const isBranchAdmin = computed(() => user.value?.role === 'BranchAdmin')
  const isDoctor = computed(() => user.value?.role === 'Doctor')
  const defaultRoute = computed(() =>
    user.value ? getRoleDefaultRoute(user.value.role) : '/login'
  )

  // Actions
  function restoreSession() {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY)
      const savedUser = localStorage.getItem(USER_KEY)
      if (savedToken && savedUser) {
        token.value = savedToken
        user.value = JSON.parse(savedUser) as AuthUser
      }
    } catch {
      clearSession()
    }
  }

  async function login(credentials: LoginCredentials): Promise<boolean> {
    isLoading.value = true
    loginError.value = null

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const found = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    )

    if (!found) {
      loginError.value = 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      isLoading.value = false
      return false
    }

    const { password: _, ...authUser } = found
    user.value = authUser
    token.value = `mock-token-${authUser.id}-${Date.now()}`

    localStorage.setItem(TOKEN_KEY, token.value)
    localStorage.setItem(USER_KEY, JSON.stringify(authUser))

    isLoading.value = false
    return true
  }

  function logout() {
    clearSession()
  }

  function clearSession() {
    user.value = null
    token.value = null
    loginError.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return {
    user,
    token,
    loginError,
    isLoading,
    isLoggedIn,
    role,
    isSuperAdmin,
    isBranchAdmin,
    isDoctor,
    defaultRoute,
    restoreSession,
    login,
    logout,
  }
})
