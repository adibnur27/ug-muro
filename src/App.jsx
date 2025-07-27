import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    
  )
}

export default App