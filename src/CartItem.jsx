import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Make sure the path is correct

const CartItem = ({ onContinueShopping }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const itemCost = parseFloat(item.cost.replace('$', ''));
            return total + itemCost * item.quantity;
        }, 0).toFixed(2);
    };

    const calculateTotalCost = (item) => {
        const itemCost = parseFloat(item.cost.replace('$', ''));
        return (itemCost * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleCheckoutShopping = () => {
        alert('Checkout functionality will be added later.');
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Cost: {item.cost}</p>
                            <p>Quantity: 
                                <button onClick={() => handleDecrement(item)}>-</button>
                                {item.quantity}
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </p>
                            <p>Subtotal: ${calculateTotalCost(item)}</p>
                            <button onClick={() => handleRemove(item)}>Remove</button>
                        </div>
                    ))}
                    <h3>Total Amount: ${calculateTotalAmount()}</h3>
                    <button onClick={onContinueShopping}>Continue Shopping</button>
                    <button onClick={handleCheckoutShopping}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default CartItem;