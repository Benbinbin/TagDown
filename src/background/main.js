import Dexie from 'dexie';

/**
 * change action icon base on url and bookmark state
 */
// check the given url exist on bookmarks tree or not then change action url
let tabFaviconUrl = '';
const checkBookmark = async (url) => {
  const nodes = await chrome.bookmarks.search({
    url,
  });
  if (nodes.length === 0) {
    return false;
  }

  // set favicon for bookmark tab
  const nodeId = nodes[0].id;
  const db = new Dexie('tagdown');
  await db.version(1).stores({
    bookmark: 'id, *tags',
  });
  const iconBlob = await db.bookmark.get(nodeId);
  if (iconBlob) {
    tabFaviconUrl = URL.createObjectURL(iconBlob);
  } else {
    tabFaviconUrl = '/icons/icon64_tag.png';
  }

  return true;
};

// change the action icon bases on url tag state
const changeActionIcon = async (tag = false) => {
  if (tag) {
    await chrome.action.setIcon({
      path: {
        16: '/icons/icon16_tag.png',
        32: '/icons/icon32_tag.png',
        48: '/icons/icon48_tag.png',
        64: '/icons/icon64_tag.png',
        128: '/icons/icon128_tag.png',
      },
    });
  } else {
    await chrome.action.setIcon({
      path: {
        16: '/icons/icon16_untag.png',
        32: '/icons/icon32_untag.png',
        48: '/icons/icon48_untag.png',
        64: '/icons/icon64_untag.png',
        128: '/icons/icon128_untag.png',
      },
    });
  }
};

let activeTabID = NaN;

// watching the active tab change event
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  activeTabID = activeInfo.tabId;
  const tab = await chrome.tabs.get(activeTabID);
  const url = tab.url || tab.pendingUrl;

  let bookmarkState = false;
  if (url) bookmarkState = await checkBookmark(url);

  // set tab bookmark state
  await chrome.storage.local.set({ bookmarkState });

  // set favicon for no bookmark tab
  const { favIconUrl } = tab;
  if (!bookmarkState && favIconUrl) {
    tabFaviconUrl = favIconUrl;
  } else if (!bookmarkState && !favIconUrl) {
    tabFaviconUrl = '/icons/icon64_untag.png';
  }
  await chrome.storage.local.set({
    tabFaviconUrl,
  });

  // change action icon
  await changeActionIcon(bookmarkState);
});

// watching tab update event
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId !== activeTabID || !changeInfo.url) return;

  // when tab update url check the bookmark state
  const { url } = changeInfo;
  const bookmarkState = await checkBookmark(url);

  // set tab bookmark state
  await chrome.storage.local.set({
    bookmarkState,
  });

  // set favicon for no bookmark tab
  const { favIconUrl } = tab;
  if (!bookmarkState && favIconUrl) {
    tabFaviconUrl = favIconUrl;
  } else if (!bookmarkState && !favIconUrl) {
    tabFaviconUrl = '/icons/icon64_untag.png';
  }
  await chrome.storage.local.set({
    tabFaviconUrl,
  });

  // change action icon
  await changeActionIcon(bookmarkState);
});
