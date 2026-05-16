<template>
  <v-dialog :model-value="dialog" max-width="560" persistent>
    <v-card rounded="xl" class="pa-2">
      <v-card-title class="d-flex align-center pt-4 pb-2 px-6">
        <v-icon icon="mdi-alert-circle-outline" color="error" class="me-3" />
        <span>{{ title }}</span>
        <v-spacer />
        <v-btn icon="mdi-close" variant="text" size="small" @click="emit('cancel')" />
      </v-card-title>

      <v-card-text class="px-6 pb-2">
        <p style="color: var(--color-prim-text-muted)">{{ message }}</p>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn variant="outlined" rounded="lg" @click="emit('cancel')">إلغاء</v-btn>
        <v-btn
          color="error"
          variant="flat"
          rounded="lg"
          :loading="loading"
          @click="emit('confirm')"
        >
          <v-icon start icon="mdi-delete-outline" />
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{
    dialog: boolean
    title?: string
    message?: string
    confirmText?: string
    loading?: boolean
  }>(), {
    title: 'تأكيد الحذف',
    message: 'هل أنت متأكد من هذا الإجراء؟ لا يمكن التراجع عنه.',
    confirmText: 'حذف',
    loading: false,
  })

  const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
  }>()
</script>
