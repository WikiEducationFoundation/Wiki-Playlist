import { getCSRFToken } from './rails';
import PopupCenter from '../utils/Popup';
import Cookies from 'js-cookie';

export function openLoginPopup(e) {
  e.preventDefault();
  var title = $(e.target).data('popup');
  PopupCenter(e.target.href, title, '1000', '500');
}

export function getUserStatus() {
  $.get('/auth/user_status', function(data) {
    if(data.logged_in) {
      $(document).trigger($.Event("authSuccess", data.user));
    }
  });

  const onboarded = Cookies.get('onboarded');
  if( onboarded !== undefined) {
    $(document).trigger($.Event("userOnboarded", true));
  } else {
    $(document).trigger($.Event("userOnboarded", false));
  }
}

export function logoutUser(e){
  e.preventDefault();
  getCSRFToken((res)=> {
    $.ajax({
      url: '/users/sign_out',
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': res.token
      }
    }).done(function(data) {
      $(document).trigger($.Event("authLogout"));
    });
  })
}