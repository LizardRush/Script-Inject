// Example event listener for extension installation
chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension installed.");
});

// Example event listener for receiving messages
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("Message received:", message);
    // Handle the message here
});
