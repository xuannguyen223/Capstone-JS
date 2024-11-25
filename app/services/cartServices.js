import { getEle } from "../utils/commonUtils.js";
import userServices from "./productServicesUser.js";

function renderCart() {
  if (window.location.pathname !== "/app/views/cart.html") {
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

  let totalPrice = 0;
  let tableContent = ``;
  let promiseChain = Promise.resolve(); // Bắt đầu chuỗi Promise rỗng

  cartMap.forEach((quantity, productId) => {
    promiseChain = promiseChain.then(() => {
      return userServices.getProductByID(productId).then((response) => {
        const { id, name, price, image } = response.data;
        const subtotal = Number((price * quantity).toFixed(2));
        totalPrice += subtotal;
        const content = `
              <tr>
                <td class="product_info">
                  <button class="delete" onclick="removeProduct('${id}')">
                    ×
                  </button>
                  <img
                    src="${image}"
                    alt="Product Image ${name}"
                  />
                  <span>${name}</span>
                </td>
                <td class="product_price">$${price}</td>
                <td class="product_quantity">
                  <div>
                    <button
                      onclick="updateQuantity('${id}',false)"
                      class="decrease"
                    >
                      -
                    </button>
                    <span id="product_quantity">${quantity}</span>
                    <button
                      onclick="updateQuantity('${id}',true)"
                      class="increase"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="subtotal">$${subtotal}</td>
              </tr>
      `;
        tableContent += content;
      });
    });
  });

  // Khi chuỗi Promise hoàn tất
  promiseChain
    .then(() => {
      getEle("#tableCartBody").innerHTML = tableContent;
      getEle("#product_total_price").innerHTML = `$${totalPrice}`;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
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
