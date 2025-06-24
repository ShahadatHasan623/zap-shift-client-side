import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

const FlyToDistrict = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

const CoverageMap = ({ serviceCenter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [openPopupIndex, setOpenPopupIndex] = useState(null);

  const popupRefs = useRef([]);
  const handleSearch = (e) => {
    e.preventDefault()
    const matched = serviceCenter.find((center) =>
      center.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matched) {
      const index = serviceCenter.indexOf(matched);
      setSelectedCenter([matched.latitude, matched.longitude]);
      setOpenPopupIndex(index);

      setTimeout(() => {
        popupRefs.current[index]?.openPopup();
      }, 600);
    } else {
      alert("District not found");
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-4">
        We are available in 64 districts
      </h2>

      {/* 🔍 Search Box */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search district name"
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary text-black">
          Search
        </button>
      </div>

      {/* map container  */}
      <MapContainer
        center={[23.685, 90.3563]} // Center of Bangladesh
        zoom={7}
        scrollWheelZoom={true}
        className="h-[500px] rounded-xl shadow-lg z-0"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedCenter && <FlyToDistrict center={selectedCenter} zoom={10} />}

        {serviceCenter.map((center, index) => (
          <Marker key={index} position={[center.latitude, center.longitude]}>
            <Popup autoOpen={center.district ===openPopupIndex}>
              <div>
                <strong>{center.district}</strong>
                <br />
                Covered Areas: {center.covered_area.join(", ")}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
