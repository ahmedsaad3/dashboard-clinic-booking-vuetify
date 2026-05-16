<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div><h1 class="text-h5 font-weight-bold">الحجوزات</h1></div>
      <v-btn color="secondary" prepend-icon="mdi-plus" rounded="lg">إضافة حجز يدوي</v-btn>
    </div>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-row dense>
        <v-col cols="12" sm="5">
          <v-text-field v-model="search" placeholder="بحث بالمريض..." variant="outlined" density="compact" prepend-inner-icon="mdi-magnify" hide-details rounded="lg" clearable />
        </v-col>
        <v-col cols="6" sm="3">
          <v-select v-model="filterStatus" :items="statusOptions" label="الحالة" variant="outlined" density="compact" hide-details rounded="lg" clearable />
        </v-col>
        <v-col cols="6" sm="4">
          <v-text-field v-model="filterDate" type="date" label="التاريخ" variant="outlined" density="compact" hide-details rounded="lg" dir="ltr" clearable />
        </v-col>
      </v-row>
    </v-card>

    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-data-table :headers="headers" :items="filteredBookings" :search="search" :items-per-page="10" no-data-text="لا توجد حجوزات">
        <template #item.status="{ item }">
          <v-chip size="small" :color="statusColor(item.status)" variant="tonal">{{ statusLabel(item.status) }}</v-chip>
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex" style="gap:4px">
            <v-btn v-if="item.status === 'pending'" size="x-small" color="success" variant="tonal" rounded="lg" @click="updateStatus(item.id,'confirmed')">تأكيد</v-btn>
            <v-btn v-if="item.status === 'pending'" size="x-small" color="error" variant="tonal" rounded="lg" @click="updateStatus(item.id,'cancelled')">رفض</v-btn>
            <v-btn v-if="item.status === 'confirmed'" size="x-small" color="primary" variant="tonal" rounded="lg" @click="updateStatus(item.id,'completed')">مكتمل</v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="snack" color="success" location="bottom end" timeout="2000" rounded="lg">تم تحديث الحجز</v-snackbar>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { mockBookings } from '@/services/mockData'
  import type { Booking, BookingStatus } from '@/types'

  definePage({ meta: { layout: 'BranchLayout' } })

  const bookings = ref<Booking[]>([...mockBookings.filter(b => b.branchId === 1)])
  const search = ref('')
  const filterStatus = ref<string | null>(null)
  const filterDate = ref<string | null>(null)
  const snack = ref(false)

  const statusOptions = [
    { title: 'معلق', value: 'pending' }, { title: 'مؤكد', value: 'confirmed' },
    { title: 'مكتمل', value: 'completed' }, { title: 'ملغي', value: 'cancelled' },
  ]
  const headers = [
    { title: 'المريض', key: 'patientName' }, { title: 'الهاتف', key: 'patientPhone' },
    { title: 'الطبيب', key: 'doctorName' }, { title: 'التاريخ', key: 'date' },
    { title: 'الوقت', key: 'time' }, { title: 'الحالة', key: 'status' },
    { title: 'الإجراءات', key: 'actions', sortable: false },
  ]
  const filteredBookings = computed(() =>
    bookings.value.filter(b => {
      if (filterStatus.value && b.status !== filterStatus.value) return false
      if (filterDate.value && b.date !== filterDate.value) return false
      return true
    })
  )
  function statusColor(s: string) { return {pending:'warning',confirmed:'primary',completed:'success',cancelled:'error',no_show:'default'}[s]??'default' }
  function statusLabel(s: string) { return {pending:'معلق',confirmed:'مؤكد',completed:'مكتمل',cancelled:'ملغي',no_show:'لم يحضر'}[s]??s }
  function updateStatus(id: number, status: BookingStatus) {
    const idx = bookings.value.findIndex(b => b.id === id)
    if (idx !== -1) { bookings.value[idx] = { ...bookings.value[idx], status }; snack.value = true }
  }
</script>
