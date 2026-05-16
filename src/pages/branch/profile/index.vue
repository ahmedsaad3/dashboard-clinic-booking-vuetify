<template>
  <div>
    <div class="mb-6"><h1 class="text-h5 font-weight-bold">الملف الشخصي والإعدادات</h1></div>
    <v-row>
      <v-col cols="12" md="5">
        <v-card rounded="xl" elevation="0" class="pa-6 mb-4" style="border: 1px solid var(--color-prim-border)">
          <div class="text-center mb-6">
            <v-avatar :image="auth.user?.avatar" size="80" class="mb-3" />
            <div class="text-h6 font-weight-bold">{{ auth.user?.name }}</div>
            <div class="text-body-2" style="color: var(--color-prim-text-muted)">{{ auth.user?.email }}</div>
            <v-chip size="small" color="secondary" variant="tonal" class="mt-2">
              {{ auth.user?.role === 'Doctor' ? 'طبيب' : 'مدير فرع' }}
            </v-chip>
          </div>

          <v-text-field label="الاسم الكامل" :model-value="auth.user?.name" variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field label="البريد الإلكتروني" :model-value="auth.user?.email" variant="outlined" density="comfortable" dir="ltr" class="mb-3" />
          <v-text-field label="رقم الهاتف" variant="outlined" density="comfortable" dir="ltr" class="mb-4" />
          <v-file-input label="تحديث صورة الملف الشخصي" variant="outlined" density="comfortable" accept="image/*" prepend-icon="" prepend-inner-icon="mdi-camera-outline" class="mb-4" />
          <v-btn color="secondary" variant="flat" block rounded="lg">حفظ التغييرات</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="7">
        <!-- Subscription Info -->
        <v-card rounded="xl" elevation="0" class="pa-6 mb-4" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">معلومات الاشتراك</h2>
          <div class="d-flex align-center justify-space-between pa-4 mb-4" style="background: var(--color-primary-50); border-radius: 12px; border: 1px solid var(--color-primary-100)">
            <div>
              <div class="text-body-2 font-weight-bold">الخطة الاحترافية</div>
              <div class="text-caption" style="color: var(--color-prim-text-muted)">تنتهي في: 2026/12/31</div>
            </div>
            <v-chip color="success" variant="tonal" prepend-icon="mdi-check-circle">نشط</v-chip>
          </div>
          <v-btn color="primary" variant="tonal" block rounded="lg" prepend-icon="mdi-calendar-plus">
            طلب تمديد الاشتراك
          </v-btn>
        </v-card>

        <!-- Change Password -->
        <v-card rounded="xl" elevation="0" class="pa-6" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">تغيير كلمة المرور</h2>
          <v-text-field label="كلمة المرور الحالية" type="password" variant="outlined" density="comfortable" class="mb-3" dir="ltr" />
          <v-text-field label="كلمة المرور الجديدة" type="password" variant="outlined" density="comfortable" class="mb-3" dir="ltr" />
          <v-text-field label="تأكيد كلمة المرور الجديدة" type="password" variant="outlined" density="comfortable" class="mb-4" dir="ltr" />
          <v-btn color="error" variant="tonal" block rounded="lg" prepend-icon="mdi-lock-reset">
            تغيير كلمة المرور
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  definePage({ meta: { layout: 'BranchLayout' } })
  const auth = useAuthStore()
</script>
