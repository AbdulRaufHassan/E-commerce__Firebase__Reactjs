import React, { createContext, useContext, useEffect } from "react";
import { currentUserDataContext } from "./index.js";
import { db, doc, updateDoc } from "../config/index.js";

export const cartItemToggleContext = createContext();

export const CartItemToggleProvider = ({ children }) => {
  const { currentUserData } = useContext(currentUserDataContext);

  const toggleCart = async (cartItem) => {
    let updatedUserData = { ...currentUserData };

    const findCartProductIndex = updatedUserData.cartItems.findIndex(
      (item) => item.productId == cartItem.productId
    );

    if (findCartProductIndex == -1) {
      updatedUserData.cartItems.push(cartItem);
    } else {
      updatedUserData.cartItems.splice(findCartProductIndex, 1);
    }

    try {
      const userDocRef = doc(db, "users", currentUserData.uid);
      await updateDoc(userDocRef, {
        cartItems: updatedUserData.cartItems,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setCartItemLocalStrg = () => {
    let localStrg_cartItems = [];
    const getCartLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    if (getCartLocalStorage) {
      currentUserData.cartItems.forEach((item) => {
        const findItemLocalStrg = getCartLocalStorage.find(
          (v) => v.productId === item.productId
        );
        if (findItemLocalStrg) {
          localStrg_cartItems.push({
            productId: findItemLocalStrg.productId,
            quantity: findItemLocalStrg.quantity,
          });
        } else {
          localStrg_cartItems.push({
            productId: item.productId,
            quantity: item.quantity,
          });
        }
      });
    } else {
      localStrg_cartItems = currentUserData.cartItems;
    }
    localStorage.setItem("cartItems", JSON.stringify(localStrg_cartItems));
  };
  useEffect(() => {
    currentUserData?.cartItems && setCartItemLocalStrg();
  }, [currentUserData]);

  return (
    <cartItemToggleContext.Provider
      value={{ toggleCart, setCartItemLocalStrg }}
    >
      {children}
    </cartItemToggleContext.Provider>
  );
};
