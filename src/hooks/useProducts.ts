import { useEffect, useState } from "react";
import { Product, SortOption } from "../types";
import { sortOptions } from "../constants/constants";

const useProducts = () => {
  const [isloading, setIsloading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<
    { slug: string; name: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dropdownValue, setDropdownValue] = useState<SortOption>(
    sortOptions[0]
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsloading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
      setIsloading(false);
    };

    const fetchCategories = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      const fetchedCategories = data.map((category: any) => ({
        value: category.slug,
        label: category.name,
      }));
      setCategories([
        { value: null, label: "All Categories" },
        ...fetchedCategories,
      ]);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    let updatedProducts = [...products];

    // Search filter
    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== null) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Price filter
    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    updatedProducts.sort((a, b) => {
      const key = sortKey as keyof typeof a;
      const order = sortOrder === "asc" ? 1 : -1;
      return a[key] > b[key] ? order : a[key] < b[key] ? -order : 0;
    });

    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortKey, sortOrder, priceRange, products]);

  // Get the products for the current page
  const currentPageProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Calculate min and max price based on the products
  useEffect(() => {
    if (products.length > 0) {
      setMinPrice(Math.min(...products.map((product) => product.price)));
      setMaxPrice(Math.max(...products.map((product) => product.price)));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products, minPrice, maxPrice]);

  return {
    searchQuery,
    setSearchQuery,
    sortKey,
    sortOrder,
    setSortKey,
    setSortOrder,
    currentPageProducts,
    currentPage,
    pageSize,
    filteredProducts,
    setCurrentPage,
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
  };
};

export default useProducts;
