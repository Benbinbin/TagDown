export default function useGist() {
  // set and get github token
  const setGithubToken = (token) => {
    chrome.storage.local.set({ githubToken, token });
  };

  const getGithubToken = () => new Promise((resolve, reject) => {
    chrome.storage.local.get('githubToken', (result) => {
      resolve(result.webDAVInfo);
    });
  });

  // create gist
  const createGist = async (gist) => {
    const token = await getGithubToken();
    if (!token) return;
    fetch('https://api.github.com/gists', {
      method: 'POST',
      body: JSON.stringify(gist),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }).then((res) => {
      console.log('Success:', res.json());
      return {
        status: true,
        msg: '创建成功',
        data: res.json(),
      };
    })
      .catch((err) => {
        console.error('Error:', err);
        return {
          status: false,
          msg: '创建失败',
        };
      });
  };

  // update gist
  const updateGist = async (gistId, data) => {
    const token = await getGithubToken();
    if (!token || !gistId) return;
    fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        gist_id: gistId,
        ...data,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }).then((res) => {
      console.log('Success:', res.json());
      return {
        status: true,
        msg: '更新成功',
        data: res.json(),
      };
    })
      .catch((err) => {
        console.error('Error:', err);
        return {
          status: false,
          msg: '更新失败',
        };
      });
  };

  return {
    setGithubToken,
    getGithubToken,
    createGist,
    updateGist,
  };
}
