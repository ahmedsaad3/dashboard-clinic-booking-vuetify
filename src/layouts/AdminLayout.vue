<template>
  <v-app dir="rtl" theme="clinicLight">
    <!-- Navigation Drawer (Sidebar) -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      class="admin-sidebar"
      width="260"
    >
      <!-- Logo -->
      <div class="sidebar-logo d-flex align-center px-4 py-4">
        <v-avatar color="primary" size="36" class="flex-shrink-0">
          <v-icon icon="mdi-hospital-building" size="22" color="white" />
        </v-avatar>
        <Transition name="slide-fade">
          <div v-if="!rail" class="mr-3 overflow-hidden">
            <div class="text-body-2 font-weight-bold" style="color: var(--color-primary-700)">نظام العيادات</div>
            <div class="text-caption" style="color: var(--color-prim-text-muted)">Clinic System</div>
          </div>
        </Transition>
      </div>

      <v-divider />

      <!-- Navigation Items -->
      <v-list density="compact" nav class="mt-2">
        <template v-for="item in navItems" :key="item.to">
          <!-- Group header -->
          <div v-if="item.type === 'header' && !rail" class="nav-group-label px-4 pb-1 pt-3">
            {{ item.label }}
          </div>

          <!-- Nav item -->
          <v-list-item
            v-else-if="item.type === 'item'"
            :to="item.to"
            :prepend-icon="item.icon"
            :title="!rail ? item.label : ''"
            :value="item.to"
            active-color="primary"
            rounded="lg"
            class="mb-1"
          >
            <template v-if="rail" #prepend>
              <v-tooltip :text="item.label" location="end">
                <template #activator="{ props }">
                  <v-icon v-bind="props" :icon="item.icon" />
                </template>
              </v-tooltip>
            </template>
          </v-list-item>
        </template>
      </v-list>

      <!-- Bottom: User Info -->
      <template #append>
        <v-divider />
        <div class="pa-3">
          <v-list-item
            :prepend-avatar="auth.user?.avatar"
            :title="!rail ? auth.user?.name : ''"
            :subtitle="!rail ? 'مدير النظام' : ''"
            rounded="lg"
          >
            <template #append>
              <v-btn
                v-if="!rail"
                icon="mdi-logout"
                variant="text"
                size="small"
                color="error"
                @click="handleLogout"
              />
            </template>
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar flat class="admin-appbar" height="64">
      <v-btn
        :icon="rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
        variant="text"
        @click="rail = !rail"
      />

      <v-app-bar-title>
        <span class="text-body-1 font-weight-medium">{{ pageTitle }}</span>
      </v-app-bar-title>

      <template #append>
        <v-btn icon="mdi-bell-outline" variant="text">
          <v-icon />
          <v-badge color="error" content="3" floating />
        </v-btn>
        <v-avatar
          :image="auth.user?.avatar"
          size="36"
          class="ms-2 me-3 cursor-pointer"
        />
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="admin-main">
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
  const route = useRoute()
  const router = useRouter()

  const drawer = ref(true)
  const rail = ref(false)

  const navItems = [
    { type: 'header', label: 'الرئيسية' },
    { type: 'item', label: 'لوحة المعلومات', icon: 'mdi-view-dashboard-outline', to: '/admin' },
    { type: 'header', label: 'إدارة العيادات' },
    { type: 'item', label: 'إدارة الفروع', icon: 'mdi-store-outline', to: '/admin/branches' },
    { type: 'item', label: 'جدول الأيام', icon: 'mdi-calendar-week-outline', to: '/admin/schedule' },
    { type: 'header', label: 'المستخدمون والمالية' },
    { type: 'item', label: 'إدارة المستخدمين', icon: 'mdi-account-group-outline', to: '/admin/users' },
    { type: 'item', label: 'خطط الاشتراك', icon: 'mdi-tag-multiple-outline', to: '/admin/subscriptions/plans' },
    { type: 'item', label: 'الاشتراكات والمدفوعات', icon: 'mdi-cash-multiple', to: '/admin/subscriptions/payments' },
    { type: 'header', label: 'التسويق والتواصل' },
    { type: 'item', label: 'العروض', icon: 'mdi-sale-outline', to: '/admin/offers' },
    { type: 'item', label: 'إرسال الإشعارات', icon: 'mdi-send-outline', to: '/admin/notifications/send' },
    { type: 'item', label: 'سجل الإشعارات', icon: 'mdi-bell-badge-outline', to: '/admin/notifications/history' },
    { type: 'header', label: 'النظام' },
    { type: 'item', label: 'سجل العمليات', icon: 'mdi-clipboard-list-outline', to: '/admin/audit-log' },
    { type: 'item', label: 'الإعدادات', icon: 'mdi-cog-outline', to: '/admin/settings' },
  ]

  const pageTitleMap: Record<string, string> = {
    '/admin': 'لوحة المعلومات',
    '/admin/branches': 'إدارة الفروع',
    '/admin/schedule': 'جدول الأيام',
    '/admin/users': 'إدارة المستخدمين',
    '/admin/subscriptions/plans': 'خطط الاشتراك',
    '/admin/subscriptions/payments': 'الاشتراكات والمدفوعات',
    '/admin/offers': 'العروض',
    '/admin/notifications/send': 'إرسال الإشعارات',
    '/admin/notifications/history': 'سجل الإشعارات',
    '/admin/audit-log': 'سجل العمليات',
    '/admin/settings': 'الإعدادات',
  }

  const pageTitle = computed(() => pageTitleMap[route.path] ?? 'لوحة التحكم')

  function handleLogout() {
    auth.logout()
    router.push('/login')
  }
</script>

<style scoped>
.admin-sidebar {
  border-left: 1px solid var(--color-prim-border) !important;
  border-right: none !important;
}

.admin-appbar {
  border-bottom: 1px solid var(--color-prim-border) !important;
  background: white !important;
}

.admin-main {
  background: var(--color-prim-bg) !important;
}

.nav-group-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-prim-text-muted);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
