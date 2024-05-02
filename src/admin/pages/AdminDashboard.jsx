import { Tabs } from "antd";
import React, { useState } from "react";
import "../css/dashboard.css";
import AllProducts from "../components/AllProducts";
import AllUsers from "../components/AllUsers";
import Header from "../components/Header";

function AdminDashboard() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col relative">
      <Header openModal={openModal} setOpenModal={setOpenModal}/>
      <main className="mt-[88px] w-full h-auto fixed top-0 left-0">
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: "Products",
              key: "1",
              children: <AllProducts openModal={openModal} setOpenModal={setOpenModal}/>,
            },
            {
              label: "orders",
              key: "2",
              children: "all orders",
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
