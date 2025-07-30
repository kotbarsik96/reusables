<template>
  <div class="ois">
    <input
      :class="classes"
      inputmode="numeric"
      :value="value"
      @keydown="onKeydown"
      @paste.prevent="onPaste"
      @blur="onBlur"
      @focus="onFocus"
      ref="inputElement"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  value: string
  focus?: boolean
  filled?: boolean
  isCorrect: boolean | undefined
}>()

const emit = defineEmits<{
  (e: 'paste', event: ClipboardEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'blur', event: Event): void
  (e: 'focus', event: FocusEvent): void
}>()

const inputElement = useTemplateRef<HTMLInputElement>('inputElement')

const classes = computed(() => ({
  '--filled': !!props.filled,
  '--complete': props.isCorrect === true,
  '--incorrect': props.isCorrect === false,
}))

watch(
  () => props.focus,
  () => {
    if (props.focus) inputElement.value?.focus()
    else inputElement.value?.blur()
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey) return

  event.preventDefault()
  emit('keydown', event)
}

function onPaste(event: ClipboardEvent) {
  emit('paste', event)
}

function onBlur(event: Event) {
  emit('blur', event)
}

function onFocus(event: FocusEvent) {
  emit('focus', event)
}
</script>

<style lang="scss" scoped>
@use '@/css/mixins/mixins.scss';

.ois {
  flex: 1 1 auto;
  max-width: 100px;

  input {
    border-radius: 8px;
    border: 1px solid var(--field-grey);
    flex: 1 1 auto;
    height: 2.9rem;
    min-width: 46px;
    font: var(--text-16);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white-dark);
    background: transparent;
    width: 100%;

    transform: scale(0.9);
    transition: var(--general-transition);

    &.--filled {
      color: var(--white);
      border-color: var(--white);
      transform: scale(1);
    }

    &.--complete,
    &.--complete.--filled {
      color: var(--status-5);
      border-color: var(--status-5);
    }

    &.--incorrect,
    &.--incorrect.--filled {
      color: var(--status-2);
      border-color: var(--status-2);
    }
  }
}
</style>
