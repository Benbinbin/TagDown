/**
 * change action icon base on tab bookmark state
 */
// check the given url exist on bookmarks tree or not then change action icon
const checkBookmarkState = async (url) => {
  const nodes = await chrome.bookmarks.search({
    url,
  });
  if (nodes.length === 0) {
    return false;
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
  if (url) bookmarkState = await checkBookmarkState(url);

  // set tab bookmark state
  await chrome.storage.local.set({ bookmarkState });

  // change action icon
  await changeActionIcon(bookmarkState);
});

// watching tab update event
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId !== activeTabID || !changeInfo.url) return;

  // when tab update url check the bookmark state
  const { url } = changeInfo;
  const bookmarkState = await checkBookmarkState(url);

  // set tab bookmark state
  await chrome.storage.local.set({
    bookmarkState,
  });

  // change action icon
  await changeActionIcon(bookmarkState);
});

// watching bookmark create event
chrome.bookmarks.onCreated.addListener(async (id, bookmarkNode) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const url = tab.url || tab.pendingUrl;

  let bookmarkState = await chrome.storage.local.get('bookmarkState');
  if (url === bookmarkNode.url) {
    bookmarkState = true;
    // set tab bookmark state
    await chrome.storage.local.set({ bookmarkState });

    // change action icon
    await changeActionIcon(bookmarkState);
  }
});
