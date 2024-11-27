import { getEle } from "../utils/commonUtils.js";
import userServices from "./productServicesUser.js";

// Render sản phẩm lên table
function renderCart() {
  if (!window.location.pathname.endsWith("/cart.html")) {
    updateTotalCart(getCartFromLocalStorage());
    return;
  }
  const cartMap = getCartFromLocalStorage();

  if (cartMap.size !== 0) {
    getEle("#filledProduct").classList.remove("hidden");
    getEle("#emptyProduct").classList.add("hidden");
  } else {
    getEle("#filledProduct").classList.add("hidden");
    getEle("#emptyProduct").classList.remove("hidden");
  }

  let tableContent = ``;
  let totalPrice = 0;

  async function loadCartItems() {
    for (let [productId, quantity] of cartMap.entries()) {
      try {
        const response = await userServices.getProductByID(productId);
        const { id, name, price, image } = response.data;
        const subtotal = Number((price * quantity).toFixed(2));
        totalPrice += subtotal;

        const content = `
        <tr>
          <td class="product_info">
            <button class="delete" onclick="removeProduct('${id}')">
              ×
            </button>
            <img src="${image}" alt="Product Image ${name}" />
            <span>${name}</span>
          </td>
          <td class="product_price">$${price}</td>
          <td class="product_quantity">
            <div>
              <button onclick="updateQuantity('${id}', false)" class="decrease">-</button>
              <span id="product_quantity">${quantity}</span>
              <button onclick="updateQuantity('${id}', true)" class="increase">+</button>
            </div>
          </td>
          <td class="subtotal">$${subtotal}</td>
        </tr>
      `;

        tableContent += content;
      } catch (error) {
        console.error("Error loading product:", error);
        cartMap.delete(productId);
        setCartToLocalStorage(cartMap);
      }
    }

    // Sau khi tất cả sản phẩm được xử lý, render nội dung lên table
    getEle("#tableCartBody").innerHTML = tableContent;

    getEle("#product_total_price").innerHTML = `$${totalPrice}`;
    // cập nhật icon giỏ hàng
    updateTotalCart(cartMap);
  }

  loadCartItems();
}

// hàm cập nhật icon giỏ hàng
function updateTotalCart(cartMap) {
  const totalQuantity = [...cartMap.values()].reduce(
    (sum, value) => sum + value,
    0
  );
  getEle("#quantity_product").innerHTML = totalQuantity;
  getEle("#quantity_product_1").innerHTML = totalQuantity;
}

// get localStorage
const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  if (data) {
    return new Map(JSON.parse(data));
  }
  return new Map();
};

// set localStorage
const setCartToLocalStorage = (cart) => {
  const data = JSON.stringify(Array.from(cart));
  localStorage.setItem("cart", data);
};

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  console.log("productId: ", productId);
  let currentCart = getCartFromLocalStorage();
  if (currentCart.has(productId)) {
    updateQuantity(productId, true);
  } else {
    currentCart.set(productId, 1);
    setCartToLocalStorage(currentCart);
    // cập nhật icon giỏ hàng
    updateTotalCart(currentCart);
  }
  console.log("currentCart: ", currentCart);
}
window.addToCart = addToCart;

// Cập nhật số lượng sản phẩm trong giỏ hàng
// action: true | false - increase | decrease
function updateQuantity(productId, action) {
  const cartMap = getCartFromLocalStorage();
  let currentQuantity = cartMap.get(productId);

  if (action) {
    cartMap.set(productId, ++currentQuantity);
  } else if (!action && currentQuantity > 1) {
    cartMap.set(productId, --currentQuantity);
  } else if (!action && currentQuantity === 1) {
    removeProduct(productId);
    return;
  }
  setCartToLocalStorage(cartMap);
  renderCart();
}
window.updateQuantity = updateQuantity;

// Xóa sản phẩm khỏi giỏ hàng
function removeProduct(productId) {
  const cartMap = getCartFromLocalStorage();
  cartMap.delete(productId);

  setCartToLocalStorage(cartMap);
  renderCart();
}
window.removeProduct = removeProduct;

// Gọi renderCart khi trang được load
window.addEventListener("load", renderCart);

// XÁC NHẬN ĐẶT HÀNG
const submitOrder = () => {
  console.log("xác nhận đặt hàng");
  // get thông tin từ giỏ hàng
  getEle("#submit_oder_info").innerHTML = getEle("#filledProduct").innerHTML;
  // show popup
  getEle("#popup").classList.remove("hidden");
};

window.submitOrder = submitOrder;

// đóng popup submit
const cancelOrder = () => {
  getEle("#popup").classList.add("hidden");
};

window.cancelOrder = cancelOrder;

// confirm oder - xóa cart & reload
const confirmOrder = () => {
  localStorage.removeItem("cart");
  // Ẩn popup submit hiện tại
  getEle("#popup").classList.add("hidden");
  // Hiện popup thông báo đã đặt hàng thành công
  getEle("#popup_success").classList.remove("hidden");
};

window.confirmOrder = confirmOrder;

const closePopupSucess = () => {
  getEle("#popup_success").classList.add("hidden");
  window.location.reload();
  window.scrollTo(0, 0);
};

window.closePopupSucess = closePopupSucess;
