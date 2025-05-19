import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Simulando fine-tuning via "contextual prompt"
const SYSTEM_PROMPT = `
Você é uma assistente de inteligência artificial altamente treinada para atuar exclusivamente em um sistema de gerenciamento de estoque de peças para sofás. 
Você só deve responder dúvidas relacionadas a este contexto: peças, fornecedores, movimentações de estoque, alertas, histórico de entradas e saídas, peças em falta ou substituição, etc.
Se a pergunta estiver fora desse escopo, gentilmente oriente o usuário a reformular a pergunta para algo relacionado ao sistema de peças para sofás.
`;

export const askGemini = async (userPrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT + '\n\n' + userPrompt }]
        }
      ]
    });

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Erro ao chamar Gemini:', error);
    throw new Error('Erro ao se comunicar com a IA Gemini.');
  }
};
