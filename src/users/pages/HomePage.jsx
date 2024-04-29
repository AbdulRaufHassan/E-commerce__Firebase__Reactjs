import React from "react";
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
import { FieldValue, addDoc, collection, db } from "../../config";

function HomePage() {
  const addItemTemp = async () => {
    await addDoc(collection(db, "products"), {
      name: "White Tea Shirt",
      img_url:
        "https://apparelstudio.pk/cdn/shop/products/b2_1200x1200.png?v=1707680048",
      discription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe officiis eveniet cum, quod ad possimus tempore sit cupiditate consequatur vitae cumque asperiores magni recusandae tenetur dicta nihil laudantium voluptatem a.",
      price: 450,
      product_id: 1,
    });
  };
  return (
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
        {/* add products temporary */}
        <button onClick={addItemTemp}>add item</button>
        <TopCollection />
        <Footer />
      </main>
    </div>
  );
}

export default HomePage;
