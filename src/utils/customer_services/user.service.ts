import axiosClient from "../axiosClient";

const userService = {
  sendEmail: (input: { email: string; base_url: string }) => {
    const url = "/customers/email-token";
    return axiosClient.post(url, input);
  },
};

export default userService;
