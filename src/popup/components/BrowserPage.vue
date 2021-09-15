<template>
  <div
    id="browser"
    class="flex flex-col"
  >
    <!-- header -->
    <BrowserHeader
      :browser-type="browserType"
      :browser-mode="browserMode"
      @change-browser-mode="browserMode = $event"
      @change-browser-type="browserType = $event"
    />
    <!-- menu -->
    <div class="px-8 py-2 border-b border-gray-200">
      <component
        :is="browserMenuComponent"
        v-model:multi-on-group="multiOnGroup"
        v-model:group-name="groupName"
        :browser-type="browserType"
        :browser-mode="browserMode"
        :group-color="groupColor"
        :current-node-id="currentNodeId"
        @change-browser-type="browserType = $event"
        @set-group-color="groupColor = $event"
        @reset-folder="currentNodeId = $event"
        @clear-unfold-folders="toggleAllFolderState"
      />
    </div>
    <!-- content -->
    <div class="main flex-grow w-full overflow-y-auto">
      <component
        :is="browserContentComponent"
        :nodes="childrenNodes"
        @open-folder="currentNodeId = $event"
      />
    </div>

    <!-- footer -->
    <BrowserFooter
      v-model:multi-on-group="multiOnGroup"
      v-model:group-name="groupName"
      v-model:multi-switch="multiSwitch"
      v-model:single-tab="singleTab"
      :browser-type="browserType"
      :bookmark-open-mode="bookmarkOpenMode"
      :group-color="groupColor"
      @change-bookmark-open-mode="bookmarkOpenMode = $event"
      @set-group-color="groupColor = $event"
    />
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue';
import BrowserHeader from './Browser/BrowserHeader.vue';
import BrowserFooter from './Browser/BrowserFooter.vue';
import BrowserGrid from './Browser/BrowserGrid.vue';
import BrowserTree from './Browser/BrowserTree.vue';
import BrowserMenu from './Browser/BrowserMenu.vue';
import BrowserMenuPin from './Browser/BrowserMenuPin.vue';

export default {
  components: {
    BrowserHeader,
    BrowserFooter,
    BrowserGrid,
    BrowserTree,
    BrowserMenu,
    BrowserMenuPin,
  },
  setup() {
    // bookmarks
    const currentNodeId = ref('0');
    // const currentNode = ref(null);
    const childrenNodes = ref([]);

    // const getChildrenNodes = (nodeId) => new Promise((resolve, reject) => {
    //   if (nodeId) {
    //   chrome.bookmarks.getSubTree(nodeId).then((nodes) => {
    //     resolve(nodes[0].children);
    //   });
    //   } else {
    //     chrome.bookmarks.getTree().then((root) => {
    //       resolve(root[0].children);
    //     });
    //   }
    // });
    // const getCurrentNode = (nodeId) => new Promise((resolve, reject) => {
    //   if (nodeId) {
    //     chrome.bookmarks.get(currentNodeId.value).then((node) => {
    //       resolve(node[0]);
    //     });
    //   } else {
    //     chrome.bookmarks.getTree().then((root) => {
    //       resolve(root[0]);
    //     });
    //   }
    // });

    watch(
      currentNodeId,
      (newValue, oldValue) => {
        // console.log(currentNodeId.value);
        // chrome.bookmarks.get(currentNodeId.value).then((node) => {
        //   currentNode.value = node[0];
        //   console.log(currentNode.value);
        // });
        chrome.bookmarks.getSubTree(currentNodeId.value).then((nodes) => {
          childrenNodes.value = nodes[0].children;
          // console.log(childrenNodes.value);
        });
      },
      {
        immediate: true,
      },
    );

    // browser page setting
    const browserType = ref('all'); // all, star, pin
    const browserMode = ref('grid'); // grid, tree

    const browserMenuComponent = computed(() => {
      if (browserType.value === 'pin') {
        return 'BrowserMenuPin';
      }
      return 'BrowserMenu';
    });

    const browserContentComponent = computed(() => {
      if (browserMode.value === 'grid') {
        return 'BrowserGrid';
      }
      return 'BrowserTree';
    });

    // bookmark open setting
    const bookmarkOpenMode = ref('single'); // single, multi
    const singleTab = ref('new'); // new, current
    const multiOnGroup = ref(false);
    const groupName = ref('');
    const groupColor = ref('#1A73E8'); // grey, blue, red, yellow, green, pink, purple, cyan
    const multiSwitch = ref(false);

    return {
      currentNodeId,
      childrenNodes,
      browserType,
      browserMode,
      browserMenuComponent,
      browserContentComponent,
      bookmarkOpenMode,
      singleTab,
      multiOnGroup,
      groupName,
      groupColor,
      multiSwitch,
    };
  },
};
</script>

<style lang="scss" scoped>
.main::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.all-center {
  @apply flex justify-center items-center;
}
</style>
