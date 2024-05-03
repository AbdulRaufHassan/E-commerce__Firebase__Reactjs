import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import "../css/categoryProducts.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { allCategoriesContext } from "../../context/allCategoriesContext";
import { allProductsContext } from "../../context/allProductsContext";
import { HeartOutlined } from "@ant-design/icons";

function CategoryProducts() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { allCategories } = useContext(allCategoriesContext);
  const getAllProducts = useContext(allProductsContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [allCategoryProducts, setAllCategoryProducts] = useState([]);

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  useEffect(() => {
    const findCategory = allCategories.find(
      (category) => category.categoryId == categoryId
    );
    setCurrentCategory(findCategory);
    const findCategoryProducts = getAllProducts.filter((product) =>
      findCategory.products.includes(product.productId)
    );
    setAllCategoryProducts(findCategoryProducts);
  }, [allCategories, getAllProducts]);

  return (
    <>
      <div>
        <Header />
        <div
          className="mt-[100px] sm:mt-[150px] md:mt-[150px] lg:mt-[88px] h-52 w-full bg-black flex flex-col justify-center items-center"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <h6 className="text-gray-400 mb-2">Category</h6>
          <h1 className="text-6xl montserrat-font text-white font-bold">
            {currentCategory?.name}
          </h1>
        </div>
        <ul className="min-w-fit max-w-fit mx-auto h-auto box-border pt-14 flex justify-center flex-wrap category_products">
          {allCategoryProducts.map(({ imgUrl, name, price, productId }) => (
            <li
              key={productId}
              className="flex flex-col items-center min-w-[300px] max-w-[300px] h-auto rounded-2xl bg-white box-border m-2 overflow-hidden single_product"
            >
              <div
                className="w-full h-auto px-2 py-6 cursor-pointer bg-gray-300 flex items-center justify-center product_img_div"
                onClick={() => handleProductClick(productId)}
              >
                <img src={imgUrl} className="h-52 bg-cover" />
              </div>
              <div className="w-full flex-1 flex flex-col justify-start p-3 box-border">
                <h6
                  className="montserrat-font flex-1 flex items-center font-bold text-2xl mt-2 w-full cursor-pointer"
                  onClick={() => handleProductClick(productId)}
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
    </>
  );
}

export default CategoryProducts;
