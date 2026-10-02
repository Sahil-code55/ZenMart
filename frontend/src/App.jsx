import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Auth from "./pages/Auth";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <AuthProvider>
        <ProductProvider>
          <Routes>

            {/* Root Route */}
            <Route path="/" element={<Navigate to="/products" replace />} />

            {/* Public */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<Products />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route
                path="/products/edit/:id"
                element={<EditProduct />}
              />
            </Route>

            {/* Unknown route */}
            <Route
              path="*"
              element={<Navigate to="/products" replace />}
            />

          </Routes>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;