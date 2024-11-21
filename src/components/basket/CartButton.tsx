import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Cart from "./Cart";
import { ICartButtonProps } from "../../types";

export const CartButton = ({
  setIsCartModalVisible,
  cartQuantity,
  isCartModalVisible,
  cart,
  removeFromCart,
  clearCart,
}: ICartButtonProps) => {
  return (
    <div className="grid col-12 justify-content-end m-2">
      <Button
        data-testid="cart-btn"
        icon="pi pi-shopping-cart"
        onClick={() => setIsCartModalVisible(true)}
        badge={`${cartQuantity > 0 ? cartQuantity : ""}`}
      />
      <Dialog
        visible={isCartModalVisible}
        onHide={() => setIsCartModalVisible(false)}
        style={{ minWidth: "70vw" }}
      >
        <div className="w-full">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        </div>
      </Dialog>
    </div>
  );
};
