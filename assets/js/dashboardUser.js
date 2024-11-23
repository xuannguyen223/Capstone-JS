// ******************* HEADER ******************
// Ẩn hiện subMenu khi click button miniNav

const btnMiniNav = document.querySelector("#miniNav");
const subMenuDiv = document.querySelector("#subMenu");
const header = document.querySelector("header");

btnMiniNav.onclick = () => {
  subMenuDiv.classList.toggle("hidden");
  // Chỉnh màu background của header chỉ khi màn hình chưa vượt qua breakpoint (fix bug UI)
  if (window.scrollY <= 80) {
    header.classList.toggle("bg-white/90");
    header.classList.toggle("backdrop-blur-sm");
  }
};

// Auto đóng subMenu khi kích thức màn hình vượt qua md
function checkScreenSize() {
  if (window.innerWidth > 768) {
    subMenuDiv.classList.add("hidden");
    // Chỉnh màu background của header
    header.classList.remove("bg-white/90");
    header.classList.remove("backdrop-blur-sm");
  }
}
window.addEventListener("resize", checkScreenSize);

// Khi header vượt qua khỏi breakpoint nhất định thì sẽ có background
function onScroll() {
  // CHỈ CHẠY LOGIC Ở TRONG NẾU SUBMENU ĐANG ĐÓNG (fix bug UI)
  if (subMenuDiv.classList.contains("hidden")) {
    if (window.scrollY > 80) {
      // Kiểm tra nếu cuộn qua carousel hoặc cuộn qua 1000
      header.classList.add("bg-white/90");
      header.classList.add("backdrop-blur-sm");
    } else {
      // Xoá lớp khi chưa vượt qua 1000 hoặc chưa cuộn qua carousel
      header.classList.remove("bg-white/90");
      header.classList.remove("backdrop-blur-sm");
    }
  }
}

// Lắng nghe sự kiện scroll
window.addEventListener("scroll", onScroll);

// *************** CAROUSEL ******************
// khi tỷ lệ thu phóng màn hình khác 100% thì div carousel__content sẽ đc canh giữa
function handleCarousel() {
  const zoomLevel = window.devicePixelRatio; // Lấy tỷ lệ thu phóng màn hình
  const carouselContentDiv = document.querySelector("#carouselContent");
  // NOTE: trên trình duyệt mức zoom 100% lại là 1.5 chứ ko phải 1 - tạm fix và check lại sau
  if (zoomLevel !== 1.5) {
    carouselContentDiv.classList.remove("left-[20%]");
    carouselContentDiv.classList.add("carousel__content--zoomLevel");
  } else {
    carouselContentDiv.classList.remove("carousel__content--zoomLevel");
    carouselContentDiv.classList.add("left-[20%]");
  }
}

window.addEventListener("resize", handleCarousel);
window.addEventListener("load", handleCarousel);

// *************** PRODUCT ******************
function productDetail() {
  console.log("vừa click vào see detail");
  // Lấy thông tin sản phẩm từ data attribute
  // const productName = this.getAttribute("data-product");

  // Hiển thị popup và cập nhật thông tin sản phẩm
  document.getElementById("popup").classList.remove("hidden");
  // document.getElementById(
  //   "popup-title"
  // ).textContent = `Thông tin về ${productName}`;
  // document.getElementById(
  //   "popup-content"
  // ).textContent = `Chi tiết thông tin về ${productName} sẽ hiển thị ở đây.`;
}

// Lắng nghe sự kiện click để đóng popup
document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("popup").classList.add("hidden");
});

window.productDetail = productDetail;
