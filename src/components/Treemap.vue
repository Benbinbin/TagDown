<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    chrome.bookmarks.getTree((bookmarkNode) => {
      console.log(bookmarkNode);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
