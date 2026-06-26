import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Sparkles } from "lucide-react";
import { ImageUploader } from "@/components/report/ImageUploader";
import { DescriptionField } from "@/components/report/DescriptionField";
import { LocationCard } from "@/components/report/LocationCard";
import { AIAnalysisCard } from "@/components/report/AIAnalysisCard";

export const Route = createFileRoute("/report")({
  component: ReportPage,
});

function ReportPage() {

  const navigate = useNavigate();
const [location, setLocation] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState<File | null>(null);
const [loading, setLoading] = useState(false);

const handleAnalyze = () => {
  if (!image) {
    alert("Please upload an image first.");
    return;
  }

  if (!description.trim()) {
    alert("Please describe the issue.");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    alert("Gemini integration coming next.");
  }, 1500);
};


  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate({ to: "/home" })}
          className="mb-6 inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        {/* Heading */}
        <h1 className="font-display text-4xl font-semibold text-text-primary">
          Report a Civic Issue
        </h1>

        <p className="mt-2 text-text-secondary">
          Help improve your community by reporting an issue.
        </p>

        {/* Upload */}
        <ImageUploader
  image={image}
  setImage={setImage}
/>

        {/* Description */}
       <DescriptionField
  description={description}
  setDescription={setDescription}
/>

        {/* Location */}
        <LocationCard
  location={location}
  setLocation={setLocation}
/>

        {/* Analyze */}
       <AIAnalysisCard
  loading={loading}
  onAnalyze={handleAnalyze}
/>

        {/* Submit */}
        <div className="mt-6">
          <button
            disabled
            className="w-full rounded-2xl bg-gray-300 py-4 font-medium text-gray-500"
          >
            Submit Report
          </button>
        </div>

      </div>
    </div>
  );
}