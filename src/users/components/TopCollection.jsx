import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import "../css/homePage.css";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { allProductsContext } from "../../context/allProductsContext";
import { allCategoriesContext } from "../../context/allCategoriesContext";

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
      topCollectionDoc.products.includes(product.productId)
    );
    setTopCollectionProducts(topProductsFilter);
  }, [allProducts, topCollectionDoc]);

  return (
    <>
      {topCollectionProducts.length > 0 && (
        <div className="w-full h-auto box-border mb-6">
          <div className="w-full h-auto flex items-center px-2 box-border">
            <div className="flex-1 h-[2px] bg-gray-400"></div>
            <h1 className="font-bold text-2xl ubuntu-font mx-5 uppercase">
              Top Collection
            </h1>
            <div className="flex-1 h-[2px] bg-gray-400"></div>
          </div>
          <ul className="min-w-fit max-w-fit mx-auto h-auto box-border pt-14 flex justify-center flex-wrap top_collection">
            {topCollectionProducts.map(({ imgUrl, name, price, productId }) => (
              <li
                key={productId}
                className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_product"
              >
                <div
                  className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center product_img_div"
                  onClick={() => handleProductDetailClick(productId)}
                >
                  <img src={imgUrl} className="h-52 bg-cover" />
                </div>
                <div className="w-full p-3 box-border">
                  <h6
                    className="montserrat-font font-bold text-2xl mt-2 w-full cursor-pointer"
                    onClick={() => handleProductDetailClick(productId)}
                  >
                    {name}
                  </h6>
                  <div className="flex items-center justify-between">
                    <h6 className="nunito-font font-semibold text-base mt-1 mb-2 w-full text-gray-400">
                      RS {price}
                    </h6>
                    <button>
                      <HeartOutlined className="text-3xl text-gray-500" />
                    </button>
                  </div>
                  <button className="w-full h-12 bg-teal-500 text-white text-lg font-medium rounded-lg mt-4 montserrat-font">
                    Add To Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default TopCollection;
