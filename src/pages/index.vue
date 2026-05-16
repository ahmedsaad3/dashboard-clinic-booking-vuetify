<template>
  <!-- This page redirects automatically via router guard -->
  <div />
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  definePage({
    meta: { requiresAuth: false },
  })

  const auth = useAuthStore()
  const router = useRouter()

  // Guard in router.ts handles the redirect,
  // but as a fallback we push here too.
  if (auth.isLoggedIn) {
    router.replace(auth.defaultRoute)
  } else {
    router.replace('/login')
  }
</script>
