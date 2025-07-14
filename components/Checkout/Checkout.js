import { useContext } from 'react';
import { CartItemsContext } from '../../Context/CartItemsContext';  // Corrected import
import './Checkout.css';

const Checkout = () => {
    const cartItems = useContext(CartItemsContext); // Access the cart context

    return (
        <div className="checkout-container">
            <h2>Your Checkout</h2>
            <div className="checkout-details">
                <div className="checkout-item">
                    <p><strong>Total Items:</strong> {cartItems.items.length}</p>
                </div>
                <div className="checkout-amount">
                    <p><strong>Total Amount:</strong> ${cartItems.totalAmount.toFixed(2)}</p>
                </div>
                <button className="checkout-btn">Proceed to Payment</button>
            </div>
        </div>
    );
};

export default Checkout;
