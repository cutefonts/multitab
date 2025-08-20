// Background script for the Multi Tab Search Extension
// Minimal background tasks

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Extension installed
    } else if (details.reason === 'update') {
        // Extension updated
    }
});

chrome.action.onClicked.addListener(() => {
    // Default popup handles UI
});