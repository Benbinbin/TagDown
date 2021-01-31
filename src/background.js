// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('Hello from the background');

//   chrome.tabs.executeScript({
//     file: 'content-script.js',
//   });
// });

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    width: 500,
    height: 500,
    mode: 'tree',
  });
});
