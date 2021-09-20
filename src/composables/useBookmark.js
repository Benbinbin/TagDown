export default function useBookmark() {
  // create new tab
  const createNewTab = async (active = true) => {
    const newTab = await chrome.tabs.create({
      active,
    });
    return newTab;
  };

  // get current active tab
  const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  };

  // open bookmark on current tab or new tab
  const openBookmark = (nodeId, mode = 'new', active = true) => {
    chrome.bookmarks.get(nodeId).then((nodes) => nodes[0].url).then(async (url) => {
      let tab;
      if (mode === 'new') {
        tab = await createNewTab(active);
      } else if (mode === 'current') {
        tab = await getActiveTab();
      }
      chrome.tabs.update(tab.id, {
        url,
      });
    });
  };

  return {
    createNewTab,
    getActiveTab,
    openBookmark,
  };
}
