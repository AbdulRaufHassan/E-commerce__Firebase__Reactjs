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
  limit,
  onAuthStateChanged,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "./config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { adminEmail } from "./constants/index.js";
import {
  allProductsContext,
  allCategoriesContext,
  currentUserDataContext,
  latestCollectionContext,
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
  const [latestProducts, setLatestProducts] = useState([]);

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

  const getLatestProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      onSnapshot(
        query(productsRef, orderBy("timeStamp", "desc"), limit(10)),
        (querySnapshot) => {
          const latestProducts = [];
          querySnapshot.forEach((doc) => {
            latestProducts.push(doc.data());
          });
          setLatestProducts(latestProducts);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userAuthenticated?.uid) {
      getCurrentUserDoc();
      getAllProducts();
      getAllCategories();
      getLatestProducts();
    }
  }, [userAuthenticated]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(docRef);
        if (!userDoc.exists()) {
          if (user.email != adminEmail) {
            await setDoc(doc(db, "users", user.uid), {
              name: user.displayName,
              uid: user.uid,
              emailAddress: user.email,
              joinDate: serverTimestamp(),
              cartItems: [],
              favouriteItems: [],
            });
          } else {
            await setDoc(doc(db, "users", user.uid), {
              name: user.displayName,
              uid: user.uid,
              emailAddress: user.email,
              joinDate: serverTimestamp(),
              role: "Admin",
            });
          }
        }
        setUserAuthenticated(user);
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
                    <latestCollectionContext.Provider value={latestProducts}>
                      <CartItemToggleProvider>
                        <FavouriteToggleProvider>
                          <HomePage />
                        </FavouriteToggleProvider>
                      </CartItemToggleProvider>
                    </latestCollectionContext.Provider>
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
          </allCategoriesContext.Provider>
        </allProductsContext.Provider>
      </currentUserDataContext.Provider>
    </BrowserRouter>
  );
}
export default App;
