import { Paginator } from "primereact/paginator";
import useProducts from "../../hooks/useProducts";
import { ProductCard } from "./Product";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProductsFilters } from "./ProductsFilters";
import useCart from "../../hooks/useCart";
import { CartButton } from "../basket/CartButton";

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
    cart,
    removeFromCart,
    clearCart,
    addToCart,
    isCartModalVisible,
    setIsCartModalVisible,
    cartQuantity,
  } = useCart();

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
            <CartButton
              setIsCartModalVisible={setIsCartModalVisible}
              cartQuantity={cartQuantity}
              isCartModalVisible={isCartModalVisible}
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />

            <div className="grid col-12 m-4">
              {currentPageProducts.map((product, index) => {
                return (
                  <ProductCard
                    key={product.id}
                    addToCart={addToCart}
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
