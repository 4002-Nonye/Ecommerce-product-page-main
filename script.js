"strict mode";
///////////////////////////////// I USE ' + ' TO CONVERT STRINGS TO NUMBERS //////////////////////////////////
//////////////////////////////// IN THIS PROJECT, I HAVE USED TERNARY OPERATORS INSTEAD OF ' IF ELSE ' OR ' SWITCH ' STATEMENTS//////////////////////
const openMenu = $(".menu");
const closeMenu = $(".btn-close");
const overlay = $(".overlay");
const menu = $(".modal__wrapper");
const addItems = $(".plus");
const reduceItems = $(".minus");
const quantity = $(".quantity");
const btnAddToCart = $(".btn__cartadd");
let cartAlert = $(".cart__alert");
const cartContainer = $(".cart__container");
let newCartAlert = +cartAlert.text();
const cartImg = $(".cart__img");
const product = $(".product__list");
const slides = $(".slide");
const lightBox = $(".slide-lightbox");
const closeLightBox = $(".light-box-close");
const btnPrev = $(".prev");
const btnNext = $(".next");
const lightBoxOpener = $(".slide__1");
const maxSlide = slides.length - 1;

let x = 0;
//LITTLE HELPER FUNCTION TO OPEN  MENU FOR MOBILE
function openMobileMenu() {
  menu.removeClass("hidden");
  $("body").addClass("modal-open");
  overlay.removeClass("hidden");
}
//LITTLE HELPER FUNCTION TO CLOSE  MENU FOR MOBILE
function closeMobileMenu() {
  menu.addClass("hidden");
  $("body").removeClass("modal-open");
  overlay.addClass("hidden");
}
//INCREASING NUMBER OF ITEMS TO PURCHASE
function increaseItem() {
  x++;
  quantity.text(x);
}
//REDUCING NUMBER OF ITEMS TO PURCHASE
function reduceItem() {
  //CHECKING IF X IS LESS THAN OR EQUAL TO 0
  x <= 0 ? (x = 0) : x--;
  quantity.text(x);
}

//LITTLE HELPER FUNCTION TO HIDE CART NOTIFICATION AND EMPTY CART WHEN QUANTITY IS 0
function hideNotification() {
  //prettier-ignore
  +quantity.text() > 0 ? cartAlert.removeClass("hide") : cartAlert.addClass("hide");
}

//LITTLE HELPER FUNCTION TO RENDER EMPTY CART
let checkCart = $(".make-empty");
function emptyCart() {
  checkCart.html(`<p class="empty-cart">Your cart is empty (。_。).</p>`);
}

// DELETING ITEMS FROM MY CART
function deleteItem() {
  const deleteIcon = $(".trash__img");
  deleteIcon.on("click", function () {
    emptyCart();
    quantity.text(0);
    x = 0;
    hideNotification();

    cartAlert.text(newCartAlert);
  });
}

//UPDATING/SHOWING CART NOTIFICATION
function pushToCart() {
  let currentImage = 0;
  newCartAlert = +quantity.text();
  hideNotification();

  cartAlert.text(newCartAlert);

  //CHECK USER'S DEVICE AND UPDATE THUMBNAIL ACCORDING TO IT
  const mq = window.matchMedia("(min-width:1000px)");
  mq.matches ? (currentImage = +thumb + 1) : (currentImage = currentSlide + 1);

  //prettier-ignore
  newCartAlert === 0  ? emptyCart() : checkCart.html (
  //UPDATING PRICES (DOM)
                 
          `<div class="row">
          <img
            src="images/image-product-${currentImage}-thumbnail.jpg"
            alt="thumbnail"
            class="thumbnail__img"
          />
          <span class="column">
            <p class="column__p">Fall Limited Edition Sneakers</p>
            <p class="column__amount">
              $125.00 x ${newCartAlert} &nbsp;
              <span class="dark__amount">$${125 * newCartAlert}</span>
            </p>
          </span>
          <img src="images/icon-delete.svg" alt="trash" class="trash__img" />
        </div>
        <div class="div__btn">
          <button class="btn__checkout">Checkout</button>
        </div>`
      );
  deleteItem();
}

//SHOWING / HIDING CART CONTAINER
cartImg.on("click", function () {
  cartContainer.toggleClass("hide");
});

//BUILDING AND UPDATING SLIDER

//LOOP ALL SLIDES AND CHANGE TRANSFORM PROPERTY WHEN CLICKED
function goToSlide(slide) {
  $.each(slides, function (i, s) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });

  //FOR LIGHTBOX
  $.each(lightBox, function (i, s) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}
function activateThumbImage(thumb) {
  $(".thumb").removeClass("active");

  $(`.thumb[data-thumb= "${thumb}"]`).addClass("active");
}

//SET DEFAULT SLIDE
activateThumbImage(0);
goToSlide(0);

//NEXT SLIDE
let currentSlide = 0;
function nextSlide() {
  currentSlide === maxSlide ? (currentSlide = 0) : currentSlide++;

  goToSlide(currentSlide);
  activateThumbImage(currentSlide);
}

//PREVIOUS SLIDE
function prevSlide() {
  currentSlide === 0 ? (currentSlide = maxSlide) : currentSlide--;

  goToSlide(currentSlide);
  activateThumbImage(currentSlide);
}

let thumb = 0;
product.on("click", function (e) {
  currentSlide;
  if ($(e.target).hasClass("thumb")) {
    thumb = e.target.dataset.thumb;
    goToSlide(thumb);
    activateThumbImage(thumb);
  }
});

//LIGHTBOX
function openLightBox() {
  $(".light-box").removeClass("hidden");
  $(".overlay2").removeClass("hidden");
  $("body").addClass("modal-open");
}
function closeLightBoxx() {
  $(".light-box").addClass("hidden");
  $(".overlay2").addClass("hidden");
  $("body").removeClass("modal-open");
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && menu.hasClass("hidden")) closeLightBoxx();
});

//EVENTLISTENERS
function init() {
  openMenu.on("click", openMobileMenu);
  closeMenu.on("click", closeMobileMenu);
  addItems.on("click", increaseItem);
  reduceItems.on("click", reduceItem);
  btnAddToCart.on("click", pushToCart);
  lightBoxOpener.on("click", openLightBox);
  closeLightBox.on("click", closeLightBoxx);
  btnPrev.on("click", prevSlide);
  btnNext.on("click", nextSlide);
}

init();
