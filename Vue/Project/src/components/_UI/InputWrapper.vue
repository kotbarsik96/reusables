<template>
  <div class="input-wrapper">
    <slot />
    <Transition name="error-transition">
      <div v-if="error" class="error">{{ error }}</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error?: string | null
}>()
</script>

<style lang="scss" scoped>
@use '@/css/mixins/mixins.scss';

.input-wrapper {
  .error {
    line-height: 12px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    transition-duration: 150ms;
    color: rgb(var(--v-theme-error));
    font: var(--text-p1);
  }
}

.error-transition {
  &-enter-active,
  &-leave-active {
    transition: var(--general-transition);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-15px);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
