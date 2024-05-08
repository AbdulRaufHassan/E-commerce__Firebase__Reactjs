import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import "../css/homePage.css";
import { useNavigate } from "react-router-dom";
import {
  allProductsContext,
  allCategoriesContext,
} from "../../context/index.js";
import ShowProducts from "./ShowProducts.jsx";

function TopCollection() {
  const [topCollectionProducts, setTopCollectionProducts] = useState([]);
  const allProducts = useContext(allProductsContext);
  const { topCollectionDoc } = useContext(allCategoriesContext);
  const navigate = useNavigate();

  const handleProductDetailClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  useEffect(() => {
    const topProductsFilter = allProducts.filter((product) =>
      topCollectionDoc?.products?.includes(product.productId)
    );
    setTopCollectionProducts(topProductsFilter);
  }, [allProducts, topCollectionDoc]);

  return (
    <>
      {topCollectionProducts.length > 0 && (
        <div className="w-full h-auto box-border">
          <div className="w-full h-auto flex items-center px-2 box-border pb-14">
            <div className="flex-1 h-[2px] bg-gray-400"></div>
            <h1 className="font-bold text-2xl ubuntu-font mx-5 uppercase">
              Top Collection
            </h1>
            <div className="flex-1 h-[2px] bg-gray-400"></div>
          </div>
          <ShowProducts
            products={topCollectionProducts}
            onClickFunc={handleProductDetailClick}
          />
        </div>
      )}
    </>
  );
}

export default TopCollection;
