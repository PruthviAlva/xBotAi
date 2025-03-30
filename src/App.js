import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from './component/Sidebar';
import ChatPage from './component/ChatPage';
import HistoryPage from './component/HistoryPage';
import FeedbackPage from './component/FeedbackPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <header>
          <h1>Bot AI</h1>
        </header>
        <Routes>
          <Route path='/' element={<ChatPage />} />
          <Route path='/history' element={<HistoryPage />} />
          <Route path='/feedback' element={<FeedbackPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
