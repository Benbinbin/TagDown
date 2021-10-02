// import Dexie from 'dexie';
import { inject } from 'vue';

export default function useBookmark() {
  const db = inject('db');
  console.log(db);

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

  // get bookmark icon
  const getBookmarkIcon = async (nodeId) => {
    const icon = await db.bookmarkIcon.get(nodeId);
    // console.log(bookmark);
    return icon;
  };

  // bookmark indexedDB
  const setBookmarkDB = async (nodeId, bookmark) => {
    await db.bookmark.put({
      id: nodeId,
      title: bookmark.title,
      url: bookmark.url,
      faviconUrl: bookmark.faviconUrl,
      tags: bookmark.tags,
      groups: bookmark.groups,
      description: bookmark.description,
    });
  };

  const getBookmarkDB = async (nodeId) => {
    console.log('get bookmark db');
    const bookmark = await db.bookmark.get(nodeId);
    console.log('bookmark', bookmark);

    return bookmark;
  };

  const deleteBookmarkDB = async (nodeId) => {
    await db.bookmark.delete(nodeId);
  };

  // share indexedDB
  const setBookmarkShare = async (nodeId, share) => {
    await db.share.put({
      id: nodeId,
      share,
    });
  };

  const getBookmarkShare = async (nodeId) => {
    console.log('get share db');
    const shareState = await db.share.get(nodeId);
    console.log('share', shareState);

    return shareState;
  };

  const deleteBookmarkShare = async (nodeId) => {
    await db.share.delete(nodeId);
  };

  // star indexedDB
  const setBookmarkStar = async (nodeId, star) => {
    await db.star.put({
      id: nodeId,
      star,
    });
  };

  const getBookmarkStar = async (nodeId) => {
    console.log('get star db');
    const starState = await db.star.get(nodeId);
    console.log('star', starState);
    return starState;
  };

  const deleteBookmarkStar = async (nodeId) => {
    await db.star.delete(nodeId);
  };

  // create new bookmark and add the bookmark to indexedDB
  const createBookmark = async (node) => {
    // create new bookmark
    const bookmarkNode = await chrome.bookmarks.create({
      title: node.title,
      url: node.url,
      parentId: node.parentId,
    });

    // add new bookmark to indexedDB bookmark
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
    const updateBookmarkNode = await chrome.bookmarks.create({
      title: newNode.title,
      url: newNode.url,
      parentId: newNode.parentId,
      index: newNode.index, // create new bookmark node at corresponding index
    });

    // add new bookmark to indexedDB bookmark
    await setBookmarkDB(updateBookmarkNode.id, {
      title: newNode.title,
      url: newNode.url,
      faviconUrl: newNode.faviconUrl,
      tags: newNode.tags,
      groups: newNode.groups,
      description: newNode.description,
    });

    // add new bookmark share property to indexedDB share
    await setBookmarkShare(updateBookmarkNode.id, newNode.share);

    // add new bookmark star property to indexedDB star
    await setBookmarkStar(updateBookmarkNode.id, newNode.star);

    return updateBookmarkNode;
  };

  return {
    checkBookmarkState,
    getBookmarkIcon,
    getBookmarkDB,
    getBookmarkShare,
    setBookmarkShare,
    getBookmarkStar,
    setBookmarkStar,
    createBookmark,
    updateBookmark,
  };
}
