import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  location: string;
  setLocation: (location: string) => void;
}

export function LocationCard({
  location,
  setLocation,
}: LocationCardProps) {

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords =
          `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;

        setLocation(coords);
      },
      () => {
        alert("Unable to get your location.");
      }
    );
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-6">

        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">
            Current Location
          </h2>
        </div>

        <Button onClick={detectLocation}>
          Detect Current Location
        </Button>

        {location && (
          <p className="text-sm text-muted-foreground">
            {location}
          </p>
        )}

      </CardContent>
    </Card>
  );
}