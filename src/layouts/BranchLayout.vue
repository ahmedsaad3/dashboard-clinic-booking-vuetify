<template>
  <v-app dir="rtl" theme="clinicLight">
    <!-- Navigation Drawer (Sidebar) -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      class="branch-sidebar"
      width="240"
    >
      <!-- Logo + Branch Name -->
      <div class="sidebar-logo d-flex align-center px-4 py-4">
        <v-avatar color="secondary" size="36" class="flex-shrink-0">
          <v-icon icon="mdi-hospital" size="20" color="white" />
        </v-avatar>
        <Transition name="slide-fade">
          <div v-if="!rail" class="mr-3 overflow-hidden">
            <div class="text-body-2 font-weight-bold" style="color: var(--color-secondary-700); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px;">
              {{ auth.user?.branchName ?? 'العيادة' }}
            </div>
            <div class="text-caption" style="color: var(--color-prim-text-muted)">
              {{ auth.user?.role === 'Doctor' ? 'طبيب' : 'مدير فرع' }}
            </div>
          </div>
        </Transition>
      </div>

      <v-divider />

      <!-- Navigation Items -->
      <v-list density="compact" nav class="mt-2">
        <template v-for="item in navItems" :key="item.to">
          <v-list-item
            :to="item.to"
            :prepend-icon="item.icon"
            :title="!rail ? item.label : ''"
            active-color="secondary"
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

      <!-- Bottom: User -->
      <template #append>
        <v-divider />
        <div class="pa-3">
          <v-list-item
            :prepend-avatar="auth.user?.avatar"
            :title="!rail ? auth.user?.name : ''"
            :subtitle="!rail ? auth.user?.email : ''"
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
    <v-app-bar flat class="branch-appbar" height="64">
      <v-btn
        :icon="rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
        variant="text"
        @click="rail = !rail"
      />
      <v-app-bar-title>
        <span class="text-body-1 font-weight-medium">{{ pageTitle }}</span>
      </v-app-bar-title>
      <template #append>
        <v-chip
          v-if="!rail"
          size="small"
          color="success"
          variant="tonal"
          class="me-2"
          prepend-icon="mdi-circle"
        >
          الاشتراك نشط
        </v-chip>
        <v-btn icon="mdi-bell-outline" variant="text">
          <v-icon />
          <v-badge color="error" content="2" floating />
        </v-btn>
        <v-avatar :image="auth.user?.avatar" size="36" class="ms-2 me-3 cursor-pointer" />
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="branch-main">
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
    { label: 'لوحة المعلومات', icon: 'mdi-view-dashboard-outline', to: '/branch' },
    { label: 'الحجوزات', icon: 'mdi-calendar-check-outline', to: '/branch/bookings' },
    { label: 'جدول الدوام', icon: 'mdi-calendar-week-outline', to: '/branch/schedule' },
    { label: 'العملاء', icon: 'mdi-account-group-outline', to: '/branch/customers' },
    { label: 'الدردشات', icon: 'mdi-chat-outline', to: '/branch/chats' },
    { label: 'إرسال إشعارات', icon: 'mdi-send-outline', to: '/branch/notifications' },
    { label: 'العروض', icon: 'mdi-sale-outline', to: '/branch/offers' },
    { label: 'الملف الشخصي', icon: 'mdi-account-cog-outline', to: '/branch/profile' },
  ]

  const pageTitleMap: Record<string, string> = {
    '/branch': 'لوحة المعلومات',
    '/branch/bookings': 'الحجوزات',
    '/branch/schedule': 'جدول الدوام',
    '/branch/customers': 'العملاء',
    '/branch/chats': 'الدردشات',
    '/branch/notifications': 'إرسال إشعارات',
    '/branch/offers': 'العروض',
    '/branch/profile': 'الملف الشخصي والإعدادات',
  }

  const pageTitle = computed(() => pageTitleMap[route.path] ?? 'لوحة الفرع')

  function handleLogout() {
    auth.logout()
    router.push('/login')
  }
</script>

<style scoped>
.branch-sidebar {
  border-left: 1px solid var(--color-prim-border) !important;
  border-right: none !important;
}
.branch-appbar {
  border-bottom: 1px solid var(--color-prim-border) !important;
  background: white !important;
}
.branch-main {
  background: var(--color-prim-bg) !important;
}
.slide-fade-enter-active,
.slide-fade-leave-active { transition: all 0.2s ease; }
.slide-fade-enter-from,
.slide-fade-leave-to { opacity: 0; transform: translateX(10px); }
</style>
