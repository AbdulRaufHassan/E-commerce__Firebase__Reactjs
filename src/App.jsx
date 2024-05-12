import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./users/css/App.css";
import HomePage from "./users/pages/HomePage.jsx";
import SigninPage from "./SigninPage.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import ProductDetail from "./users/pages/ProductDetail.jsx";
import CategoryProducts from "./users/pages/CategoryProducts.jsx";
import { useEffect, useState } from "react";
import {
  auth,
  collection,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
  onSnapshot,
} from "./config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { adminEmail } from "./constants/index.js";
import {
  allProductsContext,
  allCategoriesContext,
  currentUserDataContext,
} from "./context/index.js";
import { FavouriteToggleProvider } from "./context/FavouriteToggleContext.jsx";
import FavouriteProducts from "./users/pages/FavouriteProducts.jsx";
import CartProducts from "./users/pages/CartProducts.jsx";
import { CartItemToggleProvider } from "./context/CartTogglecontext.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);

  const getAllProducts = () => {
    try {
      onSnapshot(collection(db, "products"), (querySnapshot) => {
        const tempArr = [];
        querySnapshot.forEach((doc) => {
          tempArr.push(doc.data());
        });
        setAllProducts(tempArr);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentUserDoc = () => {
    try {
      onSnapshot(doc(db, "users", userAuthenticated.uid), (doc) => {
        setCurrentUserData(doc.data());
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getAllCategories = () => {
    try {
      onSnapshot(collection(db, "categories"), (querySnapshot) => {
        const tempArr = [];
        querySnapshot.forEach((doc) => {
          tempArr.push(doc.data());
        });
        setAllCategories(tempArr);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userAuthenticated?.uid) {
      getCurrentUserDoc();
      getAllProducts();
      getAllCategories();
    }
  }, [userAuthenticated]);

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
      <currentUserDataContext.Provider
        value={{ currentUserData, setCurrentUserData }}
      >
        <allProductsContext.Provider value={allProducts}>
          <allCategoriesContext.Provider value={{ allCategories }}>
            <CartItemToggleProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    !userAuthenticated ? (
                      <SigninPage />
                    ) : userAuthenticated &&
                      userAuthenticated.email === adminEmail ? (
                      <Navigate to="/AdminDashboard" />
                    ) : (
                      <Navigate to="/Home" />
                    )
                  }
                />
                <Route
                  path="/AdminDashboard"
                  element={
                    userAuthenticated &&
                    userAuthenticated.email === adminEmail ? (
                      <AdminDashboard />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/Home"
                  element={
                    userAuthenticated &&
                    userAuthenticated.email != adminEmail ? (
                      <FavouriteToggleProvider>
                        <HomePage />
                      </FavouriteToggleProvider>
                    ) : userAuthenticated &&
                      userAuthenticated.email === adminEmail ? (
                      <Navigate to="/AdminDashboard" />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/productDetail/:productId"
                  element={
                    !userAuthenticated ? (
                      <Navigate to="/" />
                    ) : userAuthenticated &&
                      userAuthenticated.email === adminEmail ? (
                      <Navigate to="/AdminDashboard" />
                    ) : (
                      <FavouriteToggleProvider>
                        <ProductDetail />
                      </FavouriteToggleProvider>
                    )
                  }
                />
                <Route
                  path="/category/:categoryId"
                  element={
                    !userAuthenticated ? (
                      <Navigate to="/" />
                    ) : userAuthenticated &&
                      userAuthenticated.email === adminEmail ? (
                      <Navigate to="/AdminDashboard" />
                    ) : (
                      <FavouriteToggleProvider>
                        <CategoryProducts />
                      </FavouriteToggleProvider>
                    )
                  }
                />
                <Route
                  path="/favouriteList"
                  element={
                    !userAuthenticated ? (
                      <Navigate to="/" />
                    ) : userAuthenticated &&
                      userAuthenticated.email === adminEmail ? (
                      <Navigate to="/AdminDashboard" />
                    ) : (
                      <FavouriteToggleProvider>
                        <FavouriteProducts />
                      </FavouriteToggleProvider>
                    )
                  }
                />
                <Route
                  path="/cart"
                  element={
                    !userAuthenticated ? (
                      <Navigate to="/" />
                    ) : userAuthenticated &&
                      userAuthenticated.email === adminEmail ? (
                      <Navigate to="/AdminDashboard" />
                    ) : (
                      <CartProducts />
                    )
                  }
                />
              </Routes>
            </CartItemToggleProvider>
          </allCategoriesContext.Provider>
        </allProductsContext.Provider>
      </currentUserDataContext.Provider>
    </BrowserRouter>
  );
}
export default App;
