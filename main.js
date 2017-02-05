/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global $ */
'use strict';

$(() => {
    $('.lazy').unveil(200, function () {
        $(this).on('load', () => this.style.opacity = 1);
    });
});
