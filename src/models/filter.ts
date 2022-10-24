export interface Filter {
  query?: string;
  category_slug?: string;
  limit: number;
  page: number;
  price?: {
    above: number;
    below: number;
  } | null;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}
