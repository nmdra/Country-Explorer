import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CountryMap = ({ latlng, name, flagUrl }) => {
  if (!latlng?.length || !flagUrl) return null;

  // Custom flag icon
  const flagIcon = L.icon({
    iconUrl: flagUrl,
    iconSize: [40, 30], // width, height
    iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30],
    className: "shadow-md rounded", // optional Tailwind class for image shape
  });

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Location Map
      </h3>
      <MapContainer
        center={latlng}
        zoom={5}
        scrollWheelZoom={false}
        className="w-full h-[400px] rounded shadow"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={latlng} icon={flagIcon}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CountryMap;
