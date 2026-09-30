import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext";

function App() {
      
   

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>

      {/* Authentication */}
      <Route path="/auth" element={<Auth />} />

      {/* products */}
      <Route path="/products" element={<Products />} />

      <Route path="/products/add" element={<AddProduct />} />

      <Route
      path="/products/edit/:id"
      element={<EditProduct />}
      />

      
      {/* Unknown route */}
      <Route
      path="*"
      element={<Navigate to="/auth" replace />}
      />
        
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;