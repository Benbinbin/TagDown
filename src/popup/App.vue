<template>
  <BrowserPage
    v-if="page === 'browser'"
    class="browser-mode"
  />

  <EditPage
    v-if="page === 'edit'"
    class="tag-mode"
    :bookmark-id="bookmarkId"
  />
  <transition name="dissolve">
    <div
      v-if="showMsg && msg"
      class="fixed top-4 right-4 z-50 p-4 text-white rounded shadow"
      :class="{
        'bg-green-400': msg.state === true,
        'bg-red-400': msg.state === false
      }"
    >
      {{ msg.title }}
    </div>
  </transition>
</template>

<script>
import {
  ref, provide, inject, onMounted,
} from 'vue';
import { exportDB, importInto } from 'dexie-export-import';
import useWebDAV from '@/composables/useWebDAV';
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
    // get bookmarkState init data from chrome.storage
    chrome.storage.local.get('bookmarkState', (result) => {
      bookmarkState.value = result.bookmarkState;

      chrome.storage.local.get('popupState', (popupStateResult) => {
        if (popupStateResult.popupState === 'auto') {
          if (bookmarkState.value) {
            page.value = 'browser';
          } else {
            page.value = 'edit';
          }
        } else if (popupStateResult.popupState === 'browser') {
          page.value = 'browser';
        } else if (popupStateResult.popupState === 'edit') {
          page.value = 'edit';
        } else {
          page.value = 'browser';
        }
      });
    });

    // provide bookmark state and change the bookmarkstate function
    provide('bookmarkState', bookmarkState);

    const setBookmarkState = async (value) => {
      await chrome.storage.local.set({ bookmarkState: value });
      bookmarkState.value = value;
    };
    provide('setBookmarkState', setBookmarkState);

    // provide set bookmark function
    const bookmarkId = ref('');
    const setBookmarkId = (nodeId) => {
      bookmarkId.value = nodeId;
    };
    provide('setBookmarkId', setBookmarkId);

    // provide page state and change the page state function
    provide('page', page);
    const changePage = (value) => {
      page.value = value;
    };
    provide('changePage', changePage);

    // sync webDAV
    const db = inject('db');

    /**
     * popup msg
     */
    const showMsg = ref(false);
    const msg = ref(null);

    const setMsg = (state, title, duration = 1000) => {
      msg.value = {
        state,
        title,
      };
      showMsg.value = true;
      let timer = setTimeout(() => {
        showMsg.value = false;
        msg.value = null;
        timer = null;
      }, duration);
    };

    const {
      setWebDAVInfo, getWebDAVInfo, clearWebDAVInfo, setWebDAVSync, getWebDAVSync, getWebDAVLastFileState, createWebDAVClient, checkWebDAVConnect, getWebDAVFolder, getWebDAVFile, writeWebDAVFile,
    } = useWebDAV();

    const webDAVState = ref('');
    provide('webDAVState', webDAVState);

    const webDAVUrl = ref('');
    const webDAVUsername = ref('');
    const webDAVPassword = ref('');
    provide('webDAVUrl', webDAVUrl);
    provide('webDAVUsername', webDAVUsername);
    provide('webDAVPassword', webDAVPassword);

    // get webDAV data from chrome.storage
    const setWebDAVInfoHandler = async () => {
      // webDAV information
      const webDAVInfo = await getWebDAVInfo();

      if (!webDAVInfo) {
        webDAVState.value = '未添加';
      } else {
        webDAVUrl.value = webDAVInfo.url;
        webDAVUsername.value = webDAVInfo.username;
        webDAVPassword.value = webDAVInfo.password;
      }
    };

    // check the webDAV state by sending a request to webDAV server
    const webDAVClient = ref(null);
    const lastFileState = ref(null);
    provide('lastFileState', lastFileState);

    const getWebDAVState = async () => {
      if (!webDAVClient.value) return;
      const result = await checkWebDAVConnect(webDAVClient.value);

      webDAVState.value = result.msg;
      if (webDAVState.value === '连接成功') {
        lastFileState.value = await getWebDAVLastFileState(webDAVClient.value, '/tagdown_backup');
      }
    };

    onMounted(async () => {
      await setWebDAVInfoHandler();
      if (!webDAVUrl.value || !webDAVUsername.value || !webDAVPassword.value) return;
      webDAVClient.value = createWebDAVClient(webDAVUrl.value, webDAVUsername.value, webDAVPassword.value);
      await getWebDAVState();
    });

    const syncWebDAV = async () => {
      if (webDAVState.value === '连接成功') {
        const blob = await exportDB(db, {
          prettyJson: true,
        });
        if (!blob) return;

        const date = new Date();
        let filename = `tagdown_${date.getTime()}.json`;

        if (lastFileState.value) filename = lastFileState.value.basename;
        const result = await writeWebDAVFile(webDAVClient.value, '/tagdown_backup', filename, blob);

        if (result.state) {
          lastFileState.value = await getWebDAVLastFileState(webDAVClient.value, '/tagdown_backup');
        }
        await setMsg(result.state, result.msg);
      }
    };

    provide('syncWebDAV', syncWebDAV);

    return {
      page,
      bookmarkId,
      showMsg,
      msg,
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

.dissolve-enter-from,
.dissolve-leave-to {
  opacity: 0;
}

.dissolve-enter-active,
.dissolve-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
