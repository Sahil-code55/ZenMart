import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/add" element={<AddProduct />} />

        <Route
          path="/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="*"
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;