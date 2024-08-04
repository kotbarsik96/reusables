<template>
  <li class="dropdown-option" :class="className">
    <Icon v-if="opt.icon" class="dropdown-option__icon" :type="opt.icon" />
    <span>
      {{ opt.label || opt.value }}
    </span>
  </li>
</template>

<script setup lang="ts">
import Icon from "@/components/Blocks/Icon.vue"
import type { IDropdownOption } from "@/interfaces/Dropdown/IDropdownOption"
import { computed } from "vue"

const props = defineProps<{
  opt: IDropdownOption
  active?: boolean
  smaller?: boolean
}>()

const className = computed(() => {
  return {
    active: props.active,
    smaller: props.smaller,
  }
})
</script>

<style lang="scss" scoped>
.dropdown-option {
  cursor: pointer;
  padding: 11px 20px;
  transition: var(--general-transition);
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background-color: var(--grey-stroke);
  }
  &.active {
    background-color: var(--grey-text-1);
  }
  &.smaller {
    padding: 10px;
  }

  &__icon {
    color: var(--grey-text);
    font-size: 20px;
  }
}
</style>
