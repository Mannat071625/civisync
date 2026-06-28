import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getReports } from "@/lib/report";
import { useEffect, useState } from "react";
import { markerIcons } from "@/lib/mapIcons";

export const Route = createFileRoute("/map")({
  component: MapPage,
});

function getMarkerIcon(category: string) {
  const c = category.toLowerCase();

  if (c.includes("road") || c.includes("traffic") || c.includes("pothole"))
    return markerIcons.red;

  if (c.includes("water"))
    return markerIcons.blue;

  if (c.includes("waste") || c.includes("garbage"))
    return markerIcons.orange;

  if (c.includes("light"))
    return markerIcons.yellow;

  if (c.includes("green"))
    return markerIcons.green;

  return markerIcons.violet;
}

function MapPage() {
    const [reports, setReports] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
  async function load() {
    const data = await getReports();
    setReports(data);
  }

  load();
}, []);

  return (
    <div className="min-h-screen p-6">

      <button
        onClick={() => navigate({ to: "/home" })}
        className="mb-6 flex items-center gap-2 text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <h1 className="mb-6 text-3xl font-bold">
        Live Civic Map
      </h1>

      <MapContainer
        center={[29.39568, 76.95432]}
        zoom={13}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
{reports.map((report) => {
  const [lat, lng] = report.location
    .split(",")
    .map((n: string) => Number(n.trim()));

  return (
    <Marker
      key={report.id}
      position={[lat, lng]}
        icon={getMarkerIcon(report.category)}
    >
      <Popup>
  <div className="space-y-2 min-w-[220px]">

    <h3 className="font-semibold text-base">
      {report.category}
    </h3>

    <p>{report.description}</p>

    <div>
      <strong>Severity:</strong> {report.severity}
    </div>

    <div>
      <strong>Status:</strong> {report.status}
    </div>

    <div>
      <strong>Department:</strong> {report.department}
    </div>

  </div>
</Popup>
    </Marker>
  );
})}

      </MapContainer>

    </div>
  );
}