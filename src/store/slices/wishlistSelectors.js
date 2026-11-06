export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectWishlistHydrated = (state) => state.wishlist.isHydrated;
export const selectIsInWishlist = (state, productId) =>
  state.wishlist.items.some((product) => product.id === productId);
