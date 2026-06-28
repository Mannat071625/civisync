import { createFileRoute} from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Sparkles } from "lucide-react";
import { ImageUploader } from "@/components/report/ImageUploader";
import { DescriptionField } from "@/components/report/DescriptionField";
import { LocationCard } from "@/components/report/LocationCard";
import { AIAnalysisCard } from "@/components/report/AIAnalysisCard";
import { analyzeIssue } from "@/lib/gemini";
import { fileToBase64 } from "@/lib/image";
import { submitReport } from "@/lib/report";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/report")({
  component: ReportPage,
});

function ReportPage() {

  const navigate = useNavigate();
  const { user } = useAuth();
const [location, setLocation] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState<File | null>(null);
const [loading, setLoading] = useState(false);
const [analysis, setAnalysis] = useState<{
  category: string;
  severity: string;
  confidence: string;
  department: string;
  suggestion: string;
} | null>(null);

const handleAnalyze = async () => {
  if (!image) {
  toast.error("Please upload an image first.");
  return;
}

 if (!description.trim()) {
  toast.error("Please enter a description.");
  return;
}

  try {
    setLoading(true);

    const imageBase64 = await fileToBase64(image);

    const result = await analyzeIssue(
      description,
      imageBase64,
      image.type
    );

    setAnalysis(result);

  } catch (error) {
  console.error(error);
  toast.error("AI analysis failed.");
}finally {
    setLoading(false);
  }
};

const handleSubmit = async () => {
  if (!analysis) {
  toast.error("Please analyze the issue first.");
  return;
}

  if (!user) {
  toast.error("Please sign in first.");
  return;
}

  try {
    await submitReport({
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,

      description,

     location,

      category: analysis.category,
      severity: analysis.severity,
      confidence: analysis.confidence,
      department: analysis.department,
      suggestion: analysis.suggestion,
    });



toast.success("Report submitted successfully!");
navigate({ to: "/home" });

 } catch (err) {
  console.error("Submit Error:", err);

  toast.error(
    err instanceof Error
      ? err.message
      : "Failed to submit report."
  );
}
}


  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate({ to: "/home" })}
          className="mb-6 flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
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

{analysis && (
  <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold">
      ✨ AI Analysis Result
    </h2>

    <div className="space-y-3">

      <p>
        <strong>Category:</strong> {analysis.category}
      </p>

      <p>
        <strong>Severity:</strong> {analysis.severity}
      </p>

      <p>
        <strong>Confidence:</strong> {analysis.confidence}
      </p>

      <p>
        <strong>Department:</strong> {analysis.department}
      </p>

      <p>
        <strong>Suggestion:</strong> {analysis.suggestion}
      </p>

    </div>
  </div>
)
}
        {/* Submit */}
        <div className="mt-6">
  <button
    onClick={handleSubmit}
    disabled={!analysis || loading}
    className={`w-full rounded-2xl py-4 font-medium transition ${
      analysis
        ? "bg-primary text-white hover:opacity-90"
        : "bg-gray-300 text-gray-500"
    }`}
  >
    {loading ? "Submitting..." : "Submit Report"}
  </button>
</div>

      </div>
    </div>
  );

}