browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Hello from the background');

  browser.tabs.executeScript({
    file: 'content-script.js',
  });
});
