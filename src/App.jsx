import './App.scss';
import Header from './Components/Header/Header';
import React, { useState } from 'react';
import HomePage from './Pages/HomePage/HomePage';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import GamePage from './Pages/GamePage/GamePage';
import Footer from './Components/Footer/Footer';
import AddGame from './Pages/AddGame/AddGame';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/add-game" element={<AddGame />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
