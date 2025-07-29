import { computed } from "vue";

export type ButtonType = 'primary' | 'secondary';
export type ButtonTypeAttribute = 'button' | 'submit' | 'reset';

export function useButtonClass(props: { buttonType: ButtonType; disabled?: boolean }) {
  return computed(() => [`--${props.buttonType}`, { '--disabled': props.disabled }]);
}
