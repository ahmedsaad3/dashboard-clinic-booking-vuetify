<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold">لوحة المعلومات</h1>
        <p class="text-body-2 mt-1" style="color: var(--color-prim-text-muted)">
          مرحباً، {{ auth.user?.name }} 👋 — {{ todayDate }}
        </p>
      </div>
      <v-btn color="primary" variant="tonal" prepend-icon="mdi-refresh" rounded="lg" @click="refresh">
        تحديث
      </v-btn>
    </div>

    <!-- Stats Row -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" lg="4" xl="2">
        <AppStatCard
          label="الفروع النشطة"
          :value="stats.activeBranches"
          icon="mdi-store-check-outline"
          color="var(--color-primary-500)"
          color-light="var(--color-primary-100)"
          :trend="8"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="2">
        <AppStatCard
          label="فروع منتهية الاشتراك"
          :value="stats.expiredBranches"
          icon="mdi-store-alert-outline"
          color="var(--color-prim-error)"
          color-light="var(--color-prim-error-surface)"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="2">
        <AppStatCard
          label="إجمالي المستخدمين"
          :value="stats.totalUsers"
          icon="mdi-account-group-outline"
          color="var(--color-secondary-500)"
          color-light="var(--color-secondary-100)"
          :trend="12"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="2">
        <AppStatCard
          label="حجوزات اليوم"
          :value="stats.todayBookings"
          icon="mdi-calendar-today-outline"
          color="var(--color-accent-500)"
          color-light="var(--color-accent-100)"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="2">
        <AppStatCard
          label="حجوزات الشهر"
          :value="stats.monthBookings"
          icon="mdi-calendar-month-outline"
          color="oklch(0.50 0.130 280)"
          color-light="oklch(0.95 0.020 280)"
          :trend="5"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="2">
        <AppStatCard
          label="الإيرادات الكلية"
          :value="stats.totalRevenue"
          icon="mdi-cash-multiple"
          color="var(--color-prim-success)"
          color-light="var(--color-prim-success-surface)"
          :is-currency="true"
          :trend="18"
        />
      </v-col>
    </v-row>

    <!-- Chart + Notifications Row -->
    <v-row>
      <!-- Bookings Chart -->
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid var(--color-prim-border)">
          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <h2 class="text-subtitle-1 font-weight-bold">الحجوزات خلال آخر 7 أيام</h2>
              <p class="text-caption" style="color: var(--color-prim-text-muted)">إجمالي الحجوزات اليومية</p>
            </div>
            <v-chip size="small" color="primary" variant="tonal">هذا الأسبوع</v-chip>
          </div>
          <apexchart
            type="area"
            height="260"
            :options="chartOptions"
            :series="chartSeries"
          />
        </v-card>
      </v-col>

      <!-- Recent Notifications -->
      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid var(--color-prim-border)">
          <div class="d-flex align-center justify-space-between mb-4">
            <h2 class="text-subtitle-1 font-weight-bold">آخر الإشعارات</h2>
            <v-btn variant="text" size="small" to="/admin/notifications/history" color="primary">
              عرض الكل
            </v-btn>
          </div>

          <div class="d-flex flex-column" style="gap: 12px">
            <div
              v-for="notif in stats.recentNotifications"
              :key="notif.id"
              class="notif-item pa-3"
            >
              <div class="d-flex align-center mb-1" style="gap: 8px">
                <v-icon icon="mdi-bell-outline" size="16" color="primary" />
                <span class="text-body-2 font-weight-medium">{{ notif.title }}</span>
              </div>
              <p class="text-caption mb-1" style="color: var(--color-prim-text-muted)">{{ notif.body }}</p>
              <div class="d-flex align-center justify-space-between">
                <v-chip size="x-small" :color="notif.successCount === notif.targetCount ? 'success' : 'warning'" variant="tonal">
                  {{ notif.successCount }}/{{ notif.targetCount }} مُرسَل
                </v-chip>
                <span class="text-caption" style="color: var(--color-prim-text-muted)">
                  {{ formatDate(notif.sentAt) }}
                </span>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Actions -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card rounded="xl" elevation="0" class="pa-6" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">إجراءات سريعة</h2>
          <div class="d-flex flex-wrap" style="gap: 12px">
            <v-btn
              v-for="action in quickActions"
              :key="action.to"
              :to="action.to"
              :prepend-icon="action.icon"
              :color="action.color"
              variant="tonal"
              rounded="lg"
            >
              {{ action.label }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { mockDashboardStats } from '@/services/mockData'

  definePage({ meta: { layout: 'AdminLayout' } })

  const auth = useAuthStore()
  const stats = ref({ ...mockDashboardStats })

  const todayDate = new Date().toLocaleDateString('ar-SA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  function refresh() {
    stats.value = { ...mockDashboardStats }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })
  }

  const chartOptions = {
    chart: { type: 'area', toolbar: { show: false }, fontFamily: 'Alexandria, sans-serif' },
    stroke: { curve: 'smooth', width: 2.5 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 100] },
    },
    colors: ['#0D7E8F'],
    xaxis: {
      categories: stats.value.bookingsChart.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontFamily: 'Alexandria, sans-serif', fontSize: '12px', colors: '#78909C' } },
    },
    yaxis: { labels: { style: { fontFamily: 'Alexandria, sans-serif', colors: '#78909C' } } },
    grid: { borderColor: '#EEF2F4', strokeDashArray: 4, padding: { left: 0, right: 0 } },
    dataLabels: { enabled: false },
    tooltip: { x: { show: true }, theme: 'light' },
    markers: { size: 4, colors: ['#0D7E8F'], strokeColors: '#fff', strokeWidth: 2 },
  }

  const chartSeries = [{ name: 'الحجوزات', data: stats.value.bookingsChart.data }]

  const quickActions = [
    { label: 'إضافة فرع', icon: 'mdi-store-plus-outline', to: '/admin/branches', color: 'primary' },
    { label: 'إضافة مستخدم', icon: 'mdi-account-plus-outline', to: '/admin/users', color: 'secondary' },
    { label: 'إرسال إشعار', icon: 'mdi-send-outline', to: '/admin/notifications/send', color: 'accent' },
    { label: 'إضافة عرض', icon: 'mdi-sale-outline', to: '/admin/offers', color: 'success' },
    { label: 'عرض المدفوعات', icon: 'mdi-cash-multiple', to: '/admin/subscriptions/payments', color: 'warning' },
  ]
</script>

<style scoped>
.notif-item {
  border-radius: 10px;
  background: var(--color-prim-bg);
  border: 1px solid var(--color-prim-border);
  transition: background 0.15s;
}
.notif-item:hover {
  background: var(--color-primary-50);
}
</style>
