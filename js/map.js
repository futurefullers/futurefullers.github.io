/* jshint globalstrict: true, undef: true, unused: true, esversion: 6 */
/* global setTimeout, $, google */
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

        // Fading in. Delay is due to lack of handler on map loading.
        // 'visibility' property is used to keep div size constant.
        setTimeout(() => $selector.css('visibility', 'visible').hide().fadeIn(500), 500);

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

    train = mapper.base($('.train-map'), {zoom: 14});
    ['lasalle', 'ogilvie', 'millennium', 'union'].forEach(key => {
        mapper.marker({
            map: train,
            position: mapper.data.locations[key],
            icon: 'train',
            color: colors.navy,
            info: mapper.data.info[key]
        });
    });

    parking = mapper.base($('.parking-map'), {zoom: 14});
    ['wells-garage', 'millennium-garage', 'madison-garage', 'monroe-garage'].forEach(key => {
        mapper.marker({
            map: parking,
            position: mapper.data.locations[key],
            icon: 'local_parking',
            color: colors.navy,
            info: mapper.data.info[key]
        });
    });
}

/**
 * Called on load of Chicago guide page.
 */
function chicagoMap () {
    var map = mapper.base($('.chicago-map'));
    ['cindys', 'millers', 'gage', 'kilt', 'blonde'].forEach(key => {
        mapper.marker({
            map: map,
            position: mapper.data.locations[key],
            icon: 'local_bar',
            color: colors.navy,
            info: mapper.data.info[key]
        });
    });
}

/**
 * Called on load of wedding page.
 */
function weddingMap () {
    mapper.base($('.wedding-map'));
}
