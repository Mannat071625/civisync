import { Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  image: File | null;
  setImage: (file: File | null) => void;
}

export function ImageUploader({
  image,
  setImage,
}: ImageUploaderProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">
            Upload Image
          </Label>
        </div>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files?.[0] ?? null)
          }
        />

        {image && (
          <p className="text-sm text-muted-foreground">
            Selected: {image.name}
          </p>
        )}
      </CardContent>
    </Card>
  );
}