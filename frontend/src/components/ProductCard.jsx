import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onDelete }) {
  const [imageError, setImageError] = useState(false);
  const productId = product._id || product.id;

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#1E3028] bg-[#111A16] transition duration-300 hover:-translate-y-1 hover:border-[#29513F] hover:bg-[#17231E]">

      {/* Image */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#0D1512]">

        {product.image && !imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
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
              ? "bg-[#059669]/20 text-[#34D399]"
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

          <div className="min-w-0">
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
            to={`/products/edit/${productId}`}
            className="rounded-lg border border-[#294238] bg-[#10231D] px-3 py-2.5 text-center text-sm font-medium text-[#D1FAE5] transition hover:border-[#34D399] hover:bg-[#17352A]"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete(productId)}
            className="rounded-lg border border-[#512222] bg-[#211111] px-3 py-2.5 text-sm font-medium text-[#FCA5A5] transition hover:border-[#F87171] hover:bg-[#321515]"
          >
            Delete
          </button>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;