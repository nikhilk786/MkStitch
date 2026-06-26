import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type AddToCartPayload = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

const initialState: CartState = {
  items: [],
};

function getCartItemKey(item: Pick<CartItem, "id" | "size" | "color">) {
  return `${item.id}-${item.size}-${item.color}`;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, size, color, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          getCartItemKey(item) ===
          getCartItemKey({ id: product.id, size, color }),
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        return;
      }

      state.items.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        color,
        quantity,
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => getCartItemKey(item) !== action.payload,
      );
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (cartItem) => getCartItemKey(cartItem) === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (cartItem) => getCartItemKey(cartItem) === action.payload,
      );

      if (!item) {
        return;
      }

      if (item.quantity === 1) {
        state.items = state.items.filter(
          (cartItem) => getCartItemKey(cartItem) !== action.payload,
        );
        return;
      }

      item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
export { getCartItemKey };
