<template>
  <dialog @mousedown="closeDialogOnOuterClick" @close="closeDialog" ref="dialogEl">
    <div v-if="showCloseButton" class="close-wrapper">
      <ButtonGeneral class="close" @click="closeDialog">
        <IconClose />
      </ButtonGeneral>
    </div>
    <div class="dialog-body">
      <slot />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'
import IconClose from '@/assets/icons/close.svg'
import { useTemplateRef } from 'vue'

const props = defineProps<{
  showCloseButton?: boolean
}>()

const model = defineModel({ type: Boolean, default: false })
const dialogEl = useTemplateRef<HTMLDialogElement>('dialogEl')

const { closeDialogOnOuterClick, closeDialog } = useDialog(model, dialogEl)
</script>

<style lang="scss" scoped>
@use '@/css/components/Dialog.scss';
</style>
