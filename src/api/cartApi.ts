import axiosClient from "./axiosClient";


const cartApi = {
    createNewCart: () => {
        const url = "/carts";
        return axiosClient.get(url)
    },
    loadCart: (cart_id:string) => {
        const url = `/carts/${cart_id}`;
        return axiosClient.get(url);
    },
    addToCart: (product:{id:string, quantity:number}, cart_id:string) => {
        const url = `/carts/${cart_id}`;
        return axiosClient.post(url, product);
    },
    removeFromCart: (id:string, cart_id:string) => {
        const url = `/carts/${cart_id}/items/${id}`;
        return axiosClient.delete(url);
    }
}

export default cartApi;