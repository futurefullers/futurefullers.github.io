/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global $, google */
/* exported mapper, hotelMap, travelMap, chicagoMap, weddingMap */
'use strict';

/**
 * Colors to use in Google Maps overlays.
 *
 * CTA colors from http://www.transitchicago.com/developers/branding.aspx
 */
var colors = {
    navy: '#005',
    champagne: '#f0e68c',
    cta: {
        blue: '#00a1de',
        orange: '#f9461c'
    }
};

/**
 * Basic functions to simplify the Google Maps API.
 */
var mapper = {
    data: {},
    /**
     * Creates and returns a map object with some defaults set.
     */
    base: function ($selector, options={}) {
        var map;
        map =  new google.maps.Map($selector[0], {
            zoom: options.hasOwnProperty('zoom') ? options.zoom : 15,
            center: options.hasOwnProperty('center') ? options.center : this.data.locations.center,
            styles: this.data.style,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false
        });
        map.infowindow = new google.maps.InfoWindow({maxWidth: 300});
        this.marker({
            map: map,
            position: this.data.locations.church,
            icon: 'favorite_border',
            color: colors.champagne,
            info: this.data.info.church
        });
        this.marker({
            map: map,
            position: this.data.locations.reception,
            icon: 'local_bar',
            color: colors.champagne,
            info: this.data.info.reception
        });
        return map;
    },

    /**
     * Makes a marker using custom options.
     */
    marker: function (options) {
        var marker;
        marker = new google.maps.Marker({
            map: options.map,
            position: options.position,
            animation: google.maps.Animation.DROP,
            icon: {
                labelOrigin: new google.maps.Point(0, -25),
                path: this.data.pins.square,
                fillColor: options.color,
                fillOpacity: 1,
                strokeWeight: 0
            },
            label: {
                color: '#fff',
                fontFamily: 'Material Icons',
                fontSize: '36px',
                text: options.icon
            }
        });
        marker.addListener('click', () => {
            var info = options.map.infowindow;
            if (info.content === options.info) {
                info.setContent(null);
                info.close();
            } else {
                info.setContent(options.info);
                info.open(options.map, marker);
            }
        });
        if (options.open) {
            options.map.infowindow.setContent(options.info);
            options.map.infowindow.open(options.map, marker);
        }
    }
};

/**
 * Called on load of accomodations page.
 */
function hotelMap () {
    var map = mapper.base($('.hotel-map'));
    mapper.marker({
        map: map,
        position: mapper.data.locations.palmer,
        icon: 'hotel',
        color: colors.navy,
        info: mapper.data.info.palmer
    });
    mapper.marker({
        map: map,
        position: mapper.data.locations.residence,
        icon: 'hotel',
        color: colors.navy,
        info: mapper.data.info.residence
    });
    mapper.marker({
        map: map,
        position: mapper.data.locations.university,
        icon: 'hotel',
        color: colors.navy,
        info: mapper.data.info.university,
        open: true
    });
}

/**
 * Called on load of travel page.
 */
function travelMap () {
    var airport, train, parking;
    airport = mapper.base($('.airport-map'), {
        center: mapper.data.locations.airport_center,
        zoom: 11
    });
    mapper.marker({
        map: airport,
        position: mapper.data.locations.ohare,
        icon: 'airplanemode_active',
        color: colors.cta.blue,
        info: mapper.data.info.ohare
    });
    mapper.marker({
        map: airport,
        position: mapper.data.locations.midway,
        icon: 'airplanemode_active',
        color: colors.cta.orange,
        info: mapper.data.info.midway
    });

    parking = mapper.base($('.parking-map'));
    mapper.marker({
        map: parking,
        position: mapper.data.locations.palmer,
        icon: 'local_parking',
        color: colors.navy,
        info: mapper.data.info.palmer
    });
    train = mapper.base($('.train-map'));
}

/**
 * Called on load of Chicago guide page.
 */
function chicagoMap () {
    mapper.base($('.chicago-map'), {
        center: mapper.data.locations.guide_center,
        zoom: 12
    });
}

/**
 * Called on load of wedding page.
 */
function weddingMap () {
    mapper.base($('.wedding-map'));
}
