<template>
  <div class="oi" :class="classes">
    <OtpInputSection
      v-for="(n, i) in codeLength"
      :key="n"
      :value="code[i]"
      :focus="focusIndex === i"
      :filled="code[i] !== nullSymbol"
      :is-correct="isCorrect"
      @keydown="(event) => onKeydown(i, event)"
      @paste="(event) => onPaste(i, event)"
      @focus="(event) => onFocus(i, event)"
    />
  </div>
</template>

<script setup lang="ts">
import OtpInputSection from '@/components/_UI/OtpInput/OtpInputSection.vue'
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    codeLength: number
    nullSymbol?: string
    pattern?: RegExp
    isCorrect: boolean | undefined
    disabled?: boolean
  }>(),
  {
    nullSymbol: '_',
    pattern: () => /^[0-9]$/,
  },
)

const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'complete', value: string): void
}>()

const focusIndex = ref(0)

const code = ref<string[]>(new Array(props.codeLength).fill(props.nullSymbol))
const codeToString = computed(() => {
  let str = ''

  for (let i of code.value) {
    if (i && props.pattern.test(i)) str += i
    else str += props.nullSymbol
  }

  return str
})

const classes = computed(() => ({
  '--complete': props.isCorrect === true,
  '--incorrect': props.isCorrect === false,
  '--disabled': props.disabled,
}))

watch(code, () => {
  emit('input', codeToString.value)

  const hasNullSymbol = code.value.find((s) => s === props.nullSymbol)
  if (!hasNullSymbol) {
    emit('complete', codeToString.value)
  }
})

function onKeydown(pos: number, event: KeyboardEvent) {
  if (props.disabled) return

  const insertedOnPosition = props.pattern.test(code.value[pos])

  switch (event.key.toLowerCase()) {
    case 'delete':
      if (insertedOnPosition) deleteAtPosition(pos)
      break
    case 'backspace':
      if (insertedOnPosition) deleteAtPosition(pos)
      else if (focusIndex.value > 0) focusIndex.value--
      break
    case 'arrowleft':
      if (focusIndex.value > 0) focusIndex.value--
      break
    case 'arrowright':
      if (focusIndex.value < props.codeLength) focusIndex.value++
      break
    default:
      if (props.pattern.test(event.key)) {
        replaceAtPosition(pos, event.key)
        focusIndex.value++
      }
      break
  }
}

function deleteAtPosition(pos: number) {
  code.value = code.value.map((s, i) => (i === pos ? props.nullSymbol : s))
}

function replaceAtPosition(pos: number, value: string) {
  code.value = code.value.map((s, i) => (i === pos ? value : s))
}

function onPaste(pos: number, event: ClipboardEvent) {
  const text = event.clipboardData
    ?.getData('text')
    .split('')
    .filter((s) => props.pattern.test(s))
    .join('')
  if (!text) return

  // длина вставки равна или больше длине кода - перезаписать весь код на вставку
  if (text.length >= props.codeLength) {
    code.value = text.split('').slice(0, props.codeLength)
  }
  // длина вставки меньше длины кода - вставить символы вместо текущих пробелов, начиная с позиции вставки
  else {
    let pastedCount = 0
    const split = text.split('')
    code.value.forEach((s, i) => {
      if (i < pos) return

      if (s === props.nullSymbol) {
        code.value[i] = split[pastedCount]
        pastedCount++
      }
    })
  }
}

function onFocus(pos: number, event: FocusEvent) {
  focusIndex.value = pos
}
</script>

<style lang="scss" scoped>
@use '@/css/mixins/mixins.scss';

.oi {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  transition: var(--general-transition);

  &.--disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
