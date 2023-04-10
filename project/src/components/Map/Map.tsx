import { useRef, useEffect, useState } from 'react';
import { FeatureGroup, Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { City } from '../../types/cities';
import { Offers } from '../../types/offers';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constants';

import 'leaflet/dist/leaflet.css';


type MapProps = {
  city: City;
  offers: Offers;
  selectedPoint: number | null;
  className: string;
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
  const { city, offers, selectedPoint, className } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const [markersGroup] = useState<FeatureGroup>(new FeatureGroup());

  useEffect(() => {
    if (map) {
      markersGroup.clearLayers();
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker.setIcon(point.id === selectedPoint ? currentCustomIcon : defaultCustomIcon);
        markersGroup.addLayer(marker);
      });

      markersGroup.addTo(map);
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, offers, selectedPoint]);

  return <section ref={mapRef} className={`${className}__map map`}></section>;
}

export default Map;
