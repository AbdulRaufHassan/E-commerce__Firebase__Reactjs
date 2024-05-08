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
import { adminEmail, topCollectionDocId } from "./constants/index.js";
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
  const [topCollectionDoc, setTopCollectionDoc] = useState(null);
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

  const setCartItemLocalStrg = () => {
    const localStrg_cartItems = [];
    const getCartLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    if (getCartLocalStorage) {
      currentUserData.cartItems.forEach((item) => {
        const findItemLocalStrg = getCartLocalStorage.find(
          (v) => v.productId === item.productId
        );
        if (findItemLocalStrg) {
          localStrg_cartItems.push({
            productId: findItemLocalStrg.productId,
            quantity: findItemLocalStrg.quantity,
          });
        } else {
          localStrg_cartItems.push({
            productId: item.productId,
            quantity: item.quantity,
          });
        }
      });
    } else {
      currentUserData.cartItems.forEach((item) => {
        localStrg_cartItems.push({
          productId: item.productId,
          quantity: item.quantity,
        });
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(localStrg_cartItems));
  };

  useEffect(() => {
    currentUserData?.cartItems && setCartItemLocalStrg();
  }, [currentUserData]);

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

  const getTopCollectionDoc = () => {
    try {
      onSnapshot(doc(db, "topCollections", topCollectionDocId), (doc) => {
        setTopCollectionDoc(doc.data());
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
      getTopCollectionDoc();
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
    <currentUserDataContext.Provider
      value={{ currentUserData, setCurrentUserData }}
    >
      <allProductsContext.Provider value={allProducts}>
        <allCategoriesContext.Provider
          value={{ allCategories, topCollectionDoc }}
        >
          <BrowserRouter>
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
                  userAuthenticated && userAuthenticated.email != adminEmail ? (
                    <CartItemToggleProvider>
                      <FavouriteToggleProvider>
                        <HomePage />
                      </FavouriteToggleProvider>
                    </CartItemToggleProvider>
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
                    <CartItemToggleProvider>
                      <FavouriteToggleProvider>
                        <ProductDetail />
                      </FavouriteToggleProvider>
                    </CartItemToggleProvider>
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
                    <CartItemToggleProvider>
                      <FavouriteToggleProvider>
                        <CategoryProducts />
                      </FavouriteToggleProvider>
                    </CartItemToggleProvider>
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
                    <CartItemToggleProvider>
                      <FavouriteToggleProvider>
                        <FavouriteProducts />
                      </FavouriteToggleProvider>
                    </CartItemToggleProvider>
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
                    <CartItemToggleProvider>
                      <CartProducts />
                    </CartItemToggleProvider>
                  )
                }
              />
            </Routes>
          </BrowserRouter>
        </allCategoriesContext.Provider>
      </allProductsContext.Provider>
    </currentUserDataContext.Provider>
  );
}
export default App;
