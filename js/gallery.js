/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global document, $, Layzr */
'use strict';

$(() => {
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    Layzr().update().check().handlers(true);
});
