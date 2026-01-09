import './Header.css';
import { NavLink,useNavigate,useSearchParams } from 'react-router';
import cartIcon from '../assets/images/icons/cart-icon.png';
import searchIcon from '../assets/images/icons/search-icon.png';
import whiteLogo from '../assets/images/logo-white.png';
import { useState } from 'react';

export function Header({ cart }) {
    const Navigate = useNavigate();

    let totalQuantity = 0;
    if (Array.isArray(cart)) {
        cart.forEach((cartItem) => {
            totalQuantity += cartItem.quantity;
        });
    }

    const [searchParams ] = useSearchParams();
    const search = searchParams.get('search');

    const [searchText,setSearchText] = useState(search || '');
    const addSearchText = (event) => {
        setSearchText(event.target.value)
    };

    const Search = () => {
        Navigate(`/?search=${searchText}`);
        console.log(searchText);
    }
    

    // const keyDownUpdate = (event) => {
    //     if (event.key === "Escape") {
    //         setSearchText(null);
    //     };
    // };

    return (
        
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                <img className="logo"
                    src={whiteLogo} />
                <img className="mobile-logo"
                    src={whiteLogo} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search"  onChange={addSearchText} />
                <button className="search-button" onClick={Search}>
                    <img className="search-icon" src={searchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={cartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        
        </div>

    )
};