import { Tabs } from "antd";
import React, { useState } from "react";
import "../css/dashboard.css";
import AllProducts from "../components/AllProducts";
import AllUsers from "../components/AllUsers";
import Header from "../components/Header";
import AllOrders from "../components/AllOrders";

function AdminDashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  return (
    <div className="flex flex-col relative">
      <Header
        openModal={openModal}
        setOpenModal={setOpenModal}
        editProductId={editProductId}
        setEditProductId={setEditProductId}
      />
      <main className="mt-[88px] w-full h-auto fixed top-0 left-0">
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: "Products",
              key: "1",
              children: (
                <AllProducts
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  editProductId={editProductId}
                  setEditProductId={setEditProductId}
                />
              ),
            },
            {
              label: "orders",
              key: "2",
              children: <AllOrders />,
            },
            {
              label: "users",
              key: "3",
              children: <AllUsers />,
            },
          ]}
        />
      </main>
    </div>
  );
}

export default AdminDashboard;
