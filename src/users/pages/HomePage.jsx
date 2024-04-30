import React, { useState } from "react";
import "../css/App.css";
import "../css/homePage.css";
import Header from "../components/Header";
import { Carousel } from "antd";
import CAROUSEL_IMAGE1 from "../assets/images/carousel_img_1.jpg";
import CAROUSEL_IMAGE2 from "../assets/images/carousel_img_2.webp";
import CAROUSEL_IMAGE3 from "../assets/images/carousel_img_3.png";
import Categories from "../components/Categories";
import TopCollection from "../components/TopCollection";
import Footer from "../components/Footer";
import { allProductsContext } from "../context/allProductsContext";
import { useEffect } from "react";
import { collection, db, onSnapshot } from "../../config";

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = () => {
    try {
      onSnapshot(collection(db, "products"), (querySnapshot) => {
        const tempArr = [];
        querySnapshot.forEach((doc) => {
          tempArr.push(doc.data());
        });
        setAllProducts(tempArr);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <allProductsContext.Provider value={allProducts}>
      <div className="flex flex-col relative">
        <Header />
        <main className="mt-[88px] w-full h-auto">
          <Carousel autoplay={true}>
            <img
              src={CAROUSEL_IMAGE1}
              className="w-full xs:h-[250px] md:h-[310px] lg:h-[350px] xl:h-[552px] object-fill"
            />
            <img
              src={CAROUSEL_IMAGE2}
              className="w-full xs:h-[250px] md:h-[310px] lg:h-[350px] xl:h-[552px] object-cover"
            />
            <img
              src={CAROUSEL_IMAGE3}
              className="w-full xs:h-[250px] md:h-[310px] lg:h-[350px] xl:h-[552px] object-contain"
            />
          </Carousel>
          <Categories />
          <TopCollection />
          <Footer />
        </main>
      </div>
    </allProductsContext.Provider>
  );
}

export default HomePage;
