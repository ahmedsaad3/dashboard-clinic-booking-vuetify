<template>
  <div>
    <div class="mb-6"><h1 class="text-h5 font-weight-bold">إرسال الإشعارات</h1></div>
    <v-row>
      <v-col cols="12" md="7">
        <v-card rounded="xl" elevation="0" class="pa-6" style="border: 1px solid var(--color-prim-border)">
          <v-form ref="formRef">
            <v-select v-model="form.audienceType" :items="audienceOptions" item-title="label" item-value="value" label="الجمهور المستهدف *" variant="outlined" density="comfortable" class="mb-4" :rules="req" />
            <v-text-field v-model="form.title" label="عنوان الإشعار *" variant="outlined" density="comfortable" class="mb-4" :rules="req" counter="80" />
            <v-textarea v-model="form.body" label="نص الإشعار *" variant="outlined" density="comfortable" rows="4" class="mb-4" :rules="req" />
            <div class="mb-6">
              <div class="text-body-2 font-weight-medium mb-2">قنوات الإرسال</div>
              <div class="d-flex" style="gap:12px">
                <v-checkbox v-model="form.channels" value="fcm" label="Firebase FCM" color="primary" hide-details />
                <v-checkbox v-model="form.channels" value="whatsapp" label="WhatsApp" color="success" hide-details />
              </div>
            </div>
            <v-btn color="secondary" size="large" block rounded="lg" :loading="sending" :disabled="form.channels.length === 0" prepend-icon="mdi-send" @click="send">إرسال</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card v-if="result" rounded="xl" elevation="0" class="pa-6" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">ملخص الإرسال</h2>
          <v-row>
            <v-col cols="4"><div class="text-center"><div class="text-h5 font-weight-bold" style="color: var(--color-secondary-600)">{{ result.total }}</div><div class="text-caption">مستهدف</div></div></v-col>
            <v-col cols="4"><div class="text-center"><div class="text-h5 font-weight-bold" style="color: var(--color-prim-success)">{{ result.success }}</div><div class="text-caption">نجح</div></div></v-col>
            <v-col cols="4"><div class="text-center"><div class="text-h5 font-weight-bold" style="color: var(--color-prim-error)">{{ result.failed }}</div><div class="text-caption">فشل</div></div></v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue'
  definePage({ meta: { layout: 'BranchLayout' } })
  const formRef = ref(); const sending = ref(false); const result = ref<{total:number;success:number;failed:number}|null>(null)
  const req = [(v: unknown) => !!v || 'مطلوب']
  const audienceOptions = [
    { label: 'جميع عملاء الفرع', value: 'all_customers' },
    { label: 'عميل واحد', value: 'single_user' },
    { label: 'مجموعة مخصصة', value: 'custom_group' },
  ]
  const form = reactive({ audienceType: 'all_customers', title: '', body: '', channels: ['fcm'] as string[] })
  async function send() {
    const { valid } = await formRef.value.validate()
    if (!valid || form.channels.length === 0) return
    sending.value = true; await new Promise(r => setTimeout(r, 1200))
    result.value = { total: 142, success: 140, failed: 2 }; sending.value = false
  }
</script>
