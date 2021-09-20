import useTab from './useTab';

const { createNewTab } = useTab();

export default function useBookmark() {
  // get current active tab
  const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  };

  // open bookmark on current tab or new tab
  // return tab
  const openBookmark = async (nodeId, mode = 'new') => {
    const nodes = await chrome.bookmarks.get(nodeId);
    const { url } = nodes[0];

    let tab;
    if (mode === 'new') {
      // open on new tab
      tab = await createNewTab();
    } else if (mode === 'current') {
      // open on current active tab
      tab = await getActiveTab();
    }
    await chrome.tabs.update(tab.id, {
      url,
    });
    return tab;
  };

  const openBookmarkOnGroup = async (nodeId, groupId) => {
    const tab = await openBookmark(nodeId, mode = 'new');
    await chrome.tabs.group({
      groupId,
      tabIds: tab.id,
    });
    return tab;
  };

  return {
    getActiveTab,
    openBookmark,
    openBookmarkOnGroup,
  };
}
