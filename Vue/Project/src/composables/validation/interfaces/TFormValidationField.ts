import { useValidationField } from "../useValidation"

/** ключ (string) - название поля, значение - форма валидации */
export type TFormValidationField = Record<string, ReturnType<typeof useValidationField>>