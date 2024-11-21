import React from "react";
import { BasketProduct, IBasketProps } from "../../types";
import { Button } from "primereact/button";
import { BasketItem } from "./BasketItem";

export const Basket = ({
  basket,
  clearBasket,
  removeFromBasket,
}: IBasketProps) => {
  return (
    <div className="basket">
      <h2>Your Basket</h2>
      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          {basket.map((item: BasketProduct) => (
            <>
              <BasketItem item={item} removeFromBasket={removeFromBasket} />
            </>
          ))}
        </>
      )}
      {basket.length > 0 && (
        <Button className="" severity="danger" onClick={clearBasket}>
          Clear Basket
        </Button>
      )}
    </div>
  );
};

export default React.memo(Basket);
