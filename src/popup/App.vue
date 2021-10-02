<template>
  <BrowserPage
    v-if="page === 'browser'"
    class="browser-mode"
  />

  <EditPage
    v-if="page === 'edit'"
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
    const page = ref(''); // browser, edit
    const bookmarkState = ref(false);
    chrome.storage.local.get('bookmarkState', (result) => {
      bookmarkState.value = result.bookmarkState;
      if (bookmarkState.value) {
        page.value = 'browser';
      } else {
        page.value = 'edit';
      }
    });

    // provide bookmark state and change the bookmarkstate function
    const setBookmarkState = (value) => {
      chrome.storage.local.set({ bookmarkState: value });
    };

    provide('bookmarkState', bookmarkState);
    provide('setBookmarkState', setBookmarkState);

    // provide page state and change the page state function
    const changePage = (value) => {
      page.value = value;
    };

    provide('page', page);
    provide('changePage', changePage);

    // onMounted(async () => {
    //   const db = new Dexie('tagdown');
    //   await db.version(1).stores({
    //     bookmark: 'id, *tags',
    //   });
    //   await db.bookmark.toArray((bookmarks) => {
    //     console.log(bookmarks);
    //   });
    // });

    return {
      page,
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
