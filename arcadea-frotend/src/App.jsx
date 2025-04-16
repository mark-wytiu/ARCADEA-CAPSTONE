import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./App.scss";
import Header from "./Components/Header/Header";
// import React, { useState } from 'react';
import Footer from "./Components/Footer/Footer";

// Lazy load page components
const HomePage = lazy(() => import('./Pages/HomePage/HomePage'));
const GamePage = lazy(() => import('./Pages/GamePage/GamePage'));
const AddGame = lazy(() => import('./Pages/AddGame/AddGame'));

// Loading fallback component
const LoadingFallback = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  }}>
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/add-game" element={<AddGame />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
