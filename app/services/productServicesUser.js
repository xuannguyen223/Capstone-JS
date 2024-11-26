// PHẦN PRODUCT SERVICES CỦA USER: XUÂN

import BASE_URL from "../utils/apiUrls.js";

const userServices = {
  // lấy productList từ API
  getProduct: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },

  // lấy product theo id
  getProductByID: (id) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
  },
};

export default userServices;
