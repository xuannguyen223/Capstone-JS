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
    // Xoá
    delProduct: (id) =>{
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "DELETE",
        });
    },
    // addProduct
    addProduct: (product) => {
        return axios({
            url: BASE_URL,
            method: "POST",
            data: product,
        });
    },
    // Lấy item theo id
    getProductByID: (id) =>{
        return axios ({
            url: `${BASE_URL}/${id}`,
            method: "GET",
        });
    },
    // Cập nhật product theo id
    updateProduct: (id, product) => {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "PUT",
            data: product,
        });
    },
};