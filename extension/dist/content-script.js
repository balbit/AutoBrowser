"use strict";
document.addEventListener('click', (event) => {
    const target = event.target;
    sendMessage({ action: 'click', selector: getPath(target) });
    console.log('click', getPath(target));
});
function sendMessage(message) {
    chrome.runtime.sendMessage(message);
}
function getPath(el) {
    if (el.id) {
        return `#${el.id}`;
    }
    // More complex path calculations could go here
    return el.tagName;
}
