export interface Variant {
  id: string;
  name: string;
  options: [
    {
      id: string;
      name: string;
    }
  ];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: {
    raw: number;
    formatted: string;
  };
  image: {
    id: string;
    url: string;
  };
  variant_groups?: Variant[];
  categories?: Category[];
}
