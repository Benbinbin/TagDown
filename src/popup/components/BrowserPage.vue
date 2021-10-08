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
        v-model:group-type="groupType"
        v-model:new-group-name="newGroupName"
        v-model:currentGroupId="currentGroupId"
        :browser-type="browserType"
        :browser-mode="browserMode"
        :current-node-id="currentNodeId"
        :pin-nodes-id="pinNodesId"
        :new-group-color="newGroupColor"
        @change-browser-type="browserType = $event"
        @set-new-group-color="newGroupColor = $event"
        @set-current-node="setCurrentNodeIdHandler"
        @reset-tree-layout="resetTreeLayoutHandler"
        @unfold-all="unfoldAllHandler"
        @fold-all="foldAllHandler"
        @open-all-pin-bookmarks="openPinBookmarksHandler('all')"
        @open-select-bookmarks="openPinBookmarksHandler('select')"
        @clear-pin-list="clearPinListHandler"
        @clear-select-pin-nodes="clearSelectPinNodesHandler"
      />
    </div>
    <!-- content -->
    <div class="main flex-grow w-full overflow-y-auto">
      <BrowserGrid
        v-show="browserType === 'all' && browserMode === 'grid'"
        ref="grid"
        v-model:single-tab="singleTab"
        v-model:group-type="groupType"
        :nodes="childrenNodes"
        :pin-nodes-id="pinNodesId"
        :bookmark-open-mode="bookmarkOpenMode"
        :multi-on-group="multiOnGroup"
        :current-group-id="currentGroupId"
        :new-group-name="newGroupName"
        :new-group-color="newGroupColor"
        @set-current-node="setCurrentNodeIdHandler"
        @toggle-pin-node="togglePinNodeHandler"
        @change-current-group-id="currentGroupId = $event"
        @refresh-current-node="refreshCurrentNodeHandler"
      />
      <BrowserTree
        v-show="browserType==='all' && browserMode==='tree'"
        ref="tree"
        v-model:single-tab="singleTab"
        v-model:group-type="groupType"
        :current-node="currentNode"
        :pin-nodes-id="pinNodesId"
        :width="800"
        :height="422"
        :bookmark-open-mode="bookmarkOpenMode"
        :multi-on-group="multiOnGroup"
        :current-group-id="currentGroupId"
        :new-group-name="newGroupName"
        :new-group-color="newGroupColor"
        @toggle-pin-node="togglePinNodeHandler"
      />
      <BrowserStar v-show="browserType === 'star'" />
      <BrowserPin
        v-show="browserType === 'pin'"
        ref="pin"
        v-model:single-tab="singleTab"
        v-model:group-type="groupType"
        :pin-nodes="pinNodes"
        :multi-on-group="multiOnGroup"
        :current-group-id="currentGroupId"
        :new-group-name="newGroupName"
        :new-group-color="newGroupColor"
        @toggle-pin-node="togglePinNodeHandler"
        @change-current-group-id="currentGroupId = $event"
      />
    </div>

    <!-- footer -->
    <BrowserFooter
      v-model:single-tab="singleTab"
      v-model:multi-on-group="multiOnGroup"
      v-model:group-type="groupType"
      v-model:new-group-name="newGroupName"
      v-model:currentGroupId="currentGroupId"
      :browser-type="browserType"
      :bookmark-open-mode="bookmarkOpenMode"
      :new-group-color="newGroupColor"
      @change-bookmark-open-mode="bookmarkOpenMode = $event"
      @set-new-group-color="newGroupColor = $event"
    />
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue';
import BrowserHeader from './Browser/BrowserHeader.vue';
import BrowserFooter from './Browser/BrowserFooter.vue';
import BrowserGrid from './Browser/BrowserGrid.vue';
import BrowserTree from './Browser/BrowserTree.vue';
import BrowserStar from './Browser/BrowserStar.vue';
import BrowserPin from './Browser/BrowserPin.vue';
import BrowserMenu from './Browser/BrowserMenu.vue';
import BrowserMenuPin from './Browser/BrowserMenuPin.vue';

export default {
  components: {
    BrowserMenu,
    BrowserMenuPin,
    BrowserHeader,
    BrowserFooter,
    BrowserGrid,
    BrowserTree,
    BrowserStar,
    BrowserPin,
  },
  setup() {
    // browser page setting
    const browserType = ref('all'); // all, star, pin
    const browserMode = ref('grid'); // grid, tree

    const browserMenuComponent = computed(() => {
      if (browserType.value === 'pin') {
        return 'BrowserMenuPin';
      }
      return 'BrowserMenu';
    });

    // current node
    const currentNodeId = ref('0');
    // watch current node id to update the current node and children nodes
    const currentNode = ref(null);
    const childrenNodes = ref([]);

    const setCurrentNodeIdHandler = (value) => {
      if (value === 'parent' && currentNode.value.parentId) {
        currentNodeId.value = currentNode.value.parentId;
      } else if (value === 'root') {
        currentNodeId.value = '0';
      } else {
        currentNodeId.value = value;
      }
    };

    const refreshCurrentNodeHandler = () => {
      chrome.bookmarks.getSubTree(currentNodeId.value).then((nodes) => {
        [currentNode.value] = nodes;
        childrenNodes.value = nodes[0].children;
      });
    };

    watch(
      currentNodeId,
      (newValue, oldValue) => {
        refreshCurrentNodeHandler();
      },
      {
        immediate: true,
      },
    );

    // pin nodes
    const pinNodesId = ref([]);
    const pinNodes = ref([]);
    const togglePinNodeHandler = (nodeId) => {
      const index = pinNodesId.value.indexOf(nodeId);
      if (index === -1) {
        pinNodesId.value.push(nodeId);
        chrome.bookmarks.getSubTree(nodeId).then((nodes) => {
          const node = nodes[0];
          pinNodes.value.push(node);
        });
      } else {
        pinNodesId.value.splice(index, 1);
        pinNodes.value.splice(index, 1);
      }
    };

    // open pin bookmarks
    const pin = ref(null);
    const openPinBookmarksHandler = (type) => {
      pin.value.openBookmarksHandler(type);
    };

    // clear pin list or select pin nodes
    const clearPinListHandler = () => {
      pinNodesId.value = [];
      pinNodes.value = [];
    };
    const clearSelectPinNodesHandler = () => {
      pin.value.clearSelectNodeHandler();
    };

    // unfold or fold all folder
    const grid = ref(null);
    const unfoldAllHandler = () => {
      if (browserType.value === 'all' && browserMode.value === 'grid') {
        grid.value.unfoldAll();
      } else if (browserType.value === 'pin') {
        pin.value.unfoldAll();
      }
    };

    const foldAllHandler = () => {
      if (browserType.value === 'all' && browserMode.value === 'grid') {
        grid.value.foldAll();
      } else if (browserType.value === 'pin') {
        pin.value.foldAll();
      }
    };

    // reset tree layout
    const tree = ref(null);
    const resetTreeLayoutHandler = () => {
      tree.value.resetTransform();
    };

    // bookmark open setting
    const bookmarkOpenMode = ref('single'); // single, multi
    const singleTab = ref('current'); // new, current
    const multiOnGroup = ref(false);
    const groupType = ref('new'); // new, old
    const newGroupName = ref('new');
    const newGroupColor = ref('blue'); // grey, blue, red, yellow, green, pink, purple, cyan
    const currentGroupId = ref(NaN);

    return {
      currentNodeId,
      currentNode,
      childrenNodes,
      setCurrentNodeIdHandler,
      refreshCurrentNodeHandler,
      pinNodesId,
      pinNodes,
      togglePinNodeHandler,
      grid,
      pin,
      unfoldAllHandler,
      foldAllHandler,
      openPinBookmarksHandler,
      clearPinListHandler,
      clearSelectPinNodesHandler,
      tree,
      resetTreeLayoutHandler,
      browserType,
      browserMode,
      browserMenuComponent,
      bookmarkOpenMode,
      singleTab,
      multiOnGroup,
      groupType,
      newGroupName,
      newGroupColor,
      currentGroupId,
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
