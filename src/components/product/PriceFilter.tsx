import { Slider } from "primereact/slider";
import { IPriceFiterProps } from "../../types";

export default function PriceFilter({
  maxPrice,
  minPrice,
  priceRange,
  setPriceRange,
}: IPriceFiterProps) {
  return (
    <div className="card flex flex-column justify-content-center">
      <Slider
        value={priceRange}
        onChange={(e) => setPriceRange(e.value as [number, number])}
        range
        className="m-2"
        min={minPrice}
        max={maxPrice}
        step={1}
      />
      <div className="flex justify-content-around">
        <span>Price: ${priceRange[0]}</span>
        <span>to ${priceRange[1]}</span>
      </div>
    </div>
  );
}
