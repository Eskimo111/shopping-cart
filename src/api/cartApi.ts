import axiosClient from "./axiosClient";

const cartApi = {
  createNewCart: () => {
    const url = "/carts";
    return axiosClient.get(url);
  },
  loadCart: (cart_id: string) => {
    const url = `/carts/${cart_id}`;
    return axiosClient.get(url);
  },
  addToCart: (prod_id: string, quantity: number, cart_id: string) => {
    const url = `/carts/${cart_id}`;
    return axiosClient.post(url, { id: prod_id, quantity: quantity });
  },
  removeFromCart: (id: string, cart_id: string) => {
    const url = `/carts/${cart_id}/items/${id}`;
    return axiosClient.delete(url);
  },
  updateCart: (line_id: string, quantity: number, cart_id: string) => {
    const url = `/carts/${cart_id}/items/${line_id}`;
    return axiosClient.put(url, { quantity: quantity });
  },
};

export default cartApi;
