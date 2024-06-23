<template>
  <component :is="component" class="btn" :class="className" v-bind="attrs">
    <span class="btn__inner">
      <Icon v-if="icon" :type="icon" class="btn__icon" />
      <span v-if="label" class="btn__label">{{ label }}</span>
    </span>
  </component>
</template>

<script setup lang="ts">
import Icon from "@/components/Blocks/Icon.vue"
import { computed } from "vue"
import { RouterLink } from "vue-router"

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset" | "router-link"
    label?: string
    icon?: string
    iconPos?: "left" | "right"
    bg?: "green" | "yellow"
  }>(),
  {
    type: "button",
    iconPos: "left",
  }
)

const component = computed(() => {
  switch (props.type) {
    case "router-link":
      return RouterLink
    default:
      return "button"
  }
})

const className = computed(() => {
  return [
    {
      "btn--bg-green": props.bg === "green",
      "btn--bg-yellow": props.bg === "yellow",
      "btn--icon-right": props.iconPos === "right",
      "btn--icon-only": !props.label && props.icon,
    },
  ]
})
const attrs = computed(() => {
  switch (props.type) {
    case "router-link":
      return {}
    default:
      return {
        type: props.type,
        "aria-label": props.label,
      }
  }
})
</script>

<style lang="scss">
.btn {
  // styles
  position: relative;
  transition: var(--general-transition);
  background-color: var(--grey-stroke);
  color: var(--bg);
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--button-gradient);
    opacity: 1;
    display: inline-block;
    background-size: 100% 100%;
    transition: var(--general-transition);
  }
  &:hover:not(:disabled)::before {
    background-size: 200% 100%;
  }
  &:disabled::before {
    opacity: 0;
  }

  &__inner {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  &--icon-right &__inner {
    flex-direction: row-reverse;
  }

  &__label {
    @include fMedium(16);
  }

  &__icon {
    font-size: 20px;
  }

  // modifiers
  &--icon-only {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  &[class*="btn--bg-"] {
    &::before {
      opacity: 0;
    }
    &:hover:not(:disabled) {
      background-color: var(--blue);
    }
  }
  &--bg-yellow {
    background-color: var(--yellow);
  }
  &--bg-green {
    background-color: var(--green-1);
  }

  &:disabled,
  &:disabled:hover {
    cursor: default;
    pointer-events: none;
    color: var(--grey-text);
    background-color: var(--grey-stroke);
  }
}
</style>
