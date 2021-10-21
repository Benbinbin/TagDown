import { createClient } from 'webdav/web';

export default function useWebDAV() {
  // set and get webDAV infomation
  const setWebDAVInfo = async (url, username, password) => {
    await chrome.storage.local.set({
      webDAVInfo: {
        url,
        username,
        password,
      },
    });
  };

  const getWebDAVInfo = () => new Promise((resolve, reject) => {
    chrome.storage.local.get('webDAVInfo', (result) => {
      resolve(result.webDAVInfo);
    });
  });

  const clearWebDAVInfo = () => new Promise((resolve, reject) => {
    chrome.storage.local.remove('webDAVInfo', () => {
      resolve('delete webDAV information');
    });
  });

  const setWebDAVSync = async (value) => {
    await chrome.storage.local.set({ webDAVSync: value });
  };

  const getWebDAVSync = () => new Promise((resolve, reject) => {
    chrome.storage.local.get('webDAVSync', (result) => {
      resolve(result.webDAVSync);
    });
  });

  // const setWebDAVBakcupTime = async (value) => {
  //   await chrome.storage.local.set({ webDAVBakcupTime: value });
  // };

  // const getWebDAVBakcupTime = () => new Promise((resolve, reject) => {
  //   chrome.storage.local.get('webDAVBakcupTime', (result) => {
  //     resolve(result.webDAVBakcupTime);
  //   });
  // });

  // create webDAV client
  const createWebDAVClient = (url, username, password) => {
    const client = createClient(url, {
      username,
      password,
      // withCredentials: true,
    });
    return client;
  };

  // check webDAV connect
  const checkWebDAVConnect = (client) => new Promise((resolve, reject) => {
    client.stat('/')
      .then(() => {
        resolve({
          state: true,
          msg: '连接成功',
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          resolve({
            state: false,
            stateCode: 401,
            msg: '未获得访问权限',
          });
        } else {
          resolve({
            state: false,
            stateCode: 404,
            msg: '连接失败',
          });
        }
      });
  });

  // check folder exist state or create folder
  const checkWebDAVFolder = async (client, folderPath) => {
    if (await client.exists(folderPath) === false) {
      await client.createDirectory(folderPath, { recursive: true });
    }
  };

  // get files list in folder
  const getWebDAVFolder = (client, folderPath) => new Promise((resolve, reject) => {
    client.getDirectoryContents(folderPath)
      .then((contents) => {
        resolve(contents);
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

  // get folder update time
  const getWebDAVLastFileState = async (client, folderPath) => {
    await checkWebDAVFolder(client, folderPath);
    const filesArr = await getWebDAVFolder(client, folderPath);
    console.log(filesArr);
    if (filesArr.length === 0) return null;
    // const stat = await client.stat(folderPath);
    // console.log(stat);
    const lastFile = filesArr[filesArr.length - 1];
    // return lastFile.lastmod;
    return lastFile;
  };

  // get file
  const getWebDAVFile = (client, filePath, format = 'text') => new Promise((resolve, reject) => {
    client.getFileContents(filePath, { format })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

  // write file
  const writeWebDAVFile = async (client, folderPath, fileName, data) => {
    await checkWebDAVFolder(client, folderPath);
    const res = await client.putFileContents(`${folderPath}/${fileName}`, data, {
      contentLength: false,
    });
    console.log(res);
    if (res) {
      return {
        state: true,
        msg: 'WebDAV 同步成功',
      };
    }
    return {
      state: false,
      msg: 'WebDAV 同步失败',
    };
  };

  return {
    setWebDAVInfo,
    getWebDAVInfo,
    clearWebDAVInfo,
    setWebDAVSync,
    getWebDAVSync,
    // setWebDAVBakcupTime,
    // getWebDAVBakcupTime,
    checkWebDAVFolder,
    // getWebDAVUpdateTime,
    getWebDAVLastFileState,
    createWebDAVClient,
    checkWebDAVConnect,
    getWebDAVFolder,
    getWebDAVFile,
    writeWebDAVFile,
  };
}
