<template>
  <div class="notifications-container">
    <TransitionGroup name="notification-anim">
      <NotificationItem v-for="item in notifications" :key="item.id" :data="item" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import NotificationItem from '@/components/_UI/Notifications/NotificationItem.vue'
import { useNotifications } from '@/composables/useNotifications'

const { getNotificationsList } = useNotifications()

const notifications = getNotificationsList()
</script>

<style lang="scss" scoped>
.notifications-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 400px;
  max-width: 90%;
  z-index: 9999;
}

.notification-anim {
  &-enter-active,
  &-leave-active,
  &-move {
    transition: var(--general-transition);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(200%);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
