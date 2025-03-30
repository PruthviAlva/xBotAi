import React, { useState } from 'react';

import staticResponses from "../data/staticResponses.json";
import You from '../images/You.png';
import Ai from '../images/Ai.png';
import "./ChatPage.css";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: "You",
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, userMessage]);

        // Simulating AI Response
        setTimeout(() => {
            const botResponse = staticResponses[input] || "Sorry, Did not understand your query!";
            const botMessage = {
                id: Date.now() + 1,
                sender: "Soul AI",
                text: botResponse,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);

        setInput("");
    };

    const handleSave = () => {
        const savedChats = JSON.parse(localStorage.getItem("conversations")) || [];
        const newChat = {
            id: Date.now(),
            title: `Chat on ${new Date().toLocaleDateString()}`,
            messages,
            rating,
            feedback,
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
                            <h4><span>{msg.sender}</span></h4>
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
            <form className="chat-input" onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Message Bot AI..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Ask</button>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
            {/* Final Feedback Section */}
            <div className="final-feedback">
                <h3>Rate Your Experience</h3>
                <div className="rating">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span
                            key={num}
                            className={rating === num ? "selected" : ""}
                            onClick={() => setRating(num)}
                        >
                            ⭐
                        </span>
                    ))}
                </div>
                <textarea
                    placeholder="Provide additional feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <button type="button" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default ChatPage;