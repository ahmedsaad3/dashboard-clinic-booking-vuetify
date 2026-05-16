<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div><h1 class="text-h5 font-weight-bold">عروض الفرع</h1></div>
      <v-btn color="secondary" prepend-icon="mdi-plus" rounded="lg" @click="showModal = true">إضافة عرض</v-btn>
    </div>
    <v-row>
      <v-col v-for="offer in offers" :key="offer.id" cols="12" sm="6" lg="4">
        <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border); overflow: hidden">
          <v-img :src="offer.imageUrl ?? 'https://picsum.photos/seed/br/600/200'" height="150" cover>
            <div class="d-flex justify-end pa-2">
              <v-chip size="small" :color="offer.isActive ? 'success' : 'default'" variant="flat">{{ offer.isActive ? 'نشط' : 'غير نشط' }}</v-chip>
            </div>
          </v-img>
          <div class="pa-4">
            <div class="text-body-1 font-weight-bold mb-1">{{ offer.title }}</div>
            <div class="text-caption mb-2" style="color:var(--color-prim-text-muted)">{{ offer.startDate }} — {{ offer.endDate }}</div>
            <div class="d-flex" style="gap:8px">
              <v-btn size="small" variant="outlined" rounded="lg">تعديل</v-btn>
              <v-switch v-model="offer.isActive" color="secondary" density="compact" hide-details inset />
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showModal" max-width="480">
      <v-card rounded="xl" class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <span class="text-h6 font-weight-bold">إضافة عرض</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showModal = false" />
        </div>
        <v-text-field label="العنوان *" variant="outlined" density="comfortable" class="mb-3" />
        <v-textarea label="الوصف" variant="outlined" density="comfortable" rows="2" class="mb-3" />
        <v-row dense>
          <v-col cols="6"><v-text-field label="تاريخ البدء" type="date" variant="outlined" density="comfortable" dir="ltr" /></v-col>
          <v-col cols="6"><v-text-field label="تاريخ الانتهاء" type="date" variant="outlined" density="comfortable" dir="ltr" /></v-col>
        </v-row>
        <div class="d-flex justify-end mt-4" style="gap:8px">
          <v-btn variant="outlined" rounded="lg" @click="showModal = false">إلغاء</v-btn>
          <v-btn color="secondary" variant="flat" rounded="lg" @click="showModal = false">حفظ</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { mockOffers } from '@/services/mockData'
  definePage({ meta: { layout: 'BranchLayout' } })
  const offers = ref(mockOffers.filter(o => o.branchId === 1 || !o.branchId).map(o => ({ ...o })))
  const showModal = ref(false)
</script>
