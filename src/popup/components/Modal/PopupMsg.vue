<template>
  <teleport to="body">
    <div class="all-center fixed inset-0 z-40">
      <div
        class="modal-background absolute inset-0 bg-black opacity-25"
        @click="showModal = false"
      />
      <transition
        name="bounce"
        @after-leave="$emit('update:show', false)"
      >
        <div
          v-show="showModal"
          class="modal relative z-50 bg-white rounded shadow"
        >
          <slot name="msg">
            <p class="p-4 text-sm font-bold">
              消息内容
            </p>
          </slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
  props: {
    show: Boolean,
  },
  emits: ['update:show'],
  setup(props, context) {
    // show modal
    const showModal = ref(false);
    // console.log(props.show);
    onMounted(() => {
      if (props.show) {
        showModal.value = true;
      }
    });

    return {
      showModal,
    };
  },
};
</script>
<style lang="scss" scoped>
.all-center {
    @apply flex justify-center items-center;
}

.bounce-enter-active {
    // transition: all 400ms ease-in-out;
    animation: bounce-in 350ms;
}

.bounce-leave-active {
    // transition: all 400ms ease-in-out;
    animation: bounce-out 350ms;
}

@keyframes bounce-in {
    from,
    20%,
    40%,
    60%,
    80%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        transform: scale(0.3);
    }

    20% {
        transform: scale(1.1);
    }

    40% {
        transform: scale(0.9);
    }

    60% {
        opacity: 1;
        transform: scale(1.03);
    }

    80% {
        transform: scale(0.97);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes bounce-out {
    20% {
        transform: scale(0.9);
    }

    50%,
    55% {
        opacity: 1;
        transform: scale(1.1);
    }

    to {
        opacity: 0;
        transform: scale(0.3);
    }
}
</style>
