export default function useBookmark() {
  // open bookmark on current tab or new tab
  const openBookmark = (nodeId, mode = 'new') => {
    chrome.bookmarks.get(nodeId).then((nodes) => nodes[0].url).then((url) => {
      if (mode === 'new') {
        chrome.tabs.create({
          url,
        });
      }
    });
  };

  return {
    openBookmark,
  };
}
