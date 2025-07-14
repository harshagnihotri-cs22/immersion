import { createContext, useState, useEffect } from 'react';

// Create the CartItemsContext
export const CartItemsContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  quantity: () => {}
});

// CartItemsProvider - This should wrap your app component
export const CartItemsProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);

  const addItem = (item, quantity) => {
    // Ensure the item is added properly
    setCartItems((prevItems) => [...prevItems, { ...item, itemQuantity: quantity }]);
  };

  const removeItem = (item) => {
    setCartItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== item.id));
  };

  const calculateTotalAmount = (currentCartItems) => {
    let total = 0;
    currentCartItems.forEach((item) => {
      total += item.price * item.itemQuantity;
    });
    setTotalAmountOfItems(total);
  };

  // Recalculate total amount when cart items change
  useEffect(() => {
    calculateTotalAmount(cartItems);
  }, [cartItems]);

  return (
    <CartItemsContext.Provider value={{
      items: cartItems,
      totalAmount: totalAmountOfItems,
      addItem,
      removeItem,
      quantity: () => {}
    }}>
      {props.children}
    </CartItemsContext.Provider>
  );
};
