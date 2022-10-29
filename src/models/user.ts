export interface User {
  id: string;
  name: string;
  email: string;
  cart_id: string;
  role: "AD" | "CM";
}
