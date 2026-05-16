<template>
  <v-container class="py-10" dir="rtl">
    <!-- العناوين والخطوط -->
    <section class="mb-12">
      <h1 class="text-h3 font-weight-bold mb-4" style="color: var(--color-primary-600)">عرض تصميم النظام</h1>
      <p class="text-body-1 mb-6" style="color: var(--color-prim-text-muted)">
        توضح هذه الصفحة المكونات المصممة باستخدام رموز التصميم الخاصة بالعيادة (OKLCH) وباللغة العربية.
      </p>
      
      <v-card class="pa-6 border" style="border-color: var(--color-prim-border) !important; background: var(--color-prim-bg-surface)">
        <div class="d-flex flex-column gap-4">
          <div>
            <span class="text-caption text-uppercase font-weight-bold" style="color: var(--color-primary-400)">الخط الأساسي: Alexandria</span>
            <div class="text-h4 mt-1">نص تجريبي للتحقق من جودة الخط العربي وتناسقه.</div>
          </div>
          <v-divider class="my-4"></v-divider>
          <div>
            <span class="text-caption text-uppercase font-weight-bold" style="color: var(--color-secondary-400)">خط الأكواد: JetBrains Mono</span>
            <div class="mt-1" style="font-family: var(--font-prim-mono); font-size: 1.1rem;" dir="ltr">
              const medicalRecord = { id: 'MR-782', status: 'completed' };
            </div>
          </div>
        </div>
      </v-card>
    </section>

    <!-- الأزرار -->
    <section class="mb-12">
      <h2 class="text-h5 font-weight-bold mb-6">الأزرار</h2>
      <div class="d-flex flex-wrap gap-4 align-center">
        <v-btn
          color="primary"
          elevation="0"
          rounded="lg"
          size="large"
          class="px-8"
          style="background-color: var(--color-primary-500) !important; color: var(--color-prim-primary-on-fill)"
        >
          إجراء أساسي
        </v-btn>

        <v-btn
          variant="flat"
          rounded="lg"
          size="large"
          class="px-8"
          style="background-color: var(--color-secondary-500) !important; color: var(--color-prim-secondary-on-fill)"
        >
          إجراء ثانوي
        </v-btn>

        <v-btn
          variant="flat"
          rounded="lg"
          size="large"
          class="px-8"
          style="background-color: var(--color-accent-500) !important; color: var(--color-prim-accent-on-fill)"
        >
          تمييز / تنبيه
        </v-btn>

        <v-btn
          variant="outlined"
          rounded="lg"
          size="large"
          class="px-8"
          style="border-color: var(--color-primary-300) !important; color: var(--color-primary-600)"
        >
          زر محدد
        </v-btn>

        <v-btn
          variant="text"
          rounded="lg"
          size="large"
          style="color: var(--color-primary-600)"
        >
          زر نصي
        </v-btn>
      </div>
    </section>

    <!-- التحليلات -->
    <section class="mb-12">
      <h2 class="text-h5 font-weight-bold mb-6">التحليلات والمؤشرات</h2>
      <v-row>
        <v-col cols="12" md="4" v-for="i in 3" :key="i">
          <v-card
            class="pa-6 border"
            elevation="0"
            style="border-color: var(--color-prim-border) !important; border-radius: var(--radius-prim); background: var(--color-prim-bg-surface)"
          >
            <div class="d-flex align-center mb-4">
              <v-avatar
                size="48"
                class="ml-4"
                style="background: var(--color-primary-50)"
              >
                <v-icon :icon="i === 1 ? 'mdi-account-group' : i === 2 ? 'mdi-calendar-check' : 'mdi-trending-up'" color="primary"></v-icon>
              </v-avatar>
              <div>
                <div class="text-caption" style="color: var(--color-prim-text-muted)">{{ i === 1 ? 'إجمالي المرضى' : i === 2 ? 'المواعيد اليوم' : 'نسبة النمو' }}</div>
                <div class="text-h5 font-weight-bold">{{ i === 1 ? '1,284' : i === 2 ? '42' : '+12.5%' }}</div>
              </div>
            </div>
            <div class="w-100" style="height: 4px; background: var(--color-primary-100); border-radius: 2px;">
              <div :style="{ width: i === 1 ? '70%' : i === 2 ? '45%' : '85%', height: '100%', background: 'var(--color-primary-500)', borderRadius: '2px' }"></div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- عناصر الإدخال -->
    <section class="mb-12">
      <h2 class="text-h5 font-weight-bold mb-6">عناصر النماذج</h2>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="اسم المريض"
            placeholder="أدخل الاسم الكامل"
            variant="outlined"
            density="comfortable"
            color="primary"
            persistent-placeholder
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="القسم"
            :items="['القلب', 'الأعصاب', 'الأطفال', 'الجلدية']"
            variant="outlined"
            density="comfortable"
            color="primary"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="ملاحظات طبية"
            placeholder="أضف أي ملاحظات هامة هنا..."
            variant="outlined"
            color="primary"
            rows="3"
          ></v-textarea>
        </v-col>
      </v-row>
    </section>

    <!-- التنبيهات -->
    <section class="mb-12">
      <h2 class="text-h5 font-weight-bold mb-6">التغذية الراجعة</h2>
      <div class="d-flex flex-column gap-4">
        <v-alert
          variant="tonal"
          border="start"
          style="background: oklch(0.95 0.05 150) !important; color: var(--color-prim-success); border-color: var(--color-prim-success) !important"
          icon="mdi-check-circle"
          title="رسالة نجاح"
          text="تم تحديث سجل المريض بنجاح في النظام."
        ></v-alert>
        
        <v-alert
          variant="tonal"
          border="start"
          style="background: oklch(0.95 0.05 75) !important; color: var(--color-prim-warning); border-color: var(--color-prim-warning) !important"
          icon="mdi-alert"
          title="تحذير"
          text="لا يمكن التراجع عن هذا الإجراء. يرجى التحقق من بيانات المريض قبل الاستمرار."
        ></v-alert>

        <v-alert
          variant="tonal"
          border="start"
          style="background: oklch(0.95 0.05 25) !important; color: var(--color-prim-error); border-color: var(--color-prim-error) !important"
          icon="mdi-alert-octagon"
          title="رسالة خطأ"
          text="فشل النظام في الاتصال بقاعدة البيانات الطبية. يرجى المحاولة لاحقاً."
        ></v-alert>
      </div>
    </section>
  </v-container>
</template>

<script setup lang="ts">
  // لا حاجة لسكربت في هذا العرض
</script>

<style scoped>
.gap-4 {
  gap: 1rem;
}
.border {
  border-width: var(--prim-border-width) !important;
  border-style: solid !important;
}
</style>
