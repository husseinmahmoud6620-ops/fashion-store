/* =========================================
   Store Settings: change these values for your store
   ========================================= */
// Your WhatsApp number: country code + number, with no + and no spaces
// Example for Egypt: "201001234567" (20 + the number without the first 0)
const WHATSAPP_NUMBER = "201156675432";

// Store name (used in the WhatsApp message greeting)
const STORE_NAME = "Fashion Store";

// Shipping fee in EGP (the same for every governorate for now)
const SHIPPING_FEE = 60;

// Governorates shown in the delivery form (en = English name, ar = Arabic name)
const GOVERNORATES = [
  { en: "Cairo", ar: "القاهرة" },
  { en: "Giza", ar: "الجيزة" },
  { en: "Alexandria", ar: "الإسكندرية" },
  { en: "Qalyubia", ar: "القليوبية" },
  { en: "Port Said", ar: "بورسعيد" },
  { en: "Suez", ar: "السويس" },
  { en: "Dakahlia", ar: "الدقهلية" },
  { en: "Sharqia", ar: "الشرقية" },
  { en: "Gharbia", ar: "الغربية" },
  { en: "Monufia", ar: "المنوفية" },
  { en: "Beheira", ar: "البحيرة" },
  { en: "Kafr El Sheikh", ar: "كفر الشيخ" },
  { en: "Damietta", ar: "دمياط" },
  { en: "Ismailia", ar: "الإسماعيلية" },
  { en: "Faiyum", ar: "الفيوم" },
  { en: "Beni Suef", ar: "بني سويف" },
  { en: "Minya", ar: "المنيا" },
  { en: "Assiut", ar: "أسيوط" },
  { en: "Sohag", ar: "سوهاج" },
  { en: "Qena", ar: "قنا" },
  { en: "Luxor", ar: "الأقصر" },
  { en: "Aswan", ar: "أسوان" },
  { en: "Red Sea", ar: "البحر الأحمر" },
  { en: "New Valley", ar: "الوادي الجديد" },
  { en: "Matrouh", ar: "مطروح" },
  { en: "North Sinai", ar: "شمال سيناء" },
  { en: "South Sinai", ar: "جنوب سيناء" }
];


/* =========================================
   1. Products Data (from the old HTML cards)
   name: English name, nameAr: Arabic name
   gender: "men", "women", "kids" or "unisex"
   price and oldPrice are in EGP
   oldPrice: add it only to products on sale (the Sale link uses it)
   To change a product image, only edit its image value
   ========================================= */
const products = [
  { id: 1,  name: "Classic T-Shirt", nameAr: "تيشيرت كلاسيك", price: 199, oldPrice: 249, gender: "unisex", category: "T-Shirts",    image: "img/t-shirt.jpg" },
  { id: 2,  name: "Slim Fit Jeans", nameAr: "جينز سليم فيت", price: 799, gender: "men", category: "Jeans",       image: "img/slim-jeans.jpg" },
  { id: 3,  name: "Hooded Sweatshirt", nameAr: "هودي بقلنسوة", price: 499, gender: "unisex", category: "Hoodies",     image: "img/hodies.jpg" },
  { id: 4,  name: "Leather Sneakers", nameAr: "سنيكرز جلد", price: 799, oldPrice: 999, gender: "unisex", category: "Shoes",       image: "img/leather-sneakers.jpg" },
  { id: 5,  name: "Glass Accessories", nameAr: "إكسسوارات النظارات", price: 299, gender: "unisex", category: "Accessories", image: "img/accessories.jpg" },
  { id: 6,  name: "Pants For Women", nameAr: "بنطلون نسائي", price: 599, gender: "women", category: "Pants",       image: "img/pants.jpg" },
  { id: 7,  name: "Pants For Men", nameAr: "بنطلون رجالي", price: 599, gender: "men", category: "Pants",       image: "img/pants2.jpg" },
  { id: 8,  name: "Dress", nameAr: "فستان", price: 999, oldPrice: 1299, gender: "women", category: "Dresses",     image: "img/dresses.jpg" },
  { id: 9,  name: "Bag", nameAr: "حقيبة", price: 499, gender: "women", category: "Accessories", image: "img/bags.jpg" },
  { id: 10, name: "Slim Jeans", nameAr: "جينز سليم", price: 799, gender: "men", category: "Jeans",       image: "img/jeans.jpg" }
];


/* =========================================
   2. Select Elements from the page
   ========================================= */
const productsGrid = document.querySelector(".products-grid");
const cartCount = document.querySelector(".count_item_header");
const cartLink = document.querySelector('.header_icons a[aria-label="Cart"]');

// Search and filter elements
const searchForm = document.querySelector(".search_box");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const productsSection = document.querySelector("#products");
const navLinks = document.querySelectorAll(".main_nav a");

// Remember the original name of each nav link (Home, Men, Women, Kids, Sale)
// The visible text will change with the language, but this name stays the same
navLinks.forEach(function (link) {
  link.dataset.nav = link.textContent.trim();
});

// Create the language button and add it to the header icons
const langToggle = document.createElement("button");
langToggle.type = "button";
langToggle.className = "lang-toggle";

// Create the subtotal / shipping lines and put them above the total row
const cartSummary = document.createElement("div");
cartSummary.className = "cart-summary";

const cartTotalRow = document.querySelector(".cart-total");

if (cartTotalRow) {
  cartTotalRow.before(cartSummary);
}

const headerIcons = document.querySelector(".header_icons");

if (headerIcons) {
  headerIcons.prepend(langToggle);
}

// Favourites elements (heart icon and counter in the header)
const favLink = document.querySelector('.header_icons a[aria-label="Favourites"]');
const favCount = document.querySelector(".count_favourite");

// Cart drawer elements
const cartDrawer = document.querySelector(".cart-drawer");
const overlay = document.querySelector(".overlay");
const cartItems = document.querySelector(".cart-items");
const totalPrice = document.querySelector(".total-price");
const checkoutBtn = document.querySelector(".checkout-btn");

// Customer details form (inside the cart drawer)
const checkoutForm = document.querySelector(".checkout-form");
const customerName = document.querySelector("#customer-name");
const customerPhone = document.querySelector("#customer-phone");
const customerGovernorate = document.querySelector("#customer-governorate");
const customerAddress = document.querySelector("#customer-address");
const customerNotes = document.querySelector("#customer-notes");
const checkoutError = document.querySelector(".checkout-error");

// Warn if something is missing from index.html (this helps to find the problem)
if (!cartLink || !cartCount) {
  console.warn("Header cart icon or counter not found. Check the header HTML.");
}

if (!cartDrawer || !overlay || !cartItems || !totalPrice) {
  console.warn("Cart drawer HTML not found. Add it to index.html BEFORE the script tag.");
}


/* =========================================
   Language: English / Arabic (with RTL)
   t("key") returns the text in the current language
   ========================================= */
const TRANSLATIONS = {
  en: {
    searchPlaceholder: "Search for products",
    navHome: "Home",
    navMen: "Men",
    navWomen: "Women",
    navKids: "Kids",
    navSale: "Sale",
    heroTitle: "Summer Sale up to 50% Off",
    heroText: "Discover the best products at the best prices",
    heroButton: "Shop Now",
    sectionTitle: "Featured Products",
    cartTitle: "Your Cart",
    total: "Total",
    checkout: "Checkout",
    sendOrder: "Send Order on WhatsApp",
    cartEmpty: "Your cart is empty",
    addToCart: "Add to Cart",
    noProducts: "No products found",
    noFavourites: "No favourites yet. Tap the heart on any product to save it.",
    addFavourite: "Add to favourites",
    removeFavourite: "Remove from favourites",
    decreaseQty: "Decrease quantity",
    increaseQty: "Increase quantity",
    remove: "Remove",
    fullName: "Full name",
    phone: "Phone number",
    selectGovernorate: "Select governorate",
    address: "Delivery address",
    notes: "Notes (size, colour...) - optional",
    errName: "Please enter your full name.",
    errPhone: "Please enter a valid phone number.",
    errGovernorate: "Please choose your governorate.",
    errAddress: "Please enter your full delivery address.",
    greeting: "Hi {store} team!\nI just placed an order on your website and I would love to confirm it.",
    myOrder: "My order:",
    orderTotal: "Total:",
    deliveryDetails: "Delivery details:",
    labelName: "Name:",
    labelPhone: "Phone:",
    labelGovernorate: "Governorate:",
    labelAddress: "Address:",
    labelNotes: "Notes:",
    thanks: "Thank you!",
    currency: "EGP",
    subtotal: "Subtotal",
    shipping: "Shipping",
    labelSubtotal: "Subtotal:",
    labelShipping: "Shipping:"
  },
  ar: {
    searchPlaceholder: "ابحث عن المنتجات",
    navHome: "الرئيسية",
    navMen: "رجالي",
    navWomen: "نسائي",
    navKids: "أطفال",
    navSale: "تخفيضات",
    heroTitle: "تخفيضات الصيف حتى 50%",
    heroText: "اكتشف أفضل المنتجات بأفضل الأسعار",
    heroButton: "تسوق الآن",
    sectionTitle: "منتجات مميزة",
    cartTitle: "سلة التسوق",
    total: "الإجمالي",
    checkout: "إتمام الطلب",
    sendOrder: "إرسال الطلب عبر واتساب",
    cartEmpty: "السلة فارغة",
    addToCart: "أضف إلى السلة",
    noProducts: "لا توجد منتجات",
    noFavourites: "لا توجد منتجات في المفضلة بعد. اضغط على القلب بجانب أي منتج لحفظه.",
    addFavourite: "أضف إلى المفضلة",
    removeFavourite: "احذف من المفضلة",
    decreaseQty: "إنقاص الكمية",
    increaseQty: "زيادة الكمية",
    remove: "حذف",
    fullName: "الاسم بالكامل",
    phone: "رقم التليفون",
    selectGovernorate: "اختر المحافظة",
    address: "عنوان التوصيل",
    notes: "ملاحظات (المقاس، اللون...) - اختياري",
    errName: "من فضلك اكتب اسمك بالكامل.",
    errPhone: "من فضلك اكتب رقم تليفون صحيح.",
    errGovernorate: "من فضلك اختر المحافظة.",
    errAddress: "من فضلك اكتب عنوان التوصيل بالكامل.",
    greeting: "مرحباً فريق {store}!\nقمت بعمل طلب من الموقع وأرغب في تأكيده.",
    myOrder: "طلبي:",
    orderTotal: "الإجمالي:",
    deliveryDetails: "بيانات التوصيل:",
    labelName: "الاسم:",
    labelPhone: "التليفون:",
    labelGovernorate: "المحافظة:",
    labelAddress: "العنوان:",
    labelNotes: "ملاحظات:",
    thanks: "شكراً لكم!",
    currency: "ج.م",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    labelSubtotal: "المجموع الفرعي:",
    labelShipping: "الشحن:"
  }
};

// Category names shown in the search dropdown (the option values stay in English)
const CATEGORY_NAMES = {
  en: {
    "All Categories": "All Categories", "Men": "Men", "Women": "Women", "Kids": "Kids",
    "T-Shirts": "T-Shirts", "Shirts": "Shirts", "Pants": "Pants", "Jeans": "Jeans",
    "Dresses": "Dresses", "Jackets": "Jackets", "Hoodies": "Hoodies", "Shoes": "Shoes",
    "Accessories": "Accessories"
  },
  ar: {
    "All Categories": "كل الأقسام", "Men": "رجالي", "Women": "نسائي", "Kids": "أطفال",
    "T-Shirts": "تيشيرتات", "Shirts": "قمصان", "Pants": "بناطيل", "Jeans": "جينز",
    "Dresses": "فساتين", "Jackets": "جاكيتات", "Hoodies": "هوديز", "Shoes": "أحذية",
    "Accessories": "إكسسوارات"
  }
};

const LANG_KEY = "fashionStoreLang";

// Load the saved language ("en" is the default)
function loadLang() {
  try {
    return localStorage.getItem(LANG_KEY) === "ar" ? "ar" : "en";
  } catch (error) {
    return "en";
  }
}

let currentLang = loadLang();

// Get a text in the current language
function t(key) {
  return TRANSLATIONS[currentLang][key];
}

// Get the product name in the current language
function getProductName(product) {
  return currentLang === "ar" ? product.nameAr : product.name;
}

// Get the governorate name in the current language (the saved value is the English name)
function getGovernorateLabel(enName) {
  const item = GOVERNORATES.find(function (governorate) {
    return governorate.en === enName;
  });

  if (!item) return enName;

  return currentLang === "ar" ? item.ar : item.en;
}

// Format a price in EGP, for example "EGP 1,299" or "1,299 ج.م"
function formatPrice(amount) {
  // Show decimals only when the price has them
  const number = amount.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2
  });

  return currentLang === "ar"
    ? `${number} ${t("currency")}`
    : `${t("currency")} ${number}`;
}

// Change the text of one element (if it exists)
function setText(selector, text) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = text;
  }
}

// Translate all the fixed texts of the page
function applyStaticTranslations() {
  if (searchInput) searchInput.placeholder = t("searchPlaceholder");

  // Nav links: the key is "nav" + the original name, for example navHome
  navLinks.forEach(function (link) {
    link.textContent = t("nav" + link.dataset.nav);
  });

  // Hero banner and section title
  setText(".hero h1", t("heroTitle"));
  setText(".hero p", t("heroText"));
  setText(".hero .btn", t("heroButton"));
  setText(".section-title", t("sectionTitle"));

  // Cart drawer
  setText(".cart-header h2", t("cartTitle"));
  setText(".cart-total span", t("total"));

  // Checkout form placeholders
  if (customerName) customerName.placeholder = t("fullName");
  if (customerPhone) customerPhone.placeholder = t("phone");
  if (customerAddress) customerAddress.placeholder = t("address");
  if (customerNotes) customerNotes.placeholder = t("notes");

  // Category dropdown (only the visible text changes, not the value)
  if (categorySelect) {
    Array.from(categorySelect.options).forEach(function (option) {
      option.textContent = CATEGORY_NAMES[currentLang][option.value] || option.value;
    });
  }
}

// Switch the language and refresh everything on the page
function setLanguage(lang) {
  currentLang = lang;

  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (error) {
    console.log("Could not save the language");
  }

  // Page language and direction (rtl = right to left)
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // The button shows the other language
  langToggle.textContent = lang === "ar" ? "English" : "العربية";

  applyStaticTranslations();
  fillGovernorates();
  updateCheckoutButtonText();

  if (checkoutError) checkoutError.textContent = "";

  // Draw the products and the cart again with the new language
  if (searchInput && categorySelect) {
    applyFilters();
  } else {
    displayProducts(products);
  }

  renderCart();
}


/* =========================================
   3. Cart Storage: save and load the cart (localStorage)
   The cart is an object: { productId: quantity }
   Example: { 1: 2, 5: 1 } means 2 of product 1 and 1 of product 5
   ========================================= */
const CART_KEY = "fashionStoreCart";

// Load the saved cart when the page opens
function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    const parsed = saved ? JSON.parse(saved) : {};

    // Remove products that no longer exist in the products array
    Object.keys(parsed).forEach(function (key) {
      const exists = products.some(function (product) {
        return product.id === Number(key);
      });

      if (!exists) {
        delete parsed[key];
      }
    });

    return parsed;
  } catch (error) {
    // If the data is broken or storage is blocked, start with an empty cart
    return {};
  }
}

// Save the cart every time it changes
function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.log("Could not save the cart");
  }
}

let cart = loadCart();


/* =========================================
   4. Cart Functions
   ========================================= */

// Get the quantity of one product (0 if it is not in the cart)
function getQty(id) {
  return cart[id] || 0;
}

// Update the number shown on the cart icon (total of all quantities)
function updateCartCount() {
  if (!cartCount) return;

  const total = Object.values(cart).reduce(function (sum, qty) {
    return sum + qty;
  }, 0);

  cartCount.textContent = total;
}

// Build the + / - control (used on the product cards and in the drawer)
function getQtyControlHTML(id) {
  return `
    <div class="qty-control">
      <button class="qty-btn" data-action="decrease" data-id="${id}" aria-label="${t("decreaseQty")}">−</button>
      <span class="qty-value">${getQty(id)}</span>
      <button class="qty-btn" data-action="increase" data-id="${id}" aria-label="${t("increaseQty")}">+</button>
    </div>
  `;
}

// Build the button area of a card: "Add to Cart" or the + / - control
function getActionHTML(id) {
  if (getQty(id) === 0) {
    return `<button class="btn add-to-cart" data-action="add" data-id="${id}">${t("addToCart")}</button>`;
  }

  return getQtyControlHTML(id);
}

// Refresh only the button area of one card (the rest of the page stays the same)
function refreshCardAction(id) {
  const container = document.querySelector(`.card-action[data-id="${id}"]`);

  if (container) {
    container.innerHTML = getActionHTML(id);
  }
}

// Refresh everything that depends on the cart after any change
function updateCartUI(id) {
  saveCart();
  updateCartCount();
  refreshCardAction(id);
  renderCart();
}

// Increase or decrease the quantity of a product (delta is +1 or -1)
function changeQty(id, delta) {
  const newQty = getQty(id) + delta;

  if (newQty <= 0) {
    // Remove the product from the cart when the quantity reaches 0
    delete cart[id];
  } else {
    cart[id] = newQty;
  }

  updateCartUI(id);
}

// Remove a product from the cart completely
function removeFromCart(id) {
  delete cart[id];
  updateCartUI(id);
}


/* =========================================
   5. Cart Drawer: show the cart items and the total
   ========================================= */

// Build the drawer content from the cart
function renderCart() {
  // Do nothing if the drawer HTML is missing
  if (!cartItems || !totalPrice) return;

  const ids = Object.keys(cart);

  // Empty cart message
  if (ids.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">${t("cartEmpty")}</p>`;
    totalPrice.textContent = formatPrice(0);
    cartSummary.innerHTML = "";

    // Nothing to order yet
    if (checkoutBtn) checkoutBtn.disabled = true;
    closeCheckoutForm();
    return;
  }

  let html = "";
  let total = 0;

  ids.forEach(function (key) {
    const id = Number(key);
    const qty = cart[id];

    // Find the full product data using the id
    const product = products.find(function (item) {
      return item.id === id;
    });

    // Price of this line = product price x quantity
    const linePrice = product.price * qty;
    total += linePrice;

    html += `
      <div class="cart-item">
        <img src="${product.image}" alt="${getProductName(product)}">
        <div class="cart-item-info">
          <h4>${getProductName(product)}</h4>
          <p class="cart-item-price">${formatPrice(linePrice)}</p>
          ${getQtyControlHTML(id)}
        </div>
        <button class="remove-item" data-action="remove" data-id="${id}" aria-label="${t("remove")} ${getProductName(product)}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });

  cartItems.innerHTML = html;

  // Subtotal (products) + shipping = total
  const grandTotal = total + SHIPPING_FEE;

  cartSummary.innerHTML = `
    <div><span>${t("subtotal")}</span><span>${formatPrice(total)}</span></div>
    <div><span>${t("shipping")}</span><span>${formatPrice(SHIPPING_FEE)}</span></div>
  `;

  totalPrice.textContent = formatPrice(grandTotal);

  if (checkoutBtn) checkoutBtn.disabled = false;
}

// Open the drawer
function openCart() {
  if (!cartDrawer || !overlay) return;

  cartDrawer.classList.add("open");
  overlay.classList.add("open");
  document.body.classList.add("no-scroll");
}

// Close the drawer
function closeCart() {
  if (!cartDrawer || !overlay) return;

  closeCheckoutForm();

  cartDrawer.classList.remove("open");
  overlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
}


// Build the order text that will be sent on WhatsApp (in the current language)
function buildOrderMessage(customer) {
  // Welcome line ({store} is replaced with the store name)
  let message = t("greeting").replace("{store}", STORE_NAME) + "\n\n";
  let total = 0;
  let number = 1;

  message += t("myOrder") + "\n";

  Object.keys(cart).forEach(function (key) {
    const id = Number(key);
    const qty = cart[id];

    // Find the full product data using the id
    const product = products.find(function (item) {
      return item.id === id;
    });

    const linePrice = product.price * qty;
    total += linePrice;

    // Example line: 1. Classic T-Shirt x2 - EGP 398
    message += `${number}. ${getProductName(product)} x${qty} - ${formatPrice(linePrice)}\n`;
    number++;
  });

  // Subtotal, shipping and the final total
  message += `\n${t("labelSubtotal")} ${formatPrice(total)}`;
  message += `\n${t("labelShipping")} ${formatPrice(SHIPPING_FEE)}`;
  message += `\n${t("orderTotal")} ${formatPrice(total + SHIPPING_FEE)}`;

  // Add the customer details when they are available
  if (customer) {
    message += `\n\n${t("deliveryDetails")}`;
    message += `\n${t("labelName")} ${customer.name}`;
    message += `\n${t("labelPhone")} ${customer.phone}`;
    message += `\n${t("labelGovernorate")} ${getGovernorateLabel(customer.governorate)}`;
    message += `\n${t("labelAddress")} ${customer.address}`;

    // Notes are optional
    if (customer.notes) {
      message += `\n${t("labelNotes")} ${customer.notes}`;
    }
  }

  // Closing line
  message += "\n\n" + t("thanks");

  return message;
}

// Open WhatsApp with the order message ready to send
function sendOrderToWhatsApp(customer) {
  // Stop if the store owner has not set the WhatsApp number yet
  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Set your WhatsApp number in script.js first (WHATSAPP_NUMBER).");
    return;
  }

  // encodeURIComponent makes the text safe to put inside a link
  const message = encodeURIComponent(buildOrderMessage(customer));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(url, "_blank");
}

// Save the customer details on this device so they do not type them again
const CUSTOMER_KEY = "fashionStoreCustomer";

function saveCustomer(customer) {
  try {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  } catch (error) {
    console.log("Could not save the customer details");
  }
}

function loadCustomer() {
  try {
    const saved = localStorage.getItem(CUSTOMER_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    return {};
  }
}

// Check the customer details, and return an error message (or "" if all is fine)
function validateCustomer(customer) {
  if (customer.name.length < 2) {
    return t("errName");
  }

  // Count only the digits of the phone number
  const digits = customer.phone.replace(/\D/g, "");

  if (digits.length < 10 || digits.length > 15) {
    return t("errPhone");
  }

  if (!customer.governorate) {
    return t("errGovernorate");
  }

  if (customer.address.length < 8) {
    return t("errAddress");
  }

  return "";
}

// Fill the governorate list from the GOVERNORATES array
function fillGovernorates() {
  if (!customerGovernorate) return;

  // Remember the selected governorate (the value is always the English name)
  const selected = customerGovernorate.value;

  let html = `<option value="">${t("selectGovernorate")}</option>`;

  GOVERNORATES.forEach(function (governorate) {
    const label = currentLang === "ar" ? governorate.ar : governorate.en;
    html += `<option value="${governorate.en}">${label}</option>`;
  });

  customerGovernorate.innerHTML = html;
  customerGovernorate.value = selected;
}

// Set the checkout button text: "Send Order" when the form is open, otherwise "Checkout"
function updateCheckoutButtonText() {
  if (!checkoutBtn) return;

  const formIsOpen = checkoutForm && checkoutForm.classList.contains("show");
  checkoutBtn.textContent = formIsOpen ? t("sendOrder") : t("checkout");
}

// Show the details form and change the button text
function openCheckoutForm() {
  const saved = loadCustomer();

  // Fill the fields with the details saved from the last order
  customerName.value = saved.name || "";
  customerPhone.value = saved.phone || "";
  customerGovernorate.value = saved.governorate || "";
  customerAddress.value = saved.address || "";
  customerNotes.value = saved.notes || "";

  checkoutForm.classList.add("show");
  checkoutBtn.textContent = t("sendOrder");
  customerName.focus();
}

// Hide the details form and reset the button text
function closeCheckoutForm() {
  if (!checkoutForm || !checkoutBtn) return;

  checkoutForm.classList.remove("show");
  checkoutBtn.textContent = t("checkout");

  if (checkoutError) checkoutError.textContent = "";
}

// Checkout button: first click opens the form, second click sends the order
function handleCheckoutClick() {
  // If the form is missing from the HTML, send the order without details
  if (!checkoutForm || !customerName || !customerPhone || !customerGovernorate || !customerAddress || !customerNotes) {
    sendOrderToWhatsApp(null);
    return;
  }

  // First click: show the form
  if (!checkoutForm.classList.contains("show")) {
    openCheckoutForm();
    return;
  }

  // Second click: read, check and send the details
  const customer = {
    name: customerName.value.trim(),
    phone: customerPhone.value.trim(),
    governorate: customerGovernorate.value,
    address: customerAddress.value.trim(),
    notes: customerNotes.value.trim()
  };

  const error = validateCustomer(customer);

  if (error) {
    checkoutError.textContent = error;
    return;
  }

  checkoutError.textContent = "";
  saveCustomer(customer);
  sendOrderToWhatsApp(customer);
}


/* =========================================
   6. Favourites: save, toggle and count
   The favourites are an array of product ids, for example [1, 4, 8]
   ========================================= */
const FAV_KEY = "fashionStoreFavourites";

// Load the saved favourites when the page opens
function loadFavourites() {
  try {
    const saved = localStorage.getItem(FAV_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    // Keep only the ids of products that still exist
    return parsed.filter(function (id) {
      return products.some(function (product) {
        return product.id === id;
      });
    });
  } catch (error) {
    return [];
  }
}

// Save the favourites every time they change
function saveFavourites() {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
  } catch (error) {
    console.log("Could not save the favourites");
  }
}

let favourites = loadFavourites();

// Check if a product is in the favourites
function isFavourite(id) {
  return favourites.includes(id);
}

// Update the number shown on the heart icon in the header
function updateFavouriteCount() {
  if (!favCount) return;

  favCount.textContent = favourites.length;
}

// Build the heart button of a card (filled heart when it is a favourite)
function getFavouriteButtonHTML(id) {
  const active = isFavourite(id);

  return `
    <button class="fav-btn ${active ? "active" : ""}" data-action="favourite" data-id="${id}"
      aria-label="${active ? t("removeFavourite") : t("addFavourite")}">
      <i class="${active ? "fa-solid" : "fa-regular"} fa-heart"></i>
    </button>
  `;
}

// Add or remove a product from the favourites
function toggleFavourite(id) {
  if (isFavourite(id)) {
    favourites = favourites.filter(function (favId) {
      return favId !== id;
    });
  } else {
    favourites.push(id);
  }

  saveFavourites();
  updateFavouriteCount();

  if (showFavouritesOnly) {
    // In the favourites view, removing a heart also removes the card
    applyFilters();
  } else {
    // Otherwise only refresh the heart button of this card
    const button = document.querySelector(`.fav-btn[data-id="${id}"]`);

    if (button) {
      button.outerHTML = getFavouriteButtonHTML(id);
    }
  }
}


/* =========================================
   7. Display Function: render products on the page
   ========================================= */
// Build the price area: normal price, or old price + new price + discount badge
function getPriceHTML(product) {
  if (!product.oldPrice) {
    return `<p class="price">${formatPrice(product.price)}</p>`;
  }

  // Discount percentage, for example 33
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  return `
    <p class="price">
      <span class="old-price">${formatPrice(product.oldPrice)}</span>
      ${formatPrice(product.price)}
    </p>
    <span class="sale-badge">-${discount}%</span>
  `;
}

function displayProducts(list, emptyMessage = t("noProducts")) {
  // Show a message when there are no products to display
  if (list.length === 0) {
    productsGrid.innerHTML = `<p class="no-results">${emptyMessage}</p>`;
    return;
  }

  let html = "";

  // Loop over every product in the list and build its card
  list.forEach(function (product) {
    html += `
      <article class="product-card">
        ${getFavouriteButtonHTML(product.id)}
        <img src="${product.image}" alt="${getProductName(product)}">
        <h3>${getProductName(product)}</h3>
        ${getPriceHTML(product)}
        <div class="card-action" data-id="${product.id}">
          ${getActionHTML(product.id)}
        </div>
      </article>
    `;
  });

  // Put all the cards on the page at once
  productsGrid.innerHTML = html;
}


/* =========================================
   8. Search and Filter
   ========================================= */
// True when the Sale link is active (show only products on sale)
let showSaleOnly = false;

// True when the heart icon in the header is active (show only favourites)
let showFavouritesOnly = false;

// Check if a product belongs to the selected category or gender
function matchesSelection(product, selected) {
  if (selected === "All Categories") {
    return true;
  }

  // Men and Women also show the unisex products
  if (selected === "Men" || selected === "Women") {
    return product.gender === selected.toLowerCase() || product.gender === "unisex";
  }

  // Kids shows only the kids products
  if (selected === "Kids") {
    return product.gender === "kids";
  }

  // Anything else is a normal category like Jeans or Shoes
  return product.category === selected;
}

// Highlight the nav link that matches the current selection
function updateActiveNav(name) {
  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.nav === name);
  });
}

function applyFilters() {
  // Read the current search text and the selected category
  const text = searchInput.value.trim().toLowerCase();
  const selected = categorySelect.value;

  // Keep only the products that match the text, the selection and the sale filter
  const result = products.filter(function (product) {
    // Search in both the English and the Arabic name
    const matchesText =
      product.name.toLowerCase().includes(text) || product.nameAr.includes(text);
    const matchesSale = !showSaleOnly || Boolean(product.oldPrice);
    const matchesFavourite = !showFavouritesOnly || isFavourite(product.id);

    return (
      matchesText &&
      matchesSelection(product, selected) &&
      matchesSale &&
      matchesFavourite
    );
  });

  // Choose the message to show when nothing matches
  const emptyMessage = showFavouritesOnly ? t("noFavourites") : t("noProducts");

  displayProducts(result, emptyMessage);
}


/* =========================================
   9. Events
   ========================================= */

// Search and filter events
if (searchForm && searchInput && categorySelect) {
  // Turn off the browser's "please fill out this field" message
  searchForm.noValidate = true;

  // Filter while the user is typing
  searchInput.addEventListener("input", applyFilters);

  // Filter when the category changes
  categorySelect.addEventListener("change", function () {
    // Choosing a category leaves the Sale and Favourites views
    showSaleOnly = false;
    showFavouritesOnly = false;

    // Highlight Home, Men, Women or Kids in the nav when it matches
    updateActiveNav(categorySelect.value === "All Categories" ? "Home" : categorySelect.value);

    applyFilters();
  });

  // Stop the page from reloading when the form is submitted
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    applyFilters();

    // Scroll down to the products section
    productsSection.scrollIntoView({ behavior: "smooth" });
  });
}

// Nav links: Home, Men, Women, Kids and Sale
if (searchInput && categorySelect) {
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Stop the link from jumping to the top of the page
      e.preventDefault();

      const name = link.dataset.nav;

      // Reset the search and set the filters for this link
      searchInput.value = "";
      showSaleOnly = name === "Sale";
      showFavouritesOnly = false;
      categorySelect.value = name === "Home" || name === "Sale" ? "All Categories" : name;

      updateActiveNav(name);
      applyFilters();

      // Home goes back to the top, the others scroll to the products
      if (name === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Show only the favourites when the heart icon in the header is clicked
if (favLink && searchInput && categorySelect) {
  favLink.addEventListener("click", function (e) {
    // Stop the link from jumping to the top of the page
    e.preventDefault();

    // Reset the other filters and switch to the favourites view
    searchInput.value = "";
    categorySelect.value = "All Categories";
    showSaleOnly = false;
    showFavouritesOnly = true;

    // No nav link is active in this view
    updateActiveNav("");
    applyFilters();

    productsSection.scrollIntoView({ behavior: "smooth" });
  });
}

// Switch between English and Arabic
langToggle.addEventListener("click", function () {
  setLanguage(currentLang === "en" ? "ar" : "en");
});

// Send the order on WhatsApp when the checkout button is clicked
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", handleCheckoutClick);
}

// Open the drawer when the cart icon is clicked
if (cartLink) {
  cartLink.addEventListener("click", function (e) {
    // Stop the link from jumping to the top of the page
    e.preventDefault();
    openCart();
  });
}

// Close the drawer when the Escape key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeCart();
  }
});

// Listen for clicks anywhere on the page (Event Delegation)
document.addEventListener("click", function (e) {
  // Find the closest element that has a data-action attribute
  const button = e.target.closest("[data-action]");

  // Ignore clicks on anything else
  if (!button) return;

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (action === "favourite") {
    toggleFavourite(id);
  } else if (action === "add" || action === "increase") {
    changeQty(id, 1);
  } else if (action === "decrease") {
    changeQty(id, -1);
  } else if (action === "remove") {
    removeFromCart(id);
  } else if (action === "close-cart") {
    closeCart();
  }
});


/* =========================================
   10. Run: set the language, display the products and the cart
   ========================================= */
updateActiveNav("Home");
setLanguage(currentLang);
updateCartCount();
updateFavouriteCount();