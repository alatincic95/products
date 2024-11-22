import React from "react";
import { CartProduct, ICartProps } from "../../types";
import { Button } from "primereact/button";
import { CartItem } from "./CartItem";

export const Cart = ({ cart, clearCart, removeFromCart }: ICartProps) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item: CartProduct) => (
            <>
              <CartItem item={item} removeFromCart={removeFromCart} />
            </>
          ))}
        </>
      )}
      {cart.length > 0 && (
        <Button className="" severity="danger" onClick={clearCart}>
          Clear Cart
        </Button>
      )}
    </div>
  );
};

export default Cart;
