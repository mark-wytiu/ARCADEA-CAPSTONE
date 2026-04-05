import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CircularProgress, Box } from '@mui/material';
import "./App.scss";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { RouteErrorBoundary } from "./Components/RouteErrorBoundary/RouteErrorBoundary";

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

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Box sx={{ height: '64px' }} /> {/* Toolbar offset for fixed header */}
      <RouteErrorBoundary routePath={location.pathname}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/add-game" element={<AddGame />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
