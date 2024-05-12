import React, { useContext } from "react";
import "../css/App.css";
import "../css/homePage.css";
import { useNavigate } from "react-router-dom";
import { allCategoriesContext } from "../../context/index.js";

function Categories() {
  const { allCategories } = useContext(allCategoriesContext);
  const navigate = useNavigate();

  return (
    <>
      {allCategories.length > 0 && (
        <div className="w-full h-auto box-border py-16">
          <div className="w-full h-auto flex items-center px-2 box-border">
            <div className="flex-1 h-[2px] bg-gray-400"></div>
            <h1 className="font-bold text-2xl ubuntu-font mx-5 uppercase">
              EXPLORE CATEGORIES
            </h1>
            <div className="flex-1 h-[2px] bg-gray-400"></div>
          </div>
          <div className="h-auto w-full overflow-x-auto hide-scroll-bar">
            <ul className="min-w-fit max-w-fit mx-auto h-auto box-border pt-14 flex categories">
              {allCategories.map(
                (category) =>
                  category.products.length > 0 && (
                    <li
                      key={category.categoryId}
                      className="flex flex-col items-center w-auto h-auto cursor-pointer mx-4 category"
                      onClick={() =>
                        navigate(`/category/${category.categoryId}`)
                      }
                    >
                      <div className="rounded-full bg-teal-400 category_img_div flex justify-center items-center">
                        <img
                          src={category.imgUrl}
                          className="max-h-[80%] max-w-[80%] bg-cover"
                        />
                      </div>
                      <h6 className="text-teal-500 montserrat-font font-semibold text-2xl mt-3">
                        {category.name}
                      </h6>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
