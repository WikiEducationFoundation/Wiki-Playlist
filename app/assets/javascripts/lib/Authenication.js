var PopupCenter, getUserData;

PopupCenter = function(url, title, w, h) {
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

getUserData = function() {
  return $.get('/current-user', function(data) {
    return console.log('current user: ', data);
  });
};

$(function() {
  var $account;
  $account = $('#account');
  $('[data-login]').on('click', function(e) {
    e.preventDefault();
    return PopupCenter(e.target.href, "Wikipedia Playlist Login", '500', '500');
  });
  return document.addEventListener('authSuccess', function() {
    $.get('/account', function(data) {
      console.log(data);
    });
    // return $account.empty().append("<%= escape_javascript(render(partial: 'shared/account')) %>");
  });
});