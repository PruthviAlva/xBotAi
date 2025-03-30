import React, { useEffect, useState } from "react";
import "./FeedbackPage.css";

const FeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const savedChats = JSON.parse(localStorage.getItem("conversations")) || [];
        const extractedFeedbacks = savedChats
            .filter((chat) => chat.feedback) // Only show feedback if available
            .map((chat) => ({
                id: chat.id,
                title: chat.title,
                rating: chat.rating,
                feedback: chat.feedback,
            }));
        setFeedbacks(extractedFeedbacks);
    }, []);

    const filteredFeedbacks = feedbacks.filter(
        (fb) => filter === "all" || fb.rating === parseInt(filter)
    );

    return (
        <div className="feedback-container">
            <h2>User Feedback</h2>

            <div className="filter-container">
                <label>Filter by Rating:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                </select>
            </div>

            <div className="feedback-list">
                {filteredFeedbacks.length === 0 ? (
                    <p>No feedback available.</p>
                ) : (
                    filteredFeedbacks.map((fb) => (
                        <div key={fb.id} className="feedback-item">
                            <h3>{fb.title}</h3>
                            <p className="rating">⭐ {fb.rating} / 5</p>
                            <p className="feedback-text">{fb.feedback}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;
