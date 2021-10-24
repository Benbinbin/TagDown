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
          class="modal p-4 relative z-50 bg-white rounded shadow"
        >
          <h2
            for="input-modal"
            class="p-4 text-xl text-center font-bold"
          >
            请输入 Github 的访问令牌
          </h2>
          <p class="p-4 text-xs text-center text-gray-400">
            可以<a
              class="text-blue-500"
              href="https://github.com/settings/tokens/new"
              target="_blank"
            >在此</a>申请 Token，请注意<span class="font-bold text-gray-600">有效期</span>，更多信息请参考<a
              class="text-blue-500"
              href="https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
              target="_blank"
            >官方文档</a>
          </p>

          <input
            id="input-modal"
            ref="inputElem"
            v-model="inputValue"
            type="text"
            name="input-modal"
            placeholder="请输入 token"
            class="w-full p-1 border border-gray-300 rounded"
          >

          <div class="p-4 all-center space-x-4">
            <button
              class="px-2 py-1 text-white text-base bg-green-400 hover:bg-green-600 rounded"
              :class="{
                'opacity-10': !inputValue
              }"
              :disabled="!inputValue"
              @click="resultHandler(true)"
            >
              确定
            </button>
            <button
              class="px-2 py-1 text-white text-base  bg-gray-400 hover:bg-gray-600 rounded"
              @click="resultHandler(false)"
            >
              取消
            </button>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>
<script>
import { onMounted, ref } from 'vue';
import useGist from '@/composables/useGist';

export default {
  props: {
    show: Boolean,
  },
  emits: ['update:show', 'update-token-state'],
  setup(props, context) {
    const {
      setGithubToken, getGithubToken,
    } = useGist();

    // show modal
    const showModal = ref(false);

    // focus input
    const inputElem = ref(null);
    const focusInputHandler = () => {
      if (inputElem.value) inputElem.value.focus();
    };

    const inputValue = ref('');

    onMounted(async () => {
      inputValue.value = await getGithubToken();
      if (props.show) {
        showModal.value = true;
      }
    });

    // handler result and value

    const resultHandler = async (value) => {
      if (value && inputValue.value) {
        await setGithubToken(inputValue.value);
        context.emit('update-token-state');
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
