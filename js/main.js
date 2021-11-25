/* global $ */

$(() => {
  $('.lazy').unveil(200, function fadeIn() {
    $(this).on('load', () => {
      this.style.opacity = 1;
    });
  });

  // Open all non-local links in new tab
  // This allows us to use markdown syntax without worrying about target="_blank"
  $('a[href^=http]').attr('target', '_blank');
});
