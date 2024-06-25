<template>
  <label class="switcher">
    <input
      class="switcher__input"
      type="checkbox"
      :checked="modelValue"
      v-bind="inputProps"
      @change="onChange"
    />
    <span class="switcher__wrapper">
      <span class="switcher__slider"></span>
    </span>
    <span v-if="label" class="switcher__label">
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string
  inputProps?: {
    [key: string]: string | number
  }
  modelValue?: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", checked: boolean): void
}>()

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.checked)
}
</script>

<style lang="scss">
.switcher {
  --b-radius: 24px;

  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &__wrapper {
    border-radius: var(--b-radius);
    width: 36px;
    height: 20px;
    padding: 1px;
    background-color: var(--grey-bg-1);
    border: 1px solid var(--grey-stroke);
    position: relative;
    transform: all var(--general-transition);

    &::before {
      content: "";
      border-radius: var(--b-radius);
      position: absolute;
      z-index: 1;
      inset: 1px 50% 1px 1px;
      opacity: 0;
      background: var(--gradient-1);
      transition: var(--general-transition);
    }
  }
  &__input:checked + &__wrapper::before {
    opacity: 1;
    inset: 1px;
  }

  &__input {
    display: none;
  }

  &__slider {
    position: absolute;
    border-radius: 50%;
    z-index: 10;
    background-color: var(--blue);
    box-shadow: 0 1px 12px rgba(8, 55, 55, 0.6);
    width: 16px;
    height: 16px;
    inset: 1px;
    transition: var(--general-transition);
  }
  &__input:checked + &__wrapper > &__slider {
    inset: 1px 1px 1px 50%;
  }

  &__label {
    font-size: 14px;
    line-height: 130%;
  }
}
</style>
