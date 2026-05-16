<template>
  <div>
    <div class="mb-6"><h1 class="text-h5 font-weight-bold">جدول الدوام</h1></div>
    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-chip color="secondary" variant="tonal" prepend-icon="mdi-store-outline">{{ auth.user?.branchName }}</v-chip>
    </v-card>
    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-table>
        <thead>
          <tr>
            <th>اليوم</th><th>يوم عمل</th><th>من</th><th>إلى</th><th>بداية الاستراحة</th><th>نهاية الاستراحة</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in schedule" :key="day.day" :class="!day.isWorkingDay ? 'opacity-50' : ''">
            <td class="font-weight-medium">{{ day.dayLabel }}</td>
            <td><v-switch v-model="day.isWorkingDay" color="secondary" density="compact" hide-details inset /></td>
            <td><v-text-field v-model="day.openTime" type="time" variant="outlined" density="compact" hide-details :disabled="!day.isWorkingDay" style="width:130px" dir="ltr" /></td>
            <td><v-text-field v-model="day.closeTime" type="time" variant="outlined" density="compact" hide-details :disabled="!day.isWorkingDay" style="width:130px" dir="ltr" /></td>
            <td><v-text-field v-model="day.breakStart" type="time" variant="outlined" density="compact" hide-details :disabled="!day.isWorkingDay" style="width:130px" dir="ltr" /></td>
            <td><v-text-field v-model="day.breakEnd" type="time" variant="outlined" density="compact" hide-details :disabled="!day.isWorkingDay" style="width:130px" dir="ltr" /></td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <div class="mt-4 d-flex justify-end">
      <v-btn color="secondary" variant="flat" rounded="lg" prepend-icon="mdi-content-save-outline" :loading="saving" @click="save">حفظ الجدول</v-btn>
    </div>
    <v-snackbar v-model="snack" color="success" location="bottom end" timeout="2000" rounded="lg">تم حفظ الجدول</v-snackbar>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { mockSchedule } from '@/services/mockData'
  definePage({ meta: { layout: 'BranchLayout' } })
  const auth = useAuthStore()
  const schedule = ref(JSON.parse(JSON.stringify(mockSchedule.schedule)))
  const saving = ref(false)
  const snack = ref(false)
  async function save() { saving.value = true; await new Promise(r => setTimeout(r, 600)); saving.value = false; snack.value = true }
</script>
