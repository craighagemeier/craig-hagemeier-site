"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./marathon-map.scss";

const completedStates = ["Arizona", "California", "Florida", "Illinois", "Indiana", "Iowa", "Kentucky", "Maryland", "Michigan", "Minnesota", "New York", "Oklahoma", "Tennessee", "Texas", "Vermont", "Virginia", "Washington", "Wisconsin"];

const MarathonMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !mapRef.current) {
      const mapElement = document.getElementById("marathon-map");
      if (mapElement) {
        mapElement.setAttribute("tabindex", "-1");
      }

      mapRef.current = L.map("marathon-map", {
        center: [37.8, -96], // Center on the US
        zoom: 3,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false,
        touchZoom: false,
        keyboard: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      }).addTo(mapRef.current);

      fetch(
        "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
      )
        .then((res) => res.json())
        .then((data) => {
          setGeoJsonData(data);
          L.geoJSON(data, {
            style: (feature) => ({
              fillColor: feature && completedStates.includes(feature.properties.name)
                ? "var(--color-state-completed)"
                : "var(--color-state-default)",
              color: "var(--color-state-border)",
              weight: 2,
              fillOpacity: 1,
            }),
            onEachFeature: (feature, layer) => {
              layer.bindPopup(`${feature.properties.name}`);
            },
          }).addTo(mapRef.current!);
        })
        .catch((err) => console.error("Error loading GeoJSON:", err));
    }

    // Remove focusable elements inside the map after rendering
    return () => {
      if (mapRef.current) {
        const mapElement = mapRef.current.getContainer();
        if (mapElement) {
          mapElement.querySelectorAll("a, button, [tabindex]").forEach((el) => {
            el.setAttribute("tabindex", "-1");
          });
        }
      }
    };
  }, []);

  return <div id="marathon-map" className="marathon-map" tabIndex={-1}></div>;
};

export default MarathonMap;
