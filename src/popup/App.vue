<template>
  <BrowserPage
    v-if="page === 'browser'"
    class="browser-mode"
  />

  <EditPage
    v-else
    class="tag-mode"
  />
</template>

<script>
import { ref, provide } from 'vue';
import BrowserPage from './components/BrowserPage.vue';
import EditPage from './components/EditPage.vue';

export default {
  components: {
    BrowserPage,
    EditPage,
  },
  setup() {
    // page to show: browser or edit
    const page = ref('edit'); // browser, edit
    // edit bookmark state
    // const editBookmark = ref(false);

    const changePage = (value) => {
      page.value = value;
    };

    // const toggleEditBookmark = () => {
    //   editBookmark.value = !editBookmark.value;
    // };

    provide('page', page);
    provide('changePage', changePage);

    // provide('editBookmark', editBookmark);
    // provide('toggleEditBookmark', toggleEditBookmark);

    return {
      page,
      // editBookmark,
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
</style>
