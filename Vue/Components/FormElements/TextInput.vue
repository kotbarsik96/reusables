<template>
  <input
    class="input"
    type="text"
    :autocomplete="autocomplete"
    :value="_value"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
  defineProps<{
    modelValue?: string
    autocomplete?: string
  }>(),
  {
    autocomplete: "off",
  }
)

const emit = defineEmits<{
  (e: "update:modelValue", value: typeof props.modelValue): void
}>()

const _value = computed({
  get() {
    return handleInput(props.modelValue)
  },
  set(value) {
    emit("update:modelValue", handleInput(value))
  },
})

function handleInput(value?: string) {
  return value
}
function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = handleInput(target.value)
  emit("update:modelValue", value)
  target.value = value || ""
}
</script>
