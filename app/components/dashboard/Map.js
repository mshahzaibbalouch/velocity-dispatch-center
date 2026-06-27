"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map() {
  return (
    <MapContainer
      center={[30.1575, 71.5249]}
      zoom={12}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[30.1575, 71.5249]}>
        <Popup>Taxi #1</Popup>
      </Marker>

      <Marker position={[30.15, 71.52]}>
        <Popup>Taxi #2</Popup>
      </Marker>

      <Marker position={[30.16, 71.53]}>
        <Popup>Taxi #3</Popup>
      </Marker>
    </MapContainer>
  );
}