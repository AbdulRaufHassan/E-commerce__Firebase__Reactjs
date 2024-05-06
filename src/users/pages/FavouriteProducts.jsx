import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import { allProductsContext, currentUserDataContext } from "../../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { favouriteToggleContext } from "../../context/FavouriteToggleContext";

function FavouriteProducts() {
  const { currentUserData } = useContext(currentUserDataContext);
  const allProducts = useContext(allProductsContext);
  const navigate = useNavigate();
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const removeFavourite = useContext(favouriteToggleContext);

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  useEffect(() => {
    const filterProducts = allProducts.filter((product) =>
      currentUserData.favouriteItems.includes(product.productId)
    );
    setFavouriteProducts(filterProducts);
  }, [currentUserData, allProducts]);
  return (
    <div className="w-full min-h-screen max-h-fit relative flex flex-col">
      <Header />
      <main className="flex flex-col flex-1">
        <div className="h-[100px] sm:h-[150px] md:h-[150px] lg:h-[88px] w-full"></div>
        <div
          className="h-52 w-full bg-slate-800 flex flex-col justify-center items-center"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <h1 className="text-6xl montserrat-font text-white font-bold">
            Favourite List
          </h1>
        </div>
        {favouriteProducts.length > 0 ? (
          <>
            <h6 className="ml-4 mb-4 mt-10 montserrat-font text-2xl text-gray-500 font-semibold">
              {favouriteProducts.length == 1
                ? `${favouriteProducts.length} item`
                : `${favouriteProducts.length} items`}
            </h6>
            <ul className="mb-24">
              {favouriteProducts.map(({ imgUrl, name, price, productId }) => (
                <li
                  key={productId}
                  className="w-4/5 h-auto p-4 mx-auto my-8 box-border flex items-center bg-gray-300"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                >
                  <div className="w-auto h-auto flex items-center">
                    <div className="min-w-28 max-w-28 h-auto">
                      <img
                        src={imgUrl}
                        className="h-24 cover cursor-pointer"
                        onClick={() => handleProductClick(productId)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1
                        className="font-bold text-2xl montserrat-font cursor-pointer"
                        onClick={() => handleProductClick(productId)}
                      >
                        {name}
                      </h1>
                      <h6 className="nunito-font font-semibold text-xl text-gray-500">
                        RS {price}
                      </h6>
                    </div>
                  </div>
                  <div className="flex-1 h-auto flex items-center justify-end">
                    <button className="w-48 h-12 bg-teal-500 text-white text-lg mr-8 font-medium rounded-3xl montserrat-font">
                      Add To Cart
                    </button>
                    <button onClick={() => removeFavourite(productId)}>
                      <CloseOutlined className="text-3xl" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mb-16 w-full flex justify-center items-center flex-1 montserrat-font text-2xl">
            <h1>No favourite products yet!</h1>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default FavouriteProducts;
