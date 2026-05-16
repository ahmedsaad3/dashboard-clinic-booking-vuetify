<template>
  <v-app dir="rtl" theme="clinicLight">
    <div class="auth-layout">
      <!-- Background decorative elements -->
      <div class="auth-bg-circle auth-bg-circle--1" />
      <div class="auth-bg-circle auth-bg-circle--2" />

      <v-container class="auth-container d-flex align-center justify-center" fluid>
        <div class="auth-card-wrapper">
          <!-- Logo / Brand -->
          <div class="text-center mb-8">
            <div class="auth-logo mb-3">
              <v-icon icon="mdi-hospital-building" size="52" color="primary" />
            </div>
            <h1 class="text-h5 font-weight-bold" style="color: var(--color-primary-700)">
              نظام إدارة العيادات
            </h1>
            <p class="text-caption mt-1" style="color: var(--color-prim-text-muted)">
              Clinic Management System
            </p>
          </div>

          <!-- Page content (login form) -->
          <router-view />
        </div>
      </v-container>
    </div>
  </v-app>
</template>

<script setup lang="ts">
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-primary-50)   0%,
    oklch(0.97 0.010 225)    45%,
    var(--color-secondary-50) 100%
  );
  position: relative;
  overflow: hidden;
}

.auth-bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
  pointer-events: none;
  filter: blur(1px);
}

.auth-bg-circle--1 {
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, var(--color-primary-400), transparent 70%);
  top: -180px;
  right: -180px;
}

.auth-bg-circle--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--color-secondary-400), transparent 70%);
  bottom: -120px;
  left: -120px;
}

.auth-container {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.auth-card-wrapper {
  width: 100%;
  max-width: 460px;
}

.auth-logo {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: var(--shadow-prim-lg);
  border: 1px solid var(--color-primary-100);
}
</style>
