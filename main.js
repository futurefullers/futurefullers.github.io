/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global $ */
'use strict';

$(() => {
    var lazy, lazyBackground;

    // Lazy load images
    lazy = function () {
        var $this = $(this);
        $this.attr('src', $this.attr('data-src'));
        $this.on('load', function () {
            this.style.opacity = 1;
            $(this).css('height', 'auto');
        });
    };

    // Background image lazy loading through an unrendered `img`
    lazyBackground = function () {
        var self = this, dataSrc = $(this).attr('data-src');
        $('<img/>').attr('src', dataSrc).on('load', function () {
            $(self).css('background-image', `url(${dataSrc})`);
            $(this).remove();
            self.style.opacity = 1;
        });
    };

    $('.header-background').each(lazyBackground);
});
