<template>
  <img
    class="w-4 h-4"
    :src="favicon"
    alt="bookmark favicon"
  >
</template>
<script>
import { ref, inject } from 'vue';

export default {
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const favicon = ref('/icons/ph_bookmark-simple.svg');

    const db = inject('db');

    const getBookmarkFavicon = async (id) => {
      if (!id) return;
      const bookmark = await db.bookmark.get(id);
      if (bookmark && bookmark.faviconUrl) favicon.value = bookmark.faviconUrl;
    };

    getBookmarkFavicon(props.id);

    return {
      favicon,
    };
  },
};
</script>
<style lang="scss" scoped>

</style>
