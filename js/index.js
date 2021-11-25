/* global $ */

$(() => {
  $('div.hidden').fadeIn(1000).removeClass('hidden');

  function setClock() {
    // The month is 0-indexed. Why.
    const t = new Date(2017, 10, 3, 15, 30).getTime() - new Date().getTime();
    if (t > 0) {
      const time = {
        days: Math.floor(t / (1000 * 60 * 60 * 24)),
        hours: Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((t / 1000 / 60) % 60),
        seconds: Math.floor((t / 1000) % 60),
      };
      $('.days').html(time.days);
      $('.hours').html(time.hours);
      $('.minutes').html(time.minutes);
      $('.seconds').html(time.seconds);
    } else {
      $('.clock').empty();
    }
  }
  setInterval(setClock, 1000);
  setClock();
});
