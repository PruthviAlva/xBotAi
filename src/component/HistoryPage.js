import React, { useEffect, useState } from "react";
import "./HistoryPage.css";

const HistoryPage = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const savedChats = JSON.parse(localStorage.getItem("conversations")) || [];
        setConversations(savedChats);
    }, []);

    return (
        <div className="history-container">
            <h2>Conversation History</h2>
            <div className="history-list">
                {conversations.length === 0 ? (
                    <p>No saved conversations.</p>
                ) : (
                    conversations.map((chat) => (
                        <div key={chat.id} className="history-item">
                            <h3>{chat.title}</h3>
                            <div className="history-messages">
                                {chat.messages.map((msg, index) => (
                                    <div key={index} className={`chat-message ${msg.sender}`}>
                                        <div className="avatar">{msg.sender === "user" ? "👤" : "🤖"}</div>
                                        <div className="message-content">
                                            <div>{msg.text}</div>
                                            <span className="time">{msg.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="feedback">
                                <span>⭐ {chat.rating || "Not Rated"} / 5</span>
                                <p>{chat.feedback || "No feedback provided."}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Message Bot AI…"
                />
                <button type="submit">
                    Ask
                </button>
                <button type="submit">
                    Save
                </button>
            </div>
        </div>
    );
};

export default HistoryPage;
