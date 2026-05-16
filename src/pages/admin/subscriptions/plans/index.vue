<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div><h1 class="text-h5 font-weight-bold">خطط الاشتراك</h1></div>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded="lg" @click="showModal = true">إضافة خطة</v-btn>
    </div>
    <v-row>
      <v-col v-for="plan in plans" :key="plan.id" cols="12" sm="6" lg="4">
        <v-card rounded="xl" elevation="0" class="pa-6 h-100" :style="`border: 2px solid ${plan.id === 2 ? 'var(--color-primary-400)' : 'var(--color-prim-border)'}`">
          <div class="d-flex align-center justify-space-between mb-2">
            <div class="text-h6 font-weight-bold">{{ plan.name }}</div>
            <v-chip v-if="plan.id === 2" size="small" color="primary" variant="flat">الأكثر شيوعاً</v-chip>
          </div>
          <div class="text-h4 font-weight-bold mb-1" style="color: var(--color-primary-600)">
            {{ plan.price.toLocaleString('ar-SA') }}
            <span class="text-body-2 font-weight-regular">ر.س/شهر</span>
          </div>
          <v-divider class="my-3" />
          <div v-for="f in plan.features" :key="f" class="d-flex align-center mb-2" style="gap:8px">
            <v-icon icon="mdi-check-circle" color="primary" size="18" />
            <span class="text-body-2">{{ f }}</span>
          </div>
          <div class="d-flex mt-4" style="gap:8px">
            <v-btn variant="outlined" size="small" rounded="lg">تعديل</v-btn>
            <v-switch v-model="plan.isActive" color="primary" density="compact" hide-details inset :label="plan.isActive ? 'نشط' : 'موقوف'" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showModal" max-width="480">
      <v-card rounded="xl" class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <span class="text-h6 font-weight-bold">إضافة خطة جديدة</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showModal = false" />
        </div>
        <v-text-field label="اسم الخطة" variant="outlined" density="comfortable" class="mb-3" />
        <v-text-field label="السعر (ر.س/شهر)" type="number" variant="outlined" density="comfortable" dir="ltr" class="mb-3" />
        <v-text-field label="الحد الأقصى للفروع" type="number" variant="outlined" density="comfortable" dir="ltr" class="mb-3" />
        <v-text-field label="الحد الأقصى للمستخدمين" type="number" variant="outlined" density="comfortable" dir="ltr" class="mb-4" />
        <div class="d-flex justify-end" style="gap:8px">
          <v-btn variant="outlined" rounded="lg" @click="showModal = false">إلغاء</v-btn>
          <v-btn color="primary" variant="flat" rounded="lg" @click="showModal = false">حفظ</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { mockPlans } from '@/services/mockData'
  definePage({ meta: { layout: 'AdminLayout' } })
  const plans = ref([...mockPlans])
  const showModal = ref(false)
</script>
