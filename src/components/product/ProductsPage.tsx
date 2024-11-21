import { Paginator } from "primereact/paginator";
import useProducts from "../../hooks/useProducts";
import { ProductCard } from "./Product";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProductsFilters } from "./ProductsFilters";
import useBasket from "../../hooks/useBasket";
import { BusketButton } from "../basket/BusketButton";

const ProductsPage = () => {
  const {
    currentPage,
    currentPageProducts,
    filteredProducts,
    pageSize,
    searchQuery,
    setCurrentPage,
    setSearchQuery,
    setSortKey,
    setSortOrder,
    setPageSize,
    isloading,
    dropdownValue,
    setDropdownValue,
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minPrice,
    maxPrice,
  } = useProducts();
  const {
    basket,
    removeFromBasket,
    clearBasket,
    addToBasket,
    isBasketModalVisible,
    setIsBasketModalVisible,
    basketQuantity,
  } = useBasket();

  return (
    <>
      <div className="grid col-12 justify-content-center align-items-center">
        {isloading && <ProgressSpinner />}

        {!isloading && (
          <>
            <ProductsFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              dropdownValue={dropdownValue}
              setDropdownValue={setDropdownValue}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
            <BusketButton
              setIsBasketModalVisible={setIsBasketModalVisible}
              basketQuantity={basketQuantity}
              isBasketModalVisible={isBasketModalVisible}
              basket={basket}
              removeFromBasket={removeFromBasket}
              clearBasket={clearBasket}
            />

            <div className="grid col-12 m-4">
              {currentPageProducts.map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    addToBasket={addToBasket}
                    product={product}
                  />
                );
              })}
            </div>

            <Paginator
              rowsPerPageOptions={[8, 16, 20, 28]}
              first={(currentPage - 1) * pageSize}
              rows={pageSize}
              totalRecords={filteredProducts.length}
              onPageChange={(e) => {
                setCurrentPage(e.page + 1);
                setPageSize(e.rows);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
