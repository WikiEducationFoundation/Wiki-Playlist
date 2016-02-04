export function getSupportClasses() {
  var supportsBackgroundBlendMode = window.getComputedStyle(document.body).backgroundBlendMode;
  const supportClasses = {
    blendmodes: (supportsBackgroundBlendMode ? '' : 'no-') + 'background-blend-mode'
  }
  return _.values(supportClasses).join(' ');
}
