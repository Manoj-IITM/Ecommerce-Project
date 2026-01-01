import { Link } from 'react-router';
import './CheckoutPageHeader.css';
import  checkOutLockIcon   from '../../assets/images/icons/checkout-lock-icon.png';
import logo from '../../assets/images/logo.png';


export function CheckoutPageHeader() {


    return (
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                <Link to="/">
                    <img className="logo" src={logo} />
                    <img className="mobile-logo" src={logo} />
                </Link>
                </div>

                <div className="checkout-header-middle-section">
                Checkout (<Link className="return-to-home-link"
                    to="/">3 items</Link>)
                </div>

                <div className="checkout-header-right-section">
                <img src={checkOutLockIcon} />
                </div>
            </div>
        </div>
    )
};