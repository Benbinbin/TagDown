import { openDB } from 'idb';

const useDatabase = {
  // get the existed database or create a new database in IndexedDb
  getDatabase: async (databaseName, version, storeName, keyName, indexName, fieldAsIndex, isUnique = false, isMultiEntry = false) => openDB(databaseName, version, {
    // upgrade or init database
    upgrade(db) {
      let store;
      if (keyName) {
        store = db.createObjectStore(storeName, { keyPath: keyName });
      } else {
        store = db.createObjectStore(storeName);
      }
      if (store && indexName) {
        store.createIndex(indexName, fieldAsIndex, { unique: isUnique, multiEntry: isMultiEntry });
      }
    },
  }),
  getAllData: async (db, storeName) => {
    const result = await db.getAll(storeName);
    return result;
  },
  getDataByKey: async (db, storeName, queryKey) => {
    const result = await db.get(storeName, queryKey);
    return result;
  },
  getAllDataInIndex: async (db, storeName, indexName) => {
    const result = await db.getAllFromIndex(storeName, indexName);
    return result;
  },
  getDataByIndex: async (db, storeName, indexName, indexValue) => {
    const result = await db.getAllFromIndex(storeName, indexName, indexValue);
    return result;
  },
  setData: async (db, storeName, val) => {
    await db.put(storeName, val);
  },
  delDataByKey: async (db, storeName, key) => {
    await db.delete(storeName, key);
  },
  clearAllData: async (db, storeName) => {
    await db.clear(storeName);
  },
};

export default useDatabase;
