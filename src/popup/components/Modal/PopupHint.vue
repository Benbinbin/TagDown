<template>
  <div class="p-2 fixed top-0 inset-x-0 z-50 ">
    <div
      class="modal w-full px-1 py-0.5 bg-white opacity-90 hover:opacity-100 space-y-0.5 rounded shadow"
      @mouseenter="$emit('enter-popup')"
      @mouseleave="$emit('leave-popup')"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
  },
  emits: ['enter-popup', 'leave-popup'],
  setup() { },
};
</script>

<style lang="scss" scoped>
.modal {
    max-height: 12rem;
    overflow: overlay;
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: #9ca3af;
        // border: 3px solid transparent;
        // background-clip: padding-box;
    }

    transition: opacity 300ms ease-in-out;
}
</style>
