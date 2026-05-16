<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div>
        <h1 class="text-h5 font-weight-bold">لوحة المعلومات</h1>
        <p class="text-body-2 mt-1" style="color: var(--color-prim-text-muted)">مرحباً، {{ auth.user?.name }} 👋 — {{ auth.user?.branchName }}</p>
      </div>
    </div>

    <!-- Stats -->
    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <AppStatCard label="حجوزات اليوم" :value="stats.todayBookings" icon="mdi-calendar-today-outline" color="var(--color-secondary-500)" />
      </v-col>
      <v-col cols="12" sm="4">
        <AppStatCard label="العملاء النشطون" :value="stats.activeCustomers" icon="mdi-account-group-outline" color="var(--color-primary-500)" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="0" class="pa-5" style="border: 1px solid var(--color-prim-border)">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption" style="color: var(--color-prim-text-muted)">حالة الاشتراك</div>
              <div class="text-body-1 font-weight-bold mt-1">نشط حتى</div>
              <div class="text-body-2 font-weight-medium" style="color: var(--color-primary-600)">{{ stats.subscriptionExpiry }}</div>
            </div>
            <v-btn size="small" color="primary" variant="tonal" rounded="lg">طلب تمديد</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pending Bookings -->
    <v-card rounded="xl" elevation="0" class="pa-6" style="border: 1px solid var(--color-prim-border)">
      <div class="d-flex align-center justify-space-between mb-4">
        <h2 class="text-subtitle-1 font-weight-bold">آخر الحجوزات المعلقة</h2>
        <v-btn variant="text" size="small" color="secondary" to="/branch/bookings">عرض الكل</v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <th>المريض</th>
            <th>الطبيب</th>
            <th>التاريخ</th>
            <th>الوقت</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in pendingBookings" :key="b.id">
            <td class="font-weight-medium">{{ b.patientName }}</td>
            <td>{{ b.doctorName }}</td>
            <td>{{ b.date }}</td>
            <td dir="ltr">{{ b.time }}</td>
            <td>
              <div class="d-flex" style="gap:4px">
                <v-btn size="x-small" color="success" variant="tonal" rounded="lg">تأكيد</v-btn>
                <v-btn size="x-small" color="error" variant="tonal" rounded="lg">رفض</v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { mockBranchDashboardStats } from '@/services/mockData'

  definePage({ meta: { layout: 'BranchLayout' } })

  const auth = useAuthStore()
  const stats = ref({ ...mockBranchDashboardStats })
  const pendingBookings = stats.value.pendingBookings
</script>
