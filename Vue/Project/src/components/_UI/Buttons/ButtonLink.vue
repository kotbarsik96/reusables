<template>
  <a class="button" :class="classes" :tabindex="tabindex">
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script setup lang="ts">
import { useButtonClass } from '@/composables/useButtonClass'
import type { ButtonType } from '@/composables/useButtonClass'

const props = withDefaults(
  defineProps<{
    buttonType?: ButtonType
    disabled?: boolean
    tabindex?: '-1' | '0' | '1'
  }>(),
  {
    buttonType: 'primary',
    tabindex: '0',
  },
)

const classes = useButtonClass(props)
</script>

<style lang="scss" scoped>
@use '@/css/components/Button.scss';
</style>
