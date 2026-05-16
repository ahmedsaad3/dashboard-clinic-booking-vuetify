<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap: 12px">
      <div>
        <h1 class="text-h5 font-weight-bold">جدول الأيام</h1>
        <p class="text-body-2 mt-1" style="color: var(--color-prim-text-muted)">تحديد ساعات العمل لكل فرع</p>
      </div>
    </div>

    <!-- Branch Selector -->
    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-row dense align="center">
        <v-col cols="12" sm="5">
          <v-select
            v-model="selectedBranchId"
            :items="branchOptions"
            item-title="name"
            item-value="id"
            label="اختر الفرع"
            variant="outlined"
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-store-outline"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="copyFromBranchId"
            :items="branchOptions.filter(b => b.id !== selectedBranchId)"
            item-title="name"
            item-value="id"
            label="نسخ جدول من فرع آخر"
            variant="outlined"
            density="comfortable"
            hide-details
            clearable
            prepend-inner-icon="mdi-content-copy"
          />
        </v-col>
        <v-col cols="12" sm="3" class="d-flex" style="gap:8px">
          <v-btn
            :disabled="!copyFromBranchId"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-content-copy"
            @click="copySchedule"
          >
            نسخ
          </v-btn>
          <v-btn color="primary" rounded="lg" prepend-icon="mdi-content-save-outline" :loading="saving" @click="saveSchedule">
            حفظ
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Schedule Table -->
    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-table>
        <thead>
          <tr>
            <th class="text-subtitle-2 font-weight-bold">اليوم</th>
            <th class="text-subtitle-2 font-weight-bold">يوم عمل</th>
            <th class="text-subtitle-2 font-weight-bold">من</th>
            <th class="text-subtitle-2 font-weight-bold">إلى</th>
            <th class="text-subtitle-2 font-weight-bold">بداية الاستراحة</th>
            <th class="text-subtitle-2 font-weight-bold">نهاية الاستراحة</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in schedule" :key="day.day" :class="!day.isWorkingDay ? 'day-off-row' : ''">
            <td class="font-weight-medium">{{ day.dayLabel }}</td>
            <td>
              <v-switch
                v-model="day.isWorkingDay"
                color="primary"
                density="compact"
                hide-details
                inset
              />
            </td>
            <td>
              <v-text-field
                v-model="day.openTime"
                type="time"
                variant="outlined"
                density="compact"
                hide-details
                :disabled="!day.isWorkingDay"
                style="width: 130px"
                dir="ltr"
              />
            </td>
            <td>
              <v-text-field
                v-model="day.closeTime"
                type="time"
                variant="outlined"
                density="compact"
                hide-details
                :disabled="!day.isWorkingDay"
                style="width: 130px"
                dir="ltr"
              />
            </td>
            <td>
              <v-text-field
                v-model="day.breakStart"
                type="time"
                variant="outlined"
                density="compact"
                hide-details
                :disabled="!day.isWorkingDay"
                style="width: 130px"
                dir="ltr"
              />
            </td>
            <td>
              <v-text-field
                v-model="day.breakEnd"
                type="time"
                variant="outlined"
                density="compact"
                hide-details
                :disabled="!day.isWorkingDay"
                style="width: 130px"
                dir="ltr"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-snackbar v-model="snack" color="success" location="bottom end" timeout="2500" rounded="lg">
      <v-icon icon="mdi-check-circle" class="me-2" />
      تم حفظ الجدول بنجاح
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { mockBranches, mockSchedule } from '@/services/mockData'
  import type { DaySchedule } from '@/types'

  definePage({ meta: { layout: 'AdminLayout' } })

  const branchOptions = mockBranches
  const selectedBranchId = ref(1)
  const copyFromBranchId = ref<number | null>(null)
  const saving = ref(false)
  const snack = ref(false)

  // Deep clone schedule
  const schedule = ref<DaySchedule[]>(JSON.parse(JSON.stringify(mockSchedule.schedule)))

  watch(selectedBranchId, () => {
    // In a real app, fetch schedule for selected branch
    schedule.value = JSON.parse(JSON.stringify(mockSchedule.schedule))
  })

  function copySchedule() {
    // Copy times from another branch (simulated)
    schedule.value = JSON.parse(JSON.stringify(mockSchedule.schedule))
    copyFromBranchId.value = null
  }

  async function saveSchedule() {
    saving.value = true
    await new Promise(r => setTimeout(r, 700))
    saving.value = false
    snack.value = true
  }
</script>

<style scoped>
.day-off-row {
  opacity: 0.5;
}
</style>
