function bootstrap() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0].url && !tabs[0].url.startsWith('chrome://')) {
      let activeTabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: {tabId: activeTabId},
        files: ["typo/typo.js"]
      }, () => {
        console.log("Typo script injected.");
      });

      chrome.scripting.executeScript({
        target: {tabId: activeTabId},
        files: ["content-spell.js"]
      }, () => {
        console.log("Content-spell script injected.");
      });
    } else {
      console.log("Script injection is not allowed on chrome:// URLs.");
    }
  });
}

console.log("Typo is being initialized.");
bootstrap();
