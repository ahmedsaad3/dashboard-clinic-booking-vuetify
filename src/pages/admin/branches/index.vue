<template>
  <div>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap: 12px">
      <div>
        <h1 class="text-h5 font-weight-bold">إدارة الفروع</h1>
        <p class="text-body-2 mt-1" style="color: var(--color-prim-text-muted)">إدارة جميع فروع العيادات وبياناتها</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded="lg" @click="openAdd">
        إضافة فرع جديد
      </v-btn>
    </div>

    <!-- Filters -->
    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-row dense>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="search"
            placeholder="بحث بالاسم أو الهاتف..."
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            hide-details
            rounded="lg"
            clearable
          />
        </v-col>
        <v-col cols="6" sm="3" md="2">
          <v-select
            v-model="filterStatus"
            :items="statusOptions"
            label="الحالة"
            variant="outlined"
            density="compact"
            hide-details
            rounded="lg"
            clearable
          />
        </v-col>
        <v-col cols="6" sm="3" md="3">
          <v-select
            v-model="filterCategory"
            :items="categoryOptions"
            label="الفئة"
            variant="outlined"
            density="compact"
            hide-details
            rounded="lg"
            clearable
          />
        </v-col>
      </v-row>
    </v-card>

    <!-- Data Table -->
    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-data-table
        :headers="headers"
        :items="filteredBranches"
        :search="search"
        :items-per-page="10"
        class="clinic-table"
        no-data-text="لا توجد فروع"
        items-per-page-text="عدد الصفوف:"
      >
        <!-- Name column -->
        <template #item.name="{ item }">
          <div class="d-flex align-center" style="gap: 10px">
            <v-avatar :image="item.imageUrl" size="36" rounded="lg" color="primary">
              <v-icon v-if="!item.imageUrl" icon="mdi-store" color="white" size="20" />
            </v-avatar>
            <div>
              <div class="text-body-2 font-weight-medium">{{ item.name }}</div>
              <div class="text-caption" style="color: var(--color-prim-text-muted)">{{ item.address }}</div>
            </div>
          </div>
        </template>

        <!-- Category -->
        <template #item.category="{ item }">
          <v-chip size="small" color="secondary" variant="tonal">{{ item.category }}</v-chip>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <v-chip
            size="small"
            :color="statusColor(item.status)"
            variant="tonal"
          >
            <v-icon start size="10" icon="mdi-circle" />
            {{ statusLabel(item.status) }}
          </v-chip>
        </template>

        <!-- Expiry -->
        <template #item.subscriptionExpiry="{ item }">
          <span :class="isExpired(item.subscriptionExpiry) ? 'text-error' : ''">
            {{ formatDate(item.subscriptionExpiry) }}
          </span>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <div class="d-flex" style="gap: 4px">
            <v-tooltip text="تعديل" location="top">
              <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-pencil-outline" size="small" variant="text" color="primary" @click="openEdit(item)" />
              </template>
            </v-tooltip>
            <v-tooltip text="إدارة المستخدمين" location="top">
              <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-account-cog-outline" size="small" variant="text" color="secondary" />
              </template>
            </v-tooltip>
            <v-tooltip text="حذف" location="top">
              <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-delete-outline" size="small" variant="text" color="error" @click="confirmDelete(item)" />
              </template>
            </v-tooltip>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Modal -->
    <v-dialog v-model="showModal" max-width="640" persistent scrollable>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center justify-space-between pa-6 pb-4">
          <span class="text-h6 font-weight-bold">{{ editingBranch ? 'تعديل الفرع' : 'إضافة فرع جديد' }}</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="closeModal" />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-6">
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.name" label="اسم الفرع *" variant="outlined" density="comfortable" :rules="requiredRules" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.phone" label="رقم الهاتف *" variant="outlined" density="comfortable" dir="ltr" :rules="requiredRules" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.address" label="العنوان *" variant="outlined" density="comfortable" :rules="requiredRules" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.category"
                  :items="categoryOptions"
                  label="الفئة *"
                  variant="outlined"
                  density="comfortable"
                  :rules="requiredRules"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.parentBranchId"
                  :items="parentOptions"
                  item-title="name"
                  item-value="id"
                  label="الفرع الأب (اختياري)"
                  variant="outlined"
                  density="comfortable"
                  clearable
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.latitude" label="خط العرض (اختياري)" variant="outlined" density="comfortable" type="number" dir="ltr" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.longitude" label="خط الطول (اختياري)" variant="outlined" density="comfortable" type="number" dir="ltr" />
              </v-col>
              <v-col cols="12">
                <v-file-input
                  label="صورة الفرع (اختياري)"
                  variant="outlined"
                  density="comfortable"
                  accept="image/*"
                  prepend-icon=""
                  prepend-inner-icon="mdi-image-outline"
                  @change="handleImageUpload"
                />
                <div v-if="imagePreview" class="mt-2">
                  <v-img :src="imagePreview" height="120" rounded="lg" cover />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-6 pt-4">
          <v-spacer />
          <v-btn variant="outlined" rounded="lg" @click="closeModal">إلغاء</v-btn>
          <v-btn color="primary" variant="flat" rounded="lg" :loading="saving" @click="saveBranch">
            <v-icon start icon="mdi-content-save-outline" />
            {{ editingBranch ? 'حفظ التعديلات' : 'إضافة الفرع' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirm Delete -->
    <AppConfirmDialog
      :dialog="showDeleteDialog"
      :message="`هل تريد حذف فرع '${deletingBranch?.name}'؟ سيتم حذف جميع بياناته.`"
      :loading="deleting"
      @confirm="doDelete"
      @cancel="showDeleteDialog = false"
    />

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="bottom end" rounded="lg" timeout="3000">
      <v-icon :icon="snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" class="me-2" />
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, reactive } from 'vue'
  import { mockBranches } from '@/services/mockData'
  import type { Branch, BranchCategory, BranchStatus } from '@/types'

  definePage({ meta: { layout: 'AdminLayout' } })

  // State
  const branches = ref<Branch[]>([...mockBranches])
  const search = ref('')
  const filterStatus = ref<string | null>(null)
  const filterCategory = ref<string | null>(null)
  const showModal = ref(false)
  const showDeleteDialog = ref(false)
  const editingBranch = ref<Branch | null>(null)
  const deletingBranch = ref<Branch | null>(null)
  const saving = ref(false)
  const deleting = ref(false)
  const formRef = ref()
  const imagePreview = ref<string | null>(null)

  const snackbar = reactive({ show: false, text: '', color: 'success' })

  const emptyForm = (): Omit<Branch, 'id' | 'createdAt'> => ({
    name: '', phone: '', address: '',
    category: '' as BranchCategory,
    status: 'active' as BranchStatus,
    subscriptionExpiry: '2026-12-31',
  })

  const form = reactive(emptyForm())

  // Options
  const statusOptions = [
    { title: 'نشط', value: 'active' },
    { title: 'منتهي الاشتراك', value: 'expired' },
    { title: 'موقوف', value: 'suspended' },
  ]
  const categoryOptions = ['عيادة عامة', 'أسنان', 'عيون', 'جلدية', 'أطفال', 'قلب', 'أعصاب', 'نساء وتوليد']
  const parentOptions = computed(() => branches.value.filter(b => !editingBranch.value || b.id !== editingBranch.value.id))

  const requiredRules = [(v: string) => !!v || 'هذا الحقل مطلوب']

  // Table headers
  const headers = [
    { title: 'الفرع', key: 'name', sortable: true },
    { title: 'الهاتف', key: 'phone', sortable: false },
    { title: 'الفئة', key: 'category', sortable: true },
    { title: 'انتهاء الاشتراك', key: 'subscriptionExpiry', sortable: true },
    { title: 'الحالة', key: 'status', sortable: true },
    { title: 'الإجراءات', key: 'actions', sortable: false, align: 'center' as const },
  ]

  // Computed
  const filteredBranches = computed(() =>
    branches.value.filter(b => {
      if (filterStatus.value && b.status !== filterStatus.value) return false
      if (filterCategory.value && b.category !== filterCategory.value) return false
      return true
    })
  )

  // Helpers
  function statusColor(status: string) {
    return { active: 'success', expired: 'error', suspended: 'warning' }[status] ?? 'default'
  }
  function statusLabel(status: string) {
    return { active: 'نشط', expired: 'منتهي', suspended: 'موقوف' }[status] ?? status
  }
  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  function isExpired(d: string) {
    return new Date(d) < new Date()
  }

  // Modal
  function openAdd() {
    editingBranch.value = null
    imagePreview.value = null
    Object.assign(form, emptyForm())
    showModal.value = true
  }

  function openEdit(branch: Branch) {
    editingBranch.value = branch
    Object.assign(form, { ...branch })
    imagePreview.value = branch.imageUrl ?? null
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
    formRef.value?.reset()
    imagePreview.value = null
  }

  function handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) imagePreview.value = URL.createObjectURL(file)
  }

  async function saveBranch() {
    const { valid } = await formRef.value.validate()
    if (!valid) return
    saving.value = true
    await new Promise(r => setTimeout(r, 700))

    if (editingBranch.value) {
      const idx = branches.value.findIndex(b => b.id === editingBranch.value!.id)
      if (idx !== -1) branches.value[idx] = { ...editingBranch.value, ...form }
      showSnack('تم تحديث الفرع بنجاح')
    } else {
      branches.value.unshift({
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
      } as Branch)
      showSnack('تم إضافة الفرع بنجاح')
    }

    saving.value = false
    closeModal()
  }

  // Delete
  function confirmDelete(branch: Branch) {
    deletingBranch.value = branch
    showDeleteDialog.value = true
  }

  async function doDelete() {
    deleting.value = true
    await new Promise(r => setTimeout(r, 600))
    branches.value = branches.value.filter(b => b.id !== deletingBranch.value!.id)
    showDeleteDialog.value = false
    deleting.value = false
    showSnack('تم حذف الفرع بنجاح')
  }

  function showSnack(text: string, color = 'success') {
    snackbar.text = text
    snackbar.color = color
    snackbar.show = true
  }
</script>

<style scoped>
.clinic-table :deep(.v-data-table-header__content) {
  font-weight: 700;
  color: var(--color-prim-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
