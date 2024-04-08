import './App.scss';
import Header from './Components/Header/Header';
import React, { useState } from 'react';
import HomePage from './Pages/HomePage/HomePage';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
