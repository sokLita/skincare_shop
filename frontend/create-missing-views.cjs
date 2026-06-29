const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'src', 'views');

const existingFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.vue'));
const existingNames = new Set(existingFiles.map(f => f.replace('.vue', '')));

const requiredViews = [
  'Home', 'Products', 'ProductDetail', 'Login', 'ForgotPassword', 'ResetPassword',
  'Register', 'Cart', 'Checkout', 'Profile', 'Orders', 'OrderDetail', 'Wishlist',
  'About', 'Contact', 'FAQ', 'Shipping', 'Returns', 'Privacy', 'Terms', 'Search',
  'Category', 'Brand', 'Ingredients', 'SkinConcerns', 'SkincareRoutines', 'Reviews',
  'Blog', 'BlogPost', 'Newsletter', 'Loyalty', 'Referral', 'GiftCards', 'Subscription',
  'Sample', 'Quiz', 'Results', 'Consultation', 'LiveChat', 'TrackOrder', 'Notifications',
  'Settings', 'Addresses', 'PaymentMethods', 'WishlistSharing', 'Compare', 'RecentlyViewed',
  'Bundles', 'BundleDetail', 'Sets', 'SetDetail', 'NewArrivals', 'BestSellers', 'Sale',
  'Clearance', 'PreOrder', 'ComingSoon', 'OutOfStock', 'RestockNotify', 'SizeGuide',
  'IngredientDictionary', 'SkinTypeQuiz', 'RoutineBuilder', 'Community', 'Forum',
  'ForumCategory', 'ForumTopic', 'ProductReviews', 'WriteReview', 'PhotoUpload',
  'VideoReviews', 'ExpertReviews', 'Certificates', 'Awards', 'Press', 'Careers',
  'Affiliate', 'Wholesale', 'Ambassador', 'Influencer', 'Sustainability', 'Charity',
  'Recycling', 'CarbonNeutral', 'CrueltyFree', 'Vegan', 'Organic', 'Natural',
  'Hypoallergenic', 'DermatologistTested', 'ClinicallyProven', 'DermatologistRecommended',
  'AwardWinning', 'TopRated', 'CustomerFavorites', 'StaffPicks', 'Trending', 'Seasonal',
  'LimitedEdition', 'Exclusive', 'Collaborations', 'Events', 'Webinars', 'Workshops',
  'Classes', 'Tutorials', 'HowTo', 'Guides', 'Tips', 'Tricks', 'Hacks', 'LifeChanging',
  'Transformations', 'BeforeAfter', 'SuccessStories', 'Testimonials', 'Ratings', 'Feedback',
  'Surveys', 'Polls', 'Contests', 'Giveaways', 'Sweepstakes', 'Promotions', 'Deals',
  'Discounts', 'Coupons', 'PromoCodes', 'GiftOffers', 'BundleDeals', 'FlashSales',
  'DailyDeals', 'WeeklySpecials', 'MonthlySpecials', 'SeasonalSpecials', 'HolidaySpecials',
  'MemberOnly', 'VIP', 'EarlyAccess', 'BackInStock', 'PriceDrop', 'PriceMatch', 'PriceAlert',
  'StockAlert', 'SavedItems', 'RecentPurchases', 'PurchaseHistory', 'RepeatPurchases',
  'SubscriptionBox', 'AutoReorder', 'RefillReminder', 'ProductReminders', 'SkincareReminders',
  'RoutineReminders', 'AppointmentReminders', 'EventReminders', 'PromoReminders', 'SaleReminders',
  'RestockReminders', 'BackInStockReminders', 'PriceDropReminders', 'WishlistReminders',
  'CartReminders', 'CheckoutReminders', 'PaymentReminders', 'ShippingReminders', 'DeliveryReminders',
  'ReturnReminders', 'ExchangeReminders', 'RefundReminders', 'WarrantyReminders', 'SupportReminders',
  'HelpReminders', 'FAQReminders', 'ContactReminders', 'FeedbackReminders', 'SurveyReminders',
  'PollReminders', 'ContestReminders', 'GiveawayReminders', 'SweepstakesReminders',
  'PromotionReminders', 'DealReminders', 'DiscountReminders', 'CouponReminders', 'PromoCodeReminders',
  'GiftOfferReminders', 'BundleDealReminders', 'FlashSaleReminders', 'DailyDealReminders',
  'WeeklySpecialReminders', 'MonthlySpecialReminders', 'SeasonalSpecialReminders',
  'HolidaySpecialReminders', 'MemberOnlyReminders', 'VIPReminders', 'EarlyAccessReminders',
  'NotFound'
];

const template = `<template>
  <div class="page">
    <h1>{{ pageName }}</h1>
    <p>This page is under construction.</p>
  </div>
</template>

<script setup lang="ts">
const pageName = '{{PAGE_NAME}}';
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
`;

let created = 0;
let skipped = 0;

requiredViews.forEach(viewName => {
  if (existingNames.has(viewName)) {
    skipped++;
    return;
  }
  
  const filePath = path.join(viewsDir, `${viewName}.vue`);
  const content = template.replace(/{{PAGE_NAME}}/g, viewName);
  fs.writeFileSync(filePath, content);
  created++;
});

console.log(`Created ${created} missing view files`);
console.log(`Skipped ${skipped} existing files`);