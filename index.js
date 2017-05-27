/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global $, setInterval */
'use strict';

$(() => {
    $('div.hidden').fadeIn(1000).removeClass('hidden');

    var setClock = function () {
        var t, time;
        t = new Date(2017, 11, 3, 21).getTime() - new Date().getTime();
        if (t > 0) {
            time = {
                days: Math.floor(t / (1000 * 60 * 60 * 24)),
                hours: Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((t / 1000 / 60) % 60),
                seconds: Math.floor((t / 1000) % 60)
            };
            $('.days').html(time.days);
            $('.hours').html(time.hours);
            $('.minutes').html(time.minutes);
            $('.seconds').html(time.seconds);
        } else {
            $('.clock').empty();
        }
    };
    setInterval(setClock, 1000);
    setClock();
});
