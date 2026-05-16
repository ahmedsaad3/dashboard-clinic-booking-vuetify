<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div><h1 class="text-h5 font-weight-bold">العملاء</h1></div>
      <div class="d-flex" style="gap:8px">
        <v-btn color="secondary" variant="tonal" prepend-icon="mdi-send-outline" rounded="lg">إشعار جماعي</v-btn>
      </div>
    </div>
    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-text-field v-model="search" placeholder="بحث بالاسم أو الهاتف..." variant="outlined" density="compact" prepend-inner-icon="mdi-magnify" hide-details rounded="lg" clearable style="max-width:340px" />
    </v-card>
    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-data-table :headers="headers" :items="customers" :search="search" :items-per-page="10" no-data-text="لا يوجد عملاء">
        <template #item.name="{ item }">
          <div class="d-flex align-center" style="gap:10px">
            <v-avatar :image="item.avatar" size="34" />
            <div>
              <div class="text-body-2 font-weight-medium">{{ item.name }}</div>
              <div class="text-caption" style="color: var(--color-prim-text-muted)" dir="ltr">{{ item.phone }}</div>
            </div>
          </div>
        </template>
        <template #item.actions="{ item }">
          <v-btn size="x-small" color="secondary" variant="tonal" rounded="lg" prepend-icon="mdi-send-outline">إشعار</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { mockCustomers } from '@/services/mockData'
  definePage({ meta: { layout: 'BranchLayout' } })
  const customers = ref([...mockCustomers])
  const search = ref('')
  const headers = [
    { title: 'العميل', key: 'name' }, { title: 'إجمالي الحجوزات', key: 'totalBookings' },
    { title: 'آخر زيارة', key: 'lastVisit' }, { title: 'تاريخ الانضمام', key: 'joinDate' },
    { title: 'إرسال إشعار', key: 'actions', sortable: false },
  ]
</script>
