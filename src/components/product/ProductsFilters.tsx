import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { sortOptions } from "../../constants/constants";
import { IProductsFilters, SortOption } from "../../types";
import PriceFilter from "./PriceFilter";

export const ProductsFilters = ({
  searchQuery,
  setSearchQuery,
  setSortKey,
  setSortOrder,
  dropdownValue,
  setDropdownValue,
  categories,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  minPrice,
  priceRange,
  setPriceRange,
}: IProductsFilters) => {
  return (
    <div className="grid col-12 m-2">
      <div className="col-12 xl:col-3 lg:col-3 md:col-6 sm:col-12">
        <InputText
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="col-12 xl:col-3 lg:col-3 md:col-6 sm:col-12">
        <Dropdown
          options={sortOptions}
          value={dropdownValue.value}
          onChange={(e) => {
            const selectedOption = e.value as SortOption["value"];
            setDropdownValue(
              sortOptions.find((option) => {
                return (
                  option.value.key === selectedOption.key &&
                  option.value.order === selectedOption.order
                );
              })
            );

            setSortKey(selectedOption.key);
            setSortOrder(selectedOption.order);
          }}
          optionLabel="label"
          placeholder="Sort by"
          className="w-full"
        />
      </div>
      <div className="col-12 xl:col-3 lg:col-3 md:col-6 sm:col-12">
        <Dropdown
          options={categories}
          value={selectedCategory}
          onChange={(e) => {
            if (typeof e.value === "object") {
              setSelectedCategory(e.value.value);
            } else {
              setSelectedCategory(e.value);
            }
          }}
          placeholder="Filter by Category"
          className="w-full"
        />
      </div>
      <div className="col-12 xl:col-3 lg:col-3 md:col-6 sm:col-12">
        <PriceFilter
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </div>
  );
};
