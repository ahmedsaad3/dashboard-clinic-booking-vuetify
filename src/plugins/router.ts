/**
 * plugins/router.ts
 * File-based routing with role-based Route Guards
 */

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Route Guards — lazy import to avoid circular dependency
router.beforeEach(async (to) => {
  // Dynamically import store (Pinia must be initialized first)
  const { useAuthStore } = await import('@/stores/auth')
  const auth = useAuthStore()

  // Restore session on first load
  if (!auth.isLoggedIn) {
    auth.restoreSession()
  }

  const requiresAuth = to.meta.requiresAuth !== false // default: protected
  const requiredRole = to.meta.role as string | undefined

  // Public routes (login page)
  if (to.path === '/login') {
    if (auth.isLoggedIn) {
      return auth.defaultRoute // already logged in → redirect to dashboard
    }
    return true
  }

  // Root redirect
  if (to.path === '/') {
    if (auth.isLoggedIn) return auth.defaultRoute
    return '/login'
  }

  // Protected routes
  if (requiresAuth && !auth.isLoggedIn) {
    return `/login?redirect=${to.path}`
  }

  // Role-based access
  if (requiredRole && auth.role !== requiredRole) {
    return auth.defaultRoute
  }

  return true
})

export default router
