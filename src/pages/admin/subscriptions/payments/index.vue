<template>
  <div>
    <div class="mb-6"><h1 class="text-h5 font-weight-bold">الاشتراكات والمدفوعات</h1></div>
    <v-card rounded="xl" elevation="0" class="pa-4 mb-4" style="border: 1px solid var(--color-prim-border)">
      <v-text-field v-model="search" placeholder="بحث..." variant="outlined" density="compact" prepend-inner-icon="mdi-magnify" hide-details rounded="lg" clearable style="max-width:340px" />
    </v-card>
    <v-card rounded="xl" elevation="0" style="border: 1px solid var(--color-prim-border)">
      <v-data-table :headers="headers" :items="payments" :search="search" :items-per-page="10" no-data-text="لا توجد مدفوعات">
        <template #item.amount="{ item }">{{ item.amount.toLocaleString('ar-SA') }} ر.س</template>
        <template #item.status="{ item }">
          <v-chip size="small" :color="{'paid':'success','pending':'warning','failed':'error','refunded':'default'}[item.status]" variant="tonal">
            {{ {'paid':'مدفوع','pending':'معلق','failed':'فشل','refunded':'مُسترد'}[item.status] }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { mockPayments } from '@/services/mockData'
  definePage({ meta: { layout: 'AdminLayout' } })
  const payments = ref([...mockPayments])
  const search = ref('')
  const headers = [
    { title: 'رقم الفاتورة', key: 'invoiceNumber' },
    { title: 'الفرع', key: 'branchName' },
    { title: 'الخطة', key: 'planName' },
    { title: 'المبلغ', key: 'amount' },
    { title: 'الحالة', key: 'status' },
    { title: 'تاريخ الدفع', key: 'paymentDate' },
    { title: 'تاريخ الانتهاء', key: 'expiryDate' },
  ]
</script>
