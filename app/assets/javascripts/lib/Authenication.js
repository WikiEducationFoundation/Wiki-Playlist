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
  var $notice = $('.notice');

  $.get('/auth/status', function(data) {
    console.log(data);
    if(data.logged_in) {
      var event = $.Event("authSuccess")
      $(document).trigger(event)
      flashMessage('You are logged in');
    }
  });

  var flashMessage = function(msg) {
    $notice.text(msg);
    setTimeout(function(){$notice.text('')}, 1000);
  }
  
  $(document).on('click', '[data-popup]', function(e) {
    e.preventDefault();
    var title = $(e.target).data('popup');
    return PopupCenter(e.target.href, title, '500', '500');
  });

  $(document).on('authSuccess', function() { 
    $.get('/auth/logged_in', function() {
      flashMessage('Logged in successfully');
    });
    $.get('/auth/user', function(data) {
      var event = $.Event("authUser", data)
      $(document).trigger(event)
    })
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
      $.get('/auth/logged_out', function() {
        var event = $.Event("authLogout")
        $(document).trigger(event)
        flashMessage('Logged out successfully');
      });
    });
  });
});