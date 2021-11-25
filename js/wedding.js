/* global markers, $ */

$(() => {
  // Ceremony open by default
  $('.ceremony-header').addClass('selected');
  $('.ceremony-content').removeClass('hidden');
  markers.ceremony.open();

  $('.wedding-event').click(function updateMap() {
    const $this = $(this);
    const weddingEvent = $this.data('event');
    if (!$this.hasClass('selected')) {
      $('.wedding-event').removeClass('selected');
      $this.addClass('selected');
      $('.wedding-info').addClass('hidden');
      $(`.${weddingEvent}-content`).removeClass('hidden');
      markers[weddingEvent].open();
    }
  });
});
