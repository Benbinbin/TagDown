export default function useTab() {
  // get all tab groups
  const getAllTabGroups = async () => {
    const tabGroups = await chrome.tabGroups.query({
      windowId: windows.WINDOW_ID_CURRENT,
    });
    return tabGroups;
  };

  // create new tab
  // return the tab
  const createNewTab = async (active = true) => {
    const newTab = await chrome.tabs.create({
      active,
    });
    return newTab;
  };

  // create a group with a tab
  // return the group
  const createTabInGroup = async (tabId, group) => {
    const groupId = await chrome.tabs.group({
      createProperties: group,
      tabIds: tabId,
    });
    return groupId;
  };

  return {
    createNewTab,
    getAllTabGroups,
    createTabInGroup,
  };
}
