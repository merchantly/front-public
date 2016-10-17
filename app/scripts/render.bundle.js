// Polyfills & Shims
import './lib/console-polyfill';

// Libs configuration
import './react/libsConfigs';

// Locales
import './locales/numeral/ru';

import './shared/app';
import './shared/cart';
import './shared/load_more';
// import './shared/lightbox';
import './shared/jump';
import './shared/application_slider';
import './shared/theme_switcher';

// TODO: Refactor and cleaning legacy shit
//import './react/components/Product/add_to_basket_button';
//import './react/dispatchers/basket';
//import './react/actions/view/basket';
//import './react/stores/basket';

// Exposing neccessary resources outside
global.CatalogFilter = require('./react/components/CatalogFilter').CatalogFilter;
global.Userbar = require('./react/components/Userbar').UserbarContainer;
global.Clientbar = require('./react/components/Clientbar').Clientbar;
global.Logo = require('./react/components/Logo/LogoContainer');
global.ProductBlock = require('./react/components/Product/ProductBlock');
global.ProductCard = require('./react/components/Product/ProductCard').ProductCard;
global.TopBanner = require('./react/components/TopBanner');
global.CartContainer = require('./react/components/Cart');
global.CartCoupon = require('./react/components/Cart/CartCoupon').default;
global.OrderCoupon = require('./react/components/Checkout/CheckoutCoupon');
global.OrderContainer = require('./react/components/Order');
global.InstagramContainer = require('./react/components/Instagram').InstagramContainer;
global.ScrollToTop = require('./react/components/ScrollToTop');
global.ImageSlider = require('./react/components/common/ImageSlider');
global.CurrencySwitcher = require('./react/components/CurrencySwitcher');
global.LocaleSwitcher = require('./react/components/LocaleSwitcher');
global.Pagination = require('./react/components/Pagination');
global.WishlistContainer = require('./react/components/Wishlist');
global.MenuTop = require('rc/MenuTop');
global.MenuBottom = require('rc/MenuBottom');
global.NavBar = require('rc/NavBar');
global.ProductList = require('rc/ProductList');
global.ProductGroup = require('rc/ProductGroup');
global.ChildrenProducts = require('rc/ChildrenProducts');
global.CategoriesShow = require('rc/CategoriesShow');
global.ErrorPage = require('./react/components/ErrorPage');
global.CategoriesShowChildren = require('rc/CategoriesShowChildren');
global.PostProducts = require('rc/common/PostProducts');
global.DictionaryEntitiesShow = require('rc/DictionaryEntitiesShow');
global.ProductArchived = require('rc/ProductArchived');
global.BlogPost = require('./react/components/BlogPost');
global.BlogPostList = require('rc/BlogPostList');
global.ProductSearch = require('rc/ProductSearch');
global.WelcomeChildren = require('rc/WelcomeChildren');
global.Welcome = require('rc/Welcome');
global.Lookbook = require('./react/components/Lookbook');
global.ContentPage = require('./react/components/ContentPage');
global.Dictionary = require('./react/components/Dictionary');
global.OrderCancelled = require('rc/OrderCancelled');
global.OrderCreated = require('rc/OrderCreated');
global.OrderPaid = require('rc/OrderPaid');
global.OrderPayment = require('rc/OrderPayment');
global.OrderShow = require('rc/OrderShow');
global.Payment = require('./react/components/Payment');
global.ClientSessionNew = require('rc/ClientSessionNew');
global.Cabinet = require('./react/components/Cabinet');

global.CartPage = require('rc/Cart/CartPage');
global.CategoriesShowChildrenPage = require('rc/CategoriesShowChildren/CategoriesShowChildrenPage');
global.CategoriesShowPage = require('rc/CategoriesShow/CategoriesShowPage');
global.DictionaryEntitiesShowPage = require('rc/DictionaryEntitiesShow/DictionaryEntitiesShowPage');
global.ProductArchivedPage = require('rc/ProductArchived/ProductArchivedPage');
global.ProductSearchPage = require('rc/ProductSearch/ProductSearchPage');
global.WelcomeChildrenPage = require('rc/WelcomeChildren/WelcomeChildrenPage');
global.WelcomePage = require('rc/Welcome/WelcomePage');
global.ClientSessionNewPage = require('rc/ClientSessionNew/ClientSessionNewPage');
global.OrderCancelledPage = require('rc/OrderCancelled/OrderCancelledPage');
global.OrderCreatedPage = require('rc/OrderCreated/OrderCreatedPage');
global.OrderPage = require('rc/Order/OrderPage');

import './react/application';
