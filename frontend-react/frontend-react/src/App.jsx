import { useState } from 'react'
import React from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AuctionsPage from './pages/AuctionsPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auctions" element={<AuctionsPage />} />
      </Routes>
    </Router>
  )
}

export default App
