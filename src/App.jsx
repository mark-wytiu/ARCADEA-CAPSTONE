import logo from './logo.svg';
import './App.scss';
import Header from './Components/Header/Header';
import React, { useState } from 'react';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }


  return (
    <div className="App">
      <Header isOpen={sidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}

export default App;
