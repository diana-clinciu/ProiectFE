import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setIsAuthenticated, setRole } from "./store/auth.reducer";
import RegisterPage from "./pages/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import AddProductPage from "./pages/AddProductPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/categories/:category/products/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<ProtectedRoute redirectTo="/" roles={["admin"]}/>}>
            <Route path="/addproduct" element={<AddProductPage />} />
          </Route>

        </Route>
      </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User: ", user);
      if (user) {
        dispatch(setIsAuthenticated());

        if (user.email === "admin@gmail.com") {
          dispatch(setRole("admin"));
        } else {
          dispatch(setRole("user"));
        }
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
