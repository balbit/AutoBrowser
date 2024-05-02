// Function to send messages to the background script
function sendMessage(message: object) {
    chrome.runtime.sendMessage(message);
}

// Function to generate a CSS selector for an element
function getPath(el: HTMLElement): string {
    if (el.id) {
        return `#${el.id}`;
    }
    // More complex path calculations could include classes or nested selectors
    return el.tagName;
}

// Function to handle general events and encapsulate common logic
function handleEvent(eventType: string, event: Event) {
    const target = event.target as HTMLElement;
    sendMessage({
        action: eventType,
        selector: getPath(target),
        value: (target as HTMLInputElement).value || null
    });
}

// Event listeners for different user interactions
document.addEventListener('click', (event) => handleEvent('click', event));
document.addEventListener('dblclick', (event) => handleEvent('double-click', event));
document.addEventListener('change', (event) => handleEvent('change', event)); // For input, select, and textarea
document.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission for demonstration
    handleEvent('submit', event);
});

// Additional handlers for key events, mouseover, etc., can be similarly added
document.addEventListener('keydown', (event) => {
    const evt = event as KeyboardEvent;
    handleEvent('keydown', event);
    console.log(`Key pressed: ${evt.key}`);
});

let sidebarFrame: HTMLIFrameElement | null = null;

chrome.runtime.onMessage.addListener((message: { action: string }, sender, sendResponse) => {
  if (message.action === "toggleSidebar") {
    toggleSidebar();
  }
});

function toggleSidebar(): void {
  if (!sidebarFrame) {
    sidebarFrame = document.createElement('iframe');
    sidebarFrame.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100%;
      border: none;
      z-index: 1000000;  // Ensure high z-index to be on top of other elements
    `;
    sidebarFrame.src = chrome.runtime.getURL('sidebar.html');
    document.body.appendChild(sidebarFrame);
  } else {
    sidebarFrame.style.display = sidebarFrame.style.display === 'none' ? 'block' : 'none';
  }
}

