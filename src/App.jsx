import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    
  )
}

export default App