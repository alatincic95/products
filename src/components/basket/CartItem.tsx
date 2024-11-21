import { Button } from "primereact/button";
import { ICartItemProps } from "../../types";
import { Card } from "primereact/card";

export const CartItem = ({ item, removeFromCart }: ICartItemProps) => {
  return (
    <div className="grid col-12 ">
      <Card className="w-full min-h-0">
        <div className="grid col-12 ">
          <div className="col-4 xl:col-2 lg:col-2 md:col-2 sm:col-4">
            <img
              loading="lazy"
              src={item.thumbnail}
              alt={item.title}
              className="p-card-img-top"
              style={{
                objectFit: "contain",
                width: "100%",
              }}
            />
          </div>
          <div className=" align-self-center col-4 xl:col-2 lg:col-2 md:col-2 sm:col-4">
            <span className="font-bold my-2">Name:</span>
            <div>{item.title}</div>
          </div>
          <div className="align-self-center col-4 xl:col-2 lg:col-2 md:col-2 sm:col-4 ">
            <span className="font-bold my-2">Price:</span>
            <div>${item.price}</div>
          </div>
          <div className="align-self-center col-4 xl:col-2 lg:col-2 md:col-2 sm:col-4 ">
            <span className="font-bold my-2">Quantity:</span>
            <div>{item.quantity}</div>
          </div>
          <div className="align-self-center col-4 xl:col-2 lg:col-2 md:col-2 sm:col-4 ">
            <span className="font-bold my-2">Total price:</span>
            <div>{item.quantity * item.price}</div>
          </div>
          <div className="align-self-center col-4 xl:col-2 lg:col-2 md:col-2 sm:col-4">
            <Button
              icon="pi pi-trash"
              text
              severity="danger"
              onClick={() => removeFromCart(item.id)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
