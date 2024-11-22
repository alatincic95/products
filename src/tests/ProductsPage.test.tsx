import { render, screen, fireEvent } from "@testing-library/react";
import useProducts from "../hooks/useProducts";
import ProductsPage from "../components/product/ProductsPage";
import useCart from "../hooks/useCart";

jest.mock("../hooks/useProducts");
jest.mock("../hooks/useCart");

describe("ProductsPage Component", () => {
  const mockUseProducts = useProducts as jest.Mock;
  const mockUseCart = useCart as jest.Mock;

  beforeEach(() => {
    mockUseProducts.mockReturnValue({
      currentPage: 1,
      currentPageProducts: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          description: "Description 1",
          thumbnail: "/image1.jpg",
        },
        {
          id: 2,
          title: "Product 2",
          price: 20,
          description: "Description 2",
          thumbnail: "/image2.jpg",
        },
      ],
      filteredProducts: [
        { id: 1, title: "Product 1", price: 10 },
        { id: 2, title: "Product 2", price: 20 },
      ],
      pageSize: 8,
      searchQuery: "",
      setCurrentPage: jest.fn(),
      setSearchQuery: jest.fn(),
      setSortKey: jest.fn(),
      setSortOrder: jest.fn(),
      setPageSize: jest.fn(),
      isloading: false,
      dropdownValue: { value: { key: "price", order: "asc" } },
      setDropdownValue: jest.fn(),
      categories: ["Category 1", "Category 2"],
      selectedCategory: "Category 1",
      setSelectedCategory: jest.fn(),
      priceRange: [0, 100],
      setPriceRange: jest.fn(),
      minPrice: 0,
      maxPrice: 100,
    });

    mockUseCart.mockReturnValue({
      cart: [],
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      addToCart: jest.fn(),
      isCartModalVisible: false,
      setIsCartModalVisible: jest.fn(),
      cartQuantity: 0,
    });
  });

  it("renders the loading spinner when loading", () => {
    mockUseProducts.mockReturnValueOnce({
      ...mockUseProducts(),
      isloading: true,
    });
    render(<ProductsPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders the product filters and products when not loading", () => {
    render(<ProductsPage />);
    expect(
      screen.getByPlaceholderText("Search products...")
    ).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
  });

  it("calls addToCart when the add to cart button is clicked", () => {
    const addToCart = jest.fn();
    mockUseCart.mockReturnValueOnce({ ...mockUseCart(), addToCart });

    render(<ProductsPage />);

    const addToCartButton = screen.getByTestId("add-to-cart-1");
    fireEvent.click(addToCartButton);

    expect(addToCart).toHaveBeenCalledWith(
      mockUseProducts().currentPageProducts[0]
    );
  });

  it("updates the search query when typing into the search input", () => {
    const setSearchQuery = jest.fn();
    mockUseProducts.mockReturnValueOnce({
      ...mockUseProducts(),
      setSearchQuery,
    });

    render(<ProductsPage />);

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Test Query" } });

    expect(setSearchQuery).toHaveBeenCalledWith("Test Query");
  });

  it("shows cart modal when cart button is clicked", async () => {
    const setIsCartModalVisible = jest.fn();
    mockUseCart.mockReturnValueOnce({
      ...mockUseCart(),
      setIsCartModalVisible,
    });

    render(<ProductsPage />);

    const cartButton = screen.getByTestId("cart-btn");
    fireEvent.click(cartButton);

    expect(setIsCartModalVisible).toHaveBeenCalledWith(true);
  });
});
