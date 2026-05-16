<template>
  <div>
    <div class="mb-6"><h1 class="text-h5 font-weight-bold">الإعدادات</h1></div>
    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-6 mb-4" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">إعدادات النظام</h2>
          <v-text-field label="اسم النظام" value="نظام إدارة العيادات" variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field label="البريد الإلكتروني للدعم" value="support@clinic.sa" variant="outlined" density="comfortable" dir="ltr" class="mb-3" />
          <v-select label="اللغة الافتراضية" :items="['العربية','English']" value="العربية" variant="outlined" density="comfortable" class="mb-3" />
          <v-btn color="primary" variant="flat" rounded="lg">حفظ الإعدادات</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-6" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">إعدادات الإشعارات</h2>
          <v-switch label="تفعيل Firebase FCM" color="primary" inset model-value />
          <v-switch label="تفعيل WhatsApp" color="success" inset model-value />
          <v-text-field label="FCM Server Key" variant="outlined" density="comfortable" dir="ltr" placeholder="AAAAxxxxx..." type="password" class="mb-3" />
          <v-text-field label="WhatsApp API Token" variant="outlined" density="comfortable" dir="ltr" type="password" class="mb-3" />
          <v-btn color="primary" variant="flat" rounded="lg">حفظ</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
  definePage({ meta: { layout: 'AdminLayout' } })
</script>
