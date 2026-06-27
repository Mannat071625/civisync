import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { askCivisyncAI } from "@/lib/gemini";

export const Route = createFileRoute("/assistant")({
  component: AssistantPage,
});

function AssistantPage() {
    const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleAsk = async () => {
  if (!question.trim()) return;

  setLoading(true);

  try {
    const response = await askCivisyncAI(question);
    setAnswer(response);
    setQuestion("");
  } catch (err) {
    console.error(err);
    setAnswer("Sorry, something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <button
  onClick={() => navigate({ to: "/home" })}
  className="mb-6 flex items-center gap-2 text-primary hover:underline"
>
  <ArrowLeft className="h-4 w-4" />
  Back to Dashboard
</button>

  <div>
    <h1 className="text-3xl font-bold">
      Ask Civisync AI
    </h1>

    <p className="mt-2 text-gray-500">
      Ask anything related to civic issues.
    </p>
  </div>

  <textarea
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    placeholder="Example: Who handles road damage?"
    className="min-h-36 w-full rounded-xl border p-4"
  />

  <button
    onClick={handleAsk}
    disabled={loading}
    className="rounded-xl bg-primary px-6 py-3 text-white"
  >
    {loading ? "Civisync AI is thinking..." : "Ask AI"}
  </button>

  {answer && (
    <div className="rounded-xl border p-5">
      <h2 className="font-semibold mb-2">
        Civisync AI
      </h2>

      <p>{answer}</p>
    </div>
  )}

</div>
  );
}