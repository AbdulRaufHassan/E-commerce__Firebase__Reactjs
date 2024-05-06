import React, { createContext, useContext, useState } from "react";
import { currentUserDataContext } from "./index.js";
import { db, doc, updateDoc } from "../config/index.js";

export const favouriteToggleContext = createContext();

export const FavouriteToggleProvider = ({ children }) => {
  const { currentUserData, setCurrentUserData } = useContext(
    currentUserDataContext
  );

  const toggleFavourite = async (productId) => {
    let updatedUserData = { ...currentUserData };

    if (updatedUserData.favouriteItems.includes(productId)) {
      updatedUserData.favouriteItems = updatedUserData.favouriteItems.filter(
        (item) => item !== productId
      );
    } else {
      updatedUserData.favouriteItems.push(productId);
    }

    try {
      const userDocRef = doc(db, "users", currentUserData.uid);
      await updateDoc(userDocRef, {
        favouriteItems: updatedUserData.favouriteItems,
      });
      console.log("Update Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <favouriteToggleContext.Provider value={toggleFavourite}>
      {children}
    </favouriteToggleContext.Provider>
  );
};
