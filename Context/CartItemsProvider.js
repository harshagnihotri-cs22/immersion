import { useEffect, useState } from "react";
import { CartItemsContext } from "./CartItemsContext";

const CartItemsProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);

    const addToCartHandler = (item, quantity) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(i => i._id === item._id);
            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].itemQuantity += quantity;
                return updatedItems;
            } else {
                const { _id, name, price, image, category, size } = item;
                return [...prevItems, { _id, name, price, image, category, itemQuantity: quantity, size }];
            }
        });
    };

    const removeFromCartHandler = (item) => {
        setCartItems((prevItems) => prevItems.filter((prevItem) => prevItem._id !== item._id));
    };

    const calculateTotalAmount = (currentCartItems) => {
        let total = 0;
        currentCartItems.forEach((item) => {
            total += item.price * item.itemQuantity;
        });
        setTotalAmountOfItems(total);
    };

    const quantityHandler = (itemId, action) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item._id === itemId) {
                    const updatedQuantity = action === 'INC'
                        ? item.itemQuantity + 1
                        : Math.max(item.itemQuantity - 1, 1); // Prevent negative quantity
                    return { ...item, itemQuantity: updatedQuantity };
                }
                return item;
            })
        );
    };

    useEffect(() => {
        calculateTotalAmount(cartItems);
    }, [cartItems]);

    const cartItemCtx = {
        items: cartItems,
        totalAmount: totalAmountOfItems,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
        quantity: quantityHandler,
    };

    return (
        <CartItemsContext.Provider value={cartItemCtx}>
            {props.children}
        </CartItemsContext.Provider>
    );
};

export default CartItemsProvider;