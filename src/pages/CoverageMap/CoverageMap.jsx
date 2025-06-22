import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet + Webpack/Vite
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = defaultIcon;

const CoverageMap = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-4">
        We are available in 64 districts
      </h2>

      <MapContainer
        center={[23.685, 90.3563]} // Center of Bangladesh
        zoom={7}
        scrollWheelZoom={true}
        className="h-[500px] rounded-xl shadow-lg z-0"
      >
        {/* Base map tiles from OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example Marker in Dhaka */}
        <Marker position={[23.8103, 90.4125]}>
          <Popup>Dhaka District</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
