import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from '@mui/material';
import "./App.scss";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Lazy load components
const HomePage = React.lazy(() => import("./Pages/HomePage/HomePage"));
const GamePage = React.lazy(() => import("./Pages/GamePage/GamePage"));
const AddGame = React.lazy(() => import("./Pages/AddGame/AddGame"));

// Loading component
const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <CircularProgress size={60} />
  </Box>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Box sx={{ height: '64px' }} /> {/* Toolbar offset for fixed header */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/add-game" element={<AddGame />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
