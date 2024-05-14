import { Popconfirm, Spin, Table } from "antd";
import React, { useContext } from "react";
import "../css/dashboard.css";
import {
  allProductsContext,
  allCategoriesContext,
} from "../../context/index.js";
import {
  DeleteFilled,
  EditFilled,
  LoadingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  arrayRemove,
  collection,
  db,
  deleteDoc,
  deleteObject,
  doc,
  getDocs,
  ref,
  storage,
  updateDoc,
  writeBatch,
} from "../../config/index.js";

function AllProducts({ setOpenModal, setEditProductId }) {
  const allProducts = useContext(allProductsContext);
  const { allCategories } = useContext(allCategoriesContext);
  const tableHead = [
    {
      title: "S.No",
      dataIndex: "no",
      key: "no",
      width: 70,
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

  const deleteProduct = async (productId, categoryId) => {
    try {
      const userDocsRef = collection(db, "users");
      const batch = writeBatch(db);
      const userDocsSnapshot = await getDocs(userDocsRef);
      userDocsSnapshot.forEach((userDoc) => {
        const userData = userDoc.data();
        if (userData && userData.cartItems) {
          const updatedCartItems = userData.cartItems.filter((item) => item.productId != productId);
          batch.update(userDoc.ref, {
            favouriteItems: arrayRemove(productId),
            cartItems: updatedCartItems,
          });
        }
      });
      await batch.commit();
      const categoryRef = doc(db, "categories", categoryId);
      await updateDoc(categoryRef, {
        products: arrayRemove(productId),
      });
      await deleteDoc(doc(db, "products", productId));
      const productImgRef = ref(storage, `products/${productId}`);
      await deleteObject(productImgRef);
    } catch (e) {
      console.log(e);
    }
  };

  return allProducts.length < 1 ? (
    <div className="flex justify-center w-full mt-10">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 60,
              color: "black",
            }}
            spin
          />
        }
      />
    </div>
  ) : (
    <>
      <Table
        pagination={false}
        scroll={{ x: "max-content", y: "calc(100vh - 180px)" }}
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
            const findCategory = allCategories.find(
              (v) => category == v.categoryId
            );
            return {
              key: productId,
              no: index + 1,
              name: name,
              discription: <p className="text-sm">{discription}</p>,
              price,
              category: findCategory?.name,
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
                  <button
                    className="flex flex-col items-center text-blue-950"
                    onClick={() => {
                      setEditProductId(productId);
                      setOpenModal(true);
                    }}
                  >
                    <EditFilled className="text-2xl mb-1" />
                    <span className="text-base montserrat-font">Edit</span>
                  </button>
                  <Popconfirm
                    title="Delete Product"
                    description="Are you sure you want to delete this product?"
                    onConfirm={() => deleteProduct(productId, category)}
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                    }
                  >
                    <button className="flex flex-col items-center text-red-600">
                      <DeleteFilled className="text-2xl mb-1" />
                      <span className="text-base montserrat-font">Delete</span>
                    </button>
                  </Popconfirm>
                </div>
              ),
            };
          }
        )}
      />
    </>
  );
}

export default AllProducts;
