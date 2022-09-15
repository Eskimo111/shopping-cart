import axiosClient from "./axiosClient";

const userApi = {
  sendEmail: (input: { email: string; base_url: string }) => {
    const url = "/customers/email-token";
    return axiosClient.post(url, input);
  },
};

export default userApi;
