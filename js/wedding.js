/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global setTimeout, $ */
'use strict';

$(() => {
    // Ceremony open by default
    $('.ceremony-header').addClass('selected');
    $('.ceremony-content').removeClass('hidden');

    $('.wedding-event').click(function () {
        var $this = $(this);
        if (!$this.hasClass('selected')) {
            $('.wedding-event').removeClass('selected');
            $this.addClass('selected');
            $('.wedding-info').addClass('hidden');
            $(`.${$this.data('event')}-content`).removeClass('hidden');
        }
    });
});
