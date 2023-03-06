import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar, Products, Cart } from './components/index'

import { commerce } from './lib/commerce'
import Footer from './Footer/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
    // console.log(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const addToCart = async (prodId, qty) => {
    const itemToAdd = await commerce.cart.add(prodId, qty);
    setCart(itemToAdd);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route path='/' element={<Products products={products} addToCart={addToCart} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
