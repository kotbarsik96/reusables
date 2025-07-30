import { ref, watch, type Ref, type WatchHandle } from 'vue'
import type { ValidatorCallback } from './interfaces/ValidatorCallback'
import type { TFormValidationField } from './interfaces/TFormValidationField'
import type { IValidationFormOptions } from './interfaces/IValidationFormOptions'

/** Создание валидируемого поля с состояниями значения (value), ошибки (error) и валидации (validated == true, если валидация прошла); функцией валидации и функцией добавления валидации
 */
export function useValidationField<T>(initialValue: T, validators: Array<ValidatorCallback<T>>) {
  const value = ref<T>(initialValue)
  const error = ref<string>()
  const validated = ref(false)
  let watcher: WatchHandle | undefined

  /** Валидация поля
   *
   * Если ошибка есть - запись её в error и возвращает false
   *
   * Если ошибки нет - обнуляет error и вовзвращает true
   */
  function validate() {
    let isValid = true

    // Ставит watcher на изменение значения. При наличии ошибки при каждом изменении значения валидирует поле
    if (!watcher)
      watcher = watch(value, () => {
        if (error.value) validate()
      })

    for (let validator of validators) {
      const result = validator(value.value)
      if (result) {
        isValid = false
        error.value = result
        break
      }
    }

    if (isValid) error.value = undefined
    validated.value = isValid

    return isValid
  }
  /** Добавить валидацию после инициализиации поля */
  function addValidator(validator: ValidatorCallback<any>) {
    validators.push(validator)
  }

  return {
    value,
    error,
    validate,
    validated,
    addValidator,
  }
}

/** Создание формы валидации. Объединяет вызовы useValidationField с возможностью доступа к значению и ошибке каждого поля через методы getFieldRefs и getErrorRefs
 *
 * @param validationFields объект, ключи которого - названия полей, а значения - результат вызова useValidationField
 *
 * @param options опции валидации (см. IValidationFormOptions)
 */
export function useValidationForm<T extends TFormValidationField, Key extends keyof T>(
  validationFields: T,
  options: IValidationFormOptions = {},
) {
  /** Вызывает метод validate у каждого поля. При наличии ошибки хотя бы в одном поле - выдаст false, иначе - true */
  function validateAll() {
    let isAllValid = true

    for (let field of Object.values(validationFields)) {
      const v = field.validate()
      if (!v) {
        isAllValid = false
      }
    }

    if (!isAllValid) {
      options.scrollToWhenFailed?.value?.scrollIntoView()
    }

    return isAllValid
  }

  /** Связать поля: при изменении sourceField будет изменён и targetField. Полезно, например, для password + passwordConfirmation */
  function linkFields(sourceFieldKey: Key, targetFieldKey: Key) {
    watch(validationFields[sourceFieldKey].value, () => {
      validationFields[targetFieldKey].validate()
    })
  }

  /** Возвращает ref'ы значений полей (названия полей соответствуют ключам в validationFields) */
  function getFieldRefs() {
    const fields: Record<Key, Ref> = {} as Record<Key, Ref>

    for (let [fieldName, fieldData] of Object.entries(validationFields)) {
      fields[fieldName as Key] = fieldData.value
    }

    return fields
  }

  /** Возвращает ref'ы ошибок полей (названия полей соответствуют ключам в validationFields) */
  function getErrorRefs() {
    const errors: Record<Key, Ref> = {} as Record<Key, Ref>

    for (let [fieldName, fieldData] of Object.entries(validationFields)) {
      errors[fieldName as Key] = fieldData.error
    }

    return errors
  }

  return {
    validateAll,
    getErrorRefs,
    fields: validationFields,
    linkFields,
    getFieldRefs,
  }
}
