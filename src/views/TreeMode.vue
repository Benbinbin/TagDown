<template>
  <!-- eslint-disable max-len -->
  <div class="main">
    <div class="sidebar">
      <div class="nav-top">
        <button class="open" @click="open">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
          </svg>
        </button>
        <button class="checked" @click="checked">
          <title>全选</title>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
          </svg>
        </button>
        <button class="unchecked" @click="unchecked">
          <title>全不选</title>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
          </svg>
        </button>
        <button class="clear" @click="clear('', $event)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff5959" viewBox="0 0 16 16">
            <title>清空全部</title>
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
        </button>
      </div>
      <div class="pins-list scrollbar" ref="pins">
        <div class="pin" v-for="bookmark of pinsList" :key="bookmark.data.id">
          <input type="checkbox" :value="bookmark" :id="bookmark.data.id" v-model="selectedList">
          <label :for="bookmark.data.id">{{ bookmark.data.title }}</label>
          <button class="clear" @click="clear(bookmark, $event)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff5959" viewBox="0 0 16 16">
              <title>删除</title>
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="nav-bottom">
        <button class="up" @click="scrollUp">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
          </svg>
        </button>
        <button class="down" @click="scrollDown">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
    </div>
    <button class="pin" v-show="!showPin">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
      </svg>
    </button>
    <button class="close" v-show="showPin">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff5959" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </button>
    <tree :bookmarks="bookmarks" :previewMode="previewMode" class="tree" @pin="pinHandler" @openUrl="openUrl"></tree>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';

export default {
  name: 'Tree',
  components: {
    Tree,
  },
  props: ['bookmarks', 'previewMode'],
  data() {
    return {
      set: new Set(),
      pinsList: [],
      selectedList: [],
      showPin: false,
    };
  },
  methods: {
    pinHandler(d) {
      if (this.set.has(d)) return;
      this.set.add(d);
      this.selectedList.push(d);
      this.pinsList.push(d);
    },
    open() {
      const promises = [];
      this.selectedList.forEach((node) => {
        const p = this.openUrl(node.data.url, 'multi');
        promises.push(p);
      });
      // console.log(this.selectedList);
      Promise.all(promises).then((tabs) => {
        const tabIds = tabs.map((item) => item.id);
        chrome.tabs.group({
          tabIds,
        });
      });
      const arr = this.selectedList.slice();

      arr.forEach((item) => {
        this.clear(item);
      });
    },
    checked() {
      this.selectedList = this.pinsList;
    },
    clear(node) {
      if (node) {
        this.set.delete(node);
        const pinIndex = this.pinsList.indexOf(node);
        const selectIndex = this.selectedList.indexOf(node);
        this.pinsList.splice(pinIndex, 1);
        if (selectIndex !== -1) this.selectedList.splice(selectIndex, 1);
      } else {
        this.set.clear();
        this.pinsList = [];
        this.selectedList = [];
      }
    },
    unchecked() {
      this.selectedList = [];
    },
    scrollUp() {
      this.$refs.pins.scrollTop = 0;
    },
    scrollDown() {
      this.$refs.pins.scrollTop = this.$refs.pins.scrollHeight;
    },
    getCurrentTab() {
      return new Promise((resolve, reject) => {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          (tabs) => {
            resolve(tabs[0]);
          },
        );
      });
    },
    // eslint-disable-next-line consistent-return
    openUrl(url, mode = this.previewMode) {
      if (mode === 'default') {
        return new Promise((resolve, reject) => {
          this.getCurrentTab().then((tab) => {
            chrome.tabs.create({
              active: false,
              url: tab.url,
            });

            chrome.tabs.update({ url }, (t) => resolve(t));
          });
        });
      }
      if (mode === 'one') {
        return new Promise((resolve, reject) => {
          chrome.tabs.update({ url }, (t) => resolve(t));
        });
      }
      if (mode === 'multi') {
        return new Promise((resolve, reject) => {
          chrome.tabs.create(
            {
              active: false,
              url,
            },
            (t) => resolve(t),
          );
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 500px;
  width: 100%;
}
</style>
