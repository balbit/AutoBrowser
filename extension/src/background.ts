

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id??0 },
    func: sendToggleSidebar
  });
});

function sendToggleSidebar() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleSidebar" });
    }
  });
}