import React, { useState } from 'react';
import './ChatbotPopup.css';
import { requestChatbot } from '../../api/chatbot.service';
import { chatBotIcon } from '../../assets/images/chatbot-icons';

export const ChatbotPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            "role": "system",
            "content": "Xin chào! Mình là Anh Biết Tuốt về văn hóa Việt Nam. Mình có thể giúp gì cho bạn?"
        },
        {
            "role": "user",
            "content": "Bạn có thể kể về 1 tỉnh thành không?"
        },
        {
            "role": "system",
            "content": "Bạn muốn biết về tỉnh thành nào? Ví dụ: Lạng Sơn, Hà Giang, hay Cao Bằng?"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async () => {
        if (input.trim() !== '') {
            const userMessage = { role: 'user', content: input };
            setMessages(prev => [...prev, userMessage]);
            setInput('');
            setLoading(true);

            try {
                const { response } = await requestChatbot(input)

                const botMessage = { role: 'system', content: response };
                setMessages(prev => [...prev, botMessage]);
            } catch (error) {
                console.error('Error when calling chatbot API:', error);
                setMessages(prev => [
                    ...prev,
                    { role: 'system', content: 'Xin lỗi, hiện tại tôi không trả lời được.' }
                ]);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className="chatbot-toggle" onClick={toggleChatbot}>
                <img src={chatBotIcon} alt="" />
            </div>

            {isOpen && (
                <div className="chatbot-popup">
                    <div className="chatbot-header">Anh Biết Tuốt</div>
                    <div className="chatbot-messages">
                        {messages?.map((msg, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${msg.role}`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="spinner"></div>
                        )}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="content"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={loading}
                        />
                        <button onClick={handleSend}>Gửi</button>
                    </div>
                </div>
            )}
        </>
    );
};