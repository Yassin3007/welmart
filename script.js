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
  window.WM_PRODUCTS = products.slice();

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
  var $cartHoverWrap = $("#cartHoverWrap");
  var cartHoverDialog = document.getElementById("cartHoverDialog");
  var $wishlistCount = $("#wishlistCount");
  var $wishlistCountInline = $("#wishlistCountInline");
  var $compareCount = $("#compareCount");
  var $backToTop = $("#backToTop");
  var $revealItems = $(".reveal");
  var TRANSLATE_STORAGE_KEY = "wm_site_lang";

  var $catalogGrid = $("#catalogGrid");
  var $catalogPagination = $("#catalogPagination");
  var $catalogCount = $("#catalogCount");
  var $catalogSearch = $("#catalogSearch");
  var $catalogCategory = $("#catalogCategory");
  var $catalogBrand = $("#catalogBrand");
  var $catalogSort = $("#catalogSort");
  var $priceRange = $("#priceRange");
  var $priceRangeValue = $("#priceRangeValue");
  var $categorySections = $("#categorySections");
  var $reelsVideo = $("#reelsVideo");
  var $reelsFeed = $("#reelsFeed");
  var $reelPlayBtn = $("#reelPlayBtn");
  var $reelPrevBtn = $("#reelPrevBtn");
  var $reelNextBtn = $("#reelNextBtn");
  var $reelMuteBtn = $("#reelMuteBtn");
  var $reelLikeBtn = $("#reelLikeBtn");
  var $reelSeek = $("#reelSeek");
  var $reelsTitle = $("#reelsTitle");
  var $reelsCategory = $("#reelsCategory");
  var $reelsStats = $("#reelsStats");

  var quickViewModalEl = document.getElementById("quickViewModal");
  var quickViewModal = quickViewModalEl ? new bootstrap.Modal(quickViewModalEl) : null;
  var checkoutModalEl = document.getElementById("checkoutModal");
  var checkoutModal = checkoutModalEl ? new bootstrap.Modal(checkoutModalEl) : null;
  var cartCanvasEl = document.getElementById("cartCanvas");
  var cartCanvas = cartCanvasEl ? new bootstrap.Offcanvas(cartCanvasEl) : null;
  var appToastEl = document.getElementById("appToast");
  var appToast = appToastEl ? new bootstrap.Toast(appToastEl, { delay: 2200 }) : null;
  var reels = [
    {
      id: "reel-tech",
      title: "Desk setup transformation under $100",
      category: "Electronics",
      stats: "2.4M views",
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "https://picsum.photos/seed/reel1/320/320"
    },
    {
      id: "reel-home",
      title: "Kitchen reset in 30 seconds",
      category: "Home",
      stats: "1.8M views",
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "https://picsum.photos/seed/reel2/320/320"
    },
    {
      id: "reel-fitness",
      title: "Morning wellness routine picks",
      category: "Fitness",
      stats: "1.2M views",
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "https://picsum.photos/seed/reel3/320/320"
    },
    {
      id: "reel-kids",
      title: "STEM toy challenge at home",
      category: "Kids",
      stats: "946K views",
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "https://picsum.photos/seed/reel4/320/320"
    }
  ];
  var currentReelIndex = 0;
  var likedReels = {};

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
    var text = window.WM_I18N && typeof window.WM_I18N.t === "function" ? window.WM_I18N.t(message) : message;
    $("#toastText").text(text);
    if (appToast) appToast.show();
  }

  function initSiteTranslator() {
    var $actions = $(".safqa-actions").first();
    if (!$actions.length || $("#wmLangSelect").length) return;

    $actions.prepend([
      '<div class="wm-translate-wrap">',
      '  <label class="wm-translate-label" for="wmLangSelect">Language</label>',
      '  <select id="wmLangSelect" class="wm-lang-select" aria-label="Translate website">',
      '    <option value="en">English</option>',
      '    <option value="ar">العربية</option>',
      '  </select>',
      '</div>'
    ].join(""));

    var enToArMap = {
      "Favorites": "المفضلة",
      "My items": "عناصري",
      "Sign in": "تسجيل الدخول",
      "Account": "الحساب",
      "Cart": "السلة",
      "Cart items": "عناصر السلة",
      "Total": "الإجمالي",
      "Language": "اللغة",
      "Search everything at Walmart online and in store": "ابحث عن كل شيء في وولمارت عبر الإنترنت وفي المتجر",
      "Skip to content": "تخطي إلى المحتوى",
      "Limited-Time Savings": "تخفيضات لفترة محدودة",
      "Everyday essentials, now at lower prices": "الأساسيات اليومية الآن بأسعار أقل",
      "Shop essentials": "تسوق الأساسيات",
      "View weekly ad": "عرض عروض الأسبوع",
      "Tech Refresh": "تجديد التكنولوجيا",
      "Browse electronics": "تصفح الإلكترونيات",
      "See best sellers": "عرض الأكثر مبيعًا",
      "Home Upgrade": "تجديد المنزل",
      "Shop home": "تسوق المنزل",
      "Explore bundles": "استكشف الباقات",
      "Pickup in as little as 2 hours": "استلام خلال ساعتين فقط",
      "Free returns up to 90 days": "إرجاع مجاني حتى 90 يومًا",
      "Flexible payment options": "خيارات دفع مرنة",
      "Trusted product quality": "جودة منتجات موثوقة",
      "Grocery": "البقالة",
      "Electronics": "الإلكترونيات",
      "Home": "المنزل",
      "Beauty": "الجمال",
      "Toys": "الألعاب",
      "Auto": "السيارات",
      "Flash Deals": "عروض سريعة",
      "Shop flash deals": "تسوق العروض السريعة",
      "High demand now": "طلب مرتفع الآن",
      "Best value this week": "أفضل قيمة هذا الأسبوع",
      "Running low soon": "سينفد قريبًا",
      "Catogeries": "الفئات",
      "all catogerys section": "قسم جميع الفئات",
      "mobile & electronics": "الموبايل والإلكترونيات",
      "kitchen": "المطبخ",
      "cars": "السيارات",
      "beauty": "الجمال",
      "home": "المنزل",
      "babys": "الأطفال",
      "Sort by": "ترتيب حسب",
      "Price: Low to high": "السعر: من الأقل إلى الأعلى",
      "Price: High to low": "السعر: من الأعلى إلى الأقل",
      "Rating: High to low": "التقييم: من الأعلى إلى الأقل",
      "Name: A to Z": "الاسم: من أ إلى ي",
      "All products": "كل المنتجات",
      "All categories": "كل الفئات",
      "All brands": "كل العلامات التجارية",
      "Category": "الفئة",
      "Brand": "العلامة التجارية",
      "Max price:": "أقصى سعر:",
      "Clear filters": "مسح الفلاتر",
      "Add to cart": "أضف إلى السلة",
      "Quick view": "معاينة سريعة",
      "Compare": "مقارنة",
      "Checkout": "الدفع",
      "Wishlist": "قائمة الرغبات",
      "Shopping cart": "سلة التسوق",
      "Subtotal": "المجموع الفرعي",
      "Discount": "الخصم",
      "Estimated total": "الإجمالي التقديري",
      "Apply": "تطبيق",
      "Proceed to checkout": "المتابعة إلى الدفع",
      "First name": "الاسم الأول",
      "Last name": "اسم العائلة",
      "Email": "البريد الإلكتروني",
      "Address": "العنوان",
      "City": "المدينة",
      "State": "المحافظة",
      "ZIP": "الرمز البريدي",
      "Payment method": "طريقة الدفع",
      "Select method": "اختر الطريقة",
      "Credit Card": "بطاقة ائتمان",
      "Debit Card": "بطاقة خصم",
      "Cash on Delivery": "الدفع عند الاستلام",
      "Place order": "تأكيد الطلب",
      "Checkout - Walmart-Inspired Store": "الدفع - متجر مستوحى من وولمارت",
      "Cart - Walmart-Inspired Store": "السلة - متجر مستوحى من وولمارت",
      "Shop - Walmart-Inspired Store": "المتجر - متجر مستوحى من وولمارت",
      "Product Details - Walmart-Inspired Store": "تفاصيل المنتج - متجر مستوحى من وولمارت",
      "Product": "المنتج",
      "View larger": "عرض أكبر",
      "Share": "مشاركة",
      "reviews": "تقييم",
      "Read reviews": "قراءة التقييمات",
      "Save 25%": "وفر 25%",
      "Pickup, delivery, and shipping available.": "الاستلام والتوصيل والشحن متاحة.",
      "Arrives by tomorrow": "يصل بحلول الغد",
      "Free delivery with Walmart+": "توصيل مجاني مع Walmart+",
      "Pickup today": "استلام اليوم",
      "Ready in 2 hours at Sacramento Supercenter": "جاهز خلال ساعتين في ساكرامنتو سوبرسنتر",
      "Size": "الحجم",
      "1 month": "شهر واحد",
      "2 month": "شهران",
      "3 month": "3 أشهر",
      "Free returns within 90 days": "إرجاع مجاني خلال 90 يومًا",
      "Authentic guarantee": "ضمان الأصالة",
      "Pay in 4 with Klarna": "ادفع على 4 دفعات مع كلارنا",
      "At a glance": "نظرة سريعة",
      "Sponsored, sold & shipped by Walmart": "إعلان ممول، يباع ويشحن بواسطة وولمارت",
      "per kit": "لكل مجموعة",
      "Only 16 left in stock": "متبقي 16 فقط في المخزون",
      "Buy now": "اشتر الآن",
      "Sold by Walmart.com": "يباع بواسطة Walmart.com",
      "Free return shipping": "شحن إرجاع مجاني",
      "2-year protection plan available": "خطة حماية لمدة سنتين متاحة",
      "Highlights": "أهم المميزات",
      "Clinically tested 3-step system to help reduce breakouts.": "نظام من 3 خطوات مُختبر سريريًا للمساعدة في تقليل الحبوب.",
      "Includes cleanser, toner, and treatment for daily use.": "يتضمن غسولًا وتونرًا وعلاجًا للاستخدام اليومي.",
      "Dermatologist-tested, gentle for sensitive skin types.": "مختبر من أطباء الجلد، ولطيف على البشرة الحساسة.",
      "Bonus travel size kit for on-the-go routines.": "مجموعة سفر إضافية للروتين أثناء التنقل.",
      "About this item": "حول هذا المنتج",
      "Formulated with proprietary benzoyl peroxide complex and soothing botanicals, this kit helps minimize blemishes while keeping skin hydrated. Use morning and night for best results.": "مصمم بمركب بنزويل بيروكسيد خاص ونباتات مهدئة، تساعد هذه المجموعة على تقليل الشوائب مع الحفاظ على ترطيب البشرة. استخدمه صباحًا ومساءً لأفضل النتائج.",
      "Oil-free": "خالٍ من الزيوت",
      "Non-comedogenic": "لا يسبب انسداد المسام",
      "Dermatologist-tested": "مختبر من أطباء الجلد",
      "Specifications": "المواصفات",
      "Model": "الموديل",
      "Return policy": "سياسة الإرجاع",
      "Free 90-day returns": "إرجاع مجاني لمدة 90 يومًا",
      "Bundle includes": "تتضمن المجموعة",
      "3 items + travel kit": "3 عناصر + مجموعة سفر",
      "Made in": "صنع في",
      "Customer reviews": "تقييمات العملاء",
      "4.5 out of 5 based on 1,248 reviews": "4.5 من 5 بناءً على 1,248 تقييمًا",
      "Write a review": "اكتب تقييمًا",
      "Most customers love the fast results and gentle finish.": "معظم العملاء يحبون النتائج السريعة واللمسة اللطيفة.",
      "Great results in 3 weeks": "نتائج رائعة خلال 3 أسابيع",
      "Gentle but effective": "لطيف لكنه فعّال",
      "My skin cleared up significantly and the regimen is easy to follow. The travel kit is a nice bonus.": "تحسنت بشرتي بشكل واضح والروتين سهل الالتزام به. مجموعة السفر إضافة ممتازة.",
      "No dryness after the first week. The scent is light and the packaging looks premium.": "لا يوجد جفاف بعد الأسبوع الأول. الرائحة خفيفة والتغليف يبدو فاخرًا.",
      "Frequently bought together": "يُشترى معًا غالبًا",
      "Hydrating Serum": "سيروم مرطب",
      "Foaming Cleanser": "غسول رغوي",
      "Clay Detox Mask": "قناع طين لإزالة السموم",
      "Daily Moisturizer": "مرطب يومي",
      "Contact - Walmart-Inspired Store": "اتصل بنا - متجر مستوحى من وولمارت",
      "Orders - Walmart-Inspired Store": "الطلبات - متجر مستوحى من وولمارت",
      "Account - Walmart-Inspired Store": "الحساب - متجر مستوحى من وولمارت",
      "Create Account - Walmart-Inspired Store": "إنشاء حساب - متجر مستوحى من وولمارت",
      "Popular items in your area": "منتجات شائعة في منطقتك",
      "My wishlist": "قائمة رغباتي",
      "Order history": "سجل الطلبات",
      "Contact support": "التواصل مع الدعم",
      "Send message": "إرسال الرسالة",
      "Message": "الرسالة",
      "Phone: +1 (800) 555-1234": "الهاتف: +1 (800) 555-1234",
      "Live chat: 24/7": "دردشة مباشرة: 24/7",
      "Email: support@walmart-demo.com": "البريد: support@walmart-demo.com",
      "Continue shopping": "متابعة التسوق",
      "Featured deals": "العروض المميزة",
      "Full ecommerce catalog": "كتالوج التجارة الإلكترونية الكامل",
      "Smart recommendations": "توصيات ذكية",
      "See personalization settings": "عرض إعدادات التخصيص",
      "All": "الكل",
      "See all": "عرض الكل",
      "New": "جديد",
      "Hot deal": "عرض ساخن",
      "Save 20%": "وفر 20%",
      "Trending": "الأكثر رواجًا",
      "Rollback": "تخفيض خاص",
      "Best seller": "الأكثر مبيعًا",
      "Wearables": "الأجهزة القابلة للارتداء",
      "Audio": "الصوتيات",
      "Home office": "المكتب المنزلي",
      "Kitchen": "المطبخ",
      "office chair": "كرسي مكتب",
      "Sort: Featured": "الترتيب: مميز",
      "Showing": "عرض",
      "products": "منتج",
      "Search in catalog": "ابحث في الكتالوج",
      "Pharmacy essentials and daily care": "أساسيات الصيدلية والعناية اليومية",
      "Stock up on vitamins, personal care, and over-the-counter basics.": "تزود بالفيتامينات والعناية الشخصية والأساسيات المتاحة دون وصفة طبية.",
      "Shop wellness": "تسوق العناية الصحية",
      "Home refresh": "تجديد المنزل",
      "Furniture and decor for every room": "أثاث وديكور لكل غرفة",
      "Find modern pieces and practical storage with rollback pricing.": "اعثر على قطع عصرية وحلول تخزين عملية بأسعار مخفضة.",
      "Health and wellness": "الصحة والعافية",
      "HEALTH AND WELLNESS": "الصحة والعافية",
      "REFRESH": "تجديد",
      "Shop by department": "تسوق حسب القسم",
      "Browse all": "تصفح الكل",
      "Popular brands": "العلامات التجارية الشائعة",
      "Shop brand stores": "تسوق متاجر العلامات التجارية",
      "WALMART APP": "تطبيق وولمارت",
      "Get order updates and faster checkout": "احصل على تحديثات الطلب وتسوق أسرع",
      "Scan, pay, and reorder in seconds with the Walmart mobile app.": "امسح وادفع وأعد الطلب خلال ثوانٍ عبر تطبيق وولمارت.",
      "Learn more": "اعرف المزيد",
      "Download app": "تحميل التطبيق",
      "Be first to know about weekly deals": "كن أول من يعرف عروض الأسبوع",
      "Get updates on savings events, limited offers, and member-exclusive discounts.": "احصل على تحديثات فعاليات التوفير والعروض المحدودة وخصومات الأعضاء الحصرية.",
      "Subscribe": "اشترك",
      "Enter your email": "أدخل بريدك الإلكتروني",
      "Sports & outdoors": "الرياضة والأنشطة الخارجية",
      "Baby essentials": "مستلزمات الأطفال",
      "Fresh groceries": "بقالة طازجة",
      "Patio & garden": "الفناء والحديقة",
      "Office supplies": "مستلزمات المكتب",
      "Health & wellness": "الصحة والعافية",
      "Home decor": "ديكور المنزل",
      "Automotive": "السيارات",
      "Air fryer 5L": "قلاية هوائية 5 لتر",
      "Bamboo shelf unit": "وحدة رفوف من الخيزران",
      "Gaming keyboard": "لوحة مفاتيح ألعاب",
      "4K webcam": "كاميرا ويب 4K",
      "Protein powder": "مسحوق بروتين",
      "Yoga mat pro": "سجادة يوغا احترافية",
      "STEM learning set": "مجموعة تعلم STEM",
      "Kids scooter": "سكوتر أطفال",
      "Your cart is empty.": "سلتك فارغة.",
      "Your wishlist is empty.": "قائمة الرغبات فارغة.",
      "Your cart": "سلتك",
      "Tax included. Shipping calculated at checkout.": "الضريبة مشمولة. يتم حساب الشحن عند إتمام الدفع.",
      "You are getting FREE shipping!": "أنت تحصل على شحن مجاني!",
      "Add": "أضف",
      "You may also like": "قد يعجبك أيضًا",
      "Check out": "إتمام الشراء",
      "each": "لكل قطعة",
      "Browse products": "تصفح المنتجات",
      "Start shopping": "ابدأ التسوق",
      "Move to cart": "انقل إلى السلة",
      "Remove": "إزالة",
      "Save for later": "حفظ لوقت لاحق",
      "No items in cart.": "لا توجد عناصر في السلة.",
      "No orders yet.": "لا توجد طلبات بعد.",
      "Details": "التفاصيل",
      "Message sent successfully. Support will contact you soon.": "تم إرسال الرسالة بنجاح. سيتواصل الدعم معك قريبًا.",
      "Signed in successfully.": "تم تسجيل الدخول بنجاح.",
      "Account created successfully.": "تم إنشاء الحساب بنجاح.",
      "Cart is empty.": "السلة فارغة.",
      "Order placed successfully.": "تم تنفيذ الطلب بنجاح.",
      "Invalid coupon code": "كود خصم غير صالح",
      "Added to cart": "تمت الإضافة إلى السلة",
      "Added to wishlist": "تمت الإضافة إلى قائمة الرغبات",
      "Removed from wishlist": "تمت الإزالة من قائمة الرغبات",
      "Removed from compare": "تمت الإزالة من المقارنة",
      "You can compare up to 3 products": "يمكنك مقارنة حتى 3 منتجات",
      "Added to compare": "تمت الإضافة إلى المقارنة",
      "Moved to cart": "تم النقل إلى السلة",
      "Coupon applied": "تم تطبيق كود الخصم",
      "Coupon removed": "تمت إزالة كود الخصم",
      "Your cart is empty": "سلتك فارغة",
      "Please complete all required fields.": "يرجى استكمال جميع الحقول المطلوبة.",
      "Order placed successfully. Thank you for shopping.": "تم تنفيذ الطلب بنجاح. شكرًا لتسوقك.",
      "Order placed": "تم تنفيذ الطلب",
      "Thanks. You are subscribed to weekly deals.": "شكرًا لك. تم الاشتراك في عروض الأسبوع.",
      "Enter a valid email address to subscribe.": "أدخل بريدًا إلكترونيًا صحيحًا للاشتراك.",
      "Done": "تم"
      ,"Sold & shipped by Walmart": "يباع ويشحن من وولمارت"
      ,"item": "قطعة"
      ,"items": "قطع"
      ,"1000+ bought since yesterday": "تم شراء أكثر من 1000 منذ الأمس"
      ,"Processing": "قيد المعالجة"
    };

    var arToEnMap = Object.keys(enToArMap).reduce(function (acc, key) {
      acc[enToArMap[key]] = key;
      return acc;
    }, {});

    var sortedKeys = Object.keys(enToArMap).sort(function (a, b) { return b.length - a.length; });

    function escapeRegex(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function translateText(raw, map) {
      var output = raw;
      sortedKeys.forEach(function (key) {
        if (!map[key] || output.indexOf(key) === -1) return;
        var re = new RegExp("(^|[^A-Za-z0-9\\u0600-\\u06FF])(" + escapeRegex(key) + ")(?=$|[^A-Za-z0-9\\u0600-\\u06FF])", "g");
        output = output.replace(re, function (_, prefix) {
          return prefix + map[key];
        });
      });
      return output;
    }

    function swapTextNodes(lang) {
      if (!document.body) return;
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      var node;
      while ((node = walker.nextNode())) {
        var parent = node.parentNode;
        if (!parent || !parent.tagName) continue;
        var tag = parent.tagName.toUpperCase();
        if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].indexOf(tag) !== -1) continue;
        if (typeof node.__wmI18nOriginal === "undefined") {
          node.__wmI18nOriginal = node.nodeValue;
        }
        var base = node.__wmI18nOriginal;
        var raw = node.nodeValue;
        var next = lang === "ar" ? translateText(base, enToArMap) : translateText(base, arToEnMap);
        if (next !== raw) node.nodeValue = next;
      }
    }

    function setAttrByLang(selector, attr, en, ar, lang) {
      var value = lang === "ar" ? ar : en;
      if (attr === "text") {
        $(selector).text(value);
        return;
      }
      $(selector).attr(attr, value);
    }

    function applyLanguage(lang) {
      var selected = lang || "en";
      localStorage.setItem(TRANSLATE_STORAGE_KEY, selected);
      document.documentElement.lang = selected;
      document.documentElement.dir = selected === "ar" ? "rtl" : "ltr";

      swapTextNodes(selected);
      setAttrByLang(".wm-translate-label", "text", "Language", "اللغة", selected);
      setAttrByLang(".safqa-search input", "placeholder", "Search everything at Walmart online and in store", "ابحث عن كل شيء في وولمارت عبر الإنترنت وفي المتجر", selected);
      setAttrByLang("#catalogSearch", "placeholder", "Search in catalog", "ابحث في الكتالوج", selected);
      setAttrByLang("#newsletterEmail", "placeholder", "Enter your email", "أدخل بريدك الإلكتروني", selected);
      setAttrByLang("#couponInput", "placeholder", "Coupon code (SAVE10)", "كود الخصم (SAVE10)", selected);
      setAttrByLang("#couponPageInput", "placeholder", "Coupon code (SAVE10)", "كود الخصم (SAVE10)", selected);

      if (document.title && enToArMap[document.title] && selected === "ar") {
        document.title = enToArMap[document.title];
      } else if (document.title && arToEnMap[document.title] && selected === "en") {
        document.title = arToEnMap[document.title];
      }
    }

    window.WM_I18N = {
      t: function (text) {
        var lang = localStorage.getItem(TRANSLATE_STORAGE_KEY) || "en";
        return lang === "ar" ? (enToArMap[text] || text) : (arToEnMap[text] || text);
      },
      lang: function () {
        return localStorage.getItem(TRANSLATE_STORAGE_KEY) || "en";
      },
      translatePage: function () {
        applyLanguage(localStorage.getItem(TRANSLATE_STORAGE_KEY) || "en");
      }
    };

    var savedLang = localStorage.getItem(TRANSLATE_STORAGE_KEY) || "en";
    $("#wmLangSelect").val(savedLang);
    applyLanguage(savedLang);

    $(document).on("change", "#wmLangSelect", function () {
      applyLanguage($(this).val());
    });
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

  function initCategorySlider() {
    var slider = document.getElementById("categorySlider");
    var prev = document.getElementById("categoryPrev");
    var next = document.getElementById("categoryNext");
    if (!slider || !prev || !next) return;

    function getStep() {
      var firstCard = slider.querySelector(".category-card");
      if (!firstCard) return 280;
      var styles = window.getComputedStyle(slider);
      var gap = parseFloat(styles.columnGap || styles.gap || 0);
      return firstCard.getBoundingClientRect().width + gap;
    }

    prev.addEventListener("click", function () {
      slider.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    next.addEventListener("click", function () {
      slider.scrollBy({ left: getStep(), behavior: "smooth" });
    });
  }

  function renderCategoryCardProducts() {
    var map = {
      kitchen: "Home",
      home: "Home",
      babys: "Kids",
      cars: "Electronics",
      beauty: "Fitness"
    };

    $(".category-card").each(function () {
      var key = String($(this).data("category") || "").toLowerCase();
      var categoryName = map[key] || "Electronics";
      var list = products.filter(function (p) { return p.category === categoryName; });
      if (!list.length) return;

      var cards = [];
      for (var i = 0; i < 4; i += 1) {
        var p = list[i % list.length];
        cards.push([
          '<article class="category-mini-card" data-product-id="' + p.id + '">',
          '  <img src="' + p.image + '" alt="' + p.name.replace(/"/g, "&quot;") + '">',
          '  <div class="category-mini-meta">',
          '    <h5>' + p.name + '</h5>',
          '    <p>' + p.brand + " - " + money(p.price) + '</p>',
          '    <div class="d-flex gap-1 flex-wrap">',
          '      <button class="btn btn-xs btn-outline-primary rounded-pill add-cart" data-product-id="' + p.id + '">Add to cart</button>',
          '      <a class="btn btn-xs btn-light rounded-pill product-details-link" href="product.html?id=' + p.id + '">Details</a>',
          '    </div>',
          '  </div>',
          '</article>'
        ].join(""));
      }

      $(this).find(".category-card-grid").html(cards.join(""));
    });
  }

  function initAkwaSafqqaSlider() {
    var slider = document.getElementById("akwaSlider");
    var prev = document.getElementById("akwaPrev");
    var next = document.getElementById("akwaNext");
    if (!slider || !prev || !next) return;

    function getStep() {
      var firstCard = slider.querySelector(".akwa-product-item");
      if (!firstCard) return 280;
      var styles = window.getComputedStyle(slider);
      var gap = parseFloat(styles.columnGap || styles.gap || 0);
      return firstCard.getBoundingClientRect().width + gap;
    }

    prev.addEventListener("click", function () {
      slider.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    next.addEventListener("click", function () {
      slider.scrollBy({ left: getStep(), behavior: "smooth" });
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

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildCategoryProductCard(p) {
    var safeName = escapeHtml(p.name);
    return [
      '<article class="product-card h-100">',
      '  <div class="product-badge">' + escapeHtml(p.brand) + '</div>',
      '  <a class="product-link" href="product.html?id=' + p.id + '">',
      '    <img src="' + p.image + '" class="img-fluid rounded-3 mb-2" alt="' + safeName + '">',
      '  </a>',
      '  <p class="small text-muted mb-1">' + escapeHtml(p.category) + '</p>',
      '  <h3 class="h6 product-title"><a class="product-link" href="product.html?id=' + p.id + '">' + safeName + '</a></h3>',
      '  <div class="rating small mb-2"><i class="bi bi-star-fill"></i> ' + p.rating.toFixed(1) + '</div>',
      '  <p class="mb-1"><span class="price">' + money(p.price) + '</span> <span class="old-price">' + money(p.oldPrice) + '</span></p>',
      '  <div class="d-flex gap-2 mt-2">',
      '    <button class="btn btn-sm btn-outline-primary rounded-pill add-cart" data-product-id="' + p.id + '">Add to cart</button>',
      '    <button class="btn btn-sm btn-light rounded-pill quick-view" data-product-id="' + p.id + '">Quick view</button>',
      '  </div>',
      '</article>'
    ].join("");
  }

  function renderCategorySections() {
    if (!$categorySections.length) return;
    var categories = Array.from(new Set(products.map(function (p) { return p.category; })));
    var html = categories.map(function (category) {
      var categoryProducts = products.filter(function (p) { return p.category === category; });
      if (!categoryProducts.length) return "";

      var cards = [];
      for (var i = 0; i < 14; i += 1) {
        var item = categoryProducts[i % categoryProducts.length];
        cards.push('<div class="col-6 col-md-4 col-lg-3 col-xl-2">' + buildCategoryProductCard(item) + '</div>');
      }

      return [
        '<div class="mb-5">',
        '  <div class="section-head d-flex justify-content-between align-items-center mb-3">',
        '    <h2 class="section-title mb-0">' + escapeHtml(category) + '</h2>',
        '    <a href="shop.html" class="btn btn-sm btn-primary rounded-pill">View All</a>',
        '  </div>',
        '  <div class="row g-4">',
        cards.join(""),
        '  </div>',
        '</div>'
      ].join("");
    }).join("");

    $categorySections.html(html);
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
        '    <a class="product-link" href="product.html?id=' + p.id + '">',
        '      <img src="' + p.image + '" class="img-fluid rounded-3 mb-2" alt="' + p.name + '">',
        '    </a>',
        '    <p class="small text-muted mb-1">' + p.category + '</p>',
        '    <h3 class="h6 product-title"><a class="product-link" href="product.html?id=' + p.id + '">' + p.name + '</a></h3>',
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

  function renderReelsFeed() {
    if (!$reelsFeed.length) return;
    $reelsFeed.html(reels.map(function (reel, idx) {
      return [
        '<button type="button" class="reel-item ' + (idx === currentReelIndex ? "active" : "") + '" data-reel-index="' + idx + '">',
        '  <img src="' + reel.poster + '" alt="' + reel.title + '">',
        '  <div>',
        '    <div class="fw-semibold small">' + reel.title + '</div>',
        '    <div class="small text-muted">' + reel.category + " - " + reel.stats + '</div>',
        '  </div>',
        '</button>'
      ].join("");
    }).join(""));
  }

  function syncReelUI() {
    if (!$reelsVideo.length || !reels.length) return;
    var reel = reels[currentReelIndex];
    var video = $reelsVideo.get(0);
    $reelsTitle.text(reel.title);
    $reelsCategory.text(reel.category);
    $reelsStats.text(reel.stats);
    $reelsVideo.attr("poster", reel.poster);
    if (video.getAttribute("src") !== reel.video) {
      video.src = reel.video;
      video.load();
      video.play().catch(function () {});
    }

    var isLiked = !!likedReels[reel.id];
    $reelLikeBtn.html('<i class="bi ' + (isLiked ? "bi-heart-fill" : "bi-heart") + '"></i>');
    $reelLikeBtn.toggleClass("active", isLiked);
    $reelMuteBtn.html('<i class="bi ' + (video.muted ? "bi-volume-mute" : "bi-volume-up") + '"></i>');
    $reelPlayBtn.text(video.paused ? "Play" : "Pause");
    renderReelsFeed();
  }

  function setReel(index) {
    if (!reels.length) return;
    currentReelIndex = (index + reels.length) % reels.length;
    syncReelUI();
  }

  function initReelsPlayer() {
    if (!$reelsVideo.length) return;
    var video = $reelsVideo.get(0);
    video.muted = true;
    video.loop = true;
    setReel(0);

    $reelPlayBtn.on("click", function () {
      if (video.paused) {
        video.play().catch(function () {});
      } else {
        video.pause();
      }
      syncReelUI();
    });

    $reelPrevBtn.on("click", function () { setReel(currentReelIndex - 1); });
    $reelNextBtn.on("click", function () { setReel(currentReelIndex + 1); });

    $reelMuteBtn.on("click", function () {
      video.muted = !video.muted;
      syncReelUI();
    });

    $reelLikeBtn.on("click", function () {
      var reel = reels[currentReelIndex];
      likedReels[reel.id] = !likedReels[reel.id];
      syncReelUI();
    });

    $reelsFeed.on("click", ".reel-item", function () {
      var idx = Number($(this).data("reel-index"));
      if (!Number.isNaN(idx)) setReel(idx);
    });

    $reelSeek.on("input", function () {
      if (!video.duration) return;
      var ratio = Number($(this).val()) / 100;
      video.currentTime = ratio * video.duration;
    });

    $(video).on("timeupdate", function () {
      if (!video.duration) return;
      var progress = (video.currentTime / video.duration) * 100;
      $reelSeek.val(progress);
    });

    $(video).on("play pause volumechange loadedmetadata", function () {
      syncReelUI();
    });
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
        '    <div class="d-flex gap-2">',
        '      <img src="' + p.image + '" alt="' + p.name + '" class="rounded-2" style="width:58px;height:58px;object-fit:cover;">',
        '      <div>',
        '      <div class="fw-semibold small">' + p.name + '</div>',
        '      <div class="small text-muted">' + money(p.price) + ' each</div>',
        '      </div>',
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

    var shippingMsg;
    if (summary.total >= 100) {
      shippingMsg = window.WM_I18N ? window.WM_I18N.t("You are getting FREE shipping!") : "You are getting FREE shipping!";
    } else if (window.WM_I18N && window.WM_I18N.lang() === "ar") {
      shippingMsg = "أضف " + money(100 - summary.total) + " للحصول على شحن مجاني";
    } else {
      shippingMsg = "Add " + money(100 - summary.total) + " for free shipping";
    }
    $("#cartShipNote span").text(shippingMsg);
    renderCartRecommendations();
  }

  function renderCartRecommendations() {
    var cartIds = Object.keys(cart).map(Number);
    var suggestions = products.filter(function (p) { return cartIds.indexOf(p.id) === -1; }).slice(0, 3);
    var addLabel = window.WM_I18N ? window.WM_I18N.t("Add") : "Add";
    var html = suggestions.map(function (p) {
      return [
        '<article class="cart-reco-item">',
        '  <img src="' + p.image + '" alt="' + p.name + '">',
        '  <div>',
        '    <div class="cart-reco-item-name">' + p.name + '</div>',
        '    <div class="cart-reco-item-price">' + money(p.price) + '</div>',
        '  </div>',
        '  <button class="cart-reco-add add-cart" data-product-id="' + p.id + '">+ ' + addLabel + '</button>',
        '</article>'
      ].join("");
    }).join("");
    $("#cartRecoItems").html(html);
  }

  function renderCartHoverDialog() {
    var ids = Object.keys(cart);
    var html = ids.length ? ids.map(function (id) {
      var p = getProductById(Number(id));
      if (!p) return "";
      var qty = Number(cart[id]);
      return [
        '<div class="cart-hover-item">',
        '  <span class="cart-hover-item-name">' + p.name + ' x' + qty + '</span>',
        '  <b>' + money(p.price * qty) + '</b>',
        '</div>'
      ].join("");
    }).join("") : '<p class="cart-hover-empty">Your cart is empty.</p>';

    $("#cartHoverItems").html(html);
    $("#cartHoverCount").text(getCartCount());
    $("#cartHoverTotal").text(money(getCartSummary().total));
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
    renderCartHoverDialog();
    renderCompare();
    syncCounts();
    saveState();
    if (window.WM_I18N && typeof window.WM_I18N.translatePage === "function") {
      window.WM_I18N.translatePage();
    }
  }

  populateFilterOptions();
  renderCategorySections();
  renderCategoryCardProducts();
  initReelsPlayer();
  initSiteTranslator();
  initCategorySlider();
  initAkwaSafqqaSlider();
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

  $(document).on("click", ".category-card", function () {
    var key = String($(this).data("category") || "").toLowerCase();
    var map = {
      kitchen: "Home",
      home: "Home",
      babys: "Kids"
    };

    state.search = "";
    state.brand = "all";
    state.sort = "featured";
    state.page = 1;
    state.category = map[key] || "all";

    $catalogSearch.val("");
    $catalogBrand.val("all");
    $catalogSort.val("featured");
    $catalogCategory.val(state.category);

    renderCatalog();
    if ($(".catalog-section").length) {
      $("html, body").animate({ scrollTop: $(".catalog-section").offset().top - 70 }, 280);
    }
  });

  $(document).on("click", ".category-mini-card .add-cart, .category-mini-card .product-details-link", function (event) {
    event.stopPropagation();
  });

  $(document).on("click", ".category-mini-card", function (event) {
    if ($(event.target).closest("button, a").length) return;
    event.stopPropagation();
    var id = Number($(this).data("product-id"));
    if (!id) return;
    window.location.href = "product.html?id=" + id;
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
      var href = $(this).closest(".product-card").find(".product-link").first().attr("href") || "";
      var match = href.match(/[?&]id=(\d+)/);
      if (match) id = Number(match[1]);
    }
    if (!id) {
      if (cartCanvas) cartCanvas.show();
      return;
    }
    cart[id] = (cart[id] || 0) + 1;
    refreshAll();
    if (cartCanvas) cartCanvas.show();
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

  if (cartHoverDialog && $cartHoverWrap.length) {
    $cartHoverWrap.on("mouseenter focusin", function () {
      if (window.matchMedia("(max-width: 992px)").matches) return;
      renderCartHoverDialog();
      if (!cartHoverDialog.open) cartHoverDialog.show();
    });

    $cartHoverWrap.on("mouseleave focusout", function () {
      var closeDialog = function () {
        if (!$cartHoverWrap.find(":focus").length && cartHoverDialog.open) {
          cartHoverDialog.close();
        }
      };
      setTimeout(closeDialog, 40);
    });
  }
});
