<template>
  <div class="chat-layout">
    <!-- Conversations List -->
    <v-card rounded="xl" elevation="0" class="chat-sidebar" style="border: 1px solid var(--color-prim-border)">
      <div class="pa-4 pb-2">
        <div class="text-subtitle-1 font-weight-bold mb-3">الدردشات</div>
        <v-text-field placeholder="بحث..." variant="outlined" density="compact" prepend-inner-icon="mdi-magnify" hide-details rounded="lg" />
      </div>
      <v-list class="pa-2">
        <v-list-item
          v-for="conv in conversations"
          :key="conv.id"
          :value="conv.id"
          rounded="lg"
          class="mb-1"
          :class="activeConv?.id === conv.id ? 'active-conv' : ''"
          @click="selectConv(conv)"
        >
          <template #prepend>
            <v-badge :content="conv.unreadCount || ''" :model-value="conv.unreadCount > 0" color="error" overlap>
              <v-avatar :image="conv.customerAvatar" size="40" />
            </v-badge>
          </template>
          <v-list-item-title class="text-body-2 font-weight-medium">{{ conv.customerName }}</v-list-item-title>
          <v-list-item-subtitle class="text-caption text-truncate">{{ conv.lastMessage }}</v-list-item-subtitle>
          <template #append>
            <span class="text-caption" style="color: var(--color-prim-text-muted)">
              {{ formatTime(conv.lastMessageAt) }}
            </span>
          </template>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Chat Window -->
    <v-card v-if="activeConv" rounded="xl" elevation="0" class="chat-window" style="border: 1px solid var(--color-prim-border)">
      <!-- Header -->
      <div class="d-flex align-center pa-4" style="border-bottom: 1px solid var(--color-prim-border)">
        <v-avatar :image="activeConv.customerAvatar" size="38" class="me-3" />
        <div>
          <div class="text-body-1 font-weight-bold">{{ activeConv.customerName }}</div>
          <div class="text-caption" style="color: var(--color-prim-text-muted)" dir="ltr">{{ activeConv.customerPhone }}</div>
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-messages pa-4">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="d-flex mb-3"
          :class="msg.senderType === 'branch' ? 'justify-end' : 'justify-start'"
        >
          <div class="chat-bubble" :class="msg.senderType === 'branch' ? 'bubble-branch' : 'bubble-customer'">
            <p class="text-body-2 mb-1">{{ msg.content }}</p>
            <span class="text-caption" style="opacity: 0.7">{{ formatTime(msg.sentAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="pa-4" style="border-top: 1px solid var(--color-prim-border)">
        <div class="d-flex align-center" style="gap: 8px">
          <v-btn icon="mdi-image-outline" variant="text" size="small" />
          <v-btn icon="mdi-paperclip" variant="text" size="small" />
          <v-text-field
            v-model="newMessage"
            placeholder="اكتب رسالة..."
            variant="outlined"
            density="compact"
            hide-details
            rounded="xl"
            @keyup.enter="sendMessage"
          />
          <v-btn icon="mdi-send" color="secondary" variant="flat" @click="sendMessage" />
        </div>
      </div>
    </v-card>

    <!-- Empty state -->
    <v-card v-else rounded="xl" elevation="0" class="chat-window d-flex align-center justify-center" style="border: 1px solid var(--color-prim-border)">
      <div class="text-center">
        <v-icon icon="mdi-chat-outline" size="64" style="color: var(--color-prim-border)" />
        <p class="text-body-2 mt-2" style="color: var(--color-prim-text-muted)">اختر محادثة من القائمة</p>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { mockConversations, mockMessages } from '@/services/mockData'
  import type { ChatConversation, ChatMessage } from '@/types'

  definePage({ meta: { layout: 'BranchLayout' } })

  const conversations = ref<ChatConversation[]>([...mockConversations])
  const messages = ref<ChatMessage[]>([...mockMessages])
  const activeConv = ref<ChatConversation | null>(null)
  const newMessage = ref('')

  function selectConv(conv: ChatConversation) {
    activeConv.value = conv
    conv.unreadCount = 0
  }

  function sendMessage() {
    if (!newMessage.value.trim() || !activeConv.value) return
    messages.value.push({
      id: Date.now(),
      senderId: 100,
      senderName: 'العيادة',
      senderType: 'branch',
      content: newMessage.value.trim(),
      contentType: 'text',
      sentAt: new Date().toISOString(),
      isRead: false,
    })
    newMessage.value = ''
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
  }
</script>

<style scoped>
.chat-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 16px;
  height: calc(100vh - 130px);
}

.chat-sidebar {
  overflow-y: auto;
}

.chat-window {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
}

.chat-bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
}

.bubble-branch {
  background: var(--color-secondary-500);
  color: white;
  border-bottom-right-radius: 4px;
}

.bubble-customer {
  background: var(--color-prim-bg-surface);
  border: 1px solid var(--color-prim-border);
  border-bottom-left-radius: 4px;
}

.active-conv {
  background: var(--color-secondary-50) !important;
}

@media (max-width: 768px) {
  .chat-layout {
    grid-template-columns: 1fr;
  }
}
</style>
