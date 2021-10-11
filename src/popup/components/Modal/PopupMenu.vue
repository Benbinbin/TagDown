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
import { ref, onMounted } from 'vue';

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
    menuWidth: {
      type: Number,
      default: 0,
    },
    menuHeight: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:show'],
  setup(props) {
    const isTranslateX = ref(false);
    const isTranslateY = ref(false);

    onMounted(() => {
      // console.log(props.left);
      // console.log(document.documentElement.clientWidth);
      // console.log(window.innerWidth);
      // console.log(document.documentElement.clientWidth - props.left - 160);
      isTranslateX.value = document.documentElement.clientWidth - props.left - props.menuWidth < 0;

      // console.log(props.top);
      // console.log(document.documentElement.clientHeight);
      // console.log(window.innerHeight);
      // console.log(document.documentElement.clientHeight - props.top - 120);
      isTranslateY.value = document.documentElement.clientHeight - props.top - props.menuHeight < 0;
    });

    return {
      isTranslateX,
      isTranslateY,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
