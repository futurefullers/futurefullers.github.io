/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global document, $ */
'use strict';

$(() => {
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
});
