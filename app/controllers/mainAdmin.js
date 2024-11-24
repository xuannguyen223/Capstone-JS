// TRANG MAIN.JS CỦA ADMIN: HOÀNG

import Product from "../models/productAdmin.js";
import { productServices } from "../services/productServicesAdmin.js"
import { getEle } from "../utils/commonUtils.js";
import { kiemTraRong, kiemTraSo } from "../utils/valication.js";

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
    })=>
    `
    <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${type}</td>
        <td>${price}</td>
        <td>
            <img src="${image}" alt="${name}" class="h-20 w-20 object-cover rounded-lg" onerror="this.src='./assets/images/default.jpg'" />
        </td>
        <td>${description}</td>
        <td>${availability}</td>
        <td>
            <button class="p-2 rounded-lg hover:border hover:border-amber-400 hover:text-amber-500 hover:bg-white text-white bg-amber-400 text-xl font-thin" onclick="editProduct('${id}')">
                <span>Sửa</span>
            </button>
            <br/>
            <button class="p-2 rounded-lg hover:border hover:border-red-400 hover:text-red-500 hover:bg-white text-white bg-red-400 text-xl font-thin"
            onclick="delProduct('${id}')">
                <span>Xoá</span>
            </button>
        </td>
    </tr>`).join("");
    document.querySelector("#tblDanhSachSP").innerHTML=content;
};



// Hàm sử dụng chung của chức năng thêm
const getInfo = () => {
    let id = getEle("#MaSP").value;
    let name = getEle("#TenSP").value;
    
    // Sửa lại phần lấy các loại bánh (với dropdown hoặc checkbox)
    let type = [];
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        type.push(checkbox.value); // Lấy giá trị của các checkbox đã chọn
    });
    
    let price = getEle("#GiaSP").value;
    let image = getEle("#HinhAnh").value;
    let description = getEle("#Mota").value;
    
    // Sửa lại lỗi chính tả "vale" thành "value"
    let availability = getEle("#TinhTrang").value;

    console.log({
        id,
        name,
        type,
        price,
        image,
        description,
        availability,
    });

    return new Product(id, name, type, price, image, description, availability);
};

// resetForm
const resetForm = () => {
    getEle("#MaSP").value = "";
    getEle("#TenSP").value = "";
    getEle("#LoaiSP").value = "";
    getEle("#GiaSP").value = "";
    getEle("#HinhAnh").value = "";
    getEle("#Mota").value = "";
    getEle("#TinhTrang").value = "";
};
// GET
const fetchProductList = () =>{
    productServices.getProduct()
    .then((response) => {
        console.log("response: ", response.data);

        renderProductList(response.data)
    }).catch((err) => {
        console.error("err: ", err);
    });
};
fetchProductList();

// DELETE: xoá sản phẩm
const delProduct = (id) =>{
    productServices.delProduct(id)
    .then((response) => {
        console.log("response: ", response);

        fetchProductList();
    })
    .catch((error) => {
        console.log("error: ", error);
    })
};
window.delProduct = delProduct;

// Hàm cập nhật
getEle("#btnThemSP").onclick = () => {
    getEle("#btnCapNhat").disabled = true;
};

// Thêm sản phẩm 
const addProduct = () => {
    // Lấy thông tin từ form
    const product = getInfo();
    console.log("product: ", product);

    // Kiểm tra tên sản phẩm không được để trống
    let isValid = kiemTraRong(
        product.name,
        "#errTenSP",
        "Tên sản phẩm không được để trống!",
    );
    // Kiểm tra giá sản phẩm không được để trống và chỉ được nhập mỗi số
    isValid &= kiemTraRong(
        product.price,
        "#errGiaSP",
        "Giá sản phẩm không được để trông!",
    ) 
    && kiemTraSo(
        product.price,
        "#errGiaSP",
        "Chỉ được nhập số",
    );

    // Kiểm tra số lượng loại sản phẩm được chọn
    const categoryCount = product.type.length; 
    if (categoryCount < 2 || categoryCount > 3) {
        isValid = false;
        getEle("#errLoaiSP").textContent = "Vui lòng chọn từ 2 đến 3 loại sản phẩm!";
    } else {
        getEle("#errLoaiSP").textContent = "";
    }

    if(isValid){
        productServices.addProduct(product)
        .then((response) => {
            console.log("response: ", response);

            fetchProductList();
            //reset form
            resetForm();

            $("#myModal").modal("hide");
            getEle("#btnCapNhat").disabled = false;
        })
        .catch((error) => {
            console.error("error: ", error);
        })
    };
};
window.addProduct = addProduct;

// edit
const editProduct = (id) => {
    productServices
    .getProductByID(id)
    .then((response) => {
        console.log("response: ", response);
        const sp = response.data;

        // Điền dữ liệu sản phẩm vào form
        getEle("#MaSP").value = sp.id;
        getEle("#TenSP").value = sp.name;

        // Xử lý loại sản phẩm khi dùng checkbox
        const checkboxes = document.querySelectorAll("#dropdownMenu input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
        checkbox.checked = sp.type.includes(checkbox.value);
        });

        getEle("#GiaSP").value = sp.price;
        getEle("#HinhAnh").value = sp.image;
        getEle("#Mota").value = sp.description;
        getEle("#TinhTrang").value = sp.availability;

        // Điều chỉnh trạng thái nút
        getEle("#btnThem").disabled = true;
        getEle("#btnCapNhat").disabled = false;

        // Hiển thị modal
        $("#myModal").modal("show");
        })
        .catch((error) => {
        console.error("error: ", error);
        });
    };

  // Gán hàm editProduct vào window để có thể gọi từ HTML
    window.editProduct = editProduct;


// update
const updateProduct = () =>{
    const sp = getInfo();
    console.log("sp: ", sp);

    productServices.updateProduct(sp.id, sp)
    .then((response) =>{
        console.log("response: ", response);

        $("#myModal").modal("hide");
        fetchProductList();
        getEle("#btnThem").disabled = false;
    })
    .catch((error) => {
        console.error("error: ", error);
    })
};
window.updateProduct = updateProduct;

    // Tìm kiếm sản phẩm theo tên
    const searchProductByName = () =>{
        const keyword = getEle("#txtSearch").value.trim().toLowerCase();

        productServices
        .getProduct()
        .then((response) =>{
            console.log("response: ", response);
            
            const result = productList.filter((sp) => {
                return sp.name.toLowerCase().includes(keyword);
            });
            if(result.length > 0){
                renderProductList(result);
            }
            else{
                console.log("Sản phẩm này không tồn tại");
            };
        })
        .catch((error) =>{
            console.log("error: ", error);
        });
    };
window.searchProductByName = searchProductByName;


// Xử lý nút dropdownButton 
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

dropdownButton.addEventListener('click', () => {
dropdownMenu.classList.toggle('hidden');
});
window.addEventListener('click', (event) => {
    if (!event.target.closest('#dropdownContainer')) {
        dropdownMenu.classList.add('hidden');
    }
    });