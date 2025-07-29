<template>
  <RouterLink class="button" :class="classes" :tabindex="tabindex" :to="to">
    <span>
      <slot></slot>
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { useButtonClass } from '@/composables/useButtonClass'
import type { ButtonType } from '@/composables/useButtonClass'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    buttonType?: ButtonType
    disabled?: boolean
    tabindex?: '-1' | '0' | '1'
    to: RouteLocationRaw
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
