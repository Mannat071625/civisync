import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AIAnalysisCardProps {
  loading: boolean;
  onAnalyze: () => void;
}

export function AIAnalysisCard({
  loading,
  onAnalyze,
}: AIAnalysisCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">

        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">
            AI Analysis
          </h2>
        </div>

        <p className="text-sm text-muted-foreground">
          AI will analyze the uploaded image and description to identify
          the issue, estimate its severity, and suggest a category.
        </p>

        <Button
          className="w-full"
          disabled={loading}
          onClick={onAnalyze}
        >
          {loading ? "Analyzing..." : "Analyze with AI"}
        </Button>

      </CardContent>
    </Card>
  );
}