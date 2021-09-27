/**
 * change action icon
 */
// check the given url exist on bookmarks tree or not then change action url
const checkBookmark = async (url) => {
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

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  activeTabID = activeInfo.tabId;
  const tab = await chrome.tabs.get(activeTabID);
  const { url } = tab;
  if (!url) return;
  const tagState = await checkBookmark(url);
  await changeActionIcon(tagState);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId !== activeTabID || !changeInfo.url) return;
  // console.log('activeTab', tabId === activeTabID);
  // console.log('url', changeInfo.url);
  const { url } = changeInfo;
  const tagState = await checkBookmark(url);
  await changeActionIcon(tagState);
});
