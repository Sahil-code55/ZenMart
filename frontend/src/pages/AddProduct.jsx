import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useProducts } from "../context/ProductContext";

function AddProduct() {
  const navigate = useNavigate();

  const { addProduct } = useProducts();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      };

      await addProduct(productData);

      reset();

      navigate("/products");
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error.response?.data?.message ||
          "Unable to create product. Please try again.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#070A09] text-[#F9FAFB]">
      <Navbar />

      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">

        {/* Header */}
        <div className="mb-3">
        <h1 className="text-xl font-bold tracking-tight sm:text-xl">Add Product </h1>
        
        <div className="flex flex-col justify-between  gap-4 sm:flex-row sm:items-end"> 

          <p className="mt-1 text-[#A7B3AE]">
            Add a new product to your store.
          </p>  
            <Link
          to="/products"
          className=" inline-flex items-center mt-1.5 gap-2 text-sm text-[#A7B3AE] transition hover:text-[#34D399]"
          >
            ← Back to products
          </Link>
          
        </div>
         

          {/* <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#34D399]">
            ZenMart Store
          </p> */}


        
        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-[#1E3028] bg-[#111A16] p-6 shadow-2xl shadow-black/20 sm:p-8"
        >

          {/* Server Error */}
          {errors.root && (
            <div className="mb-6 rounded-xl border border-[#7F1D1D] bg-[#2A1111] px-4 py-3 text-sm text-[#F87171]">
              {errors.root.message}
            </div>
          )}


          {/* Product Name */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Enter product name"
              {...register("name", {
                required: "Product name is required",
                minLength: {
                  value: 2,
                  message: "Product name must be at least 2 characters",
                },
              })}
              className="w-full rounded-xl border border-[#1E3028] bg-[#0D1512] px-4 py-3 text-sm outline-none transition placeholder:text-[#59665F] focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-[#F87171]">
                {errors.name.message}
              </p>
            )}
          </div>


          {/* Description */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Describe your product..."
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              className="w-full resize-none rounded-xl border border-[#1E3028] bg-[#0D1512] px-4 py-3 text-sm outline-none transition placeholder:text-[#59665F] focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />

            {errors.description && (
              <p className="mt-1.5 text-xs text-[#F87171]">
                {errors.description.message}
              </p>
            )}
          </div>


          {/* Price + Stock */}
          <div className="mb-5 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6E7C75]">
                  ₹
                </span>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price cannot be negative",
                    },
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border border-[#1E3028] bg-[#0D1512] py-3 pl-9 pr-4 text-sm outline-none transition placeholder:text-[#59665F] focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              {errors.price && (
                <p className="mt-1.5 text-xs text-[#F87171]">
                  {errors.price.message}
                </p>
              )}
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium">
                Stock
              </label>

              <input
                type="number"
                min="0"
                placeholder="0"
                {...register("stock", {
                  required: "Stock is required",
                  min: {
                    value: 0,
                    message: "Stock cannot be negative",
                  },
                  valueAsNumber: true,
                })}
                className="w-full rounded-xl border border-[#1E3028] bg-[#0D1512] px-4 py-3 text-sm outline-none transition placeholder:text-[#59665F] focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              />

              {errors.stock && (
                <p className="mt-1.5 text-xs text-[#F87171]">
                  {errors.stock.message}
                </p>
              )}
            </div>

          </div>


          {/* Category */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <input
              type="text"
              placeholder="e.g. Electronics"
              {...register("category", {
                required: "Category is required",
              })}
              className="w-full rounded-xl border border-[#1E3028] bg-[#0D1512] px-4 py-3 text-sm outline-none transition placeholder:text-[#59665F] focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />

            {errors.category && (
              <p className="mt-1.5 text-xs text-[#F87171]">
                {errors.category.message}
              </p>
            )}
          </div>


          {/* Image */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium">
              Image URL
            </label>

            <input
              type="url"
              placeholder="https://example.com/product.jpg"
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid image URL",
                },
              })}
              className="w-full rounded-xl border border-[#1E3028] bg-[#0D1512] px-4 py-3 text-sm outline-none transition placeholder:text-[#59665F] focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />

            {errors.image && (
              <p className="mt-1.5 text-xs text-[#F87171]">
                {errors.image.message}
              </p>
            )}
          </div>


          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/products"
              className="rounded-xl border border-[#294238] bg-[#0D1512] px-6 py-3 text-center text-sm font-semibold text-[#A7B3AE] transition hover:border-[#34D399] hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#059669] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10B981] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>

          </div>

        </form>
      </section>
    </main>
  );
}

export default AddProduct;