<template>
  <div class="input-range" :class="{ grabbed }">
    <div class="input-range__scale" @pointerdown="onPointerdown" ref="scale">
      <div class="input-range__bar" :style="{ width: barWidthStyle }"></div>
      <div
        class="input-range__thumb"
        :style="{ left: barWidthStyle }"
        ref="thumb"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getCoords } from "@/utils/getCoords"

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max: number
  }>(),
  {
    min: 0,
  }
)

const emit = defineEmits<{
  (emit: "update:modelValue", value: typeof props.modelValue): void
}>()

const scale = ref<HTMLElement>()
const thumb = ref<HTMLElement>()

const grabbed = ref<boolean>(false)
const _barWidth = ref<number>(0)
const barWidth = computed({
  get() {
    return _barWidth.value
  },
  set(value: number) {
    if (value <= 0) _barWidth.value = 0
    else if (value >= 100) _barWidth.value = 100
    else _barWidth.value = value
  },
})
const barWidthStyle = computed(() => `${barWidth.value}%`)

onMounted(() => {
  if (scale.value) scale.value.ondragstart = () => false
  if (thumb.value) thumb.value.ondragstart = () => false
})

function getValue(percent: number) {
  const value = Math.round(
    ((props.max - props.min) / 100) * percent + props.min
  )
  if (value < props.min) return props.min
  if (value > props.max) return props.max
  return value
}
function getPercent(value: number) {
  return value / ((props.max - props.min) / 100)
}
function onPointerdown(downEvent: PointerEvent) {
  grabbed.value = true
  const coords = getCoords(scale.value!)
  moveBar(downEvent.clientX - coords.left)
  document.documentElement.addEventListener("pointermove", onPointermove)
  document.documentElement.addEventListener("pointerup", onPointerup)

  function onPointermove(moveEvent: PointerEvent) {
    const moveX = moveEvent.clientX - coords.left
    moveBar(moveX)
  }
  function onPointerup() {
    grabbed.value = false
    document.documentElement.removeEventListener("pointermove", onPointermove)
    document.documentElement.removeEventListener("pointerup", onPointerup)
  }
}
function moveBar(moveX: number) {
  const scaleWidth = scale.value!.offsetWidth
  const moveXPercent = moveX / (scaleWidth / 100)
  const value = getValue(moveXPercent)
  barWidth.value = getPercent(value - props.min)

  emit("update:modelValue", value)
}
</script>

<style lang="scss">
.input-range {
  position: relative;

  &__scale {
    cursor: pointer;
    position: relative;
    background-color: var(--grey-bg-1);
    border: 1px solid var(--grey-stroke);
    border-radius: 60px;
    height: 16px;
    display: flex;
    align-items: center;
    
  }

  &__bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border: 1px solid var(--grey-bg-1);
    background: var(--gradient-1);
    border-radius: 60px;
    width: 50%;
    z-index: 10;
  }

  &__thumb {
    position: absolute;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background-color: var(--blue);
    touch-action: none;
    z-index: 20;

    &::before {
      content: "";
      border-radius: 50%;
      position: absolute;
      inset: 0;
      transform: scale(1.5);
      border: 1px solid var(--green-1);
      background-color: transparent;
      z-index: 25;
      transition: var(--general-transition);
      pointer-events: none;
      box-shadow: 0 0 8px rgba(225, 252, 89, 0.6);
    }
  }
  &.grabbed &__thumb::before,
  &__thumb:hover::before {
    background-color: var(--green-1);
  }
}
</style>
