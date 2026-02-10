$(function () {
  var STORAGE_KEYS = {
    cart: "wm_demo_cart",
    wishlist: "wm_demo_wishlist",
    compare: "wm_demo_compare",
    coupon: "wm_demo_coupon"
  };

  var products = [
    { id: 1, name: '14" Everyday Laptop, 8GB RAM', category: "Electronics", brand: "HP", price: 329, oldPrice: 399, rating: 4.4, image: "https://picsum.photos/seed/laptop/600/420" },
    { id: 2, name: "Noise-Reducing Wireless Headphones", category: "Electronics", brand: "onn.", price: 49, oldPrice: 69, rating: 4.6, image: "https://picsum.photos/seed/headphones/600/420" },
    { id: 3, name: "Ergonomic Office Chair", category: "Home", brand: "Mainstays", price: 119, oldPrice: 149, rating: 4.2, image: "https://picsum.photos/seed/chair/600/420" },
    { id: 4, name: "Stainless Steel Electric Kettle", category: "Home", brand: "Mainstays", price: 24, oldPrice: 30, rating: 4.5, image: "https://picsum.photos/seed/kettle/600/420" },
    { id: 5, name: "Creative Building Blocks Set", category: "Kids", brand: "SparkLab", price: 19, oldPrice: 24, rating: 4.7, image: "https://picsum.photos/seed/toy/600/420" },
    { id: 6, name: "Smart Fitness Watch", category: "Fitness", brand: "Equate", price: 79, oldPrice: 99, rating: 4.3, image: "https://picsum.photos/seed/watch/600/420" },
    { id: 7, name: "4K UHD 55-inch Smart TV", category: "Electronics", brand: "onn.", price: 299, oldPrice: 379, rating: 4.5, image: "https://picsum.photos/seed/tv/600/420" },
    { id: 8, name: "Robot Vacuum Cleaner", category: "Home", brand: "Mainstays", price: 169, oldPrice: 219, rating: 4.1, image: "https://picsum.photos/seed/vacuum/600/420" },
    { id: 9, name: "Premium Protein Powder", category: "Fitness", brand: "Equate", price: 34, oldPrice: 42, rating: 4.2, image: "https://picsum.photos/seed/protein/600/420" },
    { id: 10, name: "Kids Kick Scooter", category: "Kids", brand: "SparkLab", price: 58, oldPrice: 72, rating: 4.4, image: "https://picsum.photos/seed/scooter/600/420" },
    { id: 11, name: "Air Fryer 5L", category: "Home", brand: "Better Chef", price: 64, oldPrice: 89, rating: 4.6, image: "https://picsum.photos/seed/airfryer/600/420" },
    { id: 12, name: "Gaming Mechanical Keyboard", category: "Electronics", brand: "HyperType", price: 59, oldPrice: 79, rating: 4.4, image: "https://picsum.photos/seed/keyboard/600/420" },
    { id: 13, name: "Cordless Hand Blender", category: "Home", brand: "Better Chef", price: 22, oldPrice: 29, rating: 4.1, image: "https://picsum.photos/seed/blender/600/420" },
    { id: 14, name: "Resistance Band Set", category: "Fitness", brand: "Equate", price: 18, oldPrice: 25, rating: 4.0, image: "https://picsum.photos/seed/bands/600/420" },
    { id: 15, name: "STEM Learning Kit", category: "Kids", brand: "SparkLab", price: 29, oldPrice: 39, rating: 4.8, image: "https://picsum.photos/seed/stem/600/420" },
    { id: 16, name: "Bluetooth Portable Speaker", category: "Electronics", brand: "onn.", price: 39, oldPrice: 49, rating: 4.3, image: "https://picsum.photos/seed/speaker/600/420" }
  ];

  var state = {
    search: "",
    category: "all",
    brand: "all",
    sort: "featured",
    maxPrice: 500,
    page: 1,
    perPage: 8,
    coupon: ""
  };

  var cart = readJSON(STORAGE_KEYS.cart, {});
  var wishlist = readJSON(STORAGE_KEYS.wishlist, []);
  var compare = readJSON(STORAGE_KEYS.compare, []);
  state.coupon = localStorage.getItem(STORAGE_KEYS.coupon) || "";

  var $header = $(".store-header");
  var $searchWrap = $(".search-wrap");
  var $searchInput = $("#searchInput");
  var $searchSuggestions = $("#searchSuggestions");
  var $suggestionItems = $(".suggestion-item");
  var $nav = $(".header-nav .nav");
  var $filterButtons = $(".filter-btn");
  var $recoItems = $(".reco-item");
  var $newsletterForm = $("#newsletterForm");
  var $newsletterEmail = $("#newsletterEmail");
  var $newsletterMessage = $("#newsletterMessage");
  var $cartCount = $("#cartCount");
  var $cartCountInline = $("#cartCountInline");
  var $wishlistCount = $("#wishlistCount");
  var $wishlistCountInline = $("#wishlistCountInline");
  var $compareCount = $("#compareCount");
  var $backToTop = $("#backToTop");
  var $revealItems = $(".reveal");

  var $catalogGrid = $("#catalogGrid");
  var $catalogPagination = $("#catalogPagination");
  var $catalogCount = $("#catalogCount");
  var $catalogSearch = $("#catalogSearch");
  var $catalogCategory = $("#catalogCategory");
  var $catalogBrand = $("#catalogBrand");
  var $catalogSort = $("#catalogSort");
  var $priceRange = $("#priceRange");
  var $priceRangeValue = $("#priceRangeValue");

  var quickViewModalEl = document.getElementById("quickViewModal");
  var quickViewModal = quickViewModalEl ? new bootstrap.Modal(quickViewModalEl) : null;
  var checkoutModalEl = document.getElementById("checkoutModal");
  var checkoutModal = checkoutModalEl ? new bootstrap.Modal(checkoutModalEl) : null;
  var appToastEl = document.getElementById("appToast");
  var appToast = appToastEl ? new bootstrap.Toast(appToastEl, { delay: 2200 }) : null;

  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
    localStorage.setItem(STORAGE_KEYS.compare, JSON.stringify(compare));
    localStorage.setItem(STORAGE_KEYS.coupon, state.coupon || "");
  }

  function money(value) {
    return "$" + Number(value).toFixed(2);
  }

  function toast(message) {
    $("#toastText").text(message);
    if (appToast) appToast.show();
  }

  function syncHeaderState() {
    var isScrolled = $(window).scrollTop() > 6;
    $header.toggleClass("scrolled", isScrolled);
    $backToTop.toggleClass("visible", isScrolled);
  }

  function revealOnScroll() {
    var viewportBottom = $(window).scrollTop() + $(window).height() - 30;
    $revealItems.each(function () {
      if ($(this).offset().top < viewportBottom) {
        $(this).addClass("visible");
      }
    });
  }

  function populateFilterOptions() {
    var categories = ["all"].concat(Array.from(new Set(products.map(function (p) { return p.category; }))));
    var brands = ["all"].concat(Array.from(new Set(products.map(function (p) { return p.brand; }))));

    $catalogCategory.html(categories.map(function (c) {
      var label = c === "all" ? "All categories" : c;
      return '<option value="' + c + '">' + label + '</option>';
    }).join(""));

    $catalogBrand.html(brands.map(function (b) {
      var label = b === "all" ? "All brands" : b;
      return '<option value="' + b + '">' + label + '</option>';
    }).join(""));
  }

  function getFilteredProducts() {
    var list = products.filter(function (p) {
      var matchesSearch = p.name.toLowerCase().indexOf(state.search) !== -1;
      var matchesCategory = state.category === "all" || p.category === state.category;
      var matchesBrand = state.brand === "all" || p.brand === state.brand;
      var matchesPrice = p.price <= state.maxPrice;
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    if (state.sort === "price_low") list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === "price_high") list.sort(function (a, b) { return b.price - a.price; });
    if (state.sort === "rating_high") list.sort(function (a, b) { return b.rating - a.rating; });
    if (state.sort === "name_asc") list.sort(function (a, b) { return a.name.localeCompare(b.name); });

    return list;
  }

  function getProductById(id) {
    return products.find(function (p) { return p.id === id; });
  }

  function getCartCount() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + Number(cart[id]); }, 0);
  }

  function getCartSummary() {
    var subtotal = 0;
    Object.keys(cart).forEach(function (id) {
      var product = getProductById(Number(id));
      if (product) subtotal += product.price * Number(cart[id]);
    });

    var discount = state.coupon === "SAVE10" ? subtotal * 0.1 : 0;
    var total = Math.max(0, subtotal - discount);
    return { subtotal: subtotal, discount: discount, total: total };
  }

  function renderCatalog() {
    var list = getFilteredProducts();
    var totalPages = Math.max(1, Math.ceil(list.length / state.perPage));
    if (state.page > totalPages) state.page = totalPages;

    var start = (state.page - 1) * state.perPage;
    var pageItems = list.slice(start, start + state.perPage);

    $catalogCount.text(list.length);
    $catalogGrid.html(pageItems.map(function (p) {
      var wished = wishlist.indexOf(p.id) !== -1;
      var compared = compare.indexOf(p.id) !== -1;
      return [
        '<div class="col-6 col-md-4 col-lg-3">',
        '  <article class="product-card h-100">',
        '    <div class="d-flex justify-content-between align-items-start mb-1">',
        '      <div class="product-badge">' + p.brand + '</div>',
        '      <button class="icon-btn toggle-wishlist ' + (wished ? "active" : "") + '" data-product-id="' + p.id + '" aria-label="Toggle wishlist"><i class="bi bi-heart-fill"></i></button>',
        '    </div>',
        '    <img src="' + p.image + '" class="img-fluid rounded-3 mb-2" alt="' + p.name + '">',
        '    <p class="small text-muted mb-1">' + p.category + '</p>',
        '    <h3 class="h6 product-title">' + p.name + '</h3>',
        '    <div class="rating small mb-2"><i class="bi bi-star-fill"></i> ' + p.rating.toFixed(1) + '</div>',
        '    <p class="mb-1"><span class="price">' + money(p.price) + '</span> <span class="old-price">' + money(p.oldPrice) + '</span></p>',
        '    <div class="d-flex gap-2 mt-2 flex-wrap">',
        '      <button class="btn btn-sm btn-outline-primary rounded-pill add-cart" data-product-id="' + p.id + '">Add to cart</button>',
        '      <button class="btn btn-sm btn-light rounded-pill quick-view" data-product-id="' + p.id + '" data-name="' + p.name.replace(/"/g, "&quot;") + '" data-price="' + money(p.price) + '" data-image="' + p.image + '">Quick view</button>',
        '      <button class="btn btn-sm btn-outline-secondary rounded-pill toggle-compare ' + (compared ? "active" : "") + '" data-product-id="' + p.id + '">Compare</button>',
        '    </div>',
        '  </article>',
        '</div>'
      ].join("");
    }).join(""));

    var pages = "";
    for (var i = 1; i <= totalPages; i += 1) {
      pages += '<li class="page-item ' + (i === state.page ? "active" : "") + '"><button class="page-link catalog-page" data-page="' + i + '">' + i + '</button></li>';
    }
    $catalogPagination.html(pages);
  }

  function renderWishlist() {
    var items = wishlist.map(getProductById).filter(Boolean);
    var html = items.length ? items.map(function (p) {
      return [
        '<div class="line-item mb-2 p-2 rounded-3">',
        '  <div class="d-flex justify-content-between gap-2">',
        '    <div>',
        '      <div class="fw-semibold small">' + p.name + '</div>',
        '      <div class="small text-muted">' + money(p.price) + '</div>',
        '    </div>',
        '    <div class="d-flex gap-1">',
        '      <button class="btn btn-sm btn-outline-primary move-to-cart" data-product-id="' + p.id + '">Move</button>',
        '      <button class="btn btn-sm btn-outline-secondary remove-wishlist" data-product-id="' + p.id + '">Remove</button>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join("");
    }).join("") : '<p class="text-muted small">Your wishlist is empty.</p>';

    $("#wishlistItems").html(html);
  }

  function renderCart() {
    var ids = Object.keys(cart);
    var html = ids.length ? ids.map(function (id) {
      var p = getProductById(Number(id));
      if (!p) return "";
      var qty = Number(cart[id]);
      return [
        '<div class="line-item mb-2 p-2 rounded-3">',
        '  <div class="d-flex justify-content-between align-items-start gap-2">',
        '    <div>',
        '      <div class="fw-semibold small">' + p.name + '</div>',
        '      <div class="small text-muted">' + money(p.price) + ' each</div>',
        '    </div>',
        '    <button class="btn btn-sm btn-outline-secondary remove-cart" data-product-id="' + p.id + '"><i class="bi bi-trash"></i></button>',
        '  </div>',
        '  <div class="d-flex justify-content-between align-items-center mt-2">',
        '    <div class="qty-controls d-flex align-items-center gap-1">',
        '      <button class="btn btn-sm btn-light dec-cart" data-product-id="' + p.id + '">-</button>',
        '      <span class="small px-1">' + qty + '</span>',
        '      <button class="btn btn-sm btn-light inc-cart" data-product-id="' + p.id + '">+</button>',
        '    </div>',
        '    <b class="small">' + money(p.price * qty) + '</b>',
        '  </div>',
        '</div>'
      ].join("");
    }).join("") : '<p class="text-muted small">Your cart is empty.</p>';

    $("#cartItems").html(html);

    var summary = getCartSummary();
    $("#cartSubtotal").text(money(summary.subtotal));
    $("#cartDiscount").text("-" + money(summary.discount));
    $("#cartTotal").text(money(summary.total));
  }

  function renderCompare() {
    var items = compare.map(getProductById).filter(Boolean);
    if (!items.length) {
      $("#compareContent").html('<p class="text-muted small mb-0">No products selected for comparison.</p>');
      return;
    }

    var table = [
      '<div class="table-responsive">',
      '<table class="table align-middle mb-0">',
      '<thead><tr><th>Product</th><th>Category</th><th>Brand</th><th>Price</th><th>Rating</th><th></th></tr></thead>',
      '<tbody>'
    ];

    items.forEach(function (p) {
      table.push('<tr>');
      table.push('<td class="small fw-semibold">' + p.name + '</td>');
      table.push('<td class="small">' + p.category + '</td>');
      table.push('<td class="small">' + p.brand + '</td>');
      table.push('<td class="small">' + money(p.price) + '</td>');
      table.push('<td class="small">' + p.rating.toFixed(1) + '</td>');
      table.push('<td><button class="btn btn-sm btn-outline-secondary remove-compare" data-product-id="' + p.id + '">Remove</button></td>');
      table.push('</tr>');
    });

    table.push('</tbody></table></div>');
    $("#compareContent").html(table.join(""));
  }

  function syncCounts() {
    var cartCount = getCartCount();
    $cartCount.text(cartCount);
    $cartCountInline.text(cartCount);
    $wishlistCount.text(wishlist.length);
    $wishlistCountInline.text(wishlist.length);
    $compareCount.text(compare.length);
  }

  function refreshAll() {
    renderCatalog();
    renderWishlist();
    renderCart();
    renderCompare();
    syncCounts();
    saveState();
  }

  populateFilterOptions();
  refreshAll();
  $("#couponInput").val(state.coupon);
  $priceRangeValue.text(money($priceRange.val()));

  syncHeaderState();
  revealOnScroll();
  $(window).on("scroll", function () {
    syncHeaderState();
    revealOnScroll();
  });

  $searchInput.on("focus blur input", function (event) {
    var query = $searchInput.val().trim().toLowerCase();
    var hasFocus = event.type !== "blur";
    $searchWrap.toggleClass("is-focused", hasFocus);

    if (!hasFocus) {
      setTimeout(function () { $searchSuggestions.addClass("d-none"); }, 120);
      return;
    }

    var visibleCount = 0;
    $suggestionItems.each(function () {
      var text = $(this).data("query");
      var show = !query || text.indexOf(query) !== -1;
      $(this).toggleClass("d-none", !show);
      if (show) visibleCount += 1;
    });
    $searchSuggestions.toggleClass("d-none", visibleCount === 0);
  });

  $suggestionItems.on("click", function () {
    $searchInput.val($(this).data("query")).trigger("input").focus();
    $searchSuggestions.addClass("d-none");
  });

  $searchWrap.on("submit", function (event) {
    event.preventDefault();
    $searchSuggestions.addClass("d-none");
    $catalogSearch.val($searchInput.val().trim()).trigger("input");
    $("html, body").animate({ scrollTop: $(".catalog-section").offset().top - 70 }, 250);
  });

  $nav.on("wheel", function (event) {
    event.preventDefault();
    this.scrollLeft += event.originalEvent.deltaY;
  });

  $filterButtons.on("click", function () {
    var filter = $(this).data("filter");
    $filterButtons.removeClass("active").attr("aria-pressed", "false");
    $(this).addClass("active").attr("aria-pressed", "true");

    if (filter === "all") {
      $recoItems.removeClass("hidden");
      return;
    }

    $recoItems.each(function () {
      var matches = $(this).data("cat") === filter;
      $(this).toggleClass("hidden", !matches);
    });
  });

  $catalogSearch.on("input", function () {
    state.search = $(this).val().trim().toLowerCase();
    state.page = 1;
    renderCatalog();
  });

  $catalogCategory.on("change", function () {
    state.category = $(this).val();
    state.page = 1;
    renderCatalog();
  });

  $catalogBrand.on("change", function () {
    state.brand = $(this).val();
    state.page = 1;
    renderCatalog();
  });

  $catalogSort.on("change", function () {
    state.sort = $(this).val();
    state.page = 1;
    renderCatalog();
  });

  $priceRange.on("input change", function () {
    state.maxPrice = Number($(this).val());
    $priceRangeValue.text(money(state.maxPrice));
    state.page = 1;
    renderCatalog();
  });

  $("#clearCatalogFilters").on("click", function () {
    state.search = "";
    state.category = "all";
    state.brand = "all";
    state.sort = "featured";
    state.maxPrice = 500;
    state.page = 1;

    $catalogSearch.val("");
    $catalogCategory.val("all");
    $catalogBrand.val("all");
    $catalogSort.val("featured");
    $priceRange.val(500);
    $priceRangeValue.text(money(500));

    renderCatalog();
  });

  $(document).on("click", ".catalog-page", function () {
    state.page = Number($(this).data("page"));
    renderCatalog();
  });

  $(document).on("click", ".add-cart", function () {
    var id = Number($(this).data("product-id"));
    if (!id) {
      toast("Added to cart");
      return;
    }
    cart[id] = (cart[id] || 0) + 1;
    refreshAll();
    toast("Added to cart");
  });

  $(document).on("click", ".toggle-wishlist", function () {
    var id = Number($(this).data("product-id"));
    if (!id) return;
    var idx = wishlist.indexOf(id);
    if (idx === -1) {
      wishlist.push(id);
      toast("Added to wishlist");
    } else {
      wishlist.splice(idx, 1);
      toast("Removed from wishlist");
    }
    refreshAll();
  });

  $(document).on("click", ".toggle-compare", function () {
    var id = Number($(this).data("product-id"));
    if (!id) return;
    var idx = compare.indexOf(id);

    if (idx !== -1) {
      compare.splice(idx, 1);
      toast("Removed from compare");
    } else {
      if (compare.length >= 3) {
        toast("You can compare up to 3 products");
        return;
      }
      compare.push(id);
      toast("Added to compare");
    }
    refreshAll();
  });

  $(document).on("click", ".remove-compare", function () {
    var id = Number($(this).data("product-id"));
    compare = compare.filter(function (pid) { return pid !== id; });
    refreshAll();
  });

  $(document).on("click", ".quick-view", function () {
    var id = Number($(this).data("product-id"));
    var p = id ? getProductById(id) : null;
    var name = p ? p.name : $(this).data("name");
    var price = p ? money(p.price) : $(this).data("price");
    var image = p ? p.image : $(this).data("image");

    $("#quickViewName").text(name);
    $("#quickViewPrice").text(price);
    $("#quickViewImage").attr("src", image).attr("alt", name);
    if (quickViewModal) quickViewModal.show();
  });

  $(document).on("click", ".inc-cart", function () {
    var id = Number($(this).data("product-id"));
    cart[id] = (cart[id] || 0) + 1;
    refreshAll();
  });

  $(document).on("click", ".dec-cart", function () {
    var id = Number($(this).data("product-id"));
    if (!cart[id]) return;
    cart[id] -= 1;
    if (cart[id] <= 0) delete cart[id];
    refreshAll();
  });

  $(document).on("click", ".remove-cart", function () {
    var id = Number($(this).data("product-id"));
    delete cart[id];
    refreshAll();
  });

  $(document).on("click", ".move-to-cart", function () {
    var id = Number($(this).data("product-id"));
    cart[id] = (cart[id] || 0) + 1;
    wishlist = wishlist.filter(function (pid) { return pid !== id; });
    refreshAll();
    toast("Moved to cart");
  });

  $(document).on("click", ".remove-wishlist", function () {
    var id = Number($(this).data("product-id"));
    wishlist = wishlist.filter(function (pid) { return pid !== id; });
    refreshAll();
  });

  $("#clearWishlist").on("click", function () {
    wishlist = [];
    refreshAll();
  });

  $("#applyCoupon").on("click", function () {
    var code = $("#couponInput").val().trim().toUpperCase();
    if (code && code !== "SAVE10") {
      toast("Invalid coupon code");
      return;
    }
    state.coupon = code;
    refreshAll();
    toast(code ? "Coupon applied" : "Coupon removed");
  });

  $("#openCheckout").on("click", function (event) {
    if (getCartCount() === 0) {
      event.preventDefault();
      toast("Your cart is empty");
    }
  });

  $("#checkoutForm").on("submit", function (event) {
    event.preventDefault();
    if (getCartCount() === 0) {
      $("#checkoutMessage").text("Your cart is empty.").addClass("text-danger");
      return;
    }

    var valid = this.checkValidity();
    if (!valid) {
      $("#checkoutMessage").text("Please complete all required fields.").addClass("text-danger");
      return;
    }

    cart = {};
    state.coupon = "";
    $("#couponInput").val("");
    refreshAll();
    $("#checkoutMessage").text("Order placed successfully. Thank you for shopping.").removeClass("text-danger").addClass("text-success");
    toast("Order placed");

    if (checkoutModal) {
      setTimeout(function () {
        checkoutModal.hide();
        $("#checkoutForm")[0].reset();
        $("#checkoutMessage").text("").removeClass("text-success text-danger");
      }, 1200);
    }
  });

  (function startCountdown() {
    var endTime = Date.now() + 12 * 60 * 60 * 1000;
    var $hours = $('[data-time="h"]');
    var $mins = $('[data-time="m"]');
    var $secs = $('[data-time="s"]');

    function render() {
      var distance = Math.max(0, endTime - Date.now());
      var totalSeconds = Math.floor(distance / 1000);
      var hours = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor((totalSeconds % 3600) / 60);
      var seconds = totalSeconds % 60;
      $hours.text(String(hours).padStart(2, "0"));
      $mins.text(String(minutes).padStart(2, "0"));
      $secs.text(String(seconds).padStart(2, "0"));
    }

    render();
    setInterval(render, 1000);
  })();

  $newsletterForm.on("submit", function (event) {
    event.preventDefault();
    var email = $newsletterEmail.val().trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    $newsletterMessage.removeClass("success error");
    if (!valid) {
      $newsletterMessage.addClass("error").text("Enter a valid email address to subscribe.");
      return;
    }

    $newsletterMessage.addClass("success").text("Thanks. You are subscribed to weekly deals.");
    $newsletterForm[0].reset();
  });

  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 350);
  });
});
