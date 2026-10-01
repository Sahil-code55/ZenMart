import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

import Auth from "./pages/Auth";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>

          <Routes>
            <Route path="/auth" element={<Auth />} />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/add"
              element={<AddProduct />}
            />

            <Route
              path="/products/edit/:id"
              element={<EditProduct />}
            />

            <Route
              path="*"
              element={<Navigate to="/auth" replace />}
            />
          </Routes>

        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;