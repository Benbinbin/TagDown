<template>
  <div
    v-if="(page === 'browser') && !editBookmark"
    class="browser-mode flex flex-col"
  >
    <BrowserHeader
      :browser-type="browserType"
      :browser-mode="browserMode"
      @change-browser-mode="browserMode = $event"
      @change-browser-type="browserType = $event"
    />
    <div class="w-full px-8 py-2 border-b-2 border-gray-200">
      <component
        :is="browserMenuType"
        v-show="browserType !== 'star'"
        @change-browser-type="browserType = $event"
      />
    </div>
    <BrowserGrid class="flex-grow" />
    <!-- <div class="flex-grow">
      <p>bookmarkOpenMode {{ bookmarkOpenMode }}</p>
      <p>singleTab {{ singleTab }}</p>
      <p>multiOnGroup {{ multiOnGroup }}</p>
      <p>groupName {{ groupName }}</p>
      <p>groupColor {{ groupColor }}</p>
      <p>multiSwitch {{ multiSwitch }} {{ typeof multiSwitch }}</p>
    </div> -->

    <BrowserFooter
      v-model:multi-on-group="multiOnGroup"
      v-model:group-name="groupName"
      v-model:multi-switch="multiSwitch"
      v-model:single-tab="singleTab"
      :bookmark-state="bookmarkState"
      :browser-type="browserType"
      :bookmark-open-mode="bookmarkOpenMode"
      :group-color="groupColor"
      @edit-bookmark="editBookmark = true"
      @delete-bookmark="deleteBookmarkHandler"
      @change-bookmark-open-mode="bookmarkOpenMode = $event"
      @set-group-color="groupColor = $event"
    />
  </div>
  <div
    v-else
    class="tag-mode"
  >
    <TagHeader />
    <TagFooter />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import BrowserHeader from './components/BrowserHeader.vue';
import TagHeader from './components/TagHeader.vue';
import BrowserFooter from './components/BrowserFooter.vue';
import TagFooter from './components/TagFooter.vue';
import BrowserGrid from './components/BrowserGrid.vue';
import BrowserMenu from './components/BrowserMenu.vue';
import BrowserMenuPin from './components/BrowserMenuPin.vue';

export default {
  components: {
    BrowserHeader,
    TagHeader,
    BrowserFooter,
    TagFooter,
    BrowserGrid,
    BrowserMenu,
    BrowserMenuPin,
  },
  setup() {
    // page to show: browser or edit
    const page = ref('browser'); // browser

    // browser page setting
    const browserType = ref('pin'); // all, star, pin
    const browserMode = ref('tree'); // grid, tree

    const browserMenuType = computed(() => {
      if (browserType.value === 'pin') {
        return 'BrowserMenuPin';
      }
      return 'BrowserMenun';
    });

    const bookmarkState = ref(false);
    const editBookmark = ref(false);

    // bookmark open setting
    const bookmarkOpenMode = ref('single'); // single, multi
    const singleTab = ref('new'); // new, current
    const multiOnGroup = ref(false);
    const groupName = ref('new');
    const groupColor = ref('blue'); // grey, blue, red, yellow, green, pink, purple, cyan
    const multiSwitch = ref(false);

    // bookmark handler
    function deleteBookmarkHandler() {
      bookmarkState.value = false;
    }

    return {
      page,
      browserType,
      browserMode,
      browserMenuType,
      bookmarkState,
      editBookmark,
      bookmarkOpenMode,
      singleTab,
      multiOnGroup,
      groupName,
      groupColor,
      multiSwitch,
      deleteBookmarkHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
.browser-mode {
  width: 800px;
  height: 600px;
}

.tag-mode {
  width: 400px;
  height: 600px;
}

.h-center {
  @apply flex justify-center items-center;
}

.btn {
  @apply flex justify-center items-center rounded hover:bg-gray-200;
}

.text-xxs {
  font-size: 10px;
}
</style>
