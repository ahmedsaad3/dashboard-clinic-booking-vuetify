<template>
  <div>
    <div class="mb-6"><h1 class="text-h5 font-weight-bold">سجل العمليات</h1></div>
    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-text-field v-model="search" placeholder="بحث..." variant="outlined" density="compact" prepend-inner-icon="mdi-magnify" hide-details rounded="lg" clearable style="max-width:340px" />
    </v-card>
    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-data-table :headers="headers" :items="logs" :search="search" :items-per-page="15" no-data-text="لا توجد سجلات">
        <template #item.action="{ item }">
          <v-chip size="x-small" :color="actionColor(item.action)" variant="tonal">{{ actionLabel(item.action) }}</v-chip>
        </template>
        <template #item.createdAt="{ item }">{{ new Date(item.createdAt).toLocaleString('ar-SA') }}</template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { mockAuditLogs } from '@/services/mockData'
  definePage({ meta: { layout: 'AdminLayout' } })
  const logs = ref([...mockAuditLogs])
  const search = ref('')
  const headers = [
    { title: 'المستخدم', key: 'userName' },
    { title: 'الإجراء', key: 'action' },
    { title: 'المورد', key: 'resource' },
    { title: 'الوصف', key: 'description' },
    { title: 'IP', key: 'ip' },
    { title: 'الوقت', key: 'createdAt' },
  ]
  function actionColor(a: string) { return {create:'success',update:'primary',delete:'error',login:'secondary',logout:'warning',send_notification:'accent'}[a]??'default' }
  function actionLabel(a: string) { return {create:'إنشاء',update:'تعديل',delete:'حذف',login:'دخول',logout:'خروج',send_notification:'إشعار'}[a]??a }
</script>
