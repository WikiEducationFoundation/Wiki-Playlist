import { getCSRFToken } from './rails';
import PopupCenter from '../utils/Popup';
import Cookies from 'js-cookie';

export function openLoginPopup(e) {
  e.preventDefault();
  var $target = $(e.target).closest('[data-popup]')
  var title = $target.data('popup');
  PopupCenter($target.attr('href'), title, '1000', '500');
}

export function getUserStatus() {
  $.get('/auth/user_status', function(data) {
    if(data.logged_in) {
      $(document).trigger($.Event("authSuccess", data.user));
    }
  });

  const onboarded = Cookies.get('onboarded');
  if( onboarded !== undefined) {
    $(document).trigger($.Event("userOnboarded", {onboarded: true}));
  } else {
    $(document).trigger($.Event("userOnboarded", {onboarded: false}));
  }
}

export function setOnboardingCookie() {
  Cookies.set('onboarded', true);
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