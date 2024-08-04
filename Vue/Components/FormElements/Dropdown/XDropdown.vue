<template>
  <div class="dropdown" :class="className" ref="el" v-click-away="close">
    <div class="dropdown__value" @click="shown = !shown">
      <div v-if="!modelValue && placeholder" class="dropdown__placeholder">
        {{ placeholder }}
      </div>
      <div v-if="selectedOption" class="dropdown__value-text">
        <Icon
          v-if="selectedOption.icon"
          class="dropdown__icon"
          :type="selectedOption.icon"
        />
        <span>
          {{
            typeof selectedOption === "string"
              ? selectedOption
              : selectedOption.label || selectedOption.value
          }}
        </span>
      </div>
      <Icon class="dropdown__arrow-icon" type="triangle-down" />
    </div>
    <Transition name="dropdown-anim">
      <ul v-show="shown" class="dropdown__options">
        <OPDropdownOption
          v-for="opt in _options"
          :key="opt.value"
          :opt="opt"
          :active="opt.value === selectedOption?.value"
          :smaller="smaller"
          @click="updateValue(opt)"
        />
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Blocks/Icon.vue"
import vClickAway from "@/directives/vClickAway"
import { computed, ref } from "vue"
import OPDropdownOption from "@/components/Blocks/FormElements/Dropdown/OPDropdownOption.vue"
import type {
  DropdownOption,
  IDropdownOption,
} from "@/interfaces/Dropdown/IDropdownOption"

const props = defineProps<{
  options: DropdownOption[]
  modelValue: string
  placeholder?: string
  smaller?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: typeof props.modelValue): void
}>()

const el = ref<HTMLElement>()
const shown = ref<boolean>(false)

const className = computed(() => {
  return {
    shown: shown.value,
    smaller: props.smaller,
    disabled: props.disabled,
  }
})

const _options = computed(() =>
  props.options.map((opt) => {
    if (typeof opt === "string") return { label: opt, value: opt }
    return opt
  })
)
const selectedOption = computed(() => {
  return _options.value.find((opt) => opt.value === props.modelValue)
})

function updateValue(opt: IDropdownOption) {
  emit("update:modelValue", opt.value)
  close()
}
function close() {
  shown.value = false
}
</script>

<style lang="scss">
.dropdown {
  --s-bg: var(--white);
  --s-bradius: 12px;

  background-color: var(--s-bg);
  border-radius: var(--s-bradius);
  color: var(--black);
  position: relative;
  transition: var(--general-transition);
  z-index: 50;
  @include fRegular(14);

  &.shown {
    border-radius: var(--s-bradius) var(--s-bradius) 0 0;
  }

  &.smaller {
    --s-bg: var(--item-bg);

    display: inline-block;
    min-width: 110px;
  }

  &__value {
    cursor: pointer;
    padding: 11px 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  &.smaller &__value {
    padding: 10px;
    padding-right: 20px;
  }

  &__placeholder {
    flex: 1 1 auto;
  }

  &__value-text {
    flex: 1 1 auto;
    color: var(--black);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__value-text &__icon {
    color: var(--green-1);
  }

  &__arrow-icon {
    flex: 0 0 10px;
    font-size: 10px;
    color: var(--black);
    transition: var(--general-transition);
  }
  &.shown &__arrow-icon {
    transform: translateY(-1px) rotate(180deg);
  }

  &__icon {
    font-size: 20px;
  }

  &__options {
    background-color: var(--s-bg);
    border-radius: 0 0 var(--s-bradius) var(--s-bradius);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    overflow: hidden;
    box-shadow: 0px 9px 10px rgba(0, 0, 0, .07),  0px 9px 10px rgba(0, 0, 0, .07);
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
