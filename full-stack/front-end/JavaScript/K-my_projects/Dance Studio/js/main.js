/* Header Bg */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    header.classList.toggle("header-bg", window.scrollY > 0);
});

/* Side Menu */

const menuBtn = document.querySelector(".header .menu-btn");
const menuOverlay = document.querySelector(".side-menu-overlay");
const sideMenu = document.querySelector(".side-menu");
const closeMenuBtn = sideMenu.querySelector(".close-btn");
const menuLinks = sideMenu.querySelectorAll("a");

function openMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("visible");
    document.body.style.overflow = "hidden";
}
function closeMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("visible");
    document.body.style.removeProperty("overflow");
}

menuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

menuLinks.forEach((Link) => {
    Link.addEventListener("click", closeMenu);
});

/* Side Menu */

const classesSlider = new Swiper(".classes-slider", {
  grabCursor: true,
  spaceBetween: 30,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  breakpoints: {
    650: {
      slidesPerView: 2,
    },
    1050: {
      slidesPerView: 3,
    },
  },
});

/* Side Menu */

const testimonialsPagination = document.querySelector(".testimonials-pagination");
const testimonialsItems = document.querySelector(".testimonials-item");

const testimonialsSlider = new Swiper(".testimonials-slider", {
  grabCursor: true,
  spaceBetween: 30,
  pagination: {
    el: ".testimonials-pagination",
    clickable: true,
    dynamicBullets: true,
  },
});

if (testimonialsPagination) {
  testimonialsItems.forEach((item, index) => {
    const img = document.createElement("img");
    img.src = item.getAttribute("data-img");
    testimonialsPagination.children[index].appendChild(img);
  });

}