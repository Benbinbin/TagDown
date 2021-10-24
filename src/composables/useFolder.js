import { inject } from 'vue';

export default function useFolder() {
  const db = inject('db');

  const setFolderStar = async (id, star) => {
    await db.star.put({
      id,
      star: star ? 1 : 0,
      type: 'folder',
    });
  };

  const getFolderStar = async (id) => {
    const result = await db.star.get(id);
    if (result) return Boolean(result.star);
    return undefined;
  };

  const deleteFolderStar = async (id) => {
    await db.star.delete(id);
  };

  // create new folder
  const createFolder = async (parentId, folderName) => {
    // console.log('create new folder');
    const folder = await chrome.bookmarks.create({
      title: folderName,
      parentId,
    });
    return folder;
  };

  // rename folder
  const renameFolder = async (nodeId, newName) => {
    const folder = await chrome.bookmarks.update(nodeId, {
      title: newName,
    });

    await setFolderStar(folder.id, false);

    return folder;
  };

  // delete folder
  const deleteFolder = async (nodeId) => {
    await chrome.bookmarks.removeTree(nodeId);
    await deleteFolderStar(nodeId);
  };

  return {
    setFolderStar,
    getFolderStar,
    createFolder,
    renameFolder,
    deleteFolder,
  };
}
