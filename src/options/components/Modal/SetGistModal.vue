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
          class="modal w-4/5 md:w-1/2 lg:w-2/5 p-4 relative z-50 flex flex-col bg-white rounded shadow"
        >
          <h2
            for="input-modal"
            class="p-4 text-xl text-center font-bold"
          >
            设置 Gist 参数
          </h2>
          <div class="modal-body flex-grow p-4 flex flex-col space-y-4">
            <div class="p-4 space-y-2 border-2 border-gray-200 border-dashed rounded">
              <label
                for="input-name"
                class="flex-shrink-0 text-gray-600 text-base font-bold"
                :class="{
                  'opacity-50': gistInit || inputIdValue !== ''
                }"
              >Name</label>
              <input
                id="input-name"
                ref="inputElem"
                v-model="inputNameValue"
                type="text"
                name="input-name"
                placeholder="(二选一）输入 Gist 名称"
                class="w-full p-1 border border-gray-200 rounded"
                :disabled="gistInit || inputIdValue !== ''"
              >
            </div>
            <div class="p-4 space-y-2 border-2 border-gray-200 border-dashed rounded">
              <label
                for="input-id"
                class="text-gray-600 text-base font-bold"
                :class="{
                  'opacity-50': gistInit || inputNameValue !== ''
                }"
              >ID</label>
              <input
                id="input-id"
                v-model="inputIdValue"
                type="text"
                name="input-id"
                placeholder="(二选一）输入 Gist ID，若省略则生成新的 Gist"
                class="w-full p-1 border border-gray-200 rounded"
                :disabled="gistInit || inputNameValue !== ''"
              >
            </div>
            <div
              class="p-4 flex items-center space-x-4 border-2 border-gray-200 border-dashed rounded"
              :class="{
                'opacity-50': gistInit
              }"
            >
              <span class="text-gray-600 text-base font-bold">Type</span>
              <div class="px-2 py-1 flex items-center hover:bg-gray-200 rounded space-x-0.5">
                <input
                  id="public"
                  v-model="gistType"
                  type="radio"
                  value="public"
                  :disabled="gistInit"
                >
                <label for="public">Public</label>
              </div>
              <div class="px-2 py-1 flex items-center hover:bg-gray-200 rounded space-x-0.5">
                <input
                  id="secret"
                  v-model="gistType"
                  type="radio"
                  value="secret"
                  :disabled="gistInit"
                >
                <label for="secret">Secret</label>
              </div>
            </div>
            <div class="p-4 space-y-2 border-2 border-gray-200 border-dashed rounded">
              <p class="flex-shrink-0 text-gray-600 text-base font-bold">
                Description
              </p>
              <textarea
                v-model="inputDesValue"
                class="w-full p-1 border border-gray-200 rounded"
                placeholder="（可选）输入 Gist 描述"
              />
            </div>
            <div class="p-4 space-y-2 border-2 border-gray-200 border-dashed rounded">
              <div class="flex justify-between items-center">
                <p class="text-gray-600 text-base font-bold">
                  Group
                </p>
                <div class="flex items-center space-x-2">
                  <button
                    titile="select all groups"
                    class="px-2 py-1 text-xs text-white bg-green-400 hover:bg-green-600 rounded"
                    @click="selectGroups = new Set(allGroups)"
                  >
                    全选
                  </button>
                  <button
                    title="unselect all groups"
                    class="px-2 py-1 text-xs text-white bg-red-400 hover:bg-red-600 rounded"
                    @click="selectGroups.clear()"
                  >
                    全不选
                  </button>
                </div>
              </div>
              <div class="pr-2 flex flex-wrap">
                <button
                  v-for="group of allGroups"
                  :key="group"
                  title="toggle select group"
                  class="p-1 mt-2 ml-2 flex items-center border-2 border-green-400 space-x-1 rounded"
                  :class="{
                    'text-green-600 hover:text-white hover:bg-green-400 ': !selectGroups.has(group),
                    'text-white bg-green-400 hover:bg-green-600': selectGroups.has(group)
                  }"
                  @click="toggleGroupHandler(group)"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M42.6412 15.0387C42.6367 15.0302 42.6333 15.0215 42.6284 15.0131C42.6265 15.0096 42.6239 15.0062 42.6218 15.0027C42.374 14.5747 42.0172 14.221 41.5882 13.9781L26.3576 5.35549C25.9426 5.12238 25.4753 5 25 5C24.5247 5 24.0574 5.12238 23.6424 5.35549L8.41144 13.9781C7.98088 14.2222 7.6231 14.5778 7.37523 15.0081C7.37263 15.0128 7.36935 15.017 7.36658 15.0218C7.3626 15.0293 7.35948 15.0372 7.35533 15.0448C7.12275 15.4609 7.00039 15.9302 7 16.4075V33.5903C7.00036 34.0848 7.13125 34.5703 7.37928 34.9972C7.62731 35.424 7.98358 35.7769 8.41162 36.0196L23.6426 44.6422C24.0262 44.8581 24.4555 44.9788 24.8948 44.9944C24.9263 44.9969 24.9576 44.9997 24.9896 45H25.0021C25.0457 45 25.0888 44.9976 25.1314 44.9936C25.5617 44.9743 25.9817 44.854 26.3576 44.6422L41.5884 36.0196C42.0165 35.7769 42.3728 35.424 42.6209 34.9971C42.8689 34.5701 42.9998 34.0845 43 33.59V16.4075C42.9996 15.9278 42.876 15.4564 42.6412 15.0389V15.0387ZM25 7.78479L38.8017 15.5984L33.5021 18.6287L19.5377 10.8771L25 7.78479ZM25.1575 23.3998L11.2194 15.5864L16.6991 12.4842L30.6774 20.2436L25.1575 23.3998ZM26.4057 41.417L26.5418 25.8138L32.1 22.6358V29.2684C32.1 29.638 32.2458 29.9925 32.5055 30.2538C32.7652 30.5151 33.1174 30.662 33.4846 30.662C33.8518 30.662 34.204 30.5151 34.4636 30.2538C34.7233 29.9925 34.8692 29.638 34.8692 29.2684V21.0524L40.2308 17.9868V33.5902L26.4057 41.417Z"
                    />
                  </svg>
                  <span class="text-xs">{{ group }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="p-4 all-center space-x-4">
            <button
              class="px-2 py-1 text-white text-base bg-green-400 hover:bg-green-600 rounded"
              :class="{
                'opacity-10': selectGroups.size === 0 || (!inputNameValue && !inputIdValue)
              }"
              :disabled="selectGroups.size === 0 || (!inputNameValue && !inputIdValue)"
              @click="resultHandler(true)"
            >
              确定
            </button>
            <button
              class="px-2 py-1 text-white text-base bg-gray-400 hover:bg-gray-600 rounded"
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
import { onMounted, ref, inject } from 'vue';
import useGist from '@/composables/useGist';

export default {
  props: {
    show: Boolean,
    gistInit: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['update:show', 'result'],
  setup(props, context) {
    const {
      setGithubToken, getGithubToken, createGist, updateGist,
    } = useGist();

    // show modal
    const showModal = ref(false);

    // focus input
    const inputElem = ref(null);
    const focusInputHandler = () => {
      if (inputElem.value) inputElem.value.focus();
    };

    // id
    const inputIdValue = ref('');

    // filename
    const inputNameValue = ref('');

    // public type
    const gistType = ref('secret');

    // description
    const inputDesValue = ref('');

    // groups
    const db = inject('db');

    const allGroups = ref([]);
    const selectGroups = ref(new Set());
    onMounted(async () => {
      allGroups.value = await db.bookmark.orderBy('groups').uniqueKeys();
    });
    const toggleGroupHandler = (group) => {
      if (selectGroups.value.has(group)) {
        selectGroups.value.delete(group);
      } else {
        selectGroups.value.add(group);
      }
    };

    // set init data
    onMounted(async () => {
      const date = new Date();
      inputNameValue.value = `bookmrks_tagdown_${date.getTime()}`;
      if (props.gistInit) {
        inputIdValue.value = props.gistInit.gistId;
        inputNameValue.value = props.gistInit.filename;
        gistType.value = props.gistInit.gistType;
        inputDesValue.value = props.gistInit.description;
        selectGroups.value = new Set(props.gistInit.groups);
      }
      if (props.show) {
        showModal.value = true;
      }
    });

    // handler result and value
    const resultHandler = async (value) => {
      if (value) {
        context.emit('result', {
          gistId: inputIdValue.value,
          groups: [...selectGroups.value],
          filename: inputNameValue.value,
          gistType: gistType.value,
          description: inputDesValue.value,
        });
      }
      showModal.value = false;
    };

    return {
      showModal,
      inputElem,
      focusInputHandler,
      inputIdValue,
      inputNameValue,
      gistType,
      inputDesValue,
      allGroups,
      selectGroups,
      toggleGroupHandler,
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
