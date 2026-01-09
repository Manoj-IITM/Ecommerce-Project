import axios from 'axios';
import { formatMoney } from "../../utils/money";
import { useState,useRef,useEffect } from 'react';

export function CartItemDetails({cartItem,loadCart}) {

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
        await loadCart();
    }

    const [ showUpdateBox,setShowUpdateBox ] = useState(false);
    const [ updatedQuantity,setUpdatedQuantity ] = useState(cartItem.quantity);
    const quantityInputRef = useRef(null);

    const updateProductQuantity = (event) => {
        setUpdatedQuantity(event.target.value)
    }

    const enableUpdateBox =  async () => {
        if (showUpdateBox) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(updatedQuantity),
            });
            await loadCart();
            setShowUpdateBox(false);
        } else {
            setShowUpdateBox(true);
    }};

    useEffect(() => {
        if (showUpdateBox && quantityInputRef.current) {
            quantityInputRef.current.focus();
        }
    }, [showUpdateBox]);

    const keyPressQuantityUpdate = (event) => {
        if (event.key === "Enter") {
            enableUpdateBox();
        } else if (event.key === "Escape") {
            setUpdatedQuantity(cartItem.quantity);
            setShowUpdateBox(false);
        }
    };


    return (
        <>
            <img className="product-image"src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {showUpdateBox ?
                                    <input type="text" className="cart-quantity-update" value={updatedQuantity} onChange={updateProductQuantity} onKeyDown={keyPressQuantityUpdate} ref={quantityInputRef}></input>
                                    :
                                    <span className="quantity-label">{cartItem.quantity}</span>
                                }
                    </span>
                    
                    <span className="update-quantity-link link-primary" onClick={enableUpdateBox}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div> 
        </>
    );
}