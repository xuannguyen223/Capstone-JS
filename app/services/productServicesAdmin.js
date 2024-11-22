// PHẦN PRODUCT SERVICES CỦA ADMIN: HOÀNG

import BASE_URL from "../utils/apiUrls"

// Tạo 1 Object để lưu trữ
export const productServices = {
    // Lấy
    getProduct: () => {
        return axios({
            url: BASE_URL,
            method: "GET",
        });
    },
};