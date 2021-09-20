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
        :pin-nodes-id="pinNodesId"
        @change-browser-type="browserType = $event"
        @set-group-color="groupColor = $event"
        @set-current-node="setCurrentNodeIdHandler"
        @unfold-all="unfoldAllHandler"
        @fold-all="foldAllHandler"
      />
    </div>
    <!-- content -->
    <div class="main flex-grow w-full overflow-y-auto">
      <BrowserGrid
        v-show="browserType === 'all' && browserMode === 'grid'"
        ref="grid"
        v-model:single-tab="singleTab"
        :nodes="childrenNodes"
        :pin-nodes-id="pinNodesId"
        :bookmark-open-mode="bookmarkOpenMode"
        :multi-on-group="multiOnGroup"
        :new-group-name="groupName"
        :new-group-color="groupColor"
        @set-current-node="setCurrentNodeIdHandler"
        @toggle-pin-node="togglePinNodeHandler"
      />
      <BrowserTree
        v-show="browserType==='all' && browserMode==='tree'"
        :current-node="currentNode"
        :pin-nodes-id="pinNodesId"
        :width="800"
        :height="422"
        @toggle-pin-node="togglePinNodeHandler"
      />
      <BrowserStar v-show="browserType === 'star'" />
      <BrowserPin
        v-show="browserType === 'pin'"
        ref="pin"
        :pin-nodes="pinNodes"
        @toggle-pin-node="togglePinNodeHandler"
      />
    </div>

    <!-- footer -->
    <BrowserFooter
      v-model:multi-on-group="multiOnGroup"
      v-model:group-name="groupName"
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

    watch(
      currentNodeId,
      (newValue, oldValue) => {
        chrome.bookmarks.getSubTree(currentNodeId.value).then((nodes) => {
          [currentNode.value] = nodes;
          childrenNodes.value = nodes[0].children;
        });
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
      // console.log(nodeId);
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
      // console.log(pinNodesId.value);
      // console.log(pinNodes.value);
    };

    // unfold or fold all folder
    const grid = ref(null);
    const pin = ref(null);
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

    // bookmark open setting
    const bookmarkOpenMode = ref('single'); // single, multi
    const singleTab = ref('current'); // new, current
    const multiOnGroup = ref(false);
    const groupName = ref('');
    const groupColor = ref('#1A73E8'); // grey, blue, red, yellow, green, pink, purple, cyan

    return {
      currentNodeId,
      currentNode,
      childrenNodes,
      setCurrentNodeIdHandler,
      pinNodesId,
      pinNodes,
      togglePinNodeHandler,
      grid,
      pin,
      unfoldAllHandler,
      foldAllHandler,
      browserType,
      browserMode,
      browserMenuComponent,
      bookmarkOpenMode,
      singleTab,
      multiOnGroup,
      groupName,
      groupColor,
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
