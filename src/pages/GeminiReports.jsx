// src/pages/GeminiReports.jsx
import SideBarCounch from "../components/SideBarCounch";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { askGemini as rawAskGemini } from "../services/geminiService"; // chamaremos de rawAskGemini
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/GeminiReports.css";
import { api } from "../Provider/apiProvider"; // instância Axios com baseURL, headers, token etc.

const GeminiReports = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ia",
      text: "Olá! Sou sua assistente IA. Em que posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // 1️⃣ Adiciona a mensagem do usuário ao state
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");
    setError("");
    setIsTyping(true);
    scrollToBottom();

    try {
      // 2️⃣ Pega o histórico de logs (pode-se filtrar ou limitar, mas vamos buscar tudo por ora)
      const logsResponse = await api.get("/movimentacaoEstoque");
      const logsData = logsResponse.data;

      // 3️⃣ Formata/serializa o histórico para texto
      //    Escolha o formato que fizer mais sentido:
      //    Ex: “ID 001 | 2025-05-30 17:49 | Entrada 10 peças de tora”
      const historyText = logsData
        .map((entry) => {
          const dateObj = new Date(entry.data);
          const date = dateObj.toISOString().split("T")[0];
          const time = dateObj.toTimeString().split(":").slice(0, 2).join(":");
          const action = entry.quantidadeEntrada > 0 ? "Entrada" : "Saída";
          const qty = entry.quantidadeEntrada > 0 ? entry.quantidadeEntrada : entry.quantidadeSaida;
          const itemName = entry.peca?.nome || "Desconhecido";
          return `ID ${entry.id
            .toString()
            .padStart(3, "0")} | ${date} ${time} | ${action} ${qty} ${itemName}`;
        })
        // Inverter ou limitar os registros aqui se for muito grande
        .join("\n");

      // 4️⃣ Monta o prompt final, incluindo o SYSTEM_PROMPT + contexto dos logs + pergunta
      const SYSTEM_PROMPT = `
Você é uma assistente de inteligência artificial altamente treinada para atuar exclusivamente em um sistema de gerenciamento de estoque de peças para sofás.
Você só deve responder dúvidas relacionadas a este contexto: peças, fornecedores, movimentações de estoque, alertas, histórico de entradas e saídas, peças em falta ou substituição, etc.
Se a pergunta estiver fora desse escopo, gentilmente oriente o usuário a reformular a pergunta para algo relacionado ao sistema de peças para sofás.

A seguir, segue o histórico de movimentações de estoque (últimos registros):

${historyText}

Pergunta do usuário: ${trimmed}
      `.trim();

      // 5️⃣ Chama a Gemini passando esse prompt composto
      const iaResponseText = await rawAskGemini(SYSTEM_PROMPT);

      // 6️⃣ Guarda resposta da IA no chat
      setMessages((prev) => [...prev, { sender: "ia", text: iaResponseText }]);
    } catch (err) {
      console.error("Erro ao chamar a IA ou buscar logs:", err);
      setError(err.message || "Ocorreu um erro ao processar sua solicitação.");
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="gemini-container">
      <SideBarCounch />
      <div className="center-content">
        <div className="chat-box">
          <h1 className="chat-title">
            <img src="/assets/stars.png" alt="Estrelas" className="icon" />
            Assistente
          </h1>
          <div className="message-list">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-row ${
                  msg.sender === "user" ? "user-row" : "ia-row"
                }`}
              >
                <div
                  className={`message-bubble ${
                    msg.sender === "user" ? "user" : "ia"
                  }`}
                >
                  {msg.sender === "ia" ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-row ia-row">
                <div className="message-bubble ia">
                  <span className="typing-dots">
                    Assistente está digitando
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />

            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>
            <Send className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiReports;
