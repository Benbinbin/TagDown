<template>
  <div>BookmarkEdit</div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    // bookmark tag state
    const bookmarkState = ref(true);
    function deleteBookmarkHandler() {
      bookmarkState.value = false;
    }

    return {
      bookmarkState,
      deleteBookmarkHandler,

    };
  },
};
</script>
<style lang="css">
</style>
