import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import "../css/homePage.css";
import { useNavigate } from "react-router-dom";
import { allProductsContext } from "../../context/index.js";
import ShowProducts from "./ShowProducts.jsx";
import {
  collection,
  db,
  getDocs,
  limit,
  orderBy,
  query,
} from "../../config/index.js";

function LatestCollection() {
  const [latestProducts, setLatestProducts] = useState([]);
  const allProducts = useContext(allProductsContext);
  const navigate = useNavigate();

  const handleProductDetailClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  const getLatestProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const querySnapshot = await getDocs(
        query(productsRef, orderBy("timeStamp", "desc"), limit(10))
      );
      const latestProducts = [];
      querySnapshot.forEach((doc) => {
        latestProducts.push(doc.data());
      });
      setLatestProducts(latestProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLatestProducts();
  }, [allProducts]);

  return (
    <>
      {latestProducts.length > 0 && (
        <div className="w-full h-auto box-border">
          <div className="w-full h-auto flex items-center px-2 box-border pb-14">
            <div className="flex-1 h-[2px] bg-gray-400"></div>
            <h1 className="font-bold text-2xl ubuntu-font mx-5 uppercase">
              Latest Collection
            </h1>
            <div className="flex-1 h-[2px] bg-gray-400"></div>
          </div>
          <ShowProducts
            products={latestProducts}
            onClickFunc={handleProductDetailClick}
          />
        </div>
      )}
    </>
  );
}

export default LatestCollection;
