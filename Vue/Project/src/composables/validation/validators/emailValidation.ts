import { useI18n } from 'vue-i18n'
import type { ValidatorCallback } from '../interfaces/ValidatorCallback'

export function emailValidation(): ValidatorCallback<string> {
  const { t } = useI18n()

  return function (value: string) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (value && !value.match(regexp)) return t('validation.incorrectEmail')

    return false
  }
}
