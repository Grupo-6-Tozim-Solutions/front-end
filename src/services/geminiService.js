// src/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// IMPORTANTE: aqui a função espera receber TODO o prompt (prompt do sistema + contexto + pergunta).
export const askGemini = async (fullPrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    });
    return result.response.text();
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    throw new Error("Erro ao se comunicar com a IA Gemini.");
  }
};
