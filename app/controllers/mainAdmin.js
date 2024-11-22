// TRANG MAIN.JS CỦA ADMIN: HOÀNG

import { productServices } from "../services/productServicesAdmin.js"

// render
const renderProductList = () => {
    
}

// GET
const fetchProductList = () =>{
    productServices.getProduct()
    .then((response) => {
        console.log("response: ", response.data);
    }).catch((err) => {
        console.error("err: ", err);
    });
};
fetchProductList();