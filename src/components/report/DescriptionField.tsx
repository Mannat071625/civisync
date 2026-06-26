import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFieldProps {
  description: string;
  setDescription: (value: string) => void;
}

export function DescriptionField({
  description,
  setDescription,
}: DescriptionFieldProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <Label className="text-lg font-semibold">
          Description
        </Label>

        <Textarea
          rows={6}
          placeholder="Describe the issue...

Example:
Large pothole outside the metro station causing traffic congestion."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}