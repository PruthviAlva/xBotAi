import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button><Link to="/">New Chat</Link></button>
      <Link to="/history" className="button">Past Conversations</Link>
    </div>
  );
};

export default Sidebar;