<template>
  <dialog
    class="dialog-window"
    @mousedown="closeDialogOnOuterClick"
    @close="closeDialog"
    ref="dialogEl"
  >
    <div class="window">
      <ButtonGeneral class="dw-close" @click="closeDialog">
        <IconClose />
      </ButtonGeneral>
      <div class="body">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'
import IconClose from '@/assets/icons/close.svg'
import { useTemplateRef } from 'vue'
import ButtonGeneral from '@/components/_UI/Buttons/ButtonGeneral.vue'

const model = defineModel({ type: Boolean, default: false })
const dialogEl = useTemplateRef<HTMLDialogElement>('dialogEl')

const { closeDialogOnOuterClick, closeDialog } = useDialog(model, dialogEl)
</script>

<style lang="scss" scoped>
@use '@/css/mixins/mixins.scss';
@use '@/css/components/Dialog.scss';

.dialog-window {
  --close-size: 2rem;
  --dialog-block-padding: 30px;
  --dialog-inline-padding: 20px;
  --max-window-width: 100svw;
  --max-window-height: 100svh;
  --window-block-padding: 20px;
  --window-inline-padding: 20px;

  width: 100svw;
  height: 100svh;
  overflow: visible;
  background-color: transparent;
  padding: var(--dialog-block-padding) var(--dialog-inline-padding);
  justify-content: center;
  align-items: center;

  &[open] {
    transform: scale(1);
  }

  .window {
    position: relative;
    border-radius: 30px;
    background-color: var(--white);
    width: calc(100vw - var(--dialog-inline-padding) * 2);
    padding: var(--window-block-padding) var(--window-inline-padding);
    max-width: var(--max-window-width);
    max-height: var(--max-window-height);
  }

  .dw-close {
    top: calc(var(--window-block-padding));
    right: calc(var(--window-inline-padding) + 20px);
  }

  :deep(.dialog-return) {
    top: 0;
    left: 20px;
  }

  .dw-close,
  :deep(.dialog-return) {
    background-color: var(--secondary-solid-2);
    z-index: 20;
    position: absolute;
    border-radius: 10px;
    width: var(--close-size);
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    min-width: unset;
  }

  :deep(.dialog-buttons) {
    margin-block-start: 1rem;
    margin-inline-start: 0.25rem;
  }

  .body {
    position: relative;
    z-index: 10;
    overflow: auto;
    padding-block-end: 15px;
    max-height: calc(100svh - var(--window-block-padding) * 2 - var(--dialog-block-padding) * 2);

    :deep(.dialog-title) {
      margin-block: 0.5rem 1rem;
      text-align: center;
      padding-inline: calc(2rem + 40px);
      font: var(--text-h4);
    }
  }

  @include mixins.adaptive(phone-small-min) {
    .title {
      padding-inline: calc(var(--close-size) + 1.25rem);
    }
  }

  @include mixins.adaptive(phone-min) {
    --dialog-block-padding: 15px;
    --max-window-width: 630px;
  }
}
</style>
