export function getCSRFToken(callback) {
  $.getJSON('/csrf-token', callback);
}