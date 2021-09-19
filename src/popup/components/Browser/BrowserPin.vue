<template>
  <div class="w-full px-8 py-4 grid grid-flow-row-dense grid-cols-4 gap-x-2 gap-y-1">
    <div
      v-for="node of pinNodes"
      :key="node.id"
      class="grid-item space-y-1 rounded"
      :class="{
        'bg-gray-100': unfoldFolders.has(node.id),
        'row-span-2': unfoldFolders.has(node.id) && node.children.length === 1,
        'row-span-3': unfoldFolders.has(node.id) && node.children.length === 2,
        'row-span-4': unfoldFolders.has(node.id) && node.children.length === 3,
        'row-span-5': unfoldFolders.has(node.id) && node.children.length >= 4,
      }"
    >
      <div
        class="p-1 flex items-start rounded"
        :class="{
          'bg-gray-50': !selectNodes.has(node.id),
          'bg-blue-400': selectNodes.has(node.id),
        }"
      >
        <!-- folder node -->
        <button
          v-if="node.children"
          class="flex-grow p-0.5 flex items-start space-x-0.5 rounded-sm"
          :class="{
            'text-white hover:bg-blue-600': selectNodes.has(node.id),
            'text-yellow-400 hover:bg-gray-200 ': !selectNodes.has(node.id)
          }"
          @click.ctrl.exact="selectNodeHandler(node.id)"
          @click.exact="toggleFolderState(node)"
        >
          <svg
            v-if="node.children.length > 0 && !unfoldFolders.has(node.id)"
            class="flex-shrink-0 w-4 h-4"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41 14H25.1212L20 8.87901C19.7222 8.5995 19.3916 8.37788 19.0276 8.227C18.6635 8.07612 18.2731 7.99896 17.879 8.00001H8C7.20459 8.0008 6.44199 8.31713 5.87956 8.87957C5.31712 9.442 5.00079 10.2046 5 11V38.1157C5.00104 38.8806 5.30544 39.6138 5.84641 40.1545C6.38738 40.6952 7.12075 40.9993 7.88562 41H41.1669C41.918 40.999 42.638 40.7002 43.1691 40.1691C43.7002 39.638 43.999 38.918 44 38.1669V17.0002C43.9992 16.2048 43.6829 15.4422 43.1204 14.8798C42.558 14.3173 41.7954 14.001 41 14.0002V14ZM8 11H17.879L20.879 14H8V11Z"
            />
          </svg>

          <svg
            v-if="node.children.length > 0 && unfoldFolders.has(node.id)"
            class="flex-shrink-0 w-4 h-4"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.4674 21.1866C43.2053 20.8197 42.861 20.5209 42.4626 20.3147C42.0643 20.1084 41.6233 20.0006 41.1758 20H38.8982V17.1429C38.8974 16.3854 38.5995 15.6591 38.0699 15.1235C37.5403 14.5879 36.8223 14.2866 36.0734 14.2857H23.8324L18.9361 10.5714C18.4464 10.2017 17.852 10.0013 17.241 10H7.82485C7.07591 10.0009 6.35789 10.3021 5.82831 10.8378C5.29873 11.3734 5.00084 12.0996 5 12.8571V38.5714C5 38.5805 5.00124 38.5893 5.00141 38.5984C5.00177 38.6186 5.00318 38.6384 5.00424 38.6586C5.00636 38.6925 5.00936 38.7263 5.01359 38.7596C5.01595 38.7777 5.01871 38.7958 5.02189 38.8137C5.02807 38.8504 5.03566 38.8863 5.04449 38.9218C5.0482 38.9366 5.05155 38.9514 5.05579 38.9661C5.06797 39.0088 5.0821 39.0504 5.09781 39.0912C5.10081 39.0987 5.10311 39.1066 5.10611 39.1141C5.12628 39.164 5.14927 39.2126 5.17496 39.2598C5.17779 39.265 5.18114 39.2698 5.18397 39.2748C5.20657 39.3153 5.23105 39.3543 5.25741 39.392C5.26077 39.3968 5.26324 39.402 5.2666 39.4068C5.27277 39.4155 5.28019 39.4229 5.28672 39.4316C5.341 39.5044 5.40214 39.5718 5.46928 39.6327C5.48058 39.6429 5.49135 39.6537 5.50282 39.6636C5.54204 39.6973 5.58307 39.7287 5.62571 39.7579L5.62924 39.76C5.67115 39.7881 5.71453 39.8139 5.75918 39.8373C5.77048 39.8432 5.78213 39.8484 5.79361 39.8541C5.84237 39.8782 5.89248 39.8994 5.94368 39.9177C5.97922 39.9303 6.01536 39.9415 6.05208 39.9513C6.06691 39.9554 6.08174 39.9595 6.09657 39.9629C6.13435 39.9716 6.17284 39.9782 6.21169 39.9839C6.22581 39.9859 6.2394 39.9888 6.25353 39.9904C6.30628 39.9966 6.35932 39.9998 6.41243 40H37.4858C37.7823 40 38.0712 39.9057 38.3117 39.7304C38.5522 39.555 38.7321 39.3077 38.8258 39.0232L43.8559 23.7607C43.9968 23.3311 44.0351 22.8739 43.9676 22.4264C43.9001 21.979 43.7287 21.5541 43.4674 21.1866ZM17.241 12.8571L22.1373 16.5714C22.627 16.9412 23.2213 17.1416 23.8324 17.1429H36.0734V20H13.0801C12.4871 19.9994 11.909 20.1879 11.4278 20.5386C10.9467 20.8892 10.5871 21.3844 10.4001 21.9536L7.82485 29.7682V12.8571H17.241Z"
            />
          </svg>

          <svg
            v-if="node.children.length === 0"
            class="flex-shrink-0 w-4 h-4"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41 14.1818H25.1214L20 8.90545C19.7221 8.61753 19.3915 8.38926 19.0274 8.23384C18.6633 8.07842 18.2729 7.99895 17.8788 8.00001H8C7.20462 8.00093 6.44208 8.32688 5.87967 8.90633C5.31725 9.48579 5.00089 10.2714 5 11.0909V39.0279C5.00084 39.8159 5.30504 40.5713 5.84584 41.1285C6.38664 41.6857 7.11988 41.9991 7.88469 42H41.1667C41.9179 41.9991 42.638 41.6913 43.1692 41.144C43.7004 40.5968 43.9992 39.8548 44 39.0808V17.2727C43.9991 16.4533 43.6827 15.6676 43.1203 15.0881C42.5579 14.5087 41.7954 14.1827 41 14.1818ZM17.8788 11.0909L20.8786 14.1818H8V11.0909H17.8788ZM41 38.9091H8V17.2727H41V38.9091Z"
            />
          </svg>

          <span
            class="node-title-style text-xs text-left"
            :class="{
              'text-white': selectNodes.has(node.id),
              'text-gray-600  ': !selectNodes.has(node.id)
            }"
          >{{ node.title }}</span>
        </button>
        <!-- bookmark node -->
        <button
          v-if="!node.children"
          class="flex-grow p-0.5 flex items-start space-x-0.5 rounded-sm"
          :class="{
            'text-white hover:bg-blue-600': selectNodes.has(node.id),
            'text-blue-400 hover:bg-gray-200 ': !selectNodes.has(node.id)
          }"
          @click.ctrl.exact="selectNodeHandler(node.id)"
          @click.exact="openBookmarkHandler(node)"
        >
          <div class="flex-shrink-0 p-0.5">
            <div
              class="bookmark-favicon w-3 h-3 bg-cover bg-center bg-no-repeat"
              :style="{
                backgroundImage:
                  'url(' + `https://www.youtube.com/s/desktop/4eebcda0/img/favicon_32x32.png` + ')',
              }"
            />
          </div>

          <span
            class="node-title-style text-xs text-left"
            :class="{
              'text-white': selectNodes.has(node.id),
              'text-gray-600  ': !selectNodes.has(node.id)
            }"
          >{{ node.title }}</span>
        </button>
        <!-- delete button -->
        <button
          title="copy bookmark url"
          class="p-0.5 hover:text-white hover:bg-red-400 rounded-sm "
          :class="{
            'text-white': selectNodes.has(node.id),
            'text-red-400': !selectNodes.has(node.id)
          }"
          @click="$emit('toggle-pin-node', node.id)"
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
      </div>

      <!-- unfold folder -->
      <div
        v-if="unfoldFolders.has(node.id)"
        class="unfold-folders-container px-2 py-0.5 space-y-1"
      >
        <div
          v-for="childNode of node.children"
          :key="childNode.id"
          class="p-1 flex items-start rounded"
          :class="{
            'bg-blue-400': selectNodes.has(childNode.id),
            'bg-gray-50': !selectNodes.has(childNode.id)
          }"
        >
          <button
            v-if="childNode.children"
            class="flex-grow p-0.5 flex items-start space-x-0.5 rounded-sm"
            :class="{
              'text-white hover:bg-blue-600': selectNodes.has(childNode.id),
              'text-yellow-400 hover:bg-gray-200 ': !selectNodes.has(childNode.id)
            }"
          >
            <svg
              v-if="childNode.children.length > 0"
              class="flex-shrink-0 w-4 h-4"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41 14H25.1212L20 8.87901C19.7222 8.5995 19.3916 8.37788 19.0276 8.227C18.6635 8.07612 18.2731 7.99896 17.879 8.00001H8C7.20459 8.0008 6.44199 8.31713 5.87956 8.87957C5.31712 9.442 5.00079 10.2046 5 11V38.1157C5.00104 38.8806 5.30544 39.6138 5.84641 40.1545C6.38738 40.6952 7.12075 40.9993 7.88562 41H41.1669C41.918 40.999 42.638 40.7002 43.1691 40.1691C43.7002 39.638 43.999 38.918 44 38.1669V17.0002C43.9992 16.2048 43.6829 15.4422 43.1204 14.8798C42.558 14.3173 41.7954 14.001 41 14.0002V14ZM8 11H17.879L20.879 14H8V11Z"
              />
            </svg>

            <svg
              v-if="childNode.children.length === 0"
              class="flex-shrink-0 w-4 h-4"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41 14.1818H25.1214L20 8.90545C19.7221 8.61753 19.3915 8.38926 19.0274 8.23384C18.6633 8.07842 18.2729 7.99895 17.8788 8.00001H8C7.20462 8.00093 6.44208 8.32688 5.87967 8.90633C5.31725 9.48579 5.00089 10.2714 5 11.0909V39.0279C5.00084 39.8159 5.30504 40.5713 5.84584 41.1285C6.38664 41.6857 7.11988 41.9991 7.88469 42H41.1667C41.9179 41.9991 42.638 41.6913 43.1692 41.144C43.7004 40.5968 43.9992 39.8548 44 39.0808V17.2727C43.9991 16.4533 43.6827 15.6676 43.1203 15.0881C42.5579 14.5087 41.7954 14.1827 41 14.1818ZM17.8788 11.0909L20.8786 14.1818H8V11.0909H17.8788ZM41 38.9091H8V17.2727H41V38.9091Z"
              />
            </svg>

            <span
              class="node-title-style text-xs text-left"
              :class="{
                'text-white': selectNodes.has(childNode.id),
                'text-gray-600  ': !selectNodes.has(childNode.id)
              }"
            >{{ childNode.title }}</span>
          </button>
          <button
            v-if="!childNode.children"
            class="flex-grow p-0.5 flex items-start space-x-0.5 rounded-sm"
            :class="{
              'text-white hover:bg-blue-600': selectNodes.has(childNode.id),
              'text-blue-400 hover:bg-gray-200 ': !selectNodes.has(childNode.id)
            }"
            @click.ctrl.exact="selectNodeHandler(childNode.id)"
            @click.exact="openBookmarkHandler(childNode)"
          >
            <div class="flex-shrink-0 p-0.5">
              <div
                class="bookmark-favicon w-3 h-3 bg-cover bg-center bg-no-repeat"
                :style="{
                  backgroundImage:
                    'url(' + `https://www.youtube.com/s/desktop/4eebcda0/img/favicon_32x32.png` + ')',
                }"
              />
            </div>
            <span
              class="node-title-style text-xs text-left"
              :class="{
                'text-white': selectNodes.has(childNode.id),
                'text-gray-600  ': !selectNodes.has(childNode.id)
              }"
            >{{ childNode.title }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  props: {
    pinNodes: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ['toggle-pin-node'],
  setup(props) {
    // unfold or fold folder
    const unfoldFolders = ref(new Set());
    const toggleFolderState = (node) => {
      if (node.children.length === 0) return;
      if (unfoldFolders.value.has(node.id)) {
        unfoldFolders.value.delete(node.id);
      } else {
        unfoldFolders.value.add(node.id);
      }
    };
    const unfoldAll = () => {
      props.pinNodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          unfoldFolders.value.add(node.id);
        }
      });
    };

    const foldAll = () => {
      unfoldFolders.value.clear();
    };

    // select nodes
    const selectNodes = ref(new Set());
    const selectNodeHandler = (nodeId) => {
      if (selectNodes.value.has(nodeId)) {
        selectNodes.value.delete(nodeId);
      } else {
        selectNodes.value.add(nodeId);
      }
    };

    // open Bookmark
    const openBookmarkHandler = (node) => {
      // console.log(node);
    };

    return {
      unfoldFolders,
      toggleFolderState,
      unfoldAll,
      foldAll,
      selectNodes,
      selectNodeHandler,
      openBookmarkHandler,
    };
  },
};
</script>
<style lang="scss" scoped>
.grid-item {
  height: fit-content;
}

.unfold-folders-container {
  max-height: 10rem;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
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

.node-title-style {
  word-break: break-all;
}
</style>
