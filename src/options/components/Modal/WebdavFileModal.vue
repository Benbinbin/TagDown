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
          class="modal relative z-50 flex flex-col bg-white rounded shadow"
        >
          <h2 class="p-8 text-xl text-center font-bold">
            选择需要恢复的备份文件
          </h2>
          <div
            v-if="filesArr.length===0"
            class="p-4"
          >
            <p class="text-gray-400 text-xl text-center font-bold">
              无记录
            </p>
          </div>
          <div
            v-else
            class="modal-body flex-grow px-8 py-4 flex flex-col space-y-2"
          >
            <button
              v-for="file of filesArr"
              :key="file.basename"
              class="p-4 flex flex-col space-y-2 rounded"
              :class="{
                'text-gray-800 bg-gray-50 hover:bg-gray-100': selectFile!==file.basename,
                'text-white bg-blue-400 hover:bg-blue-600': selectFile===file.basename
              }"
              @click="selectFile=file.basename"
            >
              <span class="text-base font-bold">{{ file.basename }}</span>
              <span class="text-xs">最后更新时间 {{ lastUpdateTime(file.lastmod) }}</span>
            </button>
          </div>

          <div class="p-2 all-center space-x-4">
            <button
              class="px-2 py-1 text-sm text-white bg-red-400 hover:bg-red-600 rounded"
              :class="{
                'opacity-10': filesArr.length === 0 || !selectFile
              }"
              :disabled="filesArr.length === 0 || !selectFile"
              @click="resultHandler(true)"
            >
              确定
            </button>
            <button
              class="px-2 py-1 text-sm text-white bg-green-400 hover:bg-green-600 rounded"
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

export default {
  props: {
    show: Boolean,
    filesArr: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ['update:show', 'result'],
  setup(props, context) {
    // show modal
    const showModal = ref(false);
    // console.log(props.show);

    onMounted(() => {
      if (props.show) {
        showModal.value = true;
      }
    });

    const lastUpdateTime = (time) => {
      const date = new Date(time);
      return date.toLocaleString();
    };

    const selectFile = ref('');
    // handler result
    const resultHandler = (value) => {
      context.emit('result', {
        state: value,
        filename: selectFile.value,
      });
      showModal.value = false;
    };

    return {
      showModal,
      lastUpdateTime,
      selectFile,
      resultHandler,
    };
  },
};
</script>
<style lang="scss" scoped>
.all-center {
    @apply flex justify-center items-center;
}

.modal {
  max-height: 80%;
}

.modal-body {
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #9ca3af;
    // border: 3px solid transparent;
    // background-clip: padding-box;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #4b5563;
  }
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
