import './CheckoutPage.css';
import { CheckoutPageHeader } from './CheckoutPageHeader';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';


export function CheckoutPage({ cart,loadCart,createOrder }) {

    const [ deliveryOptions, setDeliveryOptions ] = useState([]);
    const [ paymentSummary, setPaymentSummary ] = useState(null);


    useEffect(() => {

        const getCheckoutData = async () => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data)  
        }
        getCheckoutData();
    },[])

    useEffect(() => {
        const getPaymentSummary = async () => {
            let response = await axios.get('/api/payment-summary')
            setPaymentSummary(response.data)
        }

        getPaymentSummary();
    },[cart])

    


    return ( 
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

            <CheckoutPageHeader />

            <div className="checkout-page">
            <div className="page-title">Review your order</div>

            <div className="checkout-grid">
                
                <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart}/>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} createOrder={createOrder}/>
                
            </div>
            </div>
        </>
    )
};