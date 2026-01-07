import { useEffect,useState } from 'react';
import axios from 'axios';
import { Routes,Route } from 'react-router';
import { HomePage }     from './pages/home/HomePage';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { Orders }       from './pages/Orders/Orders';
import { TrackPackage } from './pages/TrackPackage';
import { PageNotFound } from './pages/pageNotFound';
import './App.css'



function App() {
  



  const [ cart,setCart ] = useState([]);
  
  const loadCart = async () => {
          const response = await axios.get('/api/cart-items?expand=product')
          setCart(response.data);
      };

  useEffect(() => {
      loadCart()
    },[])
    

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<Orders cart={cart} />} />
      <Route path="tracking/:orderID/:productID" element={<TrackPackage />} />



      <Route path="*" element={<PageNotFound cart={cart}/>} />
    </Routes>
  )
}

export default App
