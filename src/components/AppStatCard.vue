<template>
  <v-card
    class="stat-card pa-5"
    rounded="xl"
    elevation="0"
    :style="`--card-color: ${color}; --card-color-light: ${colorLight}`"
  >
    <div class="d-flex align-start justify-space-between">
      <!-- Icon -->
      <div class="stat-icon-wrap flex-shrink-0">
        <v-icon :icon="icon" size="26" />
      </div>

      <!-- Trend badge -->
      <v-chip
        v-if="trend !== undefined"
        size="x-small"
        :color="trend >= 0 ? 'success' : 'error'"
        variant="tonal"
        :prepend-icon="trend >= 0 ? 'mdi-trending-up' : 'mdi-trending-down'"
      >
        {{ Math.abs(trend) }}%
      </v-chip>
    </div>

    <div class="mt-4">
      <div class="stat-value text-h5 font-weight-bold mb-1">{{ formattedValue }}</div>
      <div class="stat-label text-body-2 font-weight-medium">{{ label }}</div>
      <div v-if="subtitle" class="stat-subtitle text-caption mt-1">{{ subtitle }}</div>
    </div>

    <!-- Progress bar (optional) -->
    <div v-if="progress !== undefined" class="mt-4">
      <v-progress-linear
        :model-value="progress"
        color="var(--card-color)"
        height="4"
        rounded
        bg-color="var(--card-color-light)"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    label: string
    value: number | string
    icon: string
    color?: string
    colorLight?: string
    subtitle?: string
    trend?: number
    isCurrency?: boolean
    progress?: number
  }>(), {
    color: 'var(--color-primary-500)',
    colorLight: 'var(--color-primary-100)',
    isCurrency: false,
  })

  const formattedValue = computed(() => {
    if (props.isCurrency && typeof props.value === 'number') {
      return `${props.value.toLocaleString('ar-SA')} ر.س`
    }
    if (typeof props.value === 'number') {
      return props.value.toLocaleString('ar-SA')
    }
    return props.value
  })
</script>

<style scoped>
.stat-card {
  background: white;
  border: 1px solid var(--color-prim-border);
  cursor: default;
}

.stat-label {
  color: var(--color-prim-text-muted);
  line-height: 1.4;
}

.stat-value {
  color: var(--color-prim-text);
  line-height: 1.2;
}

.stat-subtitle {
  color: var(--color-prim-text-subtle);
}

.stat-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--card-color-light, var(--color-primary-100));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--card-color, var(--color-primary-500));
}
</style>
