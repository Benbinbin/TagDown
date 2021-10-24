<template>
  <div
    v-if="node"
  >
    <div class="flex items-start space-x-0.5">
      <!-- triangle toggle button -->
      <button
        v-if="childrenNodes.length > 0"
        title="toggle show children nodes"
        class="flex-shrink-0 py-1 text-gray-600 hover:bg-gray-200   transition-transform duration-300 rounded-sm"
        :class="{ 'transform rotate-90': showChildren }"
        @click="showChildren = !showChildren"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 7.72733V42.2727C15 42.6143 15.1026 42.9483 15.2949 43.2323C15.4872 43.5164 15.7605 43.7378 16.0803 43.8685C16.4001 43.9993 16.7519 44.0335 17.0914 43.9668C17.4309 43.9002 17.7427 43.7356 17.9875 43.4941L35.4874 26.2214C35.6499 26.061 35.7788 25.8706 35.8668 25.661C35.9547 25.4515 36 25.2268 36 25C36 24.7732 35.9547 24.5486 35.8668 24.339C35.7788 24.1294 35.6499 23.939 35.4874 23.7786L17.9875 6.50594C17.7427 6.26436 17.4309 6.09985 17.0914 6.03319C16.7519 5.96654 16.4001 6.00075 16.0803 6.13148C15.7605 6.26222 15.4872 6.48362 15.2949 6.76768C15.1026 7.05174 15 7.3857 15 7.72733Z"
          />
        </svg>
      </button>
      <div
        v-else
        class="w-4 h-6"
      />
      <!-- folder button -->
      <button
        title="folder button left click to select, right click to  show the more setting popup menu"
        class=" p-1 flex items-start text-yellow-400 space-x-0.5 rounded-sm"
        :class="{
          'hover:bg-gray-200': !nodeSelectState,
          'bg-green-400 hover:bg-green-600': nodeSelectState,
        }"
        @click.left="setCandidateFolderHandler(node)"
        @click.right.prevent="showPopupMenuHandler(node, $event)"
        @mouseenter.ctrl="showPopupHintHandler(node)"
        @mouseleave="hidePopupHintHandler"
      >
        <svg
          class="flex-shrink-0 w-4 h-4"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M41 14H25.1212L20 8.87901C19.7222 8.5995 19.3916 8.37788 19.0276 8.227C18.6635 8.07612 18.2731 7.99896 17.879 8.00001H8C7.20459 8.0008 6.44199 8.31713 5.87956 8.87957C5.31712 9.442 5.00079 10.2046 5 11V38.1157C5.00104 38.8806 5.30544 39.6138 5.84641 40.1545C6.38738 40.6952 7.12075 40.9993 7.88562 41H41.1669C41.918 40.999 42.638 40.7002 43.1691 40.1691C43.7002 39.638 43.999 38.918 44 38.1669V17.0002C43.9992 16.2048 43.6829 15.4422 43.1204 14.8798C42.558 14.3173 41.7954 14.001 41 14.0002V14ZM8 11H17.879L20.879 14H8V11Z"
          />
        </svg>
        <span
          class="text-xs"
          :class="{
            'text-gray-600': !nodeSelectState,
            'text-white': nodeSelectState,
          }"
        >{{ node.id === '0' ? 'root' : node.title }}</span>
      </button>
    </div>
    <div
      v-show="childrenNodes.length > 0 && showChildren"
      class="pl-5 pr-1"
    >
      <div
        :class="{
          'border border-gray-200 border-dashed rounded': showChildren
        }"
      >
        <FolderItem
          v-for="child of childrenNodes"
          :key="child.id"
          :node="child"
          @expand-folder="expandFolderHandler"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  ref, computed, watch, inject,
} from 'vue';

export default {
  name: 'FolderItem',
  props: {
    node: {
      type: Object,
      default() {
        return {};
      },
    },
    showChildrenInit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['expand-folder'],
  setup(props, context) {
    // children nodes
    const showChildren = ref(props.showChildrenInit);

    const childrenNodes = computed(() => {
      if (!props.node) return [];
      return props.node.children.filter((item) => item.children);
    });

    // candidate
    const candidateFolder = inject('candidateFolder');
    const nodeSelectState = computed(() => {
      if (!props.node) return false;
      return props.node.id === candidateFolder.value.id;
    });

    const setCandidateFolderHandler = inject('setCandidateFolderHandler');

    const showCandidateFolder = inject('showCandidateFolder');
    watch(showCandidateFolder, (value, preValue) => {
      if (!preValue && value && nodeSelectState.value) {
        context.emit('expand-folder');
      }
    });

    const expandFolderHandler = () => {
      showChildren.value = true;
      context.emit('expand-folder');
    };

    // hint
    const showPopupHintHandler = inject('showPopupHintHandler');
    const hidePopupHintHandler = inject('hidePopupHintHandler');

    // popup menu
    const showPopupMenuHandler = inject('showPopupMenuHandler');

    return {
      showChildren,
      childrenNodes,
      candidateFolder,
      nodeSelectState,
      expandFolderHandler,
      setCandidateFolderHandler,
      showPopupHintHandler,
      hidePopupHintHandler,
      showPopupMenuHandler,
    };
  },
};
</script>
<style lang="scss" scoped>
.btn {
    @apply hover:bg-gray-200 rounded;
}
</style>
