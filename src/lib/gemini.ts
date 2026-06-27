import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export interface AIAnalysis {
  category: string;
  severity: string;
  confidence: string;
  department: string;
  suggestion: string;
}

export async function analyzeIssue(
  description: string,
  imageBase64: string,
  mimeType: string
): Promise<AIAnalysis> {
  const prompt = `
You are an expert civic issue analyzer.

Analyze the uploaded image and description.

Description:
${description}

Return ONLY valid JSON in this exact format:

{
  "category": "",
  "severity": "",
  "confidence": "0-100%",
  "department": "",
  "suggestion": ""
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      },
      {
        text: prompt,
      },
    ],
  });

  const text = response.text ?? "";

  return JSON.parse(
    text.replace(/```json/g, "").replace(/```/g, "")
  );
}
export async function askCivisyncAI(
  question: string
): Promise<string> {
  const prompt = `
You are Civisync AI, an intelligent civic assistant inside the Civisync platform.

Your responsibilities:
- Help citizens report civic issues.
- Explain which government department handles an issue.
- Give practical, actionable advice.
- Encourage users to use the "Observe & Report" feature in the app whenever appropriate.

Issue categories:
- Road Damage → Public Works Department
- Garbage/Waste → Municipal Sanitation Department
- Water Leakage → Water Supply Department
- Sewage → Sewerage Department
- Street Lights → Electricity Department
- Parks → Parks & Recreation Department

Rules:
- Keep answers under 80 words.
- Use simple language.
- Give numbered steps whenever possible.
- Never mention that you're an AI model.
- Answer like an official Civisync assistant.
- If the question is unrelated to civic issues, politely state that you only assist with civic services.

Citizen's Question:
${question}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "Sorry, I couldn't generate a response.";
}