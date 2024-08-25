import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/land" element={<LandingPage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
