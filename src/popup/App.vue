<template>
  <!-- eslint-disable max-len -->
  <div>
    <div class="btn-container" v-if="current === 'buttons'">
      <button @click="addBookmark" v-if="!booked">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
        </svg>
        <span>添加书签</span>
      </button>
      <div v-if="booked" @mouseenter="editing=true" @mouseleave="editing=false" class="btn-sub-container">
        <button class="btn-success" v-show="!editing">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
          </svg>
          <span>已添加</span>
        </button>
        <div v-show="editing" class="edit-buttons-container">
          <button class="btn-delete" @click="deleteBookmark">删除</button>
          <button class="btn-edit">编辑</button>
        </div>
      </div>

      <button @click="getBookmarks">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-diagram-3" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
        </svg>
        <span>浏览书签</span>
      </button>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
        </svg>
        <span>设置参数</span>
      </button>
    </div>
    <div v-if="current === 'tree'">
      <div class="nav">
        <button>返回</button>
        <button>切换模式</button>
      </div>
      <tree :bookmarks="bookmarks"></tree>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';

export default {
  name: 'App',
  components: { Tree },
  data() {
    return {
      id: null,
      booked: false,
      editing: false,
      current: 'buttons',
      bookmarks: [],
    };
  },
  methods: {
    getTab() {
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
    searchBookmark(query) {
      return new Promise((resolve, reject) => {
        chrome.bookmarks.search(query, (bookmarkNode) => {
          resolve(bookmarkNode);
        });
      });
    },
    addBookmark() {
      this.getTab().then((tab) => {
        console.log(tab.title);
        console.log(tab.url);
        chrome.bookmarks.create(
          {
            title: tab.title,
            url: tab.url,
          },
          (bookmarkNode) => {
            console.log(bookmarkNode);
            this.id = bookmarkNode.id;
            this.booked = true;
          },
        );
      });
    },
    deleteBookmark() {
      chrome.bookmarks.remove(this.id, () => {
        this.id = null;
        this.booked = false;
        console.log('deleted');
      });
    },
    getTree() {
      return new Promise((resolve, reject) => {
        chrome.bookmarks.getTree((bookmarks) => resolve(bookmarks));
      });
    },
    getBookmarks() {
      this.getTree().then((bookmarks) => {
        console.log(bookmarks);
        [this.bookmarks] = bookmarks;
        this.current = 'tree';
      });
    },
  },
  mounted() {
    this.getTab()
      .then((tab) => {
        const query = {
          url: tab.url,
        };
        return this.searchBookmark(query);
      })
      .then((bookmarkNode) => {
        if (!bookmarkNode.length) return;
        this.id = bookmarkNode[0].id;
        this.booked = true;
      });
  },
};
</script>

<style lang="scss" scoped>
.btn-container {
  margin: 10px;
  width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
  }

  .btn-sub-container {
    width: 100%;
    display: flex;
    button {
      margin: 0.5rem 0;
    }
  }

  .edit-buttons-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .btn-success {
    border: 2px solid $green;
    background: $green;
  }

  .btn-delete {
    border: 2px solid $red;
    border-radius: 0.5rem 0 0 0.5rem;
    background: $red;
    color: $light;
    font-weight: bold;
  }

  .btn-edit {
    border: 2px solid $blue;
    border-radius: 0 0.5rem 0.5rem 0;
    background: $blue;
    color: $light;
    font-weight: bold;
  }
}

button {
  padding: 0.5rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 2px solid $blue;
  border-radius: 0.5rem;
  background: $light;
  color: $dark;
  &:hover {
    background: $blue;
    color: $light;
    font-weight: bold;
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
</style>
