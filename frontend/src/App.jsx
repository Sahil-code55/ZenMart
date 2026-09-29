import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Auth from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/auth" element={<Auth />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/add" element={<AddProduct />} />

        <Route
          path="/products/edit/:id"
          element={<EditProduct />}
        />

      
        <Route
          path="*"
          element={<Auth />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;