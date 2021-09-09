<template>
  <div
    id="browser-page"
    class="flex flex-col"
  >
    <BrowserHeader
      :browser-type="browserType"
      :browser-mode="browserMode"
      @change-browser-mode="browserMode = $event"
      @change-browser-type="browserType = $event"
    />
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
    <component
      :is="browserContentComponent"
      class="flex-grow"
    />

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
    // page to show: browser or edit
    const page = ref('browser'); // browser, edit

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

    return {
      page,
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
</style>
