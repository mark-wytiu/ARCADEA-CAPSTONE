import "./App.scss";
import Header from "./Components/Header/Header";
// import React, { useState } from 'react';
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./Pages/GamePage/GamePage";
import Footer from "./Components/Footer/Footer";
import AddGame from "./Pages/AddGame/AddGame";

function App() {
  return (
    <div className="App" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/add-game" element={<AddGame />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
