export function addSupportClasses() {
  var supportsBackgroundBlendMode = window.getComputedStyle(document.body).backgroundBlendMode;
  const supportClasses = {
    blendmodes: (supportsBackgroundBlendMode ? '' : 'no-') + 'background-blend-mode'
  }
  const bodyClasses = _.values(supportClasses).join(' ');
  $('body').addClass(bodyClasses);
}
