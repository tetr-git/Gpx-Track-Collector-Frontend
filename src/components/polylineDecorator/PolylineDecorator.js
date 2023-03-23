import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-polylinedecorator";
import L from "leaflet";

const PolylineDecorator = (props) => {
  const { positions, pathOptions, arrowheads, eventHandlers } = props;
  const map = useMap();

  useEffect(() => {
    const polyline = L.polyline(positions, pathOptions);
    const decorator = L.polylineDecorator(polyline, {
      patterns: [
        {
          offset: arrowheads.frequency,
          repeat: arrowheads.frequency,
          symbol: L.Symbol.arrowHead({
            pixelSize: parseInt(arrowheads.size, 6),
            pathOptions: {
              fillOpacity: arrowheads.fill ? 1 : 0,
              stroke: true,
              color: pathOptions.color,
            },
          }),
        },
      ],
    });

    polyline.addTo(map);

    for (const eventName in eventHandlers) {
      if (eventName === "mouseover") {
        polyline.on(eventName, (e) => {
          decorator.addTo(map);
          eventHandlers[eventName](e);
        });
      } else if (eventName === "mouseout") {
        polyline.on(eventName, (e) => {
          setTimeout(() => {
            map.removeLayer(decorator);
          }, 1000);
          eventHandlers[eventName](e);
        });
      } else {
        polyline.on(eventName, eventHandlers[eventName]);
      }
    }

    return () => {
      map.removeLayer(polyline);
      map.removeLayer(decorator);
    };
  }, [positions, pathOptions, arrowheads, eventHandlers, map]);

  return null;
};

export default PolylineDecorator;
