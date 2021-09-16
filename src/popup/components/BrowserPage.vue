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
        @unfold-all="unfoldAllHandler"
        @fold-all="foldAllHandler"
      />
    </div>
    <!-- content -->
    <div class="main flex-grow w-full overflow-y-auto">
      <BrowserGrid
        v-show="browserType==='all' && browserMode==='grid'"
        ref="grid"
        :nodes="childrenNodes"
        @open-folder="currentNodeId = $event"
      />
      <BrowserTree
        v-show="browserType==='all' && browserMode==='tree'"
        :nodes="childrenNodes"
      />
      <BrowserStar v-show="browserType==='star'" />
      <BrowserPin v-show="browserType==='pin'" />
      <!-- <component
        :is="browserContentComponent"
        ref="content"
        :nodes="childrenNodes"
        @open-folder="currentNodeId = $event"
      /> -->
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
    // bookmarks
    const currentNodeId = ref('0');
    // const currentNode = ref(null);
    const childrenNodes = ref([]);

    watch(
      currentNodeId,
      (newValue, oldValue) => {
        chrome.bookmarks.getSubTree(currentNodeId.value).then((nodes) => {
          childrenNodes.value = nodes[0].children;
        });
      },
      {
        immediate: true,
      },
    );

    // unfold or fold all folder
    const grid = ref(null);
    const unfoldAllHandler = () => {
      grid.value.unfoldAll();
    };

    const foldAllHandler = () => {
      grid.value.foldAll();
    };

    // browser page setting
    const browserType = ref('all'); // all, star, pin
    const browserMode = ref('grid'); // grid, tree

    const browserMenuComponent = computed(() => {
      if (browserType.value === 'pin') {
        return 'BrowserMenuPin';
      }
      return 'BrowserMenu';
    });

    // content component
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
      grid,
      unfoldAllHandler,
      foldAllHandler,
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
