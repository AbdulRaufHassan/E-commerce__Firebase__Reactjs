import React, { useContext, useEffect } from "react";
import "../css/App.css";
import "../css/homePage.css";
import { useNavigate } from "react-router-dom";
import {
  allProductsContext,
  latestCollectionContext,
} from "../../context/index.js";
import ShowProducts from "./ShowProducts.jsx";

function LatestCollection() {
  const latestProducts = useContext(latestCollectionContext);
  const navigate = useNavigate();

  const handleProductDetailClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

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
