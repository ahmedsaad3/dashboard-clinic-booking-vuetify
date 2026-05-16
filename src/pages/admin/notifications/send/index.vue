<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap" style="gap:12px">
      <div>
        <h1 class="text-h5 font-weight-bold">إرسال الإشعارات</h1>
        <p class="text-body-2 mt-1" style="color: var(--color-prim-text-muted)">إرسال إشعارات عبر Firebase FCM أو WhatsApp</p>
      </div>
    </div>

    <v-row>
      <v-col cols="12" md="7">
        <v-card rounded="xl" elevation="0" class="pa-6" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-6">تفاصيل الإشعار</h2>

          <v-form ref="formRef">
            <!-- Audience -->
            <v-select
              v-model="form.audienceType"
              :items="audienceOptions"
              item-title="label"
              item-value="value"
              label="الجمهور المستهدف *"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-account-group-outline"
              class="mb-4"
              :rules="req"
            />

            <!-- Specific branch/user -->
            <v-select
              v-if="form.audienceType === 'branch'"
              v-model="form.branchId"
              :items="mockBranches"
              item-title="name"
              item-value="id"
              label="اختر الفرع *"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :rules="req"
            />

            <!-- Title -->
            <v-text-field
              v-model="form.title"
              label="عنوان الإشعار *"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :rules="req"
              counter="80"
            />

            <!-- Body -->
            <v-textarea
              v-model="form.body"
              label="نص الإشعار *"
              variant="outlined"
              density="comfortable"
              rows="4"
              class="mb-4"
              :rules="req"
              counter="300"
            />

            <!-- Extra Data -->
            <v-textarea
              v-model="form.extraData"
              label="بيانات إضافية (JSON اختياري)"
              variant="outlined"
              density="comfortable"
              rows="2"
              class="mb-4"
              dir="ltr"
              placeholder='{"screen": "booking", "id": 123}'
            />

            <!-- Channels -->
            <div class="mb-6">
              <div class="text-body-2 font-weight-medium mb-2">قنوات الإرسال *</div>
              <div class="d-flex" style="gap: 12px">
                <v-checkbox
                  v-model="form.channels"
                  value="fcm"
                  label="Firebase FCM"
                  color="primary"
                  hide-details
                />
                <v-checkbox
                  v-model="form.channels"
                  value="whatsapp"
                  label="WhatsApp"
                  color="success"
                  hide-details
                />
              </div>
            </div>

            <v-btn
              color="primary"
              size="large"
              block
              rounded="lg"
              :loading="sending"
              :disabled="form.channels.length === 0"
              prepend-icon="mdi-send"
              @click="sendNotification"
            >
              إرسال الإشعار
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <!-- Preview & Summary -->
      <v-col cols="12" md="5">
        <!-- Preview Card -->
        <v-card rounded="xl" elevation="0" class="pa-6 mb-4" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">معاينة الإشعار</h2>
          <div class="notif-preview pa-4">
            <div class="d-flex align-center mb-2" style="gap: 8px">
              <v-avatar color="primary" size="28">
                <v-icon icon="mdi-hospital-building" size="16" color="white" />
              </v-avatar>
              <span class="text-caption font-weight-bold">نظام العيادات</span>
              <span class="text-caption" style="color: var(--color-prim-text-muted)">الآن</span>
            </div>
            <div class="text-body-2 font-weight-bold mb-1">{{ form.title || 'عنوان الإشعار' }}</div>
            <div class="text-caption" style="color: var(--color-prim-text-muted)">{{ form.body || 'نص الإشعار سيظهر هنا...' }}</div>
          </div>
        </v-card>

        <!-- Result Summary (after send) -->
        <v-card v-if="result" rounded="xl" elevation="0" class="pa-6" style="border: 1px solid var(--color-prim-border)">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">
            <v-icon icon="mdi-chart-bar" class="me-2" color="primary" />
            ملخص الإرسال
          </h2>
          <v-row>
            <v-col cols="4">
              <div class="text-center">
                <div class="text-h5 font-weight-bold" style="color: var(--color-primary-600)">{{ result.total }}</div>
                <div class="text-caption">مستهدف</div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="text-center">
                <div class="text-h5 font-weight-bold" style="color: var(--color-prim-success)">{{ result.success }}</div>
                <div class="text-caption">نجح</div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="text-center">
                <div class="text-h5 font-weight-bold" style="color: var(--color-prim-error)">{{ result.failed }}</div>
                <div class="text-caption">فشل</div>
              </div>
            </v-col>
          </v-row>
          <v-progress-linear
            :model-value="(result.success / result.total) * 100"
            color="success"
            height="8"
            rounded
            class="mt-4"
          />
          <div class="text-caption text-center mt-2" style="color: var(--color-prim-text-muted)">
            نسبة النجاح: {{ Math.round((result.success / result.total) * 100) }}%
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { mockBranches } from '@/services/mockData'

  definePage({ meta: { layout: 'AdminLayout' } })

  const formRef = ref()
  const sending = ref(false)
  const result = ref<{ total: number; success: number; failed: number } | null>(null)
  const req = [(v: unknown) => !!v || 'مطلوب']

  const audienceOptions = [
    { label: 'مستخدم واحد', value: 'single_user' },
    { label: 'فرع محدد', value: 'branch' },
    { label: 'جميع المستخدمين', value: 'all_users' },
    { label: 'جميع الفروع', value: 'all_branches' },
    { label: 'جميع العملاء', value: 'all_customers' },
    { label: 'مجموعة مخصصة', value: 'custom_group' },
  ]

  const audienceCounts: Record<string, number> = {
    single_user: 1, branch: 320, all_users: 45,
    all_branches: 1400, all_customers: 1284, custom_group: 230,
  }

  const form = reactive({
    audienceType: 'all_customers',
    branchId: null as number | null,
    title: '',
    body: '',
    extraData: '',
    channels: ['fcm'] as string[],
  })

  async function sendNotification() {
    const { valid } = await formRef.value.validate()
    if (!valid || form.channels.length === 0) return

    sending.value = true
    await new Promise(r => setTimeout(r, 1200))

    const total = audienceCounts[form.audienceType] ?? 100
    const failed = Math.floor(total * 0.01)
    result.value = { total, success: total - failed, failed }
    sending.value = false
  }
</script>

<style scoped>
.notif-preview {
  background: var(--color-prim-bg);
  border: 1px solid var(--color-prim-border);
  border-radius: 12px;
}
</style>
