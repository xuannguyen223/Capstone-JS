// TRANG MAIN.JS CỦA USER: XUÂN
console.log("đây là trang main user");

import userServices from "../services/productServicesUser.js";
import { getEle } from "../utils/commonUtils.js";

// TRÌNH BÀY PRODUCTS LÊN GIAO DIỆN
const renderProductListUser = (arrProduct, quantityOfProducts) => {
  console.log("arrProduct: ", arrProduct);

  let content = "";
  for (let index = 0; index < quantityOfProducts; index++) {
    let product = arrProduct[index];
    const { id, name, type, price, image, description, availability } = product;

    let contentTr = `
        <div class="product__item">
            <div class="product__item__img relative">
              <img
                src="${image}"
                alt=""
              />
              <div class="product__item__action">
                <button class="btn2" onclick="productDetail()">
                  SEE DETAIL
                </button>
                <div class="hr__main w-2/3"></div>
                <button class="btn2" onclick="addToCart()">ADD TO CART</button>
              </div>
            </div>
            <div class="product__item__content">
              <h1 class="productName">${name}</h1>
              <p class="productCategories">${type}</p>
              <p class="productPrice">$${price}</p>
            </div>
        </div>
          `;
    content += contentTr;
  }

  getEle("#productList").innerHTML = content;
};

// LẤY DATA TỪ API VỀ (bao gồm cả trình bày lên giao diện)
const fetchProductListUser = () => {
  userServices
    .getProductUser()
    .then((response) => {
      console.log("response: ", response.data);

      //   Nếu là trang shop.html thì render toàn bộ sp, nếu là trang index thì chỉ render 8 sp
      if (window.location.pathname === "/app/views/shop.html") {
        console.log("đang ở trang shop");
        renderProductListUser(response.data, response.data.length);
      } else {
        console.log("đang ở trang index");
        renderProductListUser(response.data, 8);
      }
    })
    .catch((error) => {
      console.error("error: ", error);
    });
};

fetchProductListUser();

// FILTER LOẠI SẢN PHẨM
// phần js giao diện (đóng mở dropdown, chọn loại) nằm bên dashboardUser
function showSelected() {
  const checkboxes = document.querySelectorAll(
    '#dropdownMenu input[type="checkbox"]:checked'
  );

  const selectedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );

  //   cho user thấy dc những loại mà user đã chọn
  document.getElementById("selectedValues").innerHTML =
    `<span class="font-semibold italic">Selected categories: </span>` +
    selectedValues.join(", ");

  userServices
    .getProductUser()
    .then((response) => {
      const productList = [];
      response.data.map(function (product) {
        // filter products thỏa điều kiện
        for (let i = 0; i < selectedValues.length; i++) {
          if (product.type.includes(selectedValues[i])) {
            // thì push sản phẩm vào list đáp án
            productList.push(product);
            // return để tránh sản phẩm bị lặp nhiều lần
            return;
          }
        }
      });
      console.log("final productList: ", productList);
      // render lên giao diện
      renderProductListUser(productList, productList.length);
    })
    .catch((error) => {
      console.error("error: ", error);
    });
}

window.showSelected = showSelected;
