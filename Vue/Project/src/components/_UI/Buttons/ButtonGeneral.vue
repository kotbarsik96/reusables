<template>
  <button class="button" :class="classes" :type="type" :tabindex="tabindex" :disabled="disabled">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useButtonClass } from '@/composables/useButtonClass'
import type { ButtonType, ButtonTypeAttribute } from '@/composables/useButtonClass'

const props = withDefaults(
  defineProps<{
    buttonType?: ButtonType
    disabled?: boolean
    tabindex?: '-1' | '0' | '1'
    type?: ButtonTypeAttribute
  }>(),
  {
    buttonType: 'primary',
    type: 'button',
    tabindex: '0',
  },
)

const classes = useButtonClass(props)
</script>

<style lang="scss" scoped>
@use '@/css/components/Button.scss';
</style>
