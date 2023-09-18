console.info('chrome-ext template-react-js background script')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'updateBadgeValue') {
    // Calculate the badge text based on the remaining days.
    const remainingDays = message.remainingDays;
    const badgeText = remainingDays > 0 ? remainingDays.toString() : '';

    // Set the badge text.
    chrome.action.setBadgeText({
      text: badgeText,
    });
  }
});
