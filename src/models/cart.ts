import { Product } from "./product";

export interface CartItemType extends Product {
  line_id: string;
  quantity: number;
  line_total: { raw: number; formatted: string };
  selected_options: [{ group_name: string; option_name: string }];
}

export interface Cart {
  id: string;
  line_items: CartItemType[];
  total_items: number;
  total_unique_items: number;
  subtotal: {
    raw: number;
    formatted: string;
  };
  currency: {
    code: string;
    symbol: string;
  };
}
