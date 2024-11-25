function renderCart() {
    const cart = getCart(); // Lấy giỏ hàng từ localStorage
    const cartItems = document.querySelector(".cart__items");
    const cartTotal = document.querySelector(".cart__total");
  
    if (cart.length === 0) {
      cartItems.innerHTML = `<p class="italic text-gray-600">Your cart is currently empty.</p>`;
      cartTotal.textContent = "";
      return;
    }
  
    const content = cart
      .map(
        ({ id, name, price, image, quantity }) => `
      <div class="cart__item flex items-center justify-between border-b border-gray-300 py-4 w-full max-w-4xl">
        <div class="flex items-center space-x-4">
          <img src="${image}" alt="${name}" class="h-20 w-20 object-cover rounded-lg" />
          <div>
            <h4 class="font-semibold text-lg">${name}</h4>
            <p class="text-gray-500">$${price}</p>
        </div>
        </div>
        <div class="flex items-center space-x-4">
        <button onclick="updateQuantity('${id}', 'decrease')" class="px-3 py-1 bg-red-500 text-white rounded">-</button>
        <span>${quantity}</span>
        <button onclick="updateQuantity('${id}', 'increase')" class="px-3 py-1 bg-green-500 text-white rounded">+</button>
        </div>
        <div>
          <p class="font-semibold">$${(price * quantity).toFixed(2)}</p>
        </div>
        <button onclick="removeProduct('${id}')" class="px-3 py-1 bg-gray-500 text-white rounded">Remove</button>
    </div>
    `
    )
    .join("");

    cartItems.innerHTML = content;

    // Tính tổng tiền
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

  // Lấy giỏ hàng từ localStorage
function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

  // Lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

  // Cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(productId, action) {
    const cart = getCart();
    const product = cart.find((item) => item.id === productId);

    if (product) {
    if (action === "increase") {
        product.quantity += 1;
    } else if (action === "decrease" && product.quantity > 1) {
        product.quantity -= 1;
    } else if (action === "decrease" && product.quantity === 1) {
        const confirmDelete = confirm("Do you want to remove this product?");
        if (confirmDelete) {
        const index = cart.indexOf(product);
        cart.splice(index, 1);
        }
    }
    }

    saveCart(cart); // Lưu lại giỏ hàng
    renderCart(); // Hiển thị lại giỏ hàng
}

  // Xóa sản phẩm khỏi giỏ hàng
function removeProduct(productId) {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);

    saveCart(updatedCart); // Lưu lại giỏ hàng sau khi xóa
    renderCart(); // Hiển thị lại giỏ hàng
}

  // Gọi renderCart khi trang được load
document.addEventListener("DOMContentLoaded", renderCart);