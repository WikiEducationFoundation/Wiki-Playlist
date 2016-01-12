var PopupCenter = function(url, title, w, h) {
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

$(function() {

  var $account = $('#account');

  $(document).on('authSuccess', function() { $.get('/auth/logged_in'); });
  
  $(document).on('click', '[data-login]', function(e) {
    e.preventDefault();
    return PopupCenter(e.target.href, "Wikipedia Playlist Login", '500', '500');
  });

  $(document).on('click', '[data-sign-out]', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/users/sign_out',
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': $account.find('meta[name="csrf-token"]').attr('content')
      }
    }).done(function(data) {
      $.get('/auth/logged_out');
    });
  });
});