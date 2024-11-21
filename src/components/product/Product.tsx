import { useRef } from "react";
import { Button } from "primereact/button";
import { IProductProps } from "../../types";
import { OverlayPanel } from "primereact/overlaypanel";

export const ProductCard = ({ product, addToBasket, index }: IProductProps) => {
  const op = useRef<OverlayPanel>(null);

  const handleDetailsClick = (e: React.MouseEvent) => {
    if (op.current) {
      op.current.toggle(e);
    }
  };

  return (
    <div
      key={product.id}
      className="col-12 xl:col-3 lg:col-3 md:col-6 sm:col-12 p-3"
    >
      <div className="p-card flex flex-column h-full">
        <div className="flex justify-content-center align-items-center">
          <img
            loading="lazy"
            src={product.thumbnail}
            alt={product.title}
            className="p-card-img-top"
            style={{
              objectFit: "contain",
              height: "200px",
              width: "100%",
            }}
          />
        </div>
        <div className="p-card-body flex flex-column justify-between">
          <div>
            <h5>{product.title}</h5>
            <p>${product.price}</p>
            <p className="description">
              {product.description.length > 100
                ? `${product.description.slice(0, 100)}...`
                : product.description}
            </p>
          </div>
          <div className="flex justify-content-between">
            <Button
              className="p-button-info"
              onClick={handleDetailsClick}
              label="Details"
            />
            <Button
              icon="pi pi-cart-plus"
              rounded
              text
              onClick={() => addToBasket(product)}
              data-testid={`add-to-basket-${index}`}
            />
          </div>
          <OverlayPanel
            className="col-6 xl:col-3 lg:col-3 md:col-4 sm:col-6"
            ref={op}
          >
            <p>{product.description}</p>
          </OverlayPanel>
        </div>
      </div>
    </div>
  );
};
