import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./css/App.css";
import HomePage from "./pages/HomePage.jsx";
import SigninPage from "./pages/SigninPage.jsx";
import { useEffect, useState } from "react";
import { auth, db, doc, getDoc, onAuthStateChanged } from "./config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  const [loading, setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(docRef);
        userDoc.exists() && setUserAuthenticated(true);
      } else {
        setUserAuthenticated(false);
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
            !userAuthenticated ? <SigninPage /> : <Navigate to="/Home" />
          }
        />
        <Route
          path="/Home"
          element={userAuthenticated ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
