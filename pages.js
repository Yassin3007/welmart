$(function () {
  var keys = {
    cart: "wm_demo_cart",
    wishlist: "wm_demo_wishlist",
    coupon: "wm_demo_coupon",
    orders: "wm_demo_orders"
  };

  var products = {
    1: { name: '14" Everyday Laptop, 8GB RAM', price: 329 },
    2: { name: "Noise-Reducing Wireless Headphones", price: 49 },
    3: { name: "Ergonomic Office Chair", price: 119 },
    4: { name: "Stainless Steel Electric Kettle", price: 24 },
    5: { name: "Creative Building Blocks Set", price: 19 },
    6: { name: "Smart Fitness Watch", price: 79 },
    7: { name: "4K UHD 55-inch Smart TV", price: 299 },
    8: { name: "Robot Vacuum Cleaner", price: 169 },
    9: { name: "Premium Protein Powder", price: 34 },
    10: { name: "Kids Kick Scooter", price: 58 },
    11: { name: "Air Fryer 5L", price: 64 },
    12: { name: "Gaming Mechanical Keyboard", price: 59 },
    13: { name: "Cordless Hand Blender", price: 22 },
    14: { name: "Resistance Band Set", price: 18 },
    15: { name: "STEM Learning Kit", price: 29 },
    16: { name: "Bluetooth Portable Speaker", price: 39 }
  };

  function read(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function money(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function summary(cart, coupon) {
    var subtotal = 0;
    Object.keys(cart).forEach(function (id) {
      if (products[id]) subtotal += products[id].price * Number(cart[id]);
    });
    var discount = coupon === "SAVE10" ? subtotal * 0.1 : 0;
    return { subtotal: subtotal, discount: discount, total: subtotal - discount };
  }

  function renderWishlistPage() {
    var $root = $("#wishlistPageItems");
    if (!$root.length) return;

    var wishlist = read(keys.wishlist, []);
    if (!wishlist.length) {
      $root.html('<p class="text-muted mb-0">Your wishlist is empty. <a href="shop.html">Browse products</a>.</p>');
      return;
    }

    var html = wishlist.map(function (id) {
      var p = products[id];
      if (!p) return "";
      return '<div class="line-item mb-2 p-2 rounded-3 d-flex justify-content-between align-items-center"><div><div class="fw-semibold small">' + p.name + '</div><div class="small text-muted">' + money(p.price) + '</div></div><div class="d-flex gap-1"><button class="btn btn-sm btn-outline-primary move-wishlist-cart" data-id="' + id + '">Move to cart</button><button class="btn btn-sm btn-outline-secondary remove-wishlist-page" data-id="' + id + '">Remove</button></div></div>';
    }).join("");

    $root.html(html);
  }

  function renderCartPage() {
    var $root = $("#cartPageItems");
    if (!$root.length) return;

    var cart = read(keys.cart, {});
    var coupon = localStorage.getItem(keys.coupon) || "";

    var ids = Object.keys(cart);
    if (!ids.length) {
      $root.html('<p class="text-muted mb-0">Your cart is empty. <a href="shop.html">Start shopping</a>.</p>');
    } else {
      var html = ids.map(function (id) {
        var p = products[id];
        if (!p) return "";
        var qty = Number(cart[id]);
        return '<div class="line-item mb-2 p-2 rounded-3"><div class="d-flex justify-content-between"><div><div class="fw-semibold small">' + p.name + '</div><div class="small text-muted">' + money(p.price) + ' each</div></div><button class="btn btn-sm btn-outline-secondary remove-cart-page" data-id="' + id + '"><i class="bi bi-trash"></i></button></div><div class="d-flex justify-content-between align-items-center mt-2"><div class="d-flex align-items-center gap-1"><button class="btn btn-sm btn-light dec-cart-page" data-id="' + id + '">-</button><span class="small px-1">' + qty + '</span><button class="btn btn-sm btn-light inc-cart-page" data-id="' + id + '">+</button></div><b class="small">' + money(p.price * qty) + '</b></div></div>';
      }).join("");
      $root.html(html);
    }

    var s = summary(cart, coupon);
    $("#cartPageSubtotal").text(money(s.subtotal));
    $("#cartPageDiscount").text("-" + money(s.discount));
    $("#cartPageTotal").text(money(s.total));
    $("#couponPageInput").val(coupon);
  }

  function renderCheckoutPage() {
    var $box = $("#checkoutSummaryItems");
    if (!$box.length) return;

    var cart = read(keys.cart, {});
    var coupon = localStorage.getItem(keys.coupon) || "";
    var lines = Object.keys(cart).map(function (id) {
      var p = products[id];
      if (!p) return "";
      return '<div class="d-flex justify-content-between mb-1"><span>' + p.name + ' x' + cart[id] + '</span><b>' + money(p.price * Number(cart[id])) + '</b></div>';
    }).join("");

    $box.html(lines || '<p class="mb-0 text-muted">No items in cart.</p>');

    var s = summary(cart, coupon);
    $("#checkoutSubtotal").text(money(s.subtotal));
    $("#checkoutDiscount").text("-" + money(s.discount));
    $("#checkoutTotal").text(money(s.total));
  }

  function renderOrdersPage() {
    var $table = $("#ordersTable tbody");
    if (!$table.length) return;

    var orders = read(keys.orders, []);
    if (!orders.length) {
      $table.html('<tr><td colspan="5" class="text-muted small">No orders yet.</td></tr>');
      return;
    }

    $table.html(orders.map(function (o) {
      return '<tr><td>#' + o.id + '</td><td>' + o.date + '</td><td><span class="badge text-bg-success">' + o.status + '</span></td><td>' + money(o.total) + '</td><td><button class="btn btn-sm btn-outline-secondary">Details</button></td></tr>';
    }).join(""));
  }

  function handleForms() {
    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      $("#contactMessage").text("Message sent successfully. Support will contact you soon.").addClass("text-success");
      this.reset();
    });

    $("#loginForm").on("submit", function (e) {
      e.preventDefault();
      $("#loginMessage").text("Signed in successfully.").addClass("text-success");
    });

    $("#registerForm").on("submit", function (e) {
      e.preventDefault();
      $("#registerMessage").text("Account created successfully.").addClass("text-success");
      this.reset();
    });

    $("#checkoutStandaloneForm").on("submit", function (e) {
      e.preventDefault();
      var cart = read(keys.cart, {});
      var coupon = localStorage.getItem(keys.coupon) || "";
      var s = summary(cart, coupon);
      if (!Object.keys(cart).length) {
        $("#checkoutStandaloneMessage").text("Cart is empty.").addClass("text-danger");
        return;
      }

      var orders = read(keys.orders, []);
      orders.unshift({
        id: Math.floor(Math.random() * 900000 + 100000),
        date: new Date().toISOString().slice(0, 10),
        status: "Processing",
        total: s.total
      });
      write(keys.orders, orders);
      write(keys.cart, {});
      localStorage.setItem(keys.coupon, "");
      this.reset();
      $("#checkoutStandaloneMessage").text("Order placed successfully.").removeClass("text-danger").addClass("text-success");
      renderCheckoutPage();
    });
  }

  $(document).on("click", ".inc-cart-page", function () {
    var id = $(this).data("id");
    var cart = read(keys.cart, {});
    cart[id] = (cart[id] || 0) + 1;
    write(keys.cart, cart);
    renderCartPage();
  });

  $(document).on("click", ".dec-cart-page", function () {
    var id = $(this).data("id");
    var cart = read(keys.cart, {});
    if (!cart[id]) return;
    cart[id] -= 1;
    if (cart[id] <= 0) delete cart[id];
    write(keys.cart, cart);
    renderCartPage();
  });

  $(document).on("click", ".remove-cart-page", function () {
    var id = $(this).data("id");
    var cart = read(keys.cart, {});
    delete cart[id];
    write(keys.cart, cart);
    renderCartPage();
  });

  $(document).on("click", ".remove-wishlist-page", function () {
    var id = Number($(this).data("id"));
    var wishlist = read(keys.wishlist, []).filter(function (item) { return item !== id; });
    write(keys.wishlist, wishlist);
    renderWishlistPage();
  });

  $(document).on("click", ".move-wishlist-cart", function () {
    var id = Number($(this).data("id"));
    var wishlist = read(keys.wishlist, []).filter(function (item) { return item !== id; });
    var cart = read(keys.cart, {});
    cart[id] = (cart[id] || 0) + 1;
    write(keys.wishlist, wishlist);
    write(keys.cart, cart);
    renderWishlistPage();
  });

  $("#clearWishlistPage").on("click", function () {
    write(keys.wishlist, []);
    renderWishlistPage();
  });

  $("#applyPageCoupon").on("click", function () {
    var code = ($("#couponPageInput").val() || "").trim().toUpperCase();
    if (code && code !== "SAVE10") {
      alert("Invalid coupon code");
      return;
    }
    localStorage.setItem(keys.coupon, code);
    renderCartPage();
  });

  renderWishlistPage();
  renderCartPage();
  renderCheckoutPage();
  renderOrdersPage();
  handleForms();
});
