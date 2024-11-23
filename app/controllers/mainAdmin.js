// TRANG MAIN.JS CỦA ADMIN: HOÀNG

import { productServices } from "../services/productServicesAdmin.js"

// render
const renderProductList = (arrProduct) => {
    console.log("arrProduct ", arrProduct);

    const content = arrProduct.map(({
        id,
        name,
        type,
        price,
        image,
        description,
        availability,
        descriptions,
    })=>
    `
    <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${type}</td>
        <td>${price}</td>
        <td>${image}</td>
        <td>${description}</td>
        <td>${availability}</td>
        <td>${descriptions}</td>
        <td>
            <button class="p-2 rounded-lg hover:border hover:border-amber-400 hover:text-amber-500 hover:bg-white text-white bg-amber-400 text-xl font-thin">
                <i class="fa fa-plus"></i>
                <span>Sửa</span>
            </button>
            <button class="p-2 rounded-lg hover:border hover:border-amber-400 hover:text-amber-500 hover:bg-white text-white bg-amber-400 text-xl font-thin">
                <i class="fa fa-plus"></i>
                <span>Xoá</span>
            </button>
        </td>
    </tr>`).join("");
};
document.querySelector("#tblDanhSachSP").innerHTML=content;
// Hàm sử dụng chung của chức năng thêm
const getInfo = () => {
    
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