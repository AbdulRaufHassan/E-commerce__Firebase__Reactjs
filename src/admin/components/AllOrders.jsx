import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { collection, db, onSnapshot } from "../../config";
import "../css/dashboard.css";
import { LoadingOutlined } from "@ant-design/icons";

function AllOrders() {
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const getAllOrders = () => {
    setLoading(true);
    const ordersRef = collection(db, "orders");
    onSnapshot(ordersRef, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });
      setAllOrders(orders);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

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
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      width: 280,
    },
    {
      title: "User Uid",
      key: "userUid",
      dataIndex: "userUid",
      width: 280,
    },
    {
      title: "User Email Address",
      key: "userEmail",
      dataIndex: "userEmail",
      width: 280,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: 180,
    },
    {
      title: "Order Status",
      key: "orderStatus",
      dataIndex: "orderStatus",
      width: 130,
    },
    {
      title: "Cart Items",
      key: "cartItems",
      dataIndex: "cartItems",
      width: 1000,
      align: "center",
      className: "removePadding",
    },
  ];
  return loading ? (
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
   allOrders.length > 0 ? <Table
      pagination={false}
      scroll={{ x: "max-content", y: "calc(100vh - 180px)" }}
      columns={tableHead}
      dataSource={allOrders.map((order, i) => {
        console.log(order);
        return {
          key: order.orderId,
          orderId: order.orderId,
          no: `${i + 1}`,
          userEmail: order.userEmailAddress,
          userUid: order.userUid,
          date: order.timeStamp.toDate().toLocaleString(),
          orderStatus: <h6 className="text-green-600">Confirm</h6>,
          cartItems: (
            <div className="flex flex-wrap w-full userCartItems">
              {order.cartItems.map((item) => {
                return (
                  <div
                    key={item.productId}
                    className="flex items-center w-[33%] h-28 mx-[1px] border-r border-slate-300"
                  >
                    <div className="flex items-center justify-center h-24 mx-2">
                      <img
                        src={item.image}
                        className="max-w-[90%] max-h-[90%] bg-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="text-lg font-semibold">
                        {item.productName}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                        <div>{`${item.price} x ${item.quantity} = ${
                          item.price * item.quantity
                        }`}</div>
                        <div className="mx-2 whitespace-nowrap">
                          <span className="text-xs text-slate-400">
                            Category :{" "}
                          </span>
                          {item.category.categoryName}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ),
        };
      })}
    /> : <div className="flex items-center justify-center text-2xl montserrat-font mt-11">No Orders Yet!</div>
  );
}

export default AllOrders;
