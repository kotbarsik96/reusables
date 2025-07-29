import { ScrollHelper } from '@/utils/ScrollHelpers'
import { ref, watch, type ModelRef, type Ref } from 'vue'

export function useDialog(
  closeModel: ModelRef<boolean, string, boolean, boolean>,
  dialogEl: Ref<HTMLDialogElement | null>,
) {
  const dialogShown = ref(false)

  function openDialog() {
    if (dialogEl.value) {
      dialogShown.value = true
      ScrollHelper.hideBodyScroll()
      dialogEl.value.showModal()
      closeModel.value = true
    }
  }

  function closeDialog() {
    ScrollHelper.setBodyScroll()
    if (dialogEl.value) {
      dialogShown.value = false
      dialogEl.value.close()
      closeModel.value = false
    }
  }

  function closeDialogOnOuterClick(event: Event) {
    if (!dialogEl.value) return
    const target = event.target
    if (target == dialogEl.value!) closeDialog()
  }

  watch(closeModel, (value) => {
    if (value) {
      openDialog()
    } else {
      closeDialog()
    }
  })

  return {
    openDialog,
    closeDialog,
    closeDialogOnOuterClick,
  }
}
