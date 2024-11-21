import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Basket from "./Basket";
import { IBasketButtonProps } from "../../types";

export const BusketButton = ({
  setIsBasketModalVisible,
  basketQuantity,
  isBasketModalVisible,
  basket,
  removeFromBasket,
  clearBasket,
}: IBasketButtonProps) => {
  return (
    <div className="grid col-12 justify-content-end m-2">
      <Button
        icon="pi pi-shopping-cart"
        onClick={() => setIsBasketModalVisible(true)}
        badge={`${basketQuantity > 0 ? basketQuantity : ""}`}
      />
      <Dialog
        visible={isBasketModalVisible}
        onHide={() => setIsBasketModalVisible(false)}
        style={{ minWidth: "70vw" }}
      >
        <div className="w-full">
          <Basket
            basket={basket}
            removeFromBasket={removeFromBasket}
            clearBasket={clearBasket}
          />
        </div>
      </Dialog>
    </div>
  );
};
