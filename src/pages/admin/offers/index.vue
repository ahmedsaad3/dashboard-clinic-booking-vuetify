<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div>
        <h1 class="text-h5 font-weight-bold">العروض</h1>
        <p class="text-body-2 mt-1" style="color: var(--color-prim-text-muted)">إدارة العروض والتخفيضات للفروع</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded="lg" @click="openAdd">إضافة عرض</v-btn>
    </div>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-row dense>
        <v-col cols="12" sm="5">
          <v-text-field v-model="search" placeholder="بحث..." variant="outlined" density="compact" prepend-inner-icon="mdi-magnify" hide-details rounded="lg" clearable />
        </v-col>
        <v-col cols="6" sm="3">
          <v-select v-model="filterActive" :items="[{title:'نشط', value:true},{title:'غير نشط', value:false}]" label="الحالة" variant="outlined" density="compact" hide-details rounded="lg" clearable />
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col v-for="offer in filteredOffers" :key="offer.id" cols="12" sm="6" lg="4">
        <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border); overflow: hidden">
          <v-img :src="offer.imageUrl ?? 'https://picsum.photos/seed/default/600/200'" height="160" cover>
            <div class="d-flex justify-end pa-2">
              <v-chip size="small" :color="offer.isActive ? 'success' : 'default'" variant="flat">
                {{ offer.isActive ? 'نشط' : 'غير نشط' }}
              </v-chip>
            </div>
          </v-img>
          <div class="pa-4">
            <div class="text-body-1 font-weight-bold mb-1">{{ offer.title }}</div>
            <div class="text-caption mb-2" style="color: var(--color-prim-text-muted)">{{ offer.description }}</div>
            <div class="d-flex align-center justify-space-between">
              <v-chip size="x-small" color="secondary" variant="tonal">{{ offer.actionType }}</v-chip>
              <span class="text-caption" style="color: var(--color-prim-text-muted)">{{ offer.startDate }} — {{ offer.endDate }}</span>
            </div>
            <div class="d-flex mt-3" style="gap: 8px">
              <v-btn size="small" variant="outlined" rounded="lg" prepend-icon="mdi-pencil" @click="openEdit(offer)">تعديل</v-btn>
              <v-btn size="small" variant="text" color="error" icon="mdi-delete-outline" @click="doDelete(offer.id)" />
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Modal -->
    <v-dialog v-model="showModal" max-width="600" persistent scrollable>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center justify-space-between pa-6 pb-4">
          <span class="text-h6 font-weight-bold">{{ editingOffer ? 'تعديل العرض' : 'إضافة عرض' }}</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showModal = false" />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-form ref="formRef">
            <v-text-field v-model="form.title" label="العنوان *" variant="outlined" density="comfortable" class="mb-3" :rules="req" />
            <v-textarea v-model="form.description" label="الوصف" variant="outlined" density="comfortable" rows="2" class="mb-3" />
            <v-select v-model="form.actionType" :items="['NavigateToBranch','ShowOnly','ExternalLink']" label="نوع الإجراء *" variant="outlined" density="comfortable" class="mb-3" :rules="req" />
            <v-select v-model="form.branchId" :items="mockBranches" item-title="name" item-value="id" label="الفرع (فارغ = للجميع)" variant="outlined" density="comfortable" class="mb-3" clearable />
            <v-row dense>
              <v-col cols="6">
                <v-text-field v-model="form.startDate" label="تاريخ البدء *" type="date" variant="outlined" density="comfortable" dir="ltr" :rules="req" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.endDate" label="تاريخ الانتهاء *" type="date" variant="outlined" density="comfortable" dir="ltr" :rules="req" />
              </v-col>
            </v-row>
            <v-switch v-model="form.isActive" label="تفعيل العرض" color="primary" inset />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6 pt-4">
          <v-spacer />
          <v-btn variant="outlined" rounded="lg" @click="showModal = false">إلغاء</v-btn>
          <v-btn color="primary" variant="flat" rounded="lg" :loading="saving" @click="save">حفظ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snack" color="success" location="bottom end" timeout="2000" rounded="lg">تمت العملية</v-snackbar>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, reactive } from 'vue'
  import { mockOffers, mockBranches } from '@/services/mockData'
  import type { Offer } from '@/types'

  definePage({ meta: { layout: 'AdminLayout' } })

  const offers = ref<Offer[]>([...mockOffers])
  const search = ref('')
  const filterActive = ref<boolean | null>(null)
  const showModal = ref(false)
  const editingOffer = ref<Offer | null>(null)
  const saving = ref(false)
  const snack = ref(false)
  const formRef = ref()
  const req = [(v: unknown) => !!v || 'مطلوب']

  const form = reactive({ title: '', description: '', actionType: 'ShowOnly', branchId: null as number | null, startDate: '', endDate: '', isActive: true })

  const filteredOffers = computed(() =>
    offers.value.filter(o => {
      if (filterActive.value !== null && o.isActive !== filterActive.value) return false
      if (search.value && !o.title.includes(search.value)) return false
      return true
    })
  )

  function openAdd() { editingOffer.value = null; Object.assign(form, { title: '', description: '', actionType: 'ShowOnly', branchId: null, startDate: '', endDate: '', isActive: true }); showModal.value = true }
  function openEdit(o: Offer) { editingOffer.value = o; Object.assign(form, o); showModal.value = true }

  async function save() {
    const { valid } = await formRef.value.validate()
    if (!valid) return
    saving.value = true
    await new Promise(r => setTimeout(r, 600))
    if (editingOffer.value) {
      const idx = offers.value.findIndex(o => o.id === editingOffer.value!.id)
      if (idx !== -1) offers.value[idx] = { ...editingOffer.value, ...form } as Offer
    } else {
      offers.value.unshift({ ...form, id: Date.now(), createdAt: new Date().toISOString() } as Offer)
    }
    saving.value = false; showModal.value = false; snack.value = true
  }

  function doDelete(id: number) { offers.value = offers.value.filter(o => o.id !== id); snack.value = true }
</script>
