import { Table } from "antd";
import React, { useEffect, useState } from "react";
import "../css/dashboard.css";

function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "No",
          dataIndex: "no",
          key: "no",
        },
        ,
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
        },
        {
          title: "Action",
          key: "action",
        },
      ]}
      dataSource={[
        {
          key: "1",
          no: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
      ]}
    />
  );
}

export default AllProducts;
