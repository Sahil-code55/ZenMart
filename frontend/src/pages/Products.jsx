import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar"
import { deleteProduct, getProducts } from "../api/product.api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

    
    const products = await getProducts()
    setProducts(products)
       
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete product. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#070A09] text-[#F9FAFB]">

      {/* Navbar */}
      {/* <nav className="border-b border-[#1E3028] bg-[#0D1512]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Logo className="w-32" />

          <div className="flex items-center gap-3">
            <Link
              to="/products/add"
              className="rounded-xl bg-[#059669] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10B981]"
            >
              + Add Product
            </Link>
          </div>

        </div>
      </nav> */}
       <Navbar/>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#34D399]">
            ZenMart Store
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Products
              </h1>

              <p className="mt-2 text-[#A7B3AE]">
                Browse and manage your products.
              </p>
            </div>

            <span className="rounded-full border border-[#1E3028] bg-[#111A16] px-4 py-2 text-sm text-[#A7B3AE]">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </span>
          </div>
        </div>


        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-[#7F1D1D] bg-[#2A1111] px-4 py-3 text-sm text-[#F87171]">
            <span>{error}</span>

            <button
              onClick={fetchProducts}
              className="font-semibold text-[#FCA5A5] hover:text-white"
            >
              Retry
            </button>
          </div>
        )}


        {/* Loading */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[380px] animate-pulse rounded-2xl border border-[#1E3028] bg-[#111A16]"
              />
            ))}
          </div>
        ) : products.length === 0 ? (

          /* Empty State */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#1E3028] bg-[#0D1512] px-6 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10231D] text-2xl">
              🛍️
            </div>

            <h2 className="text-xl font-semibold">
              No products yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-[#A7B3AE]">
              Your store doesn't have any products yet. Add your first
              product to get started.
            </p>

            <Link
              to="/products/add"
              className="mt-6 rounded-xl bg-[#059669] px-5 py-3 text-sm font-semibold transition hover:bg-[#10B981]"
            >
              Add Your First Product
            </Link>

          </div>

        ) : (

          /* Products */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (

              <article
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-[#1E3028] bg-[#111A16] transition duration-300 hover:-translate-y-1 hover:border-[#29513F] hover:bg-[#17231E]"
              >

                {/* Image */}
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#0D1512]">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl">
                      🛍️
                    </div>
                  )}

                  {/* Stock */}
                  <span
                    className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur ${
                      product.stock > 0
                        ? "bg-[#059669]/90 text-white"
                        : "bg-[#7F1D1D]/90 text-[#FCA5A5]"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>

                </div>


                {/* Content */}
                <div className="p-5">

                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="line-clamp-1 font-semibold text-[#F9FAFB]">
                        {product.name}
                      </h2>

                      {product.category && (
                        <p className="mt-1 text-xs text-[#34D399]">
                          {product.category}
                        </p>
                      )}
                    </div>

                    <p className="shrink-0 text-lg font-bold text-[#34D399]">
                      ₹{product.price}
                    </p>
                  </div>


                  <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-[#A7B3AE]">
                    {product.description || "No description available."}
                  </p>


                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">

                    <Link
                      to={`/products/edit/${product._id}`}
                      className="rounded-lg border border-[#294238] bg-[#10231D] px-3 py-2.5 text-center text-sm font-medium text-[#D1FAE5] transition hover:border-[#34D399] hover:bg-[#17352A]"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="rounded-lg border border-[#512222] bg-[#211111] px-3 py-2.5 text-sm font-medium text-[#FCA5A5] transition hover:border-[#F87171] hover:bg-[#321515]"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Products;