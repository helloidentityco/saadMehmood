'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import type { Product } from '@/lib/db/schema';

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  fabricType: string;
  price: number;
  quantity: number;
  image: string;
  meters?: string;
  colorName?: string | null;
}

export interface SessionUser {
  id: number | string;
  email: string;
  role: 'user' | 'admin' | string;
  fullName?: string;
}

interface CartContextType {
  cart: CartItem[];
  isLoaded: boolean;
  mounted: boolean;
  user: SessionUser | null;
  isAdmin: boolean;
  addToCart: (product: Product | CartItem, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = 'saad_mehmood_cart_guest_v2';

function getStorageKey(user: SessionUser | null): string | null {
  if (!user) return GUEST_CART_KEY;
  if (user.role === 'admin') return null; // Admin has no cart
  return `saad_mehmood_cart_user_${user.id}`;
}

function parseCookieUser(): SessionUser | null {
  if (typeof document === 'undefined') return null;
  const matchRole = document.cookie.match(/(?:^|;\s*)sm_user_role=([^;]+)/);
  const matchId = document.cookie.match(/(?:^|;\s*)sm_user_id=([^;]+)/);
  if (matchRole && matchId) {
    return {
      id: matchId[1],
      role: matchRole[1],
      email: '',
    };
  }
  return null;
}

function normalizeStoredCart(rawItems: unknown): CartItem[] {
  if (!Array.isArray(rawItems)) return [];
  const merged = new Map<number, CartItem>();

  for (const raw of rawItems) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Record<string, unknown>;
    const productId = Number(item.productId ?? item.id);
    if (!Number.isFinite(productId) || productId <= 0) continue;

    const qty = Number(item.quantity);
    const validQty = Number.isFinite(qty) && qty > 0 ? Math.floor(qty) : 1;

    const existing = merged.get(productId);
    if (existing) {
      merged.set(productId, {
        ...existing,
        quantity: existing.quantity + validQty,
      });
    } else {
      merged.set(productId, {
        productId,
        slug: typeof item.slug === 'string' ? item.slug : '',
        name: typeof item.name === 'string' ? item.name : '',
        fabricType: typeof item.fabricType === 'string' ? item.fabricType : '',
        price: Number(item.price || 0),
        quantity: validQty,
        image: typeof item.image === 'string' ? item.image : '',
        meters:
          typeof item.meters === 'string'
            ? item.meters
            : '4.5 Meters (56" Width)',
        colorName: typeof item.colorName === 'string' ? item.colorName : null,
      });
    }
  }

  return Array.from(merged.values());
}

export function CartProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: SessionUser | null;
}) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);
  const [mounted, setMounted] = useState(false);
  const [cartState, setCartState] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Authoritative synchronous ref to prevent React Strict Mode double-updater increments
  const cartRef = useRef<CartItem[]>([]);

  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  // Compute storage key based on active user
  const activeKey = useMemo(() => getStorageKey(user), [user]);

  const persistCartToStorage = useCallback(
    (items: CartItem[]) => {
      if (typeof window === 'undefined' || !activeKey || isAdmin) return;
      try {
        localStorage.setItem(activeKey, JSON.stringify(items));
      } catch (e) {
        console.error('Storage save failed:', e);
      }
    },
    [activeKey, isAdmin]
  );

  // Helper to load items from active localStorage key
  const loadCartFromStorage = useCallback(() => {
    if (typeof window === 'undefined' || !activeKey || isAdmin) {
      cartRef.current = [];
      setCartState([]);
      return;
    }
    try {
      const raw = localStorage.getItem(activeKey);
      if (raw) {
        const parsed = normalizeStoredCart(JSON.parse(raw));
        cartRef.current = parsed;
        setCartState(parsed);
      } else {
        cartRef.current = [];
        setCartState([]);
      }
    } catch {
      cartRef.current = [];
      setCartState([]);
    }
  }, [activeKey, isAdmin]);

  // Initial client hydration check & session verification
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);

      // 1. Check for cookie indicating logout purge
      if (typeof document !== 'undefined' && document.cookie.includes('sm_clear_cart=true')) {
        try {
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (
              k &&
              (k.startsWith('saad_mehmood_cart') ||
                k.startsWith('sm_fabrics_cart') ||
                k.includes('cart'))
            ) {
              keysToRemove.push(k);
            }
          }
          keysToRemove.forEach((k) => localStorage.removeItem(k));
        } catch {
          // ignore
        }
        document.cookie =
          'sm_clear_cart=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        cartRef.current = [];
        setCartState([]);
        return;
      }

      // 2. Client-side session check if cookie differs
      const cookieUser = parseCookieUser();
      if (cookieUser) {
        setUser((currentUser) => {
          if (
            !currentUser ||
            currentUser.id !== cookieUser.id ||
            currentUser.role !== cookieUser.role
          ) {
            return cookieUser;
          }
          return currentUser;
        });
      } else if (!initialUser) {
        setUser(null);
      }

      // 3. Load active cart
      loadCartFromStorage();
    }, 0);

    return () => clearTimeout(timer);
  }, [initialUser, loadCartFromStorage]);

  // Subscribe only to cross-tab storage changes (never self-dispatching inside state updaters)
  useEffect(() => {
    if (!mounted) return;

    const handleCrossTabStorage = (event: StorageEvent) => {
      if (!event.key || event.key === activeKey) {
        loadCartFromStorage();
      }
    };

    window.addEventListener('storage', handleCrossTabStorage);
    return () => {
      window.removeEventListener('storage', handleCrossTabStorage);
    };
  }, [mounted, activeKey, loadCartFromStorage]);

  /**
   * Add to Cart:
   * - Defaults explicitly to quantity = 1 when omitted or invalid
   * - If item is new to cart, initializes quantity to `quantityToAdd` (1)
   * - If item already exists in cart, increments existing quantity by `quantityToAdd` (1)
   * - Computes outside `setCartState` using `cartRef` so React Strict Mode never double-increments to 2
   */
  const addToCart = useCallback(
    (product: Product | CartItem, quantity: number = 1) => {
      if (isAdmin) {
        console.warn('Cart additions are disabled in Administrator mode.');
        return;
      }

      const parsedQty = Number(quantity);
      const quantityToAdd =
        Number.isFinite(parsedQty) && parsedQty >= 1 ? Math.floor(parsedQty) : 1;

      const rawId = 'id' in product ? product.id : product.productId;
      const productId = Number(rawId);
      if (!Number.isFinite(productId) || productId <= 0) return;

      const currentItems = cartRef.current;
      const existingItem = currentItems.find((item) => item.productId === productId);

      let nextCart: CartItem[];
      if (existingItem) {
        nextCart = currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        const newItem: CartItem = {
          productId,
          slug: 'slug' in product && typeof product.slug === 'string' ? product.slug : '',
          name: typeof product.name === 'string' ? product.name : '',
          fabricType: typeof product.fabricType === 'string' ? product.fabricType : '',
          price: Number(product.price || 0),
          quantity: quantityToAdd,
          image: typeof product.image === 'string' ? product.image : '',
          meters:
            'meters' in product && typeof product.meters === 'string'
              ? product.meters
              : '4.5 Meters (56" Width)',
          colorName:
            'colorName' in product && typeof product.colorName === 'string'
              ? product.colorName
              : null,
        };
        nextCart = [...currentItems, newItem];
      }

      cartRef.current = nextCart;
      setCartState(nextCart);
      persistCartToStorage(nextCart);
      setIsCartOpen(true);
    },
    [isAdmin, persistCartToStorage]
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      if (isAdmin) return;
      const nextCart = cartRef.current.filter((item) => item.productId !== productId);
      cartRef.current = nextCart;
      setCartState(nextCart);
      persistCartToStorage(nextCart);
    },
    [isAdmin, persistCartToStorage]
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (isAdmin) return;
      const parsedQty = Number(quantity);
      if (!Number.isFinite(parsedQty) || parsedQty <= 0) {
        removeFromCart(productId);
        return;
      }
      const nextQty = Math.floor(parsedQty);
      const nextCart = cartRef.current.map((item) =>
        item.productId === productId ? { ...item, quantity: nextQty } : item
      );
      cartRef.current = nextCart;
      setCartState(nextCart);
      persistCartToStorage(nextCart);
    },
    [isAdmin, removeFromCart, persistCartToStorage]
  );

  const clearCart = useCallback(() => {
    cartRef.current = [];
    setCartState([]);
    if (activeKey && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(activeKey);
      } catch {
        // ignore
      }
    }
  }, [activeKey]);

  // Derived state: Safe for SSR
  const effectiveCart = useMemo(
    () => (isAdmin ? [] : cartState),
    [isAdmin, cartState]
  );

  const cartCount = useMemo(
    () =>
      mounted && !isAdmin
        ? effectiveCart.reduce((acc, curr) => acc + curr.quantity, 0)
        : 0,
    [effectiveCart, mounted, isAdmin]
  );

  const cartSubtotal = useMemo(
    () =>
      mounted && !isAdmin
        ? effectiveCart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
        : 0,
    [effectiveCart, mounted, isAdmin]
  );

  const openCart = useCallback(() => {
    if (!isAdmin) setIsCartOpen(true);
  }, [isAdmin]);

  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const openQuickView = useCallback((product: Product) => setQuickViewProduct(product), []);
  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  return (
    <CartContext.Provider
      value={{
        cart: effectiveCart,
        isLoaded: mounted,
        mounted,
        user,
        isAdmin,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen: !isAdmin && isCartOpen,
        openCart,
        closeCart,
        isSearchOpen,
        openSearch,
        closeSearch,
        quickViewProduct,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
