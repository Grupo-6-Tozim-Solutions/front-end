import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const askGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Erro ao chamar Gemini:', error);
    throw new Error('Erro ao se comunicar com a IA Gemini.');
  }
};
