/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global markers, $ */
'use strict';

$(() => {
    // Ceremony open by default
    $('.ceremony-header').addClass('selected');
    $('.ceremony-content').removeClass('hidden');
    markers.ceremony.open();

    $('.wedding-event').click(function () {
        var $this = $(this);
        var weddingEvent = $this.data('event');
        if (!$this.hasClass('selected')) {
            $('.wedding-event').removeClass('selected');
            $this.addClass('selected');
            $('.wedding-info').addClass('hidden');
            $(`.${weddingEvent}-content`).removeClass('hidden');
            markers[weddingEvent].open();
        }
    });
});
