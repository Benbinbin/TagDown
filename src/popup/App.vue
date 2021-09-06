<template lang="">
  <div>
    <h1 class="text-blue-400">
      TagDown
    </h1>
    <img
      src="@/assets/images/logo.png"
      alt="logo"
    >
    <HelloPopup />
  </div>
</template>
<script>
import HelloPopup from './components/HelloPopup.vue';

export default {
  components: {
    HelloPopup,
  },
};
</script>
<style lang="">

</style>
