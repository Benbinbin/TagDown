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
    <div class="w-full px-8 py-2 border-b border-gray-200">
      <component
        :is="browserMenuComponent"
        v-model:multi-on-group="multiOnGroup"
        v-model:group-name="groupName"
        :browser-type="browserType"
        :browser-mode="browserMode"
        :group-color="groupColor"
        @change-browser-type="browserType = $event"
        @set-group-color="groupColor = $event"
      />
    </div>
    <!-- content -->
    <div class="flex-grow flex justify-between items-start space-x-2 space-y-2">
      <component :is="browserContentComponent" />
      <button
        class="p-1 text-white bg-green-400 rounded"
        @click="showRenameFolderModal = true"
      >
        Rename Folder
      </button>
      <button
        title="show more setting menu"
        class="p-0.5 text-gray-300 hover:text-gray-600 hover:bg-gray-200 rounded-sm"
        @click="showBrowserPopupMenuHandler('tag1', $event)"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.6875 37.3438C27.6875 37.8073 27.55 38.2604 27.2925 38.6459C27.035 39.0313 26.6689 39.3317 26.2407 39.5091C25.8124 39.6865 25.3412 39.7329 24.8865 39.6425C24.4319 39.552 24.0142 39.3288 23.6865 39.001C23.3587 38.6733 23.1355 38.2556 23.045 37.801C22.9546 37.3463 23.001 36.8751 23.1784 36.4468C23.3558 36.0186 23.6562 35.6525 24.0416 35.395C24.4271 35.1375 24.8802 35 25.3438 35C25.9651 35.0007 26.5609 35.2479 27.0002 35.6873C27.4396 36.1266 27.6868 36.7224 27.6875 37.3438ZM25.3438 14.6875C25.8073 14.6875 26.2604 14.55 26.6459 14.2925C27.0313 14.035 27.3317 13.6689 27.5091 13.2407C27.6865 12.8124 27.7329 12.3412 27.6425 11.8865C27.552 11.4319 27.3288 11.0142 27.001 10.6865C26.6733 10.3587 26.2556 10.1355 25.801 10.045C25.3464 9.9546 24.8751 10.001 24.4468 10.1784C24.0186 10.3558 23.6525 10.6562 23.395 11.0416C23.1375 11.4271 23 11.8802 23 12.3438C23.0007 12.9651 23.2479 13.5609 23.6873 14.0002C24.1267 14.4396 24.7224 14.6868 25.3438 14.6875ZM25.3438 22.5C24.8802 22.5 24.4271 22.6375 24.0416 22.895C23.6562 23.1525 23.3558 23.5186 23.1784 23.9468C23.001 24.3751 22.9546 24.8464 23.045 25.301C23.1355 25.7556 23.3587 26.1733 23.6865 26.501C24.0142 26.8288 24.4319 27.052 24.8865 27.1425C25.3412 27.2329 25.8124 27.1865 26.2407 27.0091C26.6689 26.8317 27.035 26.5313 27.2925 26.1459C27.55 25.7604 27.6875 25.3073 27.6875 24.8438C27.6868 24.2224 27.4396 23.6267 27.0002 23.1873C26.5609 22.7479 25.9651 22.5007 25.3438 22.5Z"
          />
        </svg>
      </button>
      <BrowserPopupMenu
        v-show="showBrowserPopupMenu"
        v-model:show="showBrowserPopupMenu"
        :item-type="itemType"
        :item-value="itemValue"
        :left="left"
        :top="top"
      />
      <InputModal
        v-if="showRenameFolderModal"
        v-model:show="showRenameFolderModal"
        :init-value="'folder_name'"
        :placeholder="'请输入文件夹名称'"
        @result="getRenameResultHandler"
      >
        <template #title>
          <div
            for="input-modal"
            class="p-4 text-sm font-bold"
          >
            重命名文件夹
          </div>
        </template>
      </InputModal>
    </div>

    <!-- <div class="flex-grow">
      <p>browserType {{ browserType }}</p>
      <p>browserType {{ browserType }}</p>
      <p>bookmarkOpenMode {{ bookmarkOpenMode }}</p>
      <p>singleTab {{ singleTab }}</p>
      <p>multiOnGroup {{ multiOnGroup }}</p>
      <p>groupName {{ groupName }}</p>
      <p>groupColor {{ groupColor }}</p>
      <p>multiSwitch {{ multiSwitch }} {{ typeof multiSwitch }}</p>
    </div>-->

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
import { ref, computed } from 'vue';
import BrowserHeader from './Browser/BrowserHeader.vue';
import BrowserFooter from './Browser/BrowserFooter.vue';
import BrowserGrid from './Browser/BrowserGrid.vue';
import BrowserTree from './Browser/BrowserTree.vue';
import BrowserMenu from './Browser/BrowserMenu.vue';
import BrowserMenuPin from './Browser/BrowserMenuPin.vue';
import InputModal from './Modal/InputModal.vue';
import BrowserPopupMenu from './Modal/BrowserPopupMenu.vue';

export default {
  components: {
    BrowserHeader,
    BrowserFooter,
    BrowserGrid,
    BrowserTree,
    BrowserMenu,
    BrowserMenuPin,
    InputModal,
    BrowserPopupMenu,
  },
  setup() {
    // browser page setting
    const browserType = ref('pin'); // all, star, pin
    const browserMode = ref('tree'); // grid, tree

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

    // modal
    // rename folder name modal
    const showRenameFolderModal = ref(false);
    const getRenameResultHandler = (obj) => {
      console.log(obj);
    };

    // browser popup menu
    const showBrowserPopupMenu = ref(false);
    const left = ref(0);
    const top = ref(0);
    const itemType = ref('tag');
    const itemValue = ref('');
    const showBrowserPopupMenuHandler = (value, event) => {
      const target = event.currentTarget;
      if (!target) return;
      itemValue.value = value;
      left.value = target.offsetLeft;
      top.value = target.offsetTop;
      showBrowserPopupMenu.value = true;
    };

    return {
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
      showRenameFolderModal,
      getRenameResultHandler,
      showBrowserPopupMenu,
      itemType,
      itemValue,
      left,
      top,
      showBrowserPopupMenuHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
.all-center {
  @apply flex justify-center items-center;
}
</style>

.all-center {
  @apply flex justify-center items-center;
}
