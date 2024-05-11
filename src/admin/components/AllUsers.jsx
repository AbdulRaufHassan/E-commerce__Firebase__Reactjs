import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { auth, collection, db, onSnapshot, query, where } from "../../config";
import { LoadingOutlined } from "@ant-design/icons";
import "../css/dashboard.css";

function AllUsers() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const getAllUsers = () => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("uid", "!=", auth.currentUser.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setAllUsers(users);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);
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
    <Table
      pagination={false}
      scroll={{ x: "max-content", y: "calc(100vh - 180px)" }}
      columns={[
        {
          title: "S.No",
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
          title: "Email",
          key: "email",
          dataIndex: "email",
        },
        {
          title: "uid",
          key: "uid",
          dataIndex: "uid",
        },
        {
          title: "Date",
          key: "date",
          dataIndex: "date",
        },
      ]}
      dataSource={allUsers.map((user, i) => {
        return {
          key: user.uid,
          no: `${i + 1}`,
          name: user.name,
          email: user.emailAddress,
          uid: user.uid,
          date: user.joinDate.toDate().toDateString(),
        };
      })}
    />
  );
}

export default AllUsers;
