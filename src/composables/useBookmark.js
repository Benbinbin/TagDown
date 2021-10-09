import { inject } from 'vue';

export default function useBookmark() {
  const db = inject('db');

  // check the given url exist on bookmarks tree or not
  const checkBookmarkState = async (url) => {
    const nodes = await chrome.bookmarks.search({
      url,
    });
    if (nodes.length === 0) {
      return false;
    }
    return true;
  };

  // bookmark indexedDB
  const setBookmarkDB = async (id, bookmark) => {
    // console.log(bookmark);
    await db.bookmark.put({
      id,
      title: bookmark.title,
      url: bookmark.url,
      faviconUrl: bookmark.faviconUrl,
      tags: bookmark.tags,
      groups: bookmark.groups,
      description: bookmark.description,
    });
  };

  const getBookmarkDB = async (id) => {
    const bookmark = await db.bookmark.get(id);

    return bookmark;
  };

  const deleteBookmarkDB = async (id) => {
    await db.bookmark.delete(id);
  };

  // share indexedDB
  const setBookmarkShare = async (id, share) => {
    await db.share.put({
      id,
      share: share ? 1 : 0,
    });
  };

  const getBookmarkShare = async (id) => {
    const result = await db.share.get(id);

    if (result) return Boolean(result.share);
    return undefined;
  };

  const deleteBookmarkShare = async (id) => {
    await db.share.delete(id);
  };

  // star indexedDB
  const setBookmarkStar = async (id, star) => {
    await db.star.put({
      id,
      star: star ? 1 : 0,
      type: 'bookmark',
    });
  };

  const getBookmarkStar = async (id) => {
    const result = await db.star.get(id);
    if (result) return Boolean(result.star);
    return undefined;
  };

  const deleteBookmarkStar = async (id) => {
    await db.star.delete(id);
  };

  // create new bookmark and add the bookmark to indexedDB
  const createBookmark = async (node) => {
    // create new bookmark
    const bookmarkNode = await chrome.bookmarks.create({
      title: node.title,
      url: node.url,
      parentId: node.parentId,
    });

    // add new bookmark to indexedDB bookmarkDB
    await setBookmarkDB(bookmarkNode.id, {
      title: node.title,
      url: node.url,
      faviconUrl: node.faviconUrl,
      tags: node.tags,
      groups: node.groups,
      description: node.description,
    });

    // add bookmark share property to indexedDB share
    await setBookmarkShare(bookmarkNode.id, node.share);

    // add bookmark star property to indexedDB star
    await setBookmarkStar(bookmarkNode.id, node.star);

    return bookmarkNode;
  };

  const updateBookmark = async (nodeId, newNode) => {
    await chrome.bookmarks.remove(nodeId);
    await deleteBookmarkDB(nodeId);
    await deleteBookmarkShare(nodeId);
    await deleteBookmarkStar(nodeId);
    let updateBookmarkNode;
    if (newNode.changeFolder) {
      updateBookmarkNode = await chrome.bookmarks.create({
        title: newNode.title,
        url: newNode.url,
        parentId: newNode.parentId,
        index: newNode.index, // create new bookmark node at corresponding index
      });
    } else {
      updateBookmarkNode = await chrome.bookmarks.create({
        title: newNode.title,
        url: newNode.url,
        parentId: newNode.parentId,
      });
    }

    await setBookmarkDB(updateBookmarkNode.id, {
      title: newNode.title,
      url: newNode.url,
      faviconUrl: newNode.faviconUrl,
      tags: newNode.tags,
      groups: newNode.groups,
      description: newNode.description,
    });

    // add new bookmark share property to indexedDB share
    // console.log('update indexedDB share');
    await setBookmarkShare(updateBookmarkNode.id, newNode.share);

    // add new bookmark star property to indexedDB star
    // console.log('update indexedDB star');
    await setBookmarkStar(updateBookmarkNode.id, newNode.star);

    return updateBookmarkNode;
  };

  const deleteBookmark = async (nodeId) => {
    await chrome.bookmarks.remove(nodeId);
    await deleteBookmarkDB(nodeId);
    await deleteBookmarkShare(nodeId);
    await deleteBookmarkStar(nodeId);
  };

  return {
    checkBookmarkState,
    // bookmark indexedDB data
    getBookmarkDB,
    // share state
    getBookmarkShare,
    setBookmarkShare,
    // star state
    getBookmarkStar,
    setBookmarkStar,

    createBookmark,
    updateBookmark,
    deleteBookmark,
  };
}
