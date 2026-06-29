# TODO - Cart & Wishlist (Laravel + Vue + Pinia)

## Progress
- [x] Repo inspected (cart store, wishlist store, Navbar, ProductList, ProductDetail, Cart view)

## Implementation Steps
- [ ] Step 1: Update `frontend/src/stores/cart.ts` to be localStorage-backed, de-dupe by `product_id`, and persist immediately.
- [ ] Step 2: Update `frontend/src/stores/wishlist.ts` to be localStorage-backed, de-dupe by `product_id`, and persist immediately.
- [ ] Step 3: Update `frontend/src/components/products/ProductList.vue` to remove `$toast` for Add to Cart and rely on store updates.
- [ ] Step 4: Update `frontend/src/components/products/ProductDetail.vue`:
  - remove `$toast` for Add to Cart
  - remove server wishlist check and heart state should come from Pinia store
  - no toast/popup on wishlist/cart actions
- [x] Step 5: Update `frontend/src/components/cart/Cart.vue` to remove `confirm()` and `$toast` for cart update/remove actions.
- [ ] Step 6: Quick verification:
  - Add to Cart increments qty + badge immediately
  - Wishlist badge increments + no duplicates
  - localStorage persistence works across refresh
