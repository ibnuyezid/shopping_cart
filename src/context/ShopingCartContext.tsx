import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../component/ShoppingCart";
import { useLocalStoreage } from "../hooks/useLocalStorage";
const ShoppingCartContext = createContext({} as ShoppingCartContext);
type cartprops = {
  children: ReactNode;
};
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeCartQuantity: (id: number) => void;
  cartItems: CartItem[];
};
type CartItem = {
  id: number;
  quantity: number;
};
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: cartprops) {
  const [cartItems, setCartItems] = useLocalStoreage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isopenCart, setIsOpenCart] = useState(false);
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  const openCart = () => {
    setIsOpenCart(true);
  };
  const closeCart = () => {
    setIsOpenCart(false);
  };
  function increaseCartQuantity(id: number) {
    setCartItems((curritems) => {
      if (curritems.find((item) => item.id === id) == null) {
        return [...curritems, { id, quantity: 1 }];
      } else {
        return curritems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((curritems) => {
      if (curritems.find((item) => item.id === id)?.quantity === 1) {
        return curritems.filter((item) => item.id !== id);
      } else {
        return curritems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeCartQuantity(id: number) {
    return setCartItems((curr) => {
      return curr.filter((item) => item.id !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isCartOpen={isopenCart} />
    </ShoppingCartContext.Provider>
  );
}
