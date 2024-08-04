export interface IDropdownOption {
  value: string
  label?: string
  icon?: string
}
export type DropdownOption = string | IDropdownOption
