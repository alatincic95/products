import { useState, useEffect, useCallback } from "react";
import { CartProduct, Product } from "../types";

const useCart = () => {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [isCartModalVisible, setIsCartModalVisible] = useState<boolean>(false);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let q = 0;
    cart.map((b) => {
      return (q += b.quantity);
    });
    setCartQuantity(q);
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isCartModalVisible,
    setIsCartModalVisible,
    cartQuantity,
  };
};

export default useCart;
