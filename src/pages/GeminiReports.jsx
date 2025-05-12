import SideBarCounch from '../components/SideBarCounch';
import { useState } from 'react';
import { Send } from 'lucide-react';
import '../styles/GeminiReports.css';

const GeminiReports = () => {
    const [messages, setMessages] = useState([
        "Exemplo de mensagem curta",
        "Exemplo de mensagem longa",
        "Exemplo de mensagem muito muito muito muito longa"
    ]);

    const [input, setInput] = useState('');

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
                            <div key={index} className="message-bubble">
                                {msg}
                            </div>
                        ))}

                        <div className="error-message">
                            Erro de conexão, por favor tente novamente (Transformar isso num pop-up com position absolute)
                        </div>
                    </div>


                </div>
                <div className="input-container">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Digite sua mensagem..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button>
                        <Send className="send-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeminiReports;
