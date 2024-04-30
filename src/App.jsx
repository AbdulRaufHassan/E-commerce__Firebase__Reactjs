import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./users/css/App.css";
import HomePage from "./users/pages/HomePage.jsx";
import SigninPage from "./SigninPage.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import { useEffect, useState } from "react";
import { auth, db, doc, getDoc, onAuthStateChanged } from "./config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { adminEmail } from "./constants/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(docRef);
        userDoc.exists() && setUserAuthenticated(user);
      } else {
        setUserAuthenticated(null);
      }
      setLoading(false);
    });
  }, []);
  return loading && !userAuthenticated ? (
    <div className="flex items-center justify-center min-h-screen max-h-fit w-full bg-teal-500">
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !userAuthenticated ? (
              <SigninPage />
            ) : userAuthenticated && userAuthenticated.email === adminEmail ? (
              <Navigate to="/AdminDashboard" />
            ) : (
              <Navigate to="/Home" />
            )
          }
        />
        <Route
          path="/AdminDashboard"
          element={
            userAuthenticated && userAuthenticated.email === adminEmail ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Home"
          element={
            userAuthenticated && userAuthenticated.email != adminEmail ? (
              <HomePage />
            ) : userAuthenticated && userAuthenticated.email === adminEmail ? (
              <Navigate to="/AdminDashboard" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
