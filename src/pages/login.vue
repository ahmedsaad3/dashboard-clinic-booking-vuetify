<template>
  <v-card class="login-card pa-8" rounded="xl" elevation="0">
    <!-- Title -->
    <div class="text-center mb-8">
      <h2 class="text-h6 font-weight-bold mb-1">تسجيل الدخول</h2>
      <p class="text-body-2" style="color: var(--color-prim-text-muted)">
        أدخل بياناتك للوصول إلى لوحة التحكم
      </p>
    </div>

    <!-- Demo Accounts -->
    <div class="demo-accounts mb-6">
      <p class="text-caption font-weight-bold mb-2" style="color: var(--color-prim-text-muted)">
        حسابات تجريبية:
      </p>
      <div class="d-flex flex-column gap-2">
        <v-chip
          v-for="u in demoUsers"
          :key="u.email"
          size="small"
          variant="tonal"
          :color="u.color"
          class="cursor-pointer justify-start"
          style="width: 100%"
          @click="fillDemo(u)"
        >
          <v-icon start :icon="u.icon" />
          {{ u.label }} — {{ u.email }}
        </v-chip>
      </div>
    </div>

    <!-- Form -->
    <v-form ref="formRef" @submit.prevent="handleSubmit">
      <!-- Error alert -->
      <v-alert
        v-if="auth.loginError"
        type="error"
        variant="tonal"
        border="start"
        class="mb-4"
        density="compact"
        :text="auth.loginError"
        closable
      />

      <v-text-field
        v-model="form.email"
        label="البريد الإلكتروني"
        type="email"
        variant="outlined"
        density="comfortable"
        color="primary"
        prepend-inner-icon="mdi-email-outline"
        placeholder="example@clinic.sa"
        :rules="emailRules"
        class="mb-3"
        autocomplete="email"
        dir="ltr"
      />

      <v-text-field
        v-model="form.password"
        label="كلمة المرور"
        :type="showPassword ? 'text' : 'password'"
        variant="outlined"
        density="comfortable"
        color="primary"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        :rules="passwordRules"
        class="mb-6"
        autocomplete="current-password"
        dir="ltr"
        @click:append-inner="showPassword = !showPassword"
      />

      <v-btn
        type="submit"
        color="primary"
        size="large"
        block
        rounded="lg"
        :loading="auth.isLoading"
        elevation="0"
        class="mb-4"
      >
        <v-icon start icon="mdi-login" />
        تسجيل الدخول
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  definePage({
    meta: { layout: 'AuthLayout', requiresAuth: false },
  })

  const auth = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  const formRef = ref()
  const showPassword = ref(false)

  const form = reactive({
    email: '',
    password: '',
  })

  const demoUsers = [
    { label: 'مدير النظام', email: 'super@clinic.sa', password: '123456', color: 'primary', icon: 'mdi-shield-crown-outline' },
    { label: 'مدير فرع', email: 'admin@clinic.sa', password: '123456', color: 'secondary', icon: 'mdi-store-outline' },
    { label: 'طبيب', email: 'doctor@clinic.sa', password: '123456', color: 'success', icon: 'mdi-doctor' },
  ]

  const emailRules = [
    (v: string) => !!v || 'البريد الإلكتروني مطلوب',
    (v: string) => /.+@.+\..+/.test(v) || 'بريد إلكتروني غير صحيح',
  ]

  const passwordRules = [
    (v: string) => !!v || 'كلمة المرور مطلوبة',
    (v: string) => v.length >= 6 || 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
  ]

  function fillDemo(user: { email: string; password: string }) {
    form.email = user.email
    form.password = user.password
  }

  async function handleSubmit() {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    const success = await auth.login({ email: form.email, password: form.password })
    if (success) {
      const redirect = (route.query.redirect as string) || auth.defaultRoute
      router.push(redirect)
    }
  }
</script>

<style scoped>
.login-card {
  background: white;
  border: 1px solid var(--color-prim-border);
  box-shadow: var(--shadow-prim-xl) !important;
}

.demo-accounts {
  background: var(--color-primary-50);
  border: 1px solid var(--color-primary-100);
  border-radius: 12px;
  padding: 12px 16px;
}

.gap-2 {
  gap: 8px;
}
</style>
