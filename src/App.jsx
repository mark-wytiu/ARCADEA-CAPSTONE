import './App.scss';
import Header from './Components/Header/Header';
import React, { useState } from 'react';
import HomePage from './Pages/HomePage/HomePage';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import GamePage from './Pages/GamePage/GamePage';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
