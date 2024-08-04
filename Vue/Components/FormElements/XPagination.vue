<template>
  <div class="pagination">
    <XButton
      v-for="num in pagesToShow"
      :key="num"
      :label="num.toString()"
      class="pagination__button"
      :active="activePage === num"
      :purpose="buttonPurpose"
      @click="activePage = num"
    />
    <template v-if="lastShownPage !== pages">
      <XButton
        v-if="lastShownPage !== pages - 1"
        class="pagination__button"
        label="..."
        :purpose="buttonPurpose"
        @click="activePage = lastShownPage + 1"
      />
      <XButton
        class="pagination__button"
        :label="pages.toString()"
        :purpose="buttonPurpose"
        @click="activePage = pages"
        :active="activePage === pages"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import XButton from "~/components/Blocks/XButton.vue";

const props = withDefaults(
  defineProps<{
    totalItems: number;
    perPage: number;
    modelValue: number;
    showPages?: number;
  }>(),
  {
    showPages: 5,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", page: typeof props.modelValue): void;
}>();

const buttonPurpose = "tag";

const pages = computed(() => {
  return Math.ceil(props.totalItems / props.perPage);
});
const pagesToShow = computed(() => {
  let first = activePage.value - Math.floor(props.showPages / 2);
  if (first < 1) first = 1;
  let last = first + props.showPages - 1;
  if (last > pages.value) {
    last = pages.value;
    first = last - props.showPages + 1;
  }

  let arr: number[] = [];
  for (let n = first; n <= last; n++) {
    arr.push(n);
  }
  return arr;
});
const lastShownPage = computed(() => {
  return pagesToShow.value[pagesToShow.value.length - 1];
});

const activePage = computed({
  get() {
    return props.modelValue;
  },
  set(value: typeof props.modelValue) {
    let _value = value;
    if (value > pages.value) _value = pages.value;
    if (value < 1) _value = 1;
    emit("update:modelValue", _value);
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  flex-wrap: wrap;

  &__button {
    min-width: 3.125rem;

    &:not(:hover):not(.active) {
      background-color: transparent;
    }
  }

  @include adaptive(phone) {
    &__button {
      min-width: 2.5rem;
    }
  }
}
</style>
