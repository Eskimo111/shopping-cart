import axiosClient from "../axiosClient";

const cartService = {
  createNewCart: () => {
    const url = "/carts";
    return axiosClient.get(url);
  },
  loadCart: (cart_id: string) => {
    const url = `/carts/${cart_id}`;
    return axiosClient.get(url);
  },
  addToCart: (product: object, cart_id: string) => {
    const url = `/carts/${cart_id}`;
    return axiosClient.post(url, product);
  },
  removeFromCart: (prod_id: string, cart_id: string) => {
    const url = `/carts/${cart_id}/items/${prod_id}`;
    return axiosClient.delete(url);
  },
  updateCart: (line_id: string, quantity: number, cart_id: string) => {
    const url = `/carts/${cart_id}/items/${line_id}`;
    return axiosClient.put(url, { quantity: quantity });
  },
  deleteCart: (cart_id: string) => {
    const url = `/carts/${cart_id}`;
    return axiosClient.delete(url);
  },
};

export default cartService;
