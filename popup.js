const copyToClipboard = input => {
  const el = document.createElement('textarea');

  el.value = input;

  // Prevent keyboard from showing on mobile
  el.setAttribute('readonly', '');

  el.style.contain = 'strict';
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  el.style.fontSize = '12pt'; // Prevent zooming on iOS

  const selection = document.getSelection();
  let originalRange = false;
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }

  document.body.appendChild(el);
  el.select();

  // Explicit selection workaround for iOS
  el.selectionStart = 0;
  el.selectionEnd = input.length;

  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {}

  document.body.removeChild(el);

  if (originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  return success;
};

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

copyToClipboard(generate(32));
