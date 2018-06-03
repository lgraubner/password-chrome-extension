var url = '_~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function random(bytes) {
  return crypto.getRandomValues(new Uint8Array(bytes));
}

function generate(size) {
  size = size || 21;
  var id = '';
  var bytes = random(size);
  while (0 < size--) {
    id += url[bytes[size] & 63];
  }
  return id;
}

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: 'clicked_browser_action',
      pass: generate(),
    });
});
