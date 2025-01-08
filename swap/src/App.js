import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Matchmaking from './pages/Matchmaking';
import ChatBox from './components/ChatBox';

const App = () => {
  // Dummy messages for the ChatBox example
  const messages = [
    { user: 'Alice', text: 'Hi, can you teach me coding?' },
    { user: 'Bob', text: 'Sure! When are you free?' },
  ];

  // Function to handle sending a new message
  const handleSendMessage = (message) => {
    console.log('New message:', message);
    // Add logic to update chat messages or send to backend
  };

  return (
    <Router>
      <div>
        {/* Navbar is displayed on all pages */}
        <Navbar />
        <div className="container">
          {/* Routes define different pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route
              path="/chat"
              element={<ChatBox messages={messages} onSend={handleSendMessage} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
