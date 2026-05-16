<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div>
        <h1 class="text-h5 font-weight-bold">سجل الإشعارات</h1>
        <p class="text-body-2 mt-1" style="color: var(--color-prim-text-muted)">جميع الإشعارات المرسلة مع إمكانية إعادة الإرسال</p>
      </div>
    </div>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-text-field v-model="search" placeholder="بحث..." variant="outlined" density="compact" prepend-inner-icon="mdi-magnify" hide-details rounded="lg" clearable style="max-width: 340px" />
    </v-card>

    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-data-table :headers="headers" :items="notifications" :search="search" :items-per-page="10" no-data-text="لا توجد إشعارات">
        <template #item.channels="{ item }">
          <div class="d-flex" style="gap:4px">
            <v-chip v-if="item.channels.includes('fcm')" size="x-small" color="primary" variant="tonal">FCM</v-chip>
            <v-chip v-if="item.channels.includes('whatsapp')" size="x-small" color="success" variant="tonal">WhatsApp</v-chip>
          </div>
        </template>
        <template #item.successCount="{ item }">
          <v-chip size="small" :color="item.failureCount === 0 ? 'success' : 'warning'" variant="tonal">
            {{ item.successCount }}/{{ item.targetCount }}
          </v-chip>
        </template>
        <template #item.sentAt="{ item }">
          {{ new Date(item.sentAt).toLocaleString('ar-SA') }}
        </template>
        <template #item.actions="{ item }">
          <v-tooltip text="إعادة إرسال" location="top">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon="mdi-send-outline" size="small" variant="text" color="primary" @click="resend(item.id)" />
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="snack" color="success" location="bottom end" timeout="2000" rounded="lg">تم إعادة الإرسال</v-snackbar>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { mockNotifications } from '@/services/mockData'

  definePage({ meta: { layout: 'AdminLayout' } })

  const search = ref('')
  const snack = ref(false)
  const notifications = ref([...mockNotifications])

  const headers = [
    { title: 'العنوان', key: 'title' },
    { title: 'الجمهور', key: 'audienceLabel' },
    { title: 'القنوات', key: 'channels', sortable: false },
    { title: 'النجاح/المستهدف', key: 'successCount' },
    { title: 'المرسِل', key: 'sentByName' },
    { title: 'وقت الإرسال', key: 'sentAt' },
    { title: 'إعادة إرسال', key: 'actions', sortable: false },
  ]

  function resend(_id: number) { snack.value = true }
</script>
