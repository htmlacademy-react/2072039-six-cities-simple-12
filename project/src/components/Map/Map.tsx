import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { City } from '../../types/cities';
import { Offers } from '../../types/offers';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constants';

import 'leaflet/dist/leaflet.css';


type MapProps = {
  city: City;
  offers: Offers;
  selectedPoint: number | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const { city, offers, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
