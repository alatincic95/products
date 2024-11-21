import { useState, useEffect, useCallback } from "react";
import { BasketProduct, Product } from "../types";

const useBasket = () => {
  const [basket, setBasket] = useState<BasketProduct[]>(() => {
    // Initialize from localStorage on hook creation
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });
  const [isBasketModalVisible, setIsBasketModalVisible] =
    useState<boolean>(false);
  const [basketQuantity, setBasketQuantity] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
    let q = 0;
    basket.map((b) => {
      return (q += b.quantity);
    });
    setBasketQuantity(q);
  }, [basket]);

  const addToBasket = useCallback((product: Product) => {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevBasket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevBasket, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromBasket = useCallback((productId: number) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.id !== productId)
    );
  }, []);

  const clearBasket = useCallback(() => {
    setBasket([]);
  }, []);

  return {
    basket,
    addToBasket,
    removeFromBasket,
    clearBasket,
    isBasketModalVisible,
    setIsBasketModalVisible,
    basketQuantity,
  };
};

export default useBasket;
