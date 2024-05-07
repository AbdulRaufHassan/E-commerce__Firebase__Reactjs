import React, { createContext, useContext } from "react";
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

  return (
    <cartItemToggleContext.Provider value={toggleCart}>
      {children}
    </cartItemToggleContext.Provider>
  );
};
