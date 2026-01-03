import { useEffect,useState } from 'react';
import axios from 'axios';
import { Routes,Route } from 'react-router';
import { HomePage }     from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { Orders }       from './pages/Orders';
import { TrackPackage } from './pages/TrackPackage';
import { PageNotFound } from './pages/pageNotFound';
import './App.css'



function App() {
  


  const [ cart,setCart ] = useState([]);
  useEffect(() => {
        axios.get('/api/cart-items?expand=product')
        .then((response) => {
            setCart(response.data);
        })
    },[])
    

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<Orders />} />
      <Route path="tracking" element={<TrackPackage />} />



      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
