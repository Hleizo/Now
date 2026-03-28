"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductById } from "@/data/storeData";
import type { CartItem } from "@/types/store";

type ToastKind = "success" | "info";

interface StoreToast {
  id: number;
  message: string;
  kind: ToastKind;
}

interface StoreContextValue {
  cartItems: CartItem[];
  wishlistIds: string[];
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
  toast: StoreToast | null;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  dismissToast: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "now-cart";
const WISHLIST_KEY = "now-wishlist";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [toast, setToast] = useState<StoreToast | null>(null);

  const showToast = (message: string, kind: ToastKind = "success") => {
    setToast({
      id: Date.now(),
      message,
      kind,
    });
  };

  const dismissToast = () => setToast(null);

  useEffect(() => {
    const rawCart = window.localStorage.getItem(CART_KEY);
    const rawWishlist = window.localStorage.getItem(WISHLIST_KEY);

    if (rawCart) {
      try {
        setCartItems(JSON.parse(rawCart));
      } catch {
        setCartItems([]);
      }
    }

    if (rawWishlist) {
      try {
        setWishlistIds(JSON.parse(rawWishlist));
      } catch {
        setWishlistIds([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = (productId: string) => {
    const product = getProductById(productId);
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { productId, quantity: 1 }];
    });

    if (product) {
      showToast(`${product.title} added to cart.`);
    }
  };

  const removeFromCart = (productId: string) => {
    const product = getProductById(productId);
    setCartItems((current) => current.filter((item) => item.productId !== productId));
    if (product) {
      showToast(`${product.title} removed from cart.`, "info");
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    showToast("Cart cleared.", "info");
  };

  const toggleWishlist = (productId: string) => {
    const product = getProductById(productId);
    const alreadyWishlisted = wishlistIds.includes(productId);

    setWishlistIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );

    if (product) {
      showToast(
        alreadyWishlisted
          ? `${product.title} removed from wishlist.`
          : `${product.title} saved to wishlist.`,
        alreadyWishlisted ? "info" : "success",
      );
    }
  };

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return product ? sum + product.price * item.quantity : sum;
      }, 0),
    [cartItems],
  );

  const value: StoreContextValue = {
    cartItems,
    wishlistIds,
    cartCount,
    wishlistCount: wishlistIds.length,
    cartSubtotal,
    toast,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
