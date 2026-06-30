import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/products/:slug',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  // Admin Auth Routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/AdminLoginPage.vue'),
    meta: { layout: 'blank' }
  },
  {
    path: '/admin/register',
    name: 'AdminRegister',
    component: () => import('../views/AdminRegisterPage.vue'),
    meta: { layout: 'blank' }
  },
  {
    path: '/admin/forgot-password',
    name: 'AdminForgotPassword',
    component: () => import('../views/AdminForgotPassword.vue'),
    meta: { layout: 'blank' }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/google-callback',
    name: 'GoogleCallback',
    component: () => import('../views/GoogleCallback.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/ResetPassword.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/order/:id',
    name: 'OrderDetail',
    component: () => import('../views/OrderDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../views/Wishlist.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('../views/FAQ.vue')
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: () => import('../views/Shipping.vue')
  },
  {
    path: '/returns',
    name: 'Returns',
    component: () => import('../views/Returns.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/Terms.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/brand/:slug',
    name: 'Brand',
    component: () => import('../views/Brand.vue')
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: () => import('../views/Ingredients.vue')
  },
  {
    path: '/skin-concerns',
    name: 'SkinConcerns',
    component: () => import('../views/SkinConcerns.vue')
  },
  {
    path: '/skincare-routines',
    name: 'SkincareRoutines',
    component: () => import('../views/SkincareRoutines.vue')
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: () => import('../views/Reviews.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue')
  },
  {
    path: '/newsletter',
    name: 'Newsletter',
    component: () => import('../views/Newsletter.vue')
  },
  {
    path: '/loyalty',
    name: 'Loyalty',
    component: () => import('../views/Loyalty.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/referral',
    name: 'Referral',
    component: () => import('../views/Referral.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/gift-cards',
    name: 'GiftCards',
    component: () => import('../views/GiftCards.vue')
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import('../views/Subscription.vue')
  },
  {
    path: '/sample',
    name: 'Sample',
    component: () => import('../views/Sample.vue')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('../views/Quiz.vue')
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import('../views/Results.vue')
  },
  {
    path: '/consultation',
    name: 'Consultation',
    component: () => import('../views/Consultation.vue')
  },
  {
    path: '/live-chat',
    name: 'LiveChat',
    component: () => import('../views/LiveChat.vue')
  },
  {
    path: '/track-order',
    name: 'TrackOrder',
    component: () => import('../views/TrackOrder.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Notifications.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/addresses',
    name: 'Addresses',
    component: () => import('../views/Addresses.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/payment-methods',
    name: 'PaymentMethods',
    component: () => import('../views/PaymentMethods.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wishlist-sharing',
    name: 'WishlistSharing',
    component: () => import('../views/WishlistSharing.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import('../views/Compare.vue')
  },
  {
    path: '/recently-viewed',
    name: 'RecentlyViewed',
    component: () => import('../views/RecentlyViewed.vue')
  },
  {
    path: '/bundles',
    name: 'Bundles',
    component: () => import('../views/Bundles.vue')
  },
  {
    path: '/bundle/:slug',
    name: 'BundleDetail',
    component: () => import('../views/BundleDetail.vue')
  },
  {
    path: '/sets',
    name: 'Sets',
    component: () => import('../views/Sets.vue')
  },
  {
    path: '/set/:slug',
    name: 'SetDetail',
    component: () => import('../views/SetDetail.vue')
  },
  {
    path: '/new-arrivals',
    name: 'NewArrivals',
    component: () => import('../views/NewArrivals.vue')
  },
  {
    path: '/best-sellers',
    name: 'BestSellers',
    component: () => import('../views/BestSellers.vue')
  },
  {
    path: '/sale',
    name: 'Sale',
    component: () => import('../views/Sale.vue')
  },
  {
    path: '/clearance',
    name: 'Clearance',
    component: () => import('../views/Clearance.vue')
  },
  {
    path: '/pre-order',
    name: 'PreOrder',
    component: () => import('../views/PreOrder.vue')
  },
  {
    path: '/coming-soon',
    name: 'ComingSoon',
    component: () => import('../views/ComingSoon.vue')
  },
  {
    path: '/out-of-stock',
    name: 'OutOfStock',
    component: () => import('../views/OutOfStock.vue')
  },
  {
    path: '/restock-notify',
    name: 'RestockNotify',
    component: () => import('../views/RestockNotify.vue')
  },
  {
    path: '/size-guide',
    name: 'SizeGuide',
    component: () => import('../views/SizeGuide.vue')
  },
  {
    path: '/ingredient-dictionary',
    name: 'IngredientDictionary',
    component: () => import('../views/IngredientDictionary.vue')
  },
  {
    path: '/skin-type-quiz',
    name: 'SkinTypeQuiz',
    component: () => import('../views/SkinTypeQuiz.vue')
  },
  {
    path: '/routine-builder',
    name: 'RoutineBuilder',
    component: () => import('../views/RoutineBuilder.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/Community.vue')
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('../views/Forum.vue')
  },
  {
    path: '/forum/:category',
    name: 'ForumCategory',
    component: () => import('../views/ForumCategory.vue')
  },
  {
    path: '/forum/:category/:topic',
    name: 'ForumTopic',
    component: () => import('../views/ForumTopic.vue')
  },
  {
    path: '/reviews/:productSlug',
    name: 'ProductReviews',
    component: () => import('../views/ProductReviews.vue')
  },
  {
    path: '/write-review',
    name: 'WriteReview',
    component: () => import('../views/WriteReview.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/photo-upload',
    name: 'PhotoUpload',
    component: () => import('../views/PhotoUpload.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/video-reviews',
    name: 'VideoReviews',
    component: () => import('../views/VideoReviews.vue')
  },
  {
    path: '/expert-reviews',
    name: 'ExpertReviews',
    component: () => import('../views/ExpertReviews.vue')
  },
  {
    path: '/certificates',
    name: 'Certificates',
    component: () => import('../views/Certificates.vue')
  },
  {
    path: '/awards',
    name: 'Awards',
    component: () => import('../views/Awards.vue')
  },
  {
    path: '/press',
    name: 'Press',
    component: () => import('../views/Press.vue')
  },
  {
    path: '/careers',
    name: 'Careers',
    component: () => import('../views/Careers.vue')
  },
  {
    path: '/affiliate',
    name: 'Affiliate',
    component: () => import('../views/Affiliate.vue')
  },
  {
    path: '/wholesale',
    name: 'Wholesale',
    component: () => import('../views/Wholesale.vue')
  },
  {
    path: '/ambassador',
    name: 'Ambassador',
    component: () => import('../views/Ambassador.vue')
  },
  {
    path: '/influencer',
    name: 'Influencer',
    component: () => import('../views/Influencer.vue')
  },
  {
    path: '/sustainability',
    name: 'Sustainability',
    component: () => import('../views/Sustainability.vue')
  },
  {
    path: '/charity',
    name: 'Charity',
    component: () => import('../views/Charity.vue')
  },
  {
    path: '/recycling',
    name: 'Recycling',
    component: () => import('../views/Recycling.vue')
  },
  {
    path: '/carbon-neutral',
    name: 'CarbonNeutral',
    component: () => import('../views/CarbonNeutral.vue')
  },
  {
    path: '/cruelty-free',
    name: 'CrueltyFree',
    component: () => import('../views/CrueltyFree.vue')
  },
  {
    path: '/vegan',
    name: 'Vegan',
    component: () => import('../views/Vegan.vue')
  },
  {
    path: '/organic',
    name: 'Organic',
    component: () => import('../views/Organic.vue')
  },
  {
    path: '/natural',
    name: 'Natural',
    component: () => import('../views/Natural.vue')
  },
  {
    path: '/hypoallergenic',
    name: 'Hypoallergenic',
    component: () => import('../views/Hypoallergenic.vue')
  },
  {
    path: '/dermatologist-tested',
    name: 'DermatologistTested',
    component: () => import('../views/DermatologistTested.vue')
  },
  {
    path: '/clinically-proven',
    name: 'ClinicallyProven',
    component: () => import('../views/ClinicallyProven.vue')
  },
  {
    path: '/dermatologist-recommended',
    name: 'DermatologistRecommended',
    component: () => import('../views/DermatologistRecommended.vue')
  },
  {
    path: '/award-winning',
    name: 'AwardWinning',
    component: () => import('../views/AwardWinning.vue')
  },
  {
    path: '/top-rated',
    name: 'TopRated',
    component: () => import('../views/TopRated.vue')
  },
  {
    path: '/customer-favorites',
    name: 'CustomerFavorites',
    component: () => import('../views/CustomerFavorites.vue')
  },
  {
    path: '/staff-picks',
    name: 'StaffPicks',
    component: () => import('../views/StaffPicks.vue')
  },
  {
    path: '/trending',
    name: 'Trending',
    component: () => import('../views/Trending.vue')
  },
  {
    path: '/seasonal',
    name: 'Seasonal',
    component: () => import('../views/Seasonal.vue')
  },
  {
    path: '/limited-edition',
    name: 'LimitedEdition',
    component: () => import('../views/LimitedEdition.vue')
  },
  {
    path: '/exclusive',
    name: 'Exclusive',
    component: () => import('../views/Exclusive.vue')
  },
  {
    path: '/collaborations',
    name: 'Collaborations',
    component: () => import('../views/Collaborations.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../views/Events.vue')
  },
  {
    path: '/webinars',
    name: 'Webinars',
    component: () => import('../views/Webinars.vue')
  },
  {
    path: '/workshops',
    name: 'Workshops',
    component: () => import('../views/Workshops.vue')
  },
  {
    path: '/classes',
    name: 'Classes',
    component: () => import('../views/Classes.vue')
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: () => import('../views/Tutorials.vue')
  },
  {
    path: '/how-to',
    name: 'HowTo',
    component: () => import('../views/HowTo.vue')
  },
  {
    path: '/guides',
    name: 'Guides',
    component: () => import('../views/Guides.vue')
  },
  {
    path: '/tips',
    name: 'Tips',
    component: () => import('../views/Tips.vue')
  },
  {
    path: '/tricks',
    name: 'Tricks',
    component: () => import('../views/Tricks.vue')
  },
  {
    path: '/hacks',
    name: 'Hacks',
    component: () => import('../views/Hacks.vue')
  },
  {
    path: '/life-changing',
    name: 'LifeChanging',
    component: () => import('../views/LifeChanging.vue')
  },
  {
    path: '/transformations',
    name: 'Transformations',
    component: () => import('../views/Transformations.vue')
  },
  {
    path: '/before-after',
    name: 'BeforeAfter',
    component: () => import('../views/BeforeAfter.vue')
  },
  {
    path: '/success-stories',
    name: 'SuccessStories',
    component: () => import('../views/SuccessStories.vue')
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: () => import('../views/Testimonials.vue')
  },
  {
    path: '/ratings',
    name: 'Ratings',
    component: () => import('../views/Ratings.vue')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('../views/Feedback.vue')
  },
  {
    path: '/surveys',
    name: 'Surveys',
    component: () => import('../views/Surveys.vue')
  },
  {
    path: '/polls',
    name: 'Polls',
    component: () => import('../views/Polls.vue')
  },
  {
    path: '/contests',
    name: 'Contests',
    component: () => import('../views/Contests.vue')
  },
  {
    path: '/giveaways',
    name: 'Giveaways',
    component: () => import('../views/Giveaways.vue')
  },
  {
    path: '/sweepstakes',
    name: 'Sweepstakes',
    component: () => import('../views/Sweepstakes.vue')
  },
  {
    path: '/promotions',
    name: 'Promotions',
    component: () => import('../views/Promotions.vue')
  },
  {
    path: '/deals',
    name: 'Deals',
    component: () => import('../views/Deals.vue')
  },
  {
    path: '/discounts',
    name: 'Discounts',
    component: () => import('../views/Discounts.vue')
  },
  {
    path: '/coupons',
    name: 'Coupons',
    component: () => import('../views/Coupons.vue')
  },
  {
    path: '/promo-codes',
    name: 'PromoCodes',
    component: () => import('../views/PromoCodes.vue')
  },
  {
    path: '/gift-offers',
    name: 'GiftOffers',
    component: () => import('../views/GiftOffers.vue')
  },
  {
    path: '/bundle-deals',
    name: 'BundleDeals',
    component: () => import('../views/BundleDeals.vue')
  },
  {
    path: '/flash-sales',
    name: 'FlashSales',
    component: () => import('../views/FlashSales.vue')
  },
  {
    path: '/daily-deals',
    name: 'DailyDeals',
    component: () => import('../views/DailyDeals.vue')
  },
  {
    path: '/weekly-specials',
    name: 'WeeklySpecials',
    component: () => import('../views/WeeklySpecials.vue')
  },
  {
    path: '/monthly-specials',
    name: 'MonthlySpecials',
    component: () => import('../views/MonthlySpecials.vue')
  },
  {
    path: '/seasonal-specials',
    name: 'SeasonalSpecials',
    component: () => import('../views/SeasonalSpecials.vue')
  },
  {
    path: '/holiday-specials',
    name: 'HolidaySpecials',
    component: () => import('../views/HolidaySpecials.vue')
  },
  {
    path: '/member-only',
    name: 'MemberOnly',
    component: () => import('../views/MemberOnly.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/vip',
    name: 'VIP',
    component: () => import('../views/VIP.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/early-access',
    name: 'EarlyAccess',
    component: () => import('../views/EarlyAccess.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/back-in-stock',
    name: 'BackInStock',
    component: () => import('../views/BackInStock.vue')
  },
  {
    path: '/price-drop',
    name: 'PriceDrop',
    component: () => import('../views/PriceDrop.vue')
  },
  {
    path: '/price-match',
    name: 'PriceMatch',
    component: () => import('../views/PriceMatch.vue')
  },
  {
    path: '/price-alert',
    name: 'PriceAlert',
    component: () => import('../views/PriceAlert.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/stock-alert',
    name: 'StockAlert',
    component: () => import('../views/StockAlert.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/saved-items',
    name: 'SavedItems',
    component: () => import('../views/SavedItems.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/recent-purchases',
    name: 'RecentPurchases',
    component: () => import('../views/RecentPurchases.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/purchase-history',
    name: 'PurchaseHistory',
    component: () => import('../views/PurchaseHistory.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/repeat-purchases',
    name: 'RepeatPurchases',
    component: () => import('../views/RepeatPurchases.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/subscription-box',
    name: 'SubscriptionBox',
    component: () => import('../views/SubscriptionBox.vue')
  },
  {
    path: '/auto-reorder',
    name: 'AutoReorder',
    component: () => import('../views/AutoReorder.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/refill-reminder',
    name: 'RefillReminder',
    component: () => import('../views/RefillReminder.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/product-reminders',
    name: 'ProductReminders',
    component: () => import('../views/ProductReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/skincare-reminders',
    name: 'SkincareReminders',
    component: () => import('../views/SkincareReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/routine-reminders',
    name: 'RoutineReminders',
    component: () => import('../views/RoutineReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/appointment-reminders',
    name: 'AppointmentReminders',
    component: () => import('../views/AppointmentReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/event-reminders',
    name: 'EventReminders',
    component: () => import('../views/EventReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/promo-reminders',
    name: 'PromoReminders',
    component: () => import('../views/PromoReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/sale-reminders',
    name: 'SaleReminders',
    component: () => import('../views/SaleReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/restock-reminders',
    name: 'RestockReminders',
    component: () => import('../views/RestockReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/back-in-stock-reminders',
    name: 'BackInStockReminders',
    component: () => import('../views/BackInStockReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/price-drop-reminders',
    name: 'PriceDropReminders',
    component: () => import('../views/PriceDropReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wishlist-reminders',
    name: 'WishlistReminders',
    component: () => import('../views/WishlistReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/cart-reminders',
    name: 'CartReminders',
    component: () => import('../views/CartReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout-reminders',
    name: 'CheckoutReminders',
    component: () => import('../views/CheckoutReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/payment-reminders',
    name: 'PaymentReminders',
    component: () => import('../views/PaymentReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/shipping-reminders',
    name: 'ShippingReminders',
    component: () => import('../views/ShippingReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/delivery-reminders',
    name: 'DeliveryReminders',
    component: () => import('../views/DeliveryReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/return-reminders',
    name: 'ReturnReminders',
    component: () => import('../views/ReturnReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/exchange-reminders',
    name: 'ExchangeReminders',
    component: () => import('../views/ExchangeReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/refund-reminders',
    name: 'RefundReminders',
    component: () => import('../views/RefundReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/warranty-reminders',
    name: 'WarrantyReminders',
    component: () => import('../views/WarrantyReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/support-reminders',
    name: 'SupportReminders',
    component: () => import('../views/SupportReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/help-reminders',
    name: 'HelpReminders',
    component: () => import('../views/HelpReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/faq-reminders',
    name: 'FAQReminders',
    component: () => import('../views/FAQReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contact-reminders',
    name: 'ContactReminders',
    component: () => import('../views/ContactReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/feedback-reminders',
    name: 'FeedbackReminders',
    component: () => import('../views/FeedbackReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/survey-reminders',
    name: 'SurveyReminders',
    component: () => import('../views/SurveyReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/poll-reminders',
    name: 'PollReminders',
    component: () => import('../views/PollReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contest-reminders',
    name: 'ContestReminders',
    component: () => import('../views/ContestReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/giveaway-reminders',
    name: 'GiveawayReminders',
    component: () => import('../views/GiveawayReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/sweepstakes-reminders',
    name: 'SweepstakesReminders',
    component: () => import('../views/SweepstakesReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/promotion-reminders',
    name: 'PromotionReminders',
    component: () => import('../views/PromotionReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/deal-reminders',
    name: 'DealReminders',
    component: () => import('../views/DealReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/discount-reminders',
    name: 'DiscountReminders',
    component: () => import('../views/DiscountReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/coupon-reminders',
    name: 'CouponReminders',
    component: () => import('../views/CouponReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/promo-code-reminders',
    name: 'PromoCodeReminders',
    component: () => import('../views/PromoCodeReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/gift-offer-reminders',
    name: 'GiftOfferReminders',
    component: () => import('../views/GiftOfferReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/bundle-deal-reminders',
    name: 'BundleDealReminders',
    component: () => import('../views/BundleDealReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/flash-sale-reminders',
    name: 'FlashSaleReminders',
    component: () => import('../views/FlashSaleReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/daily-deal-reminders',
    name: 'DailyDealReminders',
    component: () => import('../views/DailyDealReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/weekly-special-reminders',
    name: 'WeeklySpecialReminders',
    component: () => import('../views/WeeklySpecialReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/monthly-special-reminders',
    name: 'MonthlySpecialReminders',
    component: () => import('../views/MonthlySpecialReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/seasonal-special-reminders',
    name: 'SeasonalSpecialReminders',
    component: () => import('../views/SeasonalSpecialReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/holiday-special-reminders',
    name: 'HolidaySpecialReminders',
    component: () => import('../views/HolidaySpecialReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member-only-reminders',
    name: 'MemberOnlyReminders',
    component: () => import('../views/MemberOnlyReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/vip-reminders',
    name: 'VIPReminders',
    component: () => import('../views/VIPReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/early-access-reminders',
    name: 'EarlyAccessReminders',
    component: () => import('../views/EarlyAccessReminders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'CatchAll',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (window.location.hash.startsWith('#/')) {
    const hashPath = window.location.hash.slice(1)
    window.history.replaceState(null, '', hashPath)
    next(hashPath)
    return
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
