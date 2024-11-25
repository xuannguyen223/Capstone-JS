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
                <button class="btn2" onclick="productDetail('${id}')">
                  SEE DETAIL
                </button>
                <div class="hr__main w-2/3"></div>
                <button class="btn2" onclick="addToCart('${id}')">ADD TO CART</button>
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
    .getProduct()
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
    .getProduct()
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

// PRODUCT DETAILS
function productDetail(id) {
  // lấy thông tin sản phẩm về
  userServices
    .getProductByID(id)
    .then((response) => {
      console.log("response: ", response.data);
      const { id, name, type, price, image, description, availability } =
        response.data;
      // Hiển thị thông tin lên popup product detail
      let content = `
              <div class="popup__content__main">
                <!-- Hình ảnh -->
                <div class="w-1/3">
                  <img
                    src="${image}"
                    alt="Product Image"
                    class="max-w-56 h-auto object-cover rounded-lg"
                  />
                </div>

                <!-- Giá, loại, số lượng -->
                <div class="w-2/3 ml-20 md:ml-8 lg:ml-0">
                  <h2 id="product-title">${name}</h2>
                  <p id="product-type">${type}</p>
                  <p id="product-price">Price: $${price}</p>
                  <!-- Số lượng  -->
                  <div class="product__quantity">
                    <button id="decrease-quantity" type="button" class="btn3">-</button>
                    <span id="product-quantity" class="text-xl mx-2">1</span>
                    <button id="increase-quantity" type="button" class="btn3">+</button>
                  </div>
                </div>
              </div>

              <!-- Phần mô tả chi tiết sản phẩm -->
              <div id="popup-full-description">
                <p>${description}</p>
              </div>
      `;
      getEle("#popup-content").innerHTML = content;
      getEle("#popup").classList.remove("hidden");
    })
    .catch((error) => {
      console.error("error: ", error);
    });
}

// đóng popup product detail
getEle("#close-popup").onclick = () => {
  getEle("#popup").classList.add("hidden");
};

window.productDetail = productDetail;
