import { Table } from "antd";
import React, { useContext } from "react";
import "../css/dashboard.css";
import { allProductsContext } from "../../context/allProductsContext";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { allCategoriesContext } from "../../context/allCategoriesContext";

function AllProducts({ openModal, setOpenModal }) {
  const allProducts = useContext(allProductsContext);
  const { allCategories, topCollectionDoc } = useContext(allCategoriesContext);
  const tableHead = [
    {
      title: "S.No",
      dataIndex: "no",
      key: "no",
      width: 50,
      align: "center",
    },
    ,
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: 120,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 200,
    },
    {
      title: "Discription",
      dataIndex: "discription",
      key: "discription",
      width: 600,
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 100,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      align: "center",
      width: 150,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 170,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: 200,
    },
  ];

  return (
    allProducts.length > 0 && (
      <Table
        pagination={false}
        scroll={{ x: "max-content" }}
        columns={tableHead}
        dataSource={allProducts.map(
          (
            {
              productId,
              name,
              price,
              imgUrl,
              timeStamp,
              discription,
              category,
            },
            index
          ) => {
            const categoryName =
              category == topCollectionDoc.categoryId
                ? topCollectionDoc.name
                : allCategories.find((v) => category == v.categoryId).name;
            return {
              key: productId,
              no: index + 1,
              name: name,
              discription: <p className="text-sm">{discription}</p>,
              price,
              category: categoryName,
              image: (
                <div className="flex items-center justify-center h-24">
                  <img
                    src={imgUrl}
                    className="max-w-[90%] max-h-[90%] bg-cover"
                  />
                </div>
              ),
              date: timeStamp?.toDate()?.toDateString(),
              actions: (
                <div className="w-full flex justify-around">
                  <button className="flex flex-col items-center text-blue-950">
                    <EditFilled className="text-2xl mb-1" />
                    <span className="text-base montserrat-font">Edit</span>
                  </button>
                  <button className="flex flex-col items-center text-red-600">
                    <DeleteFilled className="text-2xl mb-1" />
                    <span className="text-base montserrat-font">Delete</span>
                  </button>
                </div>
              ),
            };
          }
        )}
      />
    )
  );
}

export default AllProducts;
