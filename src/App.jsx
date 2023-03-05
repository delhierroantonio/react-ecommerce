import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Navbar, Products, Cart } from './components/index'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
