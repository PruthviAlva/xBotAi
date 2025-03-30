import React, { useState } from 'react';

import You from '../images/You.png';
import Ai from '../images/Ai.png';
import "./ChatPage.css";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "You", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages([...messages, userMessage]);

        // Simulating AI Response
        setTimeout(() => {
            const aiResponse = {
                text: input.toLowerCase().includes("hi")
                    ? "Hi There. How can I assist you today?"
                    : "As an AI Language Model, I cannot help you out!",
                sender: "Soul AI",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, aiResponse]);
        }, 1000);

        setInput("");
    };

    const handleSave = () => {
        const savedChats = JSON.parse(localStorage.getItem("conversations")) || [];
        const newChat = {
            id: Date.now(),
            title: `Chat on ${new Date().toLocaleDateString()}`,
            messages,
            rating: rating, // User will provide later
            feedback: feedback, // User will provide later
        };
        localStorage.setItem("conversations", JSON.stringify([...savedChats, newChat]));
        alert("Conversation saved!");
    };

    const handleFeedback = (id, type) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id ? { ...msg, feedback: type } : msg
            )
        );
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.sender}`}>
                        <div className="avatar">
                            {msg.sender === "You" ? (
                                <img src={You} className='image' alt='You' />
                            ) : (
                                <img src={Ai} className='image' alt='Ai' />
                            )}
                        </div>
                        <div className="message-content">
                            <h4>{msg.sender}</h4>
                            <p>{msg.text}</p>
                            <div className='like'>
                                <span className="time">{msg.time}</span>
                                {msg.sender === "Soul AI" && (
                                    <div className="feedback-buttons">
                                        <button className="thumbs-up" onClick={() => handleFeedback(msg.id, "like")}>👍</button>
                                        <button className="thumbs-down" onClick={() => handleFeedback(msg.id, "dislike")}>👎</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Message Bot AI…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" onClick={sendMessage}>
                    Ask
                </button>
                <button type="submit" onClick={handleSave}>
                    Save
                </button>
            </div>
            {/* Final Feedback Section */}
            <div className="final-feedback">
                <h3>Rate Your Experience</h3>
                <div className="rating">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span key={num} className={rating === num ? "selected" : ""} onClick={() => setRating(num)}>
                            ⭐
                        </span>
                    ))}
                </div>
                <textarea
                    placeholder="Provide additional feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </div>
        </div>
    )
}

export default ChatPage;