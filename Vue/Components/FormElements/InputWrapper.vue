<template>
  <div class="input-wrapper" :class="className">
    <label v-if="label" class="input-wrapper__label" :for="id">
      {{ label }}
    </label>
    <div class="input-wrapper__wrap">
      <Icon v-if="icon" :type="icon" class="input-wrapper__icon" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Blocks/Icon.vue"
import { computed } from "vue"

const props = withDefaults(
  defineProps<{
    id?: string
    modelValue?: string | number
    label?: string
    icon?: string
    iconPos?: "right" | "left"
    grey?: boolean
    center?: boolean
  }>(),
  {
    iconPos: "right",
  }
)

const emit = defineEmits<{
  (e: "update:modelValue", value: typeof props.modelValue): void
}>()

const className = computed(() => {
  return {
    "input-wrapper--icon-left": props.iconPos === "left",
    "input-wrapper--grey": props.grey,
    "input-wrapper--center": props.center,
  }
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  @include fRegular(14);

  &__label {
    display: inline-block;
    margin-bottom: 5px;
  }

  &__wrap {
    position: relative;
  }

  &__icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-55%);
    font-size: 15px;
  }

  :deep(.input) {
    // стандартные стили автозаполнения нельзя переопределить, поэтому используется хак с transition:
    &:-webkit-autofill,
    &:-webkit-autofill:focus {
      transition-property: background-color, color, border-color !important;
      transition-duration: 600000s, 600000s, 0.2s !important;
    }

    border: none;
    border-radius: 12px;
    background-color: var(--white);
    @include fRegular(14);
    color: var(--black);
    padding: 11px 20px;
    outline: none;
    width: 100%;
    transition: var(--general-transition);
  }
  :deep(.input)::placeholder {
    color: var(--grey-text-1);
  }
  :deep(.input):disabled {
    opacity: 0.5;
  }
  
  &__icon + :deep(.input) {
    padding-right: 40px;
  }
  &--icon-left &__icon + :deep(.input) {
    padding-right: 20px;
    padding-left: 40px;
  }
  &--icon-left &__icon {
    right: auto;
    left: 20px;
  }

  &--center :deep(.input) {
    text-align: center;
  }
  &--grey :deep(.input) {
    background-color: var(--item-bg);
  }
  &--grey :deep(.input)::placeholder {
    color: var(--grey-icon-1);
  }
  &--grey &__icon {
    color: var(--grey-icon-1);
  }
}
</style>
