import { createContext, useContext,  useState,} from "react";
import {getProducts,getProductById,createProduct,updateProduct,deleteProduct,} from "../api/product.api";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get single product
  const fetchProduct = async (id) => {
    return await getProductById(id);
  };

  // Add product
  const addProduct = async (productData) => {
    const data = await createProduct(productData);

    const newProduct = data.product || data;

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

    return newProduct;
  };

  // Update product
  const editProduct = async (id, productData) => {
    const data = await updateProduct(id, productData);

    const updatedProduct = data.product || data;

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product._id === id ? updatedProduct : product
      )
    );

    return updatedProduct;
  };

  // Delete product
 const removeProduct = async (id) => {
  try {
    setError("");

    await deleteProduct(id);

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product._id !== id
      )
    );
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Unable to delete product."
    );

    throw error;
  }
};


  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        fetchProduct,
        addProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}