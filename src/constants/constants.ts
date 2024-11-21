import { SortOption } from "../types";

export const sortOptions: SortOption[] = [
  { label: "Price (Low to High)", value: { key: "price", order: "asc" } },
  { label: "Price (High to Low)", value: { key: "price", order: "desc" } },
  { label: "Name (A-Z)", value: { key: "title", order: "asc" } },
  { label: "Name (Z-A)", value: { key: "title", order: "desc" } },
];
