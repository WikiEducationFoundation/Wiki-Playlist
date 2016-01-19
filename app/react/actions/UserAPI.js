import { getCSRFToken } from './rails';
import PopupCenter from '../utils/Popup';

export function openLoginPopup(e) {
  e.preventDefault();
  var title = $(e.target).data('popup');
  PopupCenter(e.target.href, title, '500', '500');
}

export function getUserStatus() {
  $.get('/auth/user_status', function(data) {
    if(data.logged_in) {
      $(document).trigger($.Event("authSuccess", data.user));
    }
  });
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