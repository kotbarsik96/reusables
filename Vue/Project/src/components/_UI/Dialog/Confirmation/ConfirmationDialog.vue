<template>
  <DialogWindow
    class="confirmation"
    v-model="shown"
    @animationend="onAnimationEnd"
    @animationcancel="onAnimationEnd"
  >
    <div class="body">
      <div class="title">{{ data.title }}</div>
      <div v-if="data.detail" class="detail" v-html="data.detail"></div>
      <div class="buttons">
        <ButtonGeneral class="btn --yes" @click="yes">{{ data.yesButtonText }}</ButtonGeneral>
        <ButtonGeneral class="btn --no" @click="no">{{ data.noButtonText }}</ButtonGeneral>
      </div>
    </div>
  </DialogWindow>
</template>

<script setup lang="ts">
import DialogWindow from '@/components/_UI/Dialog/DialogWindow.vue'
import { useConfirmation, type IConfirmationCreated } from '@/composables/useConfirmation'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  data: IConfirmationCreated
}>()

const { removeDialog } = useConfirmation()

const shown = ref(false)

let resolved = false

onMounted(() => (shown.value = true))

watch(shown, () => {
  if (!shown.value && !resolved) no()
})

function yes() {
  props.data.resolve(true)
  resolved = true
  shown.value = false
}
function no() {
  props.data.resolve(false)
  resolved = false
  shown.value = false
}

function onAnimationEnd() {
  if (!shown.value) {
    removeDialog(props.data.id)
  }
}
</script>

<style lang="scss" scoped>
.confirmation {
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: 0.625rem 1rem;
  }

  .title {
    font: var(--text-18);
    font-weight: 700;
    color: var(--text-color);
    text-align: center;
  }

  .detail {
    font: var(--text-16);
    font-weight: 500;
    color: var(--text-color-light);
    text-align: center;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.625rem;

    .btn {
      min-width: 100px;

      &.--yes {
        background-color: var(--status-4);
      }
      &.--no {
        background-color: var(--status-3);
      }
    }
  }
}
</style>
