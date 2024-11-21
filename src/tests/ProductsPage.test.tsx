import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useProducts from "../hooks/useProducts";
import useBasket from "../hooks/useBasket";
import ProductsPage from "../components/product/ProductsPage";

// Mock hooks
jest.mock("../hooks/useProducts");
jest.mock("../hooks/useBasket");

describe("ProductsPage Component", () => {
  const mockUseProducts = useProducts as jest.Mock;
  const mockUseBasket = useBasket as jest.Mock;

  beforeEach(() => {
    // Mocking product hook data
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

    // Mocking basket hook data
    mockUseBasket.mockReturnValue({
      basket: [],
      removeFromBasket: jest.fn(),
      clearBasket: jest.fn(),
      addToBasket: jest.fn(),
      isBasketModalVisible: false,
      setIsBasketModalVisible: jest.fn(),
      basketQuantity: 0,
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

  it("calls addToBasket when the add to basket button is clicked", () => {
    const addToBasket = jest.fn();
    mockUseBasket.mockReturnValueOnce({ ...mockUseBasket(), addToBasket });

    render(<ProductsPage />);

    const addToBasketButton = screen.getByTestId("add-to-basket-0");
    fireEvent.click(addToBasketButton);

    expect(addToBasket).toHaveBeenCalledWith(
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

  it("shows basket modal when basket button is clicked", async () => {
    const setIsBasketModalVisible = jest.fn();
    mockUseBasket.mockReturnValueOnce({
      ...mockUseBasket(),
      setIsBasketModalVisible,
    });

    render(<ProductsPage />);

    const basketButton = screen.getByTestId("basket-btn");
    fireEvent.click(basketButton);

    expect(setIsBasketModalVisible).toHaveBeenCalledWith(true);
  });
});
