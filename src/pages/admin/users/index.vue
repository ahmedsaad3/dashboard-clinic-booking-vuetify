<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div>
        <h1 class="text-h5 font-weight-bold">إدارة المستخدمين</h1>
        <p class="text-body-2 mt-1" style="color: var(--color-prim-text-muted)">إدارة حسابات المستخدمين وصلاحياتهم</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-account-plus" rounded="lg" @click="openAdd">
        إضافة مستخدم
      </v-btn>
    </div>

    <!-- Search & Filter -->
    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-row dense>
        <v-col cols="12" sm="5">
          <v-text-field v-model="search" placeholder="بحث بالاسم أو البريد..." variant="outlined" density="compact" prepend-inner-icon="mdi-magnify" hide-details rounded="lg" clearable />
        </v-col>
        <v-col cols="6" sm="3">
          <v-select v-model="filterRole" :items="roleOptions" label="الدور" variant="outlined" density="compact" hide-details rounded="lg" clearable />
        </v-col>
        <v-col cols="6" sm="3">
          <v-select v-model="filterStatus" :items="statusOptions" label="الحالة" variant="outlined" density="compact" hide-details rounded="lg" clearable />
        </v-col>
      </v-row>
    </v-card>

    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-data-table :headers="headers" :items="filteredUsers" :search="search" :items-per-page="10" no-data-text="لا يوجد مستخدمون">
        <template #item.name="{ item }">
          <div class="d-flex align-center" style="gap:10px">
            <v-avatar :image="item.avatar ?? `https://i.pravatar.cc/150?u=${item.id}`" size="34" />
            <div>
              <div class="text-body-2 font-weight-medium">{{ item.name }}</div>
              <div class="text-caption" style="color: var(--color-prim-text-muted)">{{ item.email }}</div>
            </div>
          </div>
        </template>
        <template #item.role="{ item }">
          <v-chip size="small" :color="roleColor(item.role)" variant="tonal">{{ roleLabel(item.role) }}</v-chip>
        </template>
        <template #item.branchName="{ item }">
          <span v-if="item.branchName">{{ item.branchName }}</span>
          <span v-else style="color: var(--color-prim-text-muted)">—</span>
        </template>
        <template #item.status="{ item }">
          <v-chip size="small" :color="item.status === 'active' ? 'success' : 'default'" variant="tonal">
            {{ item.status === 'active' ? 'نشط' : 'غير نشط' }}
          </v-chip>
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex" style="gap:4px">
            <v-btn icon="mdi-pencil-outline" size="small" variant="text" color="primary" @click="openEdit(item)" />
            <v-btn icon="mdi-delete-outline" size="small" variant="text" color="error" @click="doDelete(item.id)" />
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal -->
    <v-dialog v-model="showModal" max-width="560" persistent>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center justify-space-between pa-6 pb-4">
          <span class="text-h6 font-weight-bold">{{ editingUser ? 'تعديل المستخدم' : 'إضافة مستخدم' }}</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showModal = false" />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.name" label="الاسم *" variant="outlined" density="comfortable" :rules="req" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.email" label="البريد الإلكتروني *" variant="outlined" density="comfortable" dir="ltr" :rules="req" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.phone" label="رقم الهاتف *" variant="outlined" density="comfortable" dir="ltr" :rules="req" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="form.role" :items="roleOptions" label="الدور *" variant="outlined" density="comfortable" :rules="req" />
              </v-col>
              <v-col v-if="form.role !== 'SuperAdmin'" cols="12">
                <v-select v-model="form.branchId" :items="mockBranches" item-title="name" item-value="id" label="الفرع" variant="outlined" density="comfortable" clearable />
              </v-col>
            </v-row>
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
    <v-snackbar v-model="snack" color="success" location="bottom end" timeout="2500" rounded="lg">تمت العملية بنجاح</v-snackbar>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, reactive } from 'vue'
  import { mockUsers, mockBranches } from '@/services/mockData'
  import type { SystemUser } from '@/types'

  definePage({ meta: { layout: 'AdminLayout' } })

  const users = ref<SystemUser[]>([...mockUsers])
  const search = ref('')
  const filterRole = ref<string | null>(null)
  const filterStatus = ref<string | null>(null)
  const showModal = ref(false)
  const editingUser = ref<SystemUser | null>(null)
  const saving = ref(false)
  const snack = ref(false)
  const formRef = ref()

  const req = [(v: string) => !!v || 'مطلوب']

  const form = reactive({ name: '', email: '', phone: '', role: 'BranchAdmin', branchId: undefined as number | undefined })

  const roleOptions = [
    { title: 'مدير النظام', value: 'SuperAdmin' },
    { title: 'مدير فرع', value: 'BranchAdmin' },
    { title: 'طبيب', value: 'Doctor' },
  ]
  const statusOptions = [
    { title: 'نشط', value: 'active' },
    { title: 'غير نشط', value: 'inactive' },
  ]

  const headers = [
    { title: 'المستخدم', key: 'name' },
    { title: 'الهاتف', key: 'phone' },
    { title: 'الدور', key: 'role' },
    { title: 'الفرع', key: 'branchName' },
    { title: 'الحالة', key: 'status' },
    { title: 'الإجراءات', key: 'actions', sortable: false },
  ]

  const filteredUsers = computed(() =>
    users.value.filter(u => {
      if (filterRole.value && u.role !== filterRole.value) return false
      if (filterStatus.value && u.status !== filterStatus.value) return false
      return true
    })
  )

  function roleColor(r: string) { return { SuperAdmin: 'primary', BranchAdmin: 'secondary', Doctor: 'success' }[r] ?? 'default' }
  function roleLabel(r: string) { return { SuperAdmin: 'مدير النظام', BranchAdmin: 'مدير فرع', Doctor: 'طبيب' }[r] ?? r }

  function openAdd() { editingUser.value = null; Object.assign(form, { name: '', email: '', phone: '', role: 'BranchAdmin', branchId: undefined }); showModal.value = true }
  function openEdit(u: SystemUser) { editingUser.value = u; Object.assign(form, u); showModal.value = true }

  async function save() {
    const { valid } = await formRef.value.validate()
    if (!valid) return
    saving.value = true
    await new Promise(r => setTimeout(r, 600))
    if (editingUser.value) {
      const idx = users.value.findIndex(u => u.id === editingUser.value!.id)
      if (idx !== -1) users.value[idx] = { ...editingUser.value, ...form } as SystemUser
    } else {
      users.value.unshift({ ...form, id: Date.now(), status: 'active', createdAt: new Date().toISOString().split('T')[0] } as SystemUser)
    }
    saving.value = false; showModal.value = false; snack.value = true
  }

  async function doDelete(id: number) {
    users.value = users.value.filter(u => u.id !== id)
    snack.value = true
  }
</script>
