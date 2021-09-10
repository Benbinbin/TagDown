<template>
  <div class="relative">
    <div class="label-style">
      <slot name="labelIcon" />
      <slot name="labeName" />
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="item of items"
        :key="item"
        class="mt-2 ml-2 flex flex-wrap items-center"
      >
        <button
          title="delete folder item"
          class="p-1 text-red-400 bg-gray-200 hover:text-white hover:bg-red-400 rounded-l-sm"
        >
          <slot name="itemIcon" />
        </button>
        <span
          title="locate folder item"
          class="p-1 text-xs text-white bg-green-400 rounded-r-sm"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div class="input-style mt-2 flex items-center space-x-1">
      <input
        v-model="inputText"
        class="flex-grow border-0"
        type="text"
        :placeholder="placeholder"
        @input="showCandidatePopup = true"
        @blur="showCandidatePopup = false"
      >

      <div
        v-show="showCandidatePopup"
        class="wrapper h-0 absolute -bottom-1 inset-x-0 z-10 select-none"
      >
        <div
          class="candidates-popup w-full p-2 flex flex-wrap absolute border border-gray-300 bg-white rounded shadow"
        >
          <button
            v-for="candidate of filterCandidates"
            :key="candidate"
            class="p-1 ml-2 mt-2 text-xs text-white bg-green-400 hover:bg-green-600 rounded"
          >
            {{ candidate }}
          </button>
        </div>
      </div>

      <button
        title="clear input text"
        class="btn text-red-400 hover:text-white hover:bg-red-400"
        :class="{ 'opacity-0': !inputText }"
        @click="inputText = ''"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.6485 34.9514C36.8736 35.1765 37 35.4817 37 35.8C37 36.1182 36.8736 36.4235 36.6485 36.6485C36.4235 36.8736 36.1182 37 35.8 37C35.4817 37 35.1765 36.8736 34.9514 36.6485L25 26.6969L15.0486 36.6485C14.8235 36.8736 14.5183 37 14.2 37C13.8818 37 13.5765 36.8736 13.3515 36.6485C13.1264 36.4235 13 36.1182 13 35.8C13 35.4817 13.1264 35.1765 13.3515 34.9514L23.3031 25L13.3515 15.0486C13.1264 14.8235 13 14.5183 13 14.2C13 13.8818 13.1264 13.5765 13.3515 13.3515C13.5765 13.1264 13.8818 13 14.2 13C14.5183 13 14.8235 13.1264 15.0486 13.3515L25 23.3031L34.9514 13.3515C35.1765 13.1264 35.4817 13 35.8 13C36.1182 13 36.4235 13.1264 36.6485 13.3515C36.8736 13.5765 37 13.8818 37 14.2C37 14.5183 36.8736 14.8235 36.6485 15.0486L26.6969 25L36.6485 34.9514Z"
          />
        </svg>
      </button>
      <button
        title="show candidate items"
        class="text-gray-300 hover:text-gray-600 transition-transform duration-300"
        :class="{ 'transform rotate-180': showCandidatePopup }"
        @click="showCandidatePopup = !showCandidatePopup"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.50594 16.9875L23.7786 34.4874C23.939 34.6499 24.1294 34.7788 24.339 34.8668C24.5485 34.9547 24.7732 35 25 35C25.2268 35 25.4514 34.9547 25.661 34.8668C25.8706 34.7788 26.061 34.6499 26.2214 34.4874L43.4941 16.9875C43.7356 16.7427 43.9002 16.4309 43.9668 16.0914C44.0335 15.7519 43.9993 15.4001 43.8685 15.0803C43.7378 14.7605 43.5164 14.4872 43.2323 14.2949C42.9483 14.1026 42.6143 14 42.2727 14H7.72733C7.3857 14 7.05174 14.1026 6.76768 14.2949C6.48362 14.4872 6.26222 14.7605 6.13148 15.0803C6.00075 15.4001 5.96655 15.7519 6.0332 16.0914C6.09985 16.4309 6.26436 16.7427 6.50594 16.9875Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';

export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    candidates: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
  },
  setup(props) {
    // input
    const inputText = ref('');
    const filterCandidates = computed(() => {
      if (!inputText.value) return props.candidates;
      return props.candidates.filter((candidate) => candidate.toLowerCase().includes(inputText.value.toLowerCase()));
    });

    // popup
    const showCandidatePopup = ref(false);

    return {
      inputText,
      filterCandidates,
      showCandidatePopup,
    };
  },
};
</script>

<style lang="scss">
.label-style {
    @apply flex items-center text-gray-600 space-x-0.5;
}

.input-style {
    @apply w-full p-1 border border-gray-300 rounded;
}

.btn {
    @apply p-1 text-green-400 hover:text-white hover:bg-green-400 rounded;
}

.candidates-popup {
    max-height: 5rem;
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
</style>
