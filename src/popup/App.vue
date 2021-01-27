<template>
  <!-- eslint-disable max-len -->
  <div>
    <div class="btn-container" v-if="current === 'buttons'">
      <button class="btn" @click="addBookmark" v-if="!booked">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
        </svg>
        <span>添加书签</span>
      </button>
      <div v-if="booked" @mouseenter="editing=true" @mouseleave="editing=false">
        <button class="btn-success" v-show="!editing">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
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

      <button class="btn" @click="getBookmarks">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="transform: rotate(-90deg)">
          <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
        </svg>
        <span>浏览书签</span>
      </button>
      <button class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
        </svg>
        <span>书签管理</span>
      </button>
    </div>
    <div class="bookmarks-container" v-if="current === 'bookmarks'">
      <ul class="navbar">
        <li @click="current='buttons'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <title>返回</title>
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
        </li>
        <li v-show="mode==='nav'" @click="mode='tree'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <title>导航器模式</title>
            <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
            <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1h12zM1 13V6h4v8H2a1 1 0 0 1-1-1zm5 1V6h9v7a1 1 0 0 1-1 1H6z" />
          </svg>
        </li>
        <li v-show="mode==='tree'" @click="mode='nav'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="transform: rotate(-90deg)">
            <title>树图模式</title>
            <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
          </svg>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <title>最大化</title>
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          </svg>
        </li>
      </ul>
      <tree v-if="mode === 'tree'" :bookmarks="bookmarks" class="tree"></tree>
      <div class="main" v-if="mode==='nav'">
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

            <button class="sunburst" @click="showNav='sunburst'" v-show="showNav==='none'">
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
            <sunburst :bookmarks="bookmarks" v-show="showNav==='sunburst'" :size="navSize"></sunburst>
          </div>
        </div>
        <div class="bookmarks-list">
          <div class="first">
            <ul class="scrollbar" ref="first">
              <li v-for="bookmark of pinsList" :key="bookmark">{{ bookmark }}</li>
            </ul>
            <div class="nav-bottom">
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

          <div class="second scrollbar">
            <ul class="scrollbar" ref="second">
              <li v-for="bookmark of bookmarksList" :key="bookmark">{{ bookmark }}</li>
            </ul>
            <div class="nav-bottom">
              <button class="up" @click="secondUp('second')">
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
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';
import Sunburst from '@/components/Sunburst.vue';

export default {
  name: 'App',
  components: {
    Tree,
    Sunburst,
  },
  data() {
    return {
      id: null,
      booked: false,
      editing: false,
      current: 'buttons',
      bookmarks: [],
      mode: 'nav',
      showNav: 'sunburst',
      navSize: 'small',
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
      bookmarksList: [
        'BananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBanana',
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
      ],
    };
  },
  computed: {
    leftPos() {
      if (this.navSize === 'small') return 0;
      return '10px';
    },
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
        // console.log(bookmarks);
        [this.bookmarks] = bookmarks;
        this.current = 'bookmarks';
      });
    },
    closeNav() {
      this.showNav = 'none';
      this.navSize = 'small';
    },
    scrollUp(val) {
      this.$refs[val].scrollTop = 0;
    },
    scrollDown(val) {
      this.$refs[val].scrollTop = this.$refs[val].scrollHeight;
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

    // chrome.bookmarks.getChildren('0', (bookmarks) => {
    //   console.log(bookmarks);
    // });
  },
};
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    padding: 0.5rem;
    margin: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 0.5rem;
  }

  .btn {
    width: 130px;
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

  .edit-buttons-container {
    width: 130px;
    display: flex;
    align-items: center;
  }

  .btn-success {
    width: 130px;
    border: 2px solid $green;
    background: $green;
  }

  .btn-delete {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    border: 2px solid $red;
    border-radius: 0.5rem 0 0 0.5rem;
    background: $red;
    color: $light;
    font-weight: bold;
  }

  .btn-edit {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    border: 2px solid $blue;
    border-radius: 0 0.5rem 0.5rem 0;
    background: $blue;
    color: $light;
    font-weight: bold;
  }
}

.bookmarks-container {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .navbar {
    width: 100%;
    height: 30px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $light;

    li {
      list-style: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .tree {
    height: 500px;
    width: 100%;
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
      text-overflow: ellipsis;
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
      background: $light;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      button {
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

      ul {
        flex-grow: 1;
        overflow-y: auto;
        padding: 0 5px;
        scroll-behavior: smooth;

        li {
          padding: 0.5rem;
          list-style: none;
          border: 1px solid $light-bg;
          background: $light;
          &:hover {
            background: $blue;
            color: $light;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
