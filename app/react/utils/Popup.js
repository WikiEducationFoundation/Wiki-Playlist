export default function PopupCenter(url, title, w, h) {
  var dualScreenLeft, dualScreenTop, height, left, newWindow, top, width;
  dualScreenLeft = window.screenLeft !== void 0 ? window.screenLeft : screen.left;
  dualScreenTop = window.screenTop !== void 0 ? window.screenTop : screen.top;
  width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  left = width / 2 - (w / 2) + dualScreenLeft;
  top = height / 2 - (h / 2) + dualScreenTop;
  newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  if (window.focus) {
    newWindow.focus();
  }
};