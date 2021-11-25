/* global $, google */
/* exported markers, mapper */
const has = Object.prototype.hasOwnProperty;

/**
 * Colors to use in Google Maps overlays.
 *
 * CTA colors from http://www.transitchicago.com/developers/branding.aspx
 */
const colors = {
  navy: '#005',
  champagne: '#f0e68c',
  cta: {
    blue: '#00a1de',
    orange: '#f9461c',
  },
};

/**
 * Global for map markers. Used for programmatic runtime edits.
 */
const markers = {};

/**
 * Basic functions to simplify the Google Maps API.
 */
const mapper = {
  /**
   * Creates and returns a map object with some defaults set.
   */
  base: function createMap($selector, options = {}) {
    const map = new google.maps.Map($selector[0], {
      zoom: has.call(options, 'zoom') ? options.zoom : 15,
      center: has.call(options, 'center') ? options.center : this.config.locations.center,
      styles: this.config.style,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
    });
    map.infowindow = new google.maps.InfoWindow({ maxWidth: 300 });
    this.marker({
      map,
      data: this.data.wedding.church,
      icon: 'favorite_border',
      color: colors.champagne,
      key: 'ceremony',
      zIndex: -1,
    });
    this.marker({
      map,
      data: this.data.wedding.reception,
      icon: 'local_bar',
      color: colors.champagne,
      key: 'reception',
      zIndex: -1,
    });

    // Fading in. Delay is due to lack of handler on map loading.
    // 'visibility' property is used to keep div size constant.
    setTimeout(() => $selector.css('visibility', 'visible').hide().fadeIn(500), 500);

    return map;
  },

  /**
   * Makes a marker using custom options.
   */
  marker: function createMarker(options) {
    let labelOrigin;
    let fontSize;
    let infoContent;
    // Handles mini-sized pins
    if (has.call(options, 'shape') && options.shape === 'mini') {
      labelOrigin = new google.maps.Point(0, -12.5);
      fontSize = '14px';
      infoContent = `<div style="width: 150px; font-size: 75%;">${options.data.content}</div>`;
    } else {
      labelOrigin = new google.maps.Point(0, -25);
      fontSize = '36px';
      infoContent = options.data.content;
    }

    const marker = new google.maps.Marker({
      map: options.map,
      position: options.data.location,
      zIndex: has.call(options, 'zIndex') ? options.zIndex : 0,
      icon: {
        labelOrigin,
        path: this.config.pins[has.call(options, 'shape') ? options.shape : 'square'],
        fillColor: options.color,
        fillOpacity: 1,
        strokeWeight: 0,
      },
      label: {
        color: '#fff',
        fontFamily: 'Material Icons',
        fontSize,
        text: options.icon,
      },
    });

    marker.open = () => {
      const info = options.map.infowindow;
      if (info.content === infoContent) {
        info.setContent(null);
        info.close();
      } else {
        info.setContent(infoContent);
        info.open(options.map, marker);
      }
    };
    marker.addListener('click', marker.open);
    if (has.call(options, 'key')) {
      markers[options.key] = marker;
    }
    if (options.open) {
      options.map.infowindow.setContent(infoContent);
      options.map.infowindow.open(options.map, marker);
    }
  },
};

/**
 * Called on load of accomodations page.
 */
function hotelMap() {
  const map = mapper.base($('.hotel-map'));
  $.each(mapper.data.hotels, (key, data) => mapper.marker({
    map,
    data,
    icon: 'hotel',
    color: colors.navy,
    open: (key === 'university'),
  }));
}

/**
 * Called on load of travel page.
 */
function travelMap() {
  const airport = mapper.base($('.airport-map'), {
    center: mapper.config.locations.airport_center,
    zoom: 11,
  });
  mapper.marker({
    map: airport,
    data: mapper.data.airports.ohare,
    icon: 'airplanemode_active',
    color: colors.cta.blue,
  });
  mapper.marker({
    map: airport,
    data: mapper.data.airports.midway,
    icon: 'airplanemode_active',
    color: colors.cta.orange,
  });
  const train = mapper.base($('.train-map'), { zoom: 14 });
  $.each(mapper.data.trains, (key, data) => mapper.marker({
    map: train,
    data,
    icon: 'train',
    color: colors.navy,
  }));
  const parking = mapper.base($('.parking-map'), { zoom: 14 });
  $.each(mapper.data.garages, (key, data) => mapper.marker({
    map: parking,
    data,
    icon: 'local_parking',
    color: colors.navy,
  }));
}

/**
 * Called on load of Chicago guide page.
 */
function chicagoMap() {
  const map = mapper.base($('.chicago-map'), {
    center: mapper.config.locations.guide_center,
    zoom: 13,
  });
  $.each(mapper.data.events, (key, data) => mapper.marker({
    map,
    data,
    icon: data.icon,
    color: colors.champagne,
    zIndex: -1,
  }));
  $.each(mapper.data.guide, (key, data) => mapper.marker({
    map,
    data,
    shape: 'mini',
    icon: data.icon,
    color: colors.navy,
  }));
}

/**
 * Called on load of wedding page.
 */
function weddingMap() {
  const map = mapper.base($('.wedding-map'), { zoom: 14 });
  $.each(mapper.data.events, (key, data) => mapper.marker({
    map,
    data,
    icon: data.icon,
    color: colors.champagne,
    key,
    zIndex: -1,
  }));
}
