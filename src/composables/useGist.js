export default function useGist() {
  // set and get github token
  const setGithubToken = async (token) => {
    await chrome.storage.local.set({ githubToken: token });
  };

  const getGithubToken = () => new Promise((resolve, reject) => {
    chrome.storage.local.get('githubToken', (result) => {
      resolve(result.githubToken);
    });
  });

  const clearGithubToken = () => new Promise((resolve, reject) => {
    chrome.storage.local.remove('githubToken', () => {
      resolve('delete githubToken');
    });
  });

  // set gists records
  const setGistsRecord = async (gistsRecord) => {
    await chrome.storage.local.set({ gistsRecord });
  };

  const getGistsRecord = () => new Promise((resolve, reject) => {
    chrome.storage.local.get('gistsRecord', (result) => {
      resolve(result.gistsRecord);
    });
  });

  const clearGistsRecord = () => new Promise((resolve, reject) => {
    chrome.storage.local.remove('gistsRecord', () => {
      resolve('delete gistsRecord');
    });
  });

  // create gist
  const createGist = (token, gist) => new Promise((resolve, reject) => {
    fetch('https://api.github.com/gists', {
      method: 'POST',
      body: JSON.stringify(gist),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }).then(async (res) => {
      if (res.status === 201) {
        const resData = await res.json();
        resolve({
          state: true,
          msg: '创建成功',
          data: resData,
        });
      } else {
        console.log('fail', res);
        resolve({
          state: false,
          msg: '创建失败',
        });
      }
    })
      .catch((err) => {
        console.error('Error:', err);
        return {
          state: false,
          msg: '创建失败',
        };
      });
  });

  // update gist
  const updateGist = async (token, gistId, data) => new Promise((resolve, reject) => {
    fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...data,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        const resData = await res.json();
        resolve({
          state: true,
          msg: '更新成功',
          data: resData,
        });
      } else {
        console.log('fail', res);
        resolve({
          state: false,
          msg: '更新失败',
        });
      }
    })
      .catch((err) => {
        console.error('Error:', err);
        return {
          state: false,
          msg: '更新失败',
        };
      });
  });

  // get gist filename
  const getGist = (token, gistId) => new Promise((resolve, reject) => {
    let header = new Headers({});
    if (token) {
      header = new Headers({
        Authorization: `Bearer ${token}`,
      });
    }
    fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'GET',
      headers: header,
    })
      .then(async (res) => {
        if (res.status === 200) {
          const gist = await res.json();
          resolve(gist);
        } else {
          resolve(null);
        }
      }).catch((err) => {
        console.log('Error', err);
      });
  });

  return {
    setGithubToken,
    getGithubToken,
    clearGithubToken,
    setGistsRecord,
    getGistsRecord,
    clearGistsRecord,
    createGist,
    updateGist,
    getGist,
  };
}
