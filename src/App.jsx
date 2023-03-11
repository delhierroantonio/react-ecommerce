import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar, Products, Cart, Checkout } from './components/index'

import { commerce } from './lib/commerce'
import Footer from './Footer/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
    // console.log(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (item, quantity) => {
    const addedItem = await commerce.cart.add(item, quantity);
    setCart(addedItem);
  }

  const handleRemoveFromCart = async (productId) => {
    const removedItem = await commerce.cart.remove(productId);
    setCart(removedItem);
  }

  const handleUpadateCartQty = async (productId, quantity ) => {
    const updatedQty = await commerce.cart.update(productId, { quantity });
    setCart(updatedQty)
  }

  const handleEmptyCart = async () => {
    const emptyCart = await commerce.cart.empty();
    setCart(emptyCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
    } catch (error) {
      console.log(error.data && error.data.error && error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
    // console.log(cart);
  }, []);

  return (
    <BrowserRouter>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route path='/' element={<Products products={products} addToCart={handleAddToCart} />} />
        <Route path='/cart' element={<Cart cart={cart} removeFromCart={handleRemoveFromCart} updateQty={handleUpadateCartQty} emptyCart={handleEmptyCart} />} />
        <Route path='/checkout' element={<Checkout cart={cart} handleCaptureCheckout={handleCaptureCheckout} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
