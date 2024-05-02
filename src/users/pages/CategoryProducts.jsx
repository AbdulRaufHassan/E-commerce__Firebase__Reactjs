import React from "react";
import "../css/App.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function CategoryProducts() {
  const { categoryId } = useParams();
  console.log(categoryId);

  return (
    <>
      <div>
        <Header />
      </div>
    </>
  );
}

export default CategoryProducts;
