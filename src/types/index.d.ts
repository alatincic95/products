interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface SortOption {
  label: string;
  value: {
    key: keyof Product;
    order: "asc" | "desc";
  };
}

export interface IProductsFilters {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSortKey: Dispatch<SetStateAction<string>>;
  setSortOrder: Dispatch<SetStateAction<string>>;
  dropdownValue: SortOption;
  setDropdownValue: Dispatch<SetStateAction<SortOption>>;
  categories: {
    slug: string;
    name: string;
  }[];
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  minPrice: number;
  maxPrice: number;
}

export interface IProductProps {
  product: Product;
  addToBasket: (product: Product) => void;
}
export interface IPriceFiterProps {
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  minPrice: number;
  maxPrice: number;
}

export type BasketProduct = Product & { quantity: number };

export interface IBasketProps {
  basket: BasketProduct[];
  removeFromBasket: (productId: number) => void;
  clearBasket: () => void;
}

export interface IBasketItemProps {
  item: BasketProduct;
  removeFromBasket: (productId: number) => void;
}

export interface IBasketButtonProps {
  setIsBasketModalVisible: Dispatch<SetStateAction<boolean>>;
  basketQuantity: number;
  isBasketModalVisible: boolean;
  basket: BasketProduct[];
  removeFromBasket: (productId: number) => void;
  clearBasket: () => void;
}
