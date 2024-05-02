"use strict";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    // Here you could forward the message to a server or log it locally
});
