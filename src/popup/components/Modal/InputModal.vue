<template>
  <teleport to="body">
    <div class="all-center fixed inset-0 z-40">
      <div
        class="modal-background absolute inset-0 bg-black opacity-25"
        @click="showModal = false"
      />
      <transition
        name="bounce"
        @after-enter="focusInputHandler"
        @after-leave="$emit('update:show', false)"
      >
        <div
          v-show="showModal"
          class="modal relative z-50 bg-white rounded shadow"
        >
          <slot name="title">
            <label
              for="input-modal"
              class="block p-4 text-sm text-center font-bold"
            >
              标题
            </label>
          </slot>
          <slot
            name="input"
            :inputValue="inputValue"
          >
            <input
              id="input-modal"
              ref="inputElem"
              v-model="inputValue"
              type="text"
              name="input-modal"
              :placeholder="placeholder"
              class="m-2 p-1 border border-gray-300 rounded"
            >
          </slot>
          <slot
            name="btn"
            :resultHandler="resultHandler"
          >
            <div class="p-2 all-center space-x-2">
              <button
                class="p-1 text-white bg-red-400 hover:bg-red-600 rounded"
                @click="resultHandler(true)"
              >
                确定
              </button>
              <button
                class="p-1 text-white bg-green-400 hover:bg-green-600 rounded"
                @click="resultHandler(false)"
              >
                取消
              </button>
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>
<script>
import { onMounted, ref, nextTick } from 'vue';

export default {
  props: {
    show: Boolean,
    initValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
  },
  emits: ['update:show', 'result'],
  setup(props, context) {
    // show modal
    const showModal = ref(false);

    onMounted(() => {
      if (props.show) {
        showModal.value = true;
      }
    });

    // focus input
    const inputElem = ref(null);
    const focusInputHandler = () => {
      if (inputElem.value) inputElem.value.focus();
    };

    // handler result and value
    const inputValue = ref(props.initValue);
    const resultHandler = (value) => {
      if (value && inputValue.value !== props.initValue) {
        context.emit('result', {
          state: true,
          value: inputValue.value,
        });
      } else {
        context.emit('result', {
          state: false,
          value: props.initValue,
        });
      }
      showModal.value = false;
    };

    return {
      showModal,
      inputElem,
      focusInputHandler,
      inputValue,
      resultHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
.all-center {
    @apply flex justify-center items-center;
}

.bounce-enter-active {
    animation: bounce-in 350ms;
}

.bounce-leave-active {
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
