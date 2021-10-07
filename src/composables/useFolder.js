import { inject } from 'vue';

export default function useFolder() {
  // const db = inject('db');

  // create new folder
  const createFolder = async (parentId, folderName) => {
    console.log('create new folder');
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
    return folder;
  };

  // delete folder
  const deleteFolder = async (nodeId) => {
    await chrome.bookmarks.removeTree(nodeId);
  };

  return {
    createFolder,
    renameFolder,
    deleteFolder,
  };
}
