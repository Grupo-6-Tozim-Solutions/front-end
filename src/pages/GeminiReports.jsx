import SideBarCounch from '../components/SideBarCounch';
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { askGemini } from '../services/geminiService'; // Importa o serviço da API
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/GeminiReports.css';

const GeminiReports = () => {
    const [messages, setMessages] = useState([
        { sender: 'ia', text: "Olá! Sou sua assistente IA. Como posso ajudar?" }
    ]);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        setMessages(prev => [
            ...prev,
            { sender: 'user', text: trimmed }
        ]);
        setInput('');
        setError('');
        scrollToBottom();

        try {
            const iaResponse = await askGemini(trimmed);
            setMessages(prev => [
                ...prev,
                { sender: 'ia', text: iaResponse }
            ]);
        } catch (err) {
            setError(err.message || 'Erro desconhecido ao se comunicar com a IA.');
        } finally {
            scrollToBottom();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
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
                                className={`message-row ${msg.sender === 'user' ? 'user-row' : 'ia-row'}`}
                            >
                                <div
                                    className={`message-bubble ${msg.sender === 'user' ? 'user' : 'ia'}`}
                                >
                                    {msg.sender === 'ia' ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
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
