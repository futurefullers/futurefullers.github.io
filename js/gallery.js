/* global $, Layzr */

$(() => {
  $(document).on('click', '[data-toggle="lightbox"]', function openImage(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });
  Layzr().update().check().handlers(true);
});
