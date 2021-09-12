<template>
  <div class="fixed inset-0 z-10">
    <div
      class="modal-background absolute inset-0"
      @click="$emit('update:show', false)"
    />
    <div
      ref="modal"
      class="absolute z-20 p-2 bg-white space-y-0.5 rounded shadow"
      :class="{ 'transform -translate-x-full': isTranslateX, 'transform -translate-y-full': isTranslateY }"
      :style="{ width: 'fit-content', left: `${left}px`, top: `${top}px` }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:show'],
  setup(props) {
    const isTranslateX = computed(() => document.documentElement.clientWidth - props.left - 160 < 0);

    const isTranslateY = computed(() => document.documentElement.clientHeight - props.top - 120 < 0);

    return {
      isTranslateX,
      isTranslateY,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
