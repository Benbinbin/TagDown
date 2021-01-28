<template>
  <!-- eslint-disable max-len -->
  <div class="main">
    <div class="sidebar">
      <div class="pins-list scrollbar" ref="pins">
        <div class="pin" v-for="bookmark of pinsList" :key="bookmark">
          <input type="checkbox" :name="bookmark" :id="bookmark">
          <label :for="bookmark">{{ bookmark }}</label>
        </div>
      </div>
      <div class="nav-bottom">
        <button class="up" @click="scrollUp('pins')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
          </svg>
        </button>

        <button class="sunburst" @click="showNav='sunburst'" v-show="showNav=== null">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" fill="currentColor" viewBox="0 0 32 32">
            <path d="M16 2a1 1 0 0 0-1 1v7.09a5.962 5.962 0 0 0-2.46 1.043L7.838 6.431a1.455 1.455 0 0 0-2.087.024a14.05 14.05 0 0 0 4.054 22.142a10.848 10.848 0 0 0 1.899.768a14.098 14.098 0 0 0 13.844-3.132a1.434 1.434 0 0 0 .028-2.064l-4.699-4.699A5.963 5.963 0 0 0 21.91 17H29a1 1 0 0 0 1-1A14.016 14.016 0 0 0 16 2zm0 10a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4zM6.83 8.251l4.296 4.296a5.91 5.91 0 0 0-.011 6.924l-4.277 4.277A12.017 12.017 0 0 1 6.83 8.251zm1.423 16.91l4.276-4.276A5.959 5.959 0 0 0 15 21.91v6.042a11.878 11.878 0 0 1-6.747-2.79zM17 27.956V21.91a5.963 5.963 0 0 0 2.46-1.027l4.283 4.282A11.89 11.89 0 0 1 17 27.956zM21.91 15A6.006 6.006 0 0 0 17 10.09V4.041A12.02 12.02 0 0 1 27.959 15z" />
          </svg>
        </button>

        <button class="down" @click="scrollDown('pins')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>

      </div>
      <div class="navigator" :class="navSize === 'small' ? 'navigator-small' : 'navigator-large'">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2f89fc" viewBox="0 0 16 16" class="enlarge btn" @click="navSize='large'" v-show="navSize==='small' && showNav==='sunburst'">
          <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2f89fc" viewBox="0 0 16 16" class="collapse btn" @click="navSize='small'" v-show="navSize==='large' && showNav==='sunburst'">
          <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.096 3.146a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff5959" viewBox="0 0 16 16" class="close btn" :style="{left: leftPos}" v-show="showNav==='sunburst'" @click="closeNav">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
        <sunburst v-show="showNav==='sunburst'" :size="navSize" :root="root" :select="select" :current="current" @changeSelect="changeSelectHandler" @changeCurrent="changeCurrentHandler"></sunburst>
      </div>
    </div>
    <div class="bookmarks-list">
      <div class="first">
        <p class="folder">{{ current.data.title ? current.data.title : '根目录' }}</p>
        <ul class="scrollbar" ref="first">
          <li v-for="bookmark of firstBookmarksList" :key="bookmark.data.id" :style="folderStyle(bookmark)" @click="clickHandler(bookmark, 'first', $event)">
            <svg v-if="bookmark.data.children" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
            </svg>
            <svg v-if="!bookmark.data.children" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bookmark" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            </svg>
            <span>{{ bookmark.data.title }}</span>
          </li>
        </ul>
        <div class="nav-bottom">
          <button class="back" @click="back" :disabled="!current.parent">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>

          <button class="up" @click="scrollUp('first')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
          </button>
          <button class="down" @click="scrollDown('first')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>

        </div>
      </div>

      <div class="second">
        <p class="folder" v-if="select">{{ select.data.title }}</p>
        <ul class="scrollbar" ref="second">
          <li v-for="bookmark of secondBookmarksList" :key="bookmark.data.id" :style="folderStyle(bookmark)" @click="clickHandler(bookmark, 'second', $event)">
            <svg v-if="bookmark.data.children" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
            </svg>
            <svg v-if="!bookmark.data.children" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bookmark" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            </svg>
            <span>{{ bookmark.data.title }}</span>
          </li>
        </ul>
        <div class="nav-bottom">
          <button class="up" @click="scrollUp('second')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
          </button>
          <button class="down" @click="scrollDown('second')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import Sunburst from '@/components/Sunburst.vue';

export default {
  name: 'Nav',
  components: {
    Sunburst,
  },
  props: ['bookmarks'],
  data() {
    return {
      root: null,
      current: null,
      select: null,
      pinsList: [
        'BananaBananaBananaBananaBananaBanana',
        'Orange',
        'Apple',
        'Mango',
        'Banana2',
        'Orange2',
        'Apple2',
        'Mango2',
        'Banana3',
        'Orange3',
        'Apple3',
        'Mango3',
        'Banana4',
        'Orange4',
        'Apple4',
        'Mango4',
        'Banana5',
        'Orange5',
        'Apple5',
        'Mango5',
      ],
      showNav: 'sunburst',
      navSize: 'large',
    };
  },
  computed: {
    leftPos() {
      if (this.navSize === 'small') return 0;
      return '10px';
    },
    firstBookmarksList() {
      if (!this.current) return [];
      return this.current.children;
    },
    secondBookmarksList() {
      if (!this.select) return [];
      return this.select.children;
    },
  },
  methods: {
    folderStyle(node) {
      if (node === this.select) {
        return {
          border: '3px solid #2f89fc',
          background: '#2f89fc',
        };
      }
      if (node.height !== 0) {
        return {
          border: '3px solid #2f89fc',
        };
      }
      //   叶子节点无样式
      return 'none';
    },
    changeSelectHandler(node) {
      this.select = node;
    },
    changeCurrentHandler(node) {
      this.current = node;
    },
    closeNav() {
      this.showNav = null;
      this.navSize = 'small';
    },
    scrollUp(val) {
      this.$refs[val].scrollTop = 0;
    },
    scrollDown(val) {
      this.$refs[val].scrollTop = this.$refs[val].scrollHeight;
    },
    back() {
      this.current = this.current.parent;
      this.select = null;
    },
    clickHandler(node, column, event) {
      //   console.log(node);
      //   console.log(column);
      //   console.log(event);

      if (column === 'first') {
        // 点击第一列的文件夹，「展开」到第二列
        if (node.data.children) {
          this.select = node;
        } else {
          // 点击第一列的书签
          console.log(node.data.title);
        }
      } else if (node.data.children) {
        //   点击第二列的文件夹，切换第一列和第二列，下钻「展开」
        this.current = this.select;
        this.select = node;
      } else {
        // 点击第二列的书签
        console.log(node.data.title);
      }
    },
  },
  created() {
    // 结构化数据
    this.root = d3.hierarchy(this.bookmarks).eachAfter((d) => {
      if (d.height === 0) {
        d.value = 0;
      } else if (d.height === 1) {
        d.value = 1;
      } else {
        let value = 0;

        d.children.forEach((item) => {
          value += item.value;
        });
        d.value = value;
      }
    });
    // .sort((a, b) => b.value - a.value);

    // console.log(this.root);
    // 计算节点的层次布局
    const tree = d3.partition().size([2 * Math.PI, this.root.height + 1])(
      this.root,
    );

    tree.each((d) => {
      d.current = {
        x0: d.x0,
        x1: d.x1,
        y0: d.y0,
        y1: d.y1,
      };
    });

    this.current = this.root;
  },
};
</script>

<style lang="scss" scoped>
input:focus,
button:focus {
  outline: none;
}

.main {
  height: 500px;
  width: 100%;
  // border: 1px solid $blue;
  display: grid;
  position: relative;
  grid-template-columns: 30% minmax(0, 1fr);
  grid-template-areas: "pins bookmarks";

  li,
  label {
    margin: 0.25rem auto;
    text-align: center;
    overflow: hidden;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  // 定制滚动条
  .scrollbar::-webkit-scrollbar {
    width: 2px;
  }
  // 滚动条的内层滑块颜色
  .scrollbar::-webkit-scrollbar-thumb {
    background-color: $light-bg;
  }
  // 隐藏滑轨两头的监听按钮
  .scrollbar::-webkit-scrollbar-button {
    display: none;
  }

  .nav-bottom {
    display: flex;
    align-items: center;
    button {
      background: $light;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      padding: 2px 0;
      cursor: pointer;

      &:hover {
        background: $blue;
        color: $light;
      }
    }
  }

  .sidebar {
    height: inherit;
    width: 100%;
    border-right: 2px solid $light;
    grid-area: pins;
    display: flex;
    flex-direction: column;

    .navigator {
      width: 100%;

      .btn {
        cursor: pointer;
        position: absolute;
      }

      .enlarge {
        top: 0;
        right: 0;
      }

      .collapse {
        top: 0;
        right: 10px;
      }

      .close {
        top: 0;
      }

      .sunburst {
        bottom: 0;
        left: 10px;
      }
    }

    .navigator-small {
      position: relative;
      background: $light-bg;
    }

    .navigator-large {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(235, 235, 235, 0.8);
    }

    .pins-list {
      padding: 0 5px;
      flex-grow: 1;
      overflow-y: auto;
      scroll-behavior: smooth;

      .pin {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        label {
          width: 100%;
          padding: 0.25rem;
          margin-left: 0.25rem;
          border: 1px solid $yellow;
          border-left: 5px solid $yellow;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            background: $yellow;
            color: $light;
            font-weight: bold;
          }
        }
      }
    }
  }
  .bookmarks-list {
    height: inherit;
    grid-area: bookmarks;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-areas: "first second";

    .first {
      display: flex;
      flex-direction: column;
      height: inherit;
      grid-area: first;
    }
    .second {
      display: flex;
      flex-direction: column;
      height: inherit;
      grid-area: second;
    }

    .folder {
      width: 100%;
      padding: 2px 5px;
      background: $light;
      border-bottom: 2px solid $light-bg;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ul {
      height: 100%;
      overflow-y: auto;
      padding: 0 5px;
      scroll-behavior: smooth;

      li {
        padding: 0.5rem;
        list-style: none;
        border: 1px solid $light-bg;
        background: $light;
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
          width: 16px;
        }
        span {
          padding-left: 0.5rem;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &:hover {
          background: $blue;
          color: $light;
          //   font-weight: bold;
        }
      }
    }
  }
}
</style>
