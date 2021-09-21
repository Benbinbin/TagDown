export default function useTab() {
  // get current active tab
  const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  };

  // create new tab
  const createNewTab = async (active = true) => {
    const newTab = await chrome.tabs.create({
      active,
    });
    return newTab;
  };

  // open bookmark on current tab or new tab
  const openBookmark = async (nodeId, mode = 'new', active = true) => {
    const nodes = await chrome.bookmarks.get(nodeId);
    const { url } = nodes[0];

    let tab;
    if (mode === 'new') {
      // open on new tab
      tab = await createNewTab(active);
    } else if (mode === 'current') {
      // open on current active tab
      tab = await getActiveTab();
    }
    await chrome.tabs.update(tab.id, {
      url,
    });
    return tab;
  };

  // get all tab groups
  const getAllTabGroups = async () => {
    const tabGroups = await chrome.tabGroups.query({
      windowId: chrome.windows.WINDOW_ID_CURRENT,
    });
    return tabGroups;
  };

  const watchTabGroups = (callback) => {
    chrome.tabGroups.onCreated.addListener(callback);
    chrome.tabGroups.onRemoved.addListener(callback);
    chrome.tabGroups.onUpdated.addListener(callback);
  };

  // create a group with a tab
  const createTabInGroup = async (tabId, group) => {
    const groupId = await chrome.tabs.group({
      tabIds: tabId,
    });

    await chrome.tabGroups.update(groupId, {
      color: group.color,
      title: group.title,
    });

    return groupId;
  };

  // open bookmark in a group
  const openBookmarkOnGroup = async (nodeId, groupId) => {
    const tab = await openBookmark(nodeId, 'new', false);
    await chrome.tabs.group({
      groupId,
      tabIds: tab.id,
    });
    return tab;
  };

  return {
    getActiveTab,
    createNewTab,
    openBookmark,
    getAllTabGroups,
    watchTabGroups,
    createTabInGroup,
    openBookmarkOnGroup,
  };
}
