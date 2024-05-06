import React, { useContext, useEffect, useState } from "react";
import "../css/App.css";
import "../css/showProducts.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  allCategoriesContext,
  allProductsContext,
} from "../../context/index.js";
import ShowProducts from "../components/ShowProducts.jsx";
import Footer from "../components/Footer.jsx";

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
    <div className="min-h-screen max-h-fit w-full relative">
      <Header />
      <main>
        <div className="h-[100px] sm:h-[150px] md:h-[150px] lg:h-[88px] w-full"></div>
        <div
          className="h-52 w-full bg-slate-800 flex flex-col justify-center items-center"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <h6 className="text-gray-400 mb-2">Category</h6>
          <h1 className="text-6xl montserrat-font text-white font-bold">
            {currentCategory?.name}
          </h1>
        </div>
        <h6 className="ml-4 mb-4 mt-10 montserrat-font text-2xl text-gray-500 font-semibold">
          {allCategoryProducts.length} items
        </h6>
        <ShowProducts
          products={allCategoryProducts}
          onClickFunc={handleProductClick}
        />
      </main>
      <Footer />
    </div>
  );
}

export default CategoryProducts;
