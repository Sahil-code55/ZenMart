import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";


function Products() {
const { products,loading,error,fetchProducts,removeProduct,}= useProducts();

 
  useEffect(() => {
    fetchProducts();
  }, []);


const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    await removeProduct(id);
  } catch (error) {
    console.error(
      error.response?.data?.message ||
        "Unable to delete product. Please try again."
    );
  }
};

  return (
    <main className="min-h-screen bg-[#070A09] text-[#F9FAFB]">

       <Navbar/>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-7 sm:px-8">

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#34D399]">
            ZenMart Store
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-3xl">
                Products
              </h1>

              <p className="mt-2 text-[#A7B3AE]">
                Browse and manage your products.
              </p>
            </div>

            <span className="rounded-full border border-[#1E3028] bg-[#065230] px-4 py-2 text-sm text-[#A7B3AE]">
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
          <ProductCard
          key={product._id}
          product={product}
          onDelete={handleDelete}
          />
))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Products;