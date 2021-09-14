export default function useBookmark() {
  const getTree = (nodeId) => {
    chrome.bookmarks.getChildren(nodeId);
  };

  return {
    getTree,
  };
}
