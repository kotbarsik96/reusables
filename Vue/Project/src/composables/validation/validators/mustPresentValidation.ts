import { useI18n } from 'vue-i18n'
import type { ValidatorCallback } from '../interfaces/ValidatorCallback'

export function mustPresentValidation(fieldName?: string): ValidatorCallback<string> {
  const { t } = useI18n()

  return function (value: string) {
    if (!value) {
      if (fieldName) return `${t('validation.fieldNotPresented')}: ${fieldName}`
      else return t('validation.fieldNotPresented')
    }

    return false
  }
}
