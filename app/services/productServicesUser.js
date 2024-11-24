// PHẦN PRODUCT SERVICES CỦA USER: XUÂN

import BASE_URL from "../utils/apiUrls.js";
import { getEle } from "../utils/commonUtils.js";
getEle;

const userServices = {
  // lấy productList từ API
  getProductUser: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
};

export default userServices;
